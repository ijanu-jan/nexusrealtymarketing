import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyForm from "../../../_components/PropertyForm";
import { updateProperty } from "../../../_lib/actions";
import { createSupabaseServerStrict } from "@/lib/supabase-server";
import type { Property } from "@/lib/types";

export const metadata = { title: "Edit Property" };

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerStrict();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();
  const property = data as Property;

  const updateAction = updateProperty.bind(null, id);

  return (
    <>
      <div className="mb-6 text-sm text-muted">
        <Link href="/admin/properties" className="hover:text-primary">
          ← Back to properties
        </Link>
      </div>

      <h1 className="mb-2 font-heading text-3xl font-extralight text-primary">Edit Property</h1>
      <p className="mb-8 text-sm text-muted">{property.title}</p>

      <PropertyForm initial={property} action={updateAction} submitLabel="Save Changes" />
    </>
  );
}
