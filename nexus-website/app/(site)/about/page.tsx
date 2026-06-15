import Image from "next/image";
import Link from "next/link";
import Stats from "@/components/Stats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nexus Realty Marketing Pvt. Ltd. — a professional real estate marketing company committed to delivering high-quality property solutions across Pakistan.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-nexus-gradient py-20 text-white">
        <div className="container-x">
          <span className="eyebrow !text-accent">About</span>
          <h1 className="mt-3 font-heading text-h1 text-white">
            Built to Last. Guaranteed to Deliver.
          </h1>
          <p className="mt-4 max-w-3xl text-white/85">
            Nexus Realty Marketing is a professional real estate marketing company committed to delivering
            high-quality property solutions across residential and commercial sectors. With a strong
            understanding of market dynamics and client needs, we provide reliable services in property
            sales, purchases, rentals, and investment consultancy.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-md">
            <Image
              src="/assets/graphics/graphic-2.jpg"
              alt="Nexus Realty Marketing"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">About Us</span>
            <h2 className="mt-3 font-heading text-h2">Who We Are</h2>
            <div className="mt-4 h-1 w-16 rounded bg-primary-deep" />
            <p className="mt-6 text-muted">
              Nexus Realty Marketing is a premier real estate marketing and consultancy firm serving
              Islamabad, Rawalpindi, and the wider region. We specialize in connecting investors,
              businesses, and homebuyers with exceptional property opportunities through strategic
              insight, market expertise, and a commitment to excellence.
            </p>
            <p className="mt-4 text-muted">
              Our approach goes beyond traditional real estate services. We work closely with
              developers, investors, and end-users to create meaningful connections between people and
              properties, ensuring every project receives the visibility, positioning, and market reach
              it deserves.
            </p>
            <p className="mt-4 text-muted">
              From residential communities and commercial assets to landmark mixed-use developments, we
              are dedicated to delivering value at every stage of the real estate journey. Through
              exclusive partnerships, data-driven marketing, and personalized client service, Nexus
              Realty Marketing has established itself as a trusted name in Pakistan's evolving property
              landscape.
            </p>
            <p className="mt-4 text-muted">
              As the exclusive marketing partner for premium developments such as Tower 36, we remain
              focused on identifying opportunities, building lasting relationships, and helping our
              clients make confident real estate decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects/tower-36" className="btn-primary">Explore Tower 36</Link>
              <Link href="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
}
