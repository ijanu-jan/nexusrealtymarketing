import { getSupabase } from "./supabase";
import type { Property } from "./types";

export interface PropertyQuery {
  type?: string;
  beds?: number;
  max?: number;
  purpose?: "sale" | "rent";
  limit?: number;
}

const fallback: Property[] = [
  {
    id: "demo-1",
    slug: "tower-36-corporate-suite",
    title: "Tower 36 — Corporate Suite",
    description:
      "Premium corporate office on a high floor in Tower 36, Bahria Town's CBD. Floor-to-ceiling glazing and serviced lobby.",
    location: "Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "office",
    purpose: "sale",
    status: "available",
    price: 32_500_000,
    bedrooms: null,
    bathrooms: 2,
    area_sqft: 1450,
    features: ["Backup Power", "Central A/C", "Reserved Parking", "Concierge"],
    images: ["/assets/graphics/corporate-suite.webp"],
    project: "Tower 36",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    slug: "tower-36-2bed-apartment",
    title: "Tower 36 — 2-Bed Sky Apartment",
    description:
      "A bright two-bedroom residence in Tower 36 with skyline views over Bahria Town's central business district.",
    location: "Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "apartment",
    purpose: "sale",
    status: "available",
    price: 24_900_000,
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1180,
    features: ["Balcony", "Modular Kitchen", "Gym Access", "24/7 Security"],
    images: ["/assets/graphics/lounge-cam-1.webp"],
    project: "Tower 36",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    slug: "tower-36-retail-unit",
    title: "Tower 36 — Ground Floor Retail",
    description:
      "Prime ground-floor retail with high pedestrian footfall on Lakeview Avenue I.",
    location: "Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "retail",
    purpose: "sale",
    status: "available",
    price: 48_000_000,
    bedrooms: null,
    bathrooms: 1,
    area_sqft: 920,
    features: ["Glass Frontage", "Mezzanine", "Roller Shutter"],
    images: ["/assets/graphics/retail-bed-cam.webp"],
    project: "Tower 36",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    slug: "phase-8-villa",
    title: "10 Marla Designer Villa",
    description: "Modern villa with double-height living and private terrace in Bahria Town Phase 8.",
    location: "Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "house",
    purpose: "sale",
    status: "available",
    price: 68_500_000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqft: 4500,
    features: ["Garden", "Servant Quarters", "Smart Home", "Solar"],
    images: ["/assets/graphics/graphic-1.jpg"],
    project: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-5",
    slug: "phase-7-apartment-rent",
    title: "1-Bed Furnished Apartment",
    description: "Fully furnished apartment ready for occupancy.",
    location: "Bahria Town Phase 7, Rawalpindi",
    city: "Rawalpindi",
    type: "apartment",
    purpose: "rent",
    status: "available",
    price: 95_000,
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 720,
    features: ["Furnished", "Lift", "Backup Power"],
    images: ["/assets/graphics/graphic-2.jpg"],
    project: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-6",
    slug: "cbd-commercial-plot",
    title: "5 Marla Commercial Plot",
    description: "Corner commercial plot with two open sides in CBD North.",
    location: "CBD North Phase 8, Bahria Town, Rawalpindi",
    city: "Rawalpindi",
    type: "plot",
    purpose: "sale",
    status: "available",
    price: 95_000_000,
    bedrooms: null,
    bathrooms: null,
    area_sqft: 1361,
    features: ["Corner", "Two-Side Open", "Possession Ready"],
    images: ["/assets/graphics/graphic-3.jpg"],
    project: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

function applyFilters(items: Property[], q: PropertyQuery): Property[] {
  return items.filter((p) => {
    if (q.type && p.type !== q.type) return false;
    if (q.purpose && p.purpose !== q.purpose) return false;
    if (q.beds && (p.bedrooms ?? 0) < q.beds) return false;
    if (q.max && p.price > q.max) return false;
    return true;
  });
}

export async function listProperties(q: PropertyQuery = {}): Promise<Property[]> {
  const sb = getSupabase();
  if (!sb) return applyFilters(fallback, q).slice(0, q.limit ?? 100);

  let query = sb.from("properties").select("*").order("created_at", { ascending: false });
  if (q.type) query = query.eq("type", q.type);
  if (q.purpose) query = query.eq("purpose", q.purpose);
  if (q.beds) query = query.gte("bedrooms", q.beds);
  if (q.max) query = query.lte("price", q.max);
  if (q.limit) query = query.limit(q.limit);

  const { data, error } = await query;
  if (error || !data) return applyFilters(fallback, q).slice(0, q.limit ?? 100);
  return data as Property[];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const sb = getSupabase();
  if (!sb) return fallback.find((p) => p.id === id || p.slug === id) ?? null;

  // Try by id first, then by slug
  const { data: byId } = await sb.from("properties").select("*").eq("id", id).maybeSingle();
  if (byId) return byId as Property;
  const { data: bySlug } = await sb.from("properties").select("*").eq("slug", id).maybeSingle();
  return (bySlug as Property | null) ?? null;
}

export async function listFeaturedProperties(limit = 3): Promise<Property[]> {
  const sb = getSupabase();
  if (!sb) return fallback.filter((p) => p.is_featured).slice(0, limit);
  const { data, error } = await sb
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return fallback.filter((p) => p.is_featured).slice(0, limit);
  return data as Property[];
}
