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
          <span className="eyebrow !text-gold">About</span>
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
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-3 font-heading text-h2">A trusted name in Bahria Town</h2>
            <div className="mt-4 h-1 w-16 rounded bg-gold" />
            <p className="mt-6 text-muted">
              Nexus Realty Marketing specializes in marketing and dealing in leading housing societies
              and real estate projects. Our team stays updated with the latest market trends to offer the
              best investment options and ensure long-term value for our clients.
            </p>
            <p className="mt-4 text-muted">
              Our flagship project — Tower 36 — combines retail, corporate offices and modern apartments
              in the heart of Bahria Town's Central Business District.
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
