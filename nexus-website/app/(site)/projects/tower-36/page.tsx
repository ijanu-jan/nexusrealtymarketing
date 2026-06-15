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
            src="/assets/graphics/front-tower-36.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 85%)",
            }}
          />
        </div>
        <div className="container-x relative z-10 py-24 md:py-32">
          <h1 className="font-heading text-6xl font-bold uppercase tracking-wide text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)] md:text-8xl">
            Tower 36
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-accent drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] md:text-sm">
            Retail · Corporate · Apartments
          </p>
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
            <h2 className="mt-3 font-heading text-h2">A New Landmark in Bahria Town Phase 8</h2>
            <div className="mt-4 h-1 w-16 rounded bg-primary-deep" />
            <p className="mt-6 text-muted">
              Developed by SWM and exclusively marketed by Nexus Realty Marketing, Tower 36 is a premium
              mixed-use development that seamlessly integrates retail, corporate, and residential spaces
              within a single modern destination. Designed to meet the needs of both investors and
              end-users, the project features high-visibility retail outlets, flexible corporate offices,
              and contemporary apartments in one of Bahria Town's most promising commercial corridors.
            </p>
            <p className="mt-4 text-muted">
              Strategically located on Lake View Avenue I in the heart of CBD North, Tower 36 enjoys a
              prime position alongside Phase 8's rapidly expanding commercial district. With excellent
              connectivity, strong growth potential, and a vibrant business environment, the development
              offers exceptional value for investors, entrepreneurs, and residents alike.
            </p>
            <p className="mt-4 text-muted">
              As the exclusive marketing partner for Tower 36, Nexus Realty Marketing is proud to present
              a project that combines strategic location, modern design, and long-term investment
              potential, setting a new benchmark for mixed-use developments in Bahria Town Phase 8.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="rounded bg-surface p-5">
                <dt className="text-xs uppercase tracking-wider text-primary-deep">{f.label}</dt>
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
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-primary-deep" />
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
