import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Nexus Realty Marketing's flagship development — Tower 36 in Bahria Town Phase 8.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-nexus-gradient py-20 text-white">
        <div className="container-x">
          <span className="eyebrow !text-accent">Projects</span>
          <h1 className="mt-3 font-heading text-h1 text-white">Our Developments</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <Link
            href="/projects/tower-36"
            className="group grid items-center gap-10 overflow-hidden rounded-md bg-surface shadow-card transition-shadow hover:shadow-cardHover lg:grid-cols-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/graphics/front-tower-36.webp"
                alt="Tower 36"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-10">
              <Image
                src="/assets/tower-36-logo.svg"
                alt="Tower 36 logo"
                width={420}
                height={200}
                unoptimized
                className="h-20 w-auto md:h-24"
              />
              <p className="mt-6 text-sm text-muted md:text-base">
                Plot No. 36, Lakeview Avenue-I, Central Business District-North Phase 8, Bahria Town,
                Rawalpindi. Retail · Corporate · Apartments — near our new head office.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-deep">
                View project →
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
