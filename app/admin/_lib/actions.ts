"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerStrict } from "@/lib/supabase-server";

const VALID_TYPES = ["apartment", "office", "retail", "house", "plot", "commercial"] as const;
const VALID_PURPOSES = ["sale", "rent"] as const;
const VALID_STATUS = ["available", "sold", "reserved"] as const;

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseFormData(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return v == null ? "" : String(v).trim();
  };
  const num = (k: string): number | null => {
    const v = get(k);
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const list = (k: string): string[] =>
    get(k)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const title = get("title");
  let slug = get("slug") || slugify(title);
  if (!slug) slug = `listing-${Date.now()}`;

  const type = get("type");
  const purpose = get("purpose") || "sale";
  const status = get("status") || "available";

  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    throw new Error(`Invalid property type: ${type}`);
  }
  if (!VALID_PURPOSES.includes(purpose as (typeof VALID_PURPOSES)[number])) {
    throw new Error(`Invalid purpose: ${purpose}`);
  }
  if (!VALID_STATUS.includes(status as (typeof VALID_STATUS)[number])) {
    throw new Error(`Invalid status: ${status}`);
  }

  const price = num("price");
  if (price == null || price < 0) throw new Error("Price is required and must be a positive number.");

  // Images come in as a JSON-encoded array (set by ImageUploader hidden field)
  const imagesRaw = get("images");
  let images: string[] = [];
  if (imagesRaw) {
    try {
      const parsed = JSON.parse(imagesRaw);
      if (Array.isArray(parsed)) images = parsed.filter((u) => typeof u === "string");
    } catch {
      // fall back to newline-separated URLs
      images = list("images");
    }
  }

  return {
    slug,
    title,
    description: get("description") || null,
    location: get("location"),
    city: get("city") || null,
    type,
    purpose,
    status,
    price,
    bedrooms: num("bedrooms"),
    bathrooms: num("bathrooms"),
    area_sqft: num("area_sqft"),
    features: list("features"),
    images,
    project: get("project") || null,
    is_featured: get("is_featured") === "on" || get("is_featured") === "true",
  };
}

async function requireAuth() {
  const supabase = await createSupabaseServerStrict();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not authenticated.");
  return supabase;
}

function revalidatePublicPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/projects/tower-36");
  revalidatePath("/admin/properties");
  if (slug) revalidatePath(`/properties/${slug}`);
}

export async function createProperty(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();
    const data = parseFormData(formData);

    if (!data.title || !data.location) {
      return { ok: false, error: "Title and location are required." };
    }

    const { data: inserted, error } = await supabase
      .from("properties")
      .insert(data)
      .select("id, slug")
      .single();

    if (error) return { ok: false, error: error.message };

    revalidatePublicPaths(inserted.slug);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
  redirect("/admin/properties?created=1");
}

export async function updateProperty(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();
    const data = parseFormData(formData);

    const { error } = await supabase.from("properties").update(data).eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidatePublicPaths(data.slug);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
  redirect("/admin/properties?updated=1");
}

export async function deleteProperty(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();

    // Best-effort: clean up the property's images folder in Storage too.
    const { data: existing } = await supabase
      .from("properties")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };

    if (existing?.slug) {
      const { data: files } = await supabase.storage
        .from("property-images")
        .list(existing.slug);
      if (files && files.length > 0) {
        await supabase.storage
          .from("property-images")
          .remove(files.map((f) => `${existing.slug}/${f.name}`));
      }
    }

    revalidatePublicPaths();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/** Convenience wrapper for the row-level delete buttons in the list view. */
export async function deletePropertyAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteProperty(id);
  redirect("/admin/properties?deleted=1");
}
