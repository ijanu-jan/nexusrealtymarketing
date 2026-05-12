import PropertyCard from "@/components/PropertyCard";
import { listProperties } from "@/lib/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent",
  description:
    "Browse verified residential, commercial and Tower 36 listings from Nexus Realty Marketing in Bahria Town, Rawalpindi.",
};

export const revalidate = 60;

interface SP {
  type?: string;
  beds?: string;
  max?: string;
  purpose?: string;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const properties = await listProperties({
    type: sp.type,
    beds: sp.beds ? Number(sp.beds) : undefined,
    max: sp.max ? Number(sp.max) : undefined,
    purpose: sp.purpose === "rent" ? "rent" : sp.purpose === "sale" ? "sale" : undefined,
  });

  return (
    <>
      {/* Page header */}
      <section className="bg-nexus-gradient py-20 text-white">
        <div className="container-x">
          <span className="eyebrow !text-accent">Properties</span>
          <h1 className="mt-3 font-heading text-h1 text-white">Find your next address</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Curated listings across Bahria Town and our flagship Tower 36 development. Filter by type,
            bedrooms and budget.
          </p>
        </div>
      </section>

      {/* Filter form */}
      <section className="border-b border-line bg-white">
        <div className="container-x py-6">
          <form
            method="GET"
            className="grid grid-cols-2 gap-3 md:grid-cols-5"
            aria-label="Filter properties"
          >
            <select
              name="type"
              defaultValue={sp.type ?? ""}
              className="rounded border border-line bg-white px-3 py-3 text-sm text-primary"
            >
              <option value="">Any type</option>
              <option value="apartment">Apartment</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="house">House</option>
              <option value="plot">Plot</option>
            </select>
            <select
              name="purpose"
              defaultValue={sp.purpose ?? ""}
              className="rounded border border-line bg-white px-3 py-3 text-sm text-primary"
            >
              <option value="">Sale or Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <select
              name="beds"
              defaultValue={sp.beds ?? ""}
              className="rounded border border-line bg-white px-3 py-3 text-sm text-primary"
            >
              <option value="">Beds</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
            <input
              name="max"
              type="number"
              defaultValue={sp.max ?? ""}
              placeholder="Max Price (PKR)"
              className="rounded border border-line bg-white px-3 py-3 text-sm text-primary"
            />
            <button type="submit" className="btn-primary !py-3">Apply Filters</button>
          </form>
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
              No properties match those filters. Try widening your search.
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
