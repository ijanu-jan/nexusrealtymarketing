import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function LuxurySection() {
  return (
    <section className="section bg-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal variant="left">
          <div>
            <span className="eyebrow">High-End Urban Living</span>
            <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.1] text-primary md:text-5xl">
              Luxury &amp; Resort
              <br />
              Properties
            </h2>
            <div className="mt-5 h-px w-16 bg-primary-deep" />
            <p className="mt-7 text-base leading-relaxed text-muted md:text-lg">
              For the discerning buyer eyeing exclusive luxury, Bahria Town doesn't disappoint. Think
              high-floor sky apartments with panoramic city views, designer villas with private gardens,
              and signature commercial addresses on Lakeview Avenue.
            </p>

            <Link
              href="/properties?type=apartment"
              className="mt-8 inline-flex items-center gap-3 rounded border border-primary-deep px-6 py-3 text-xs font-normal uppercase tracking-[0.25em] text-primary-deep transition-all duration-300 hover:bg-primary-deep hover:text-white hover:translate-y-[-2px]"
            >
              Discover →
            </Link>
          </div>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-md shadow-card">
            <Image
              src="/assets/graphics/graphic-1.jpg"
              alt="Exclusive luxury residences in Bahria Town"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1500ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-xs font-light uppercase tracking-[0.4em] text-white drop-shadow-lg md:text-sm">
              Exclusive Residences
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
