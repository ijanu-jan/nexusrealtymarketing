import Link from "next/link";
import PropertyForm from "../../_components/PropertyForm";
import { createProperty } from "../../_lib/actions";

export const metadata = { title: "New Property" };

export default function NewPropertyPage() {
  return (
    <>
      <div className="mb-6 text-sm text-muted">
        <Link href="/admin/properties" className="hover:text-primary">
          ← Back to properties
        </Link>
      </div>

      <h1 className="mb-2 font-heading text-3xl font-extralight text-primary">New Property</h1>
      <p className="mb-8 text-sm text-muted">
        Fill in the details below. Required fields are marked with an asterisk.
      </p>

      <PropertyForm action={createProperty} submitLabel="Create Listing" />
    </>
  );
}
