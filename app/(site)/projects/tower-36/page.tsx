import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import ContactSection from "@/components/ContactSection";
import { listProperties } from "@/lib/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tower 36 — Retail · Corporate · Apartments",
  description:
    "Tower 36 — Nexus Realty Marketing's flagship development on Plot No. 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi.",
};

export const revalidate = 60;

const facts = [
  { label: "Address", value: "Plot No. 36, Lakeview Avenue I, CBD North Phase 8, Bahria Town" },
  { label: "Mix", value: "Retail · Corporate · Apartments" },
  { label: "City", value: "Rawalpindi" },
  { label: "Status", value: "Under Construction" },
];

export default async function Tower36Page() {
  const all = await listProperties();
  const tower = all.filter((p) => p.project === "Tower 36");

  return (
    <>
      <section className="relative bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/graphics/tower36-render.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-nexus-gradient opacity-90" />
        </div>
        <div className="container-x relative z-10 py-24 md:py-32">
          <Image
            src="/assets/tower36-logo.png"
            alt="Tower 36"
            width={520}
            height={140}
            priority
            className="h-24 w-auto md:h-28"
          />
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            A landmark mixed-use development in Bahria Town's Central Business District — combining
            premium retail, modern corporate offices and contemporary apartments under one address.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#units" className="btn-gold">View Available Units</Link>
            <Link href="/contact" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-primary">
              Reserve a Unit
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">About the Project</span>
            <h2 className="mt-3 font-heading text-h2">A new landmark in Bahria Phase 8</h2>
            <div className="mt-4 h-1 w-16 rounded bg-gold" />
            <p className="mt-6 text-muted">
              Tower 36 is the flagship Nexus Realty Marketing development. Designed for end-users and
              investors alike, the building hosts ground-floor retail with high pedestrian footfall,
              flexible corporate floors, and modern residential apartments above.
            </p>
            <p className="mt-4 text-muted">
              Sited on Lakeview Avenue I in the heart of CBD North, Tower 36 sits next to Bahria Town's
              expanding commercial district and offers superb connectivity throughout Phase 8.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="rounded bg-surface p-5">
                <dt className="text-xs uppercase tracking-wider text-gold">{f.label}</dt>
                <dd className="mt-1 font-heading text-base font-semibold text-primary">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-surface" id="units">
        <div className="container-x">
          <div className="text-center">
            <span className="eyebrow">Available Units</span>
            <h2 className="mt-3 font-heading text-h2">Inside Tower 36</h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-gold" />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tower.length === 0 ? (
              <p className="col-span-full text-center text-muted">
                No units listed yet. Please check back soon.
              </p>
            ) : (
              tower.map((p) => <PropertyCard key={p.id} p={p} />)
            )}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
