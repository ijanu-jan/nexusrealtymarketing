import PropertyCard from "@/components/PropertyCard";
import { listProperties } from "@/lib/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent",
  description:
    "Browse verified residential, commercial and Tower 36 listings from Nexus Realty Marketing in Bahria Town, Rawalpindi.",
};

export const revalidate = 60;

export default async function PropertiesPage() {
  const properties = await listProperties();

  return (
    <>
      {/* Page header */}
      <section className="bg-nexus-gradient py-20 text-white">
        <div className="container-x">
          <span className="eyebrow !text-accent">Properties</span>
          <h1 className="mt-3 font-heading text-h1 text-white">Find your next address</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Curated listings across Bahria Town and our flagship Tower 36 development.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="section bg-surface">
        <div className="container-x">
          <p className="text-sm text-muted">
            Showing <span className="font-semibold text-primary">{properties.length}</span>{" "}
            {properties.length === 1 ? "property" : "properties"}
          </p>
          {properties.length === 0 ? (
            <div className="mt-8 rounded bg-white p-10 text-center text-muted shadow-card">
              No properties available at this time.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
