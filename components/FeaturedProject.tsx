import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function FeaturedProject() {
  return (
    <section className="section bg-surface" id="projects">
      <div className="container-x">
        <Reveal variant="up">
          <div className="text-center">
            <span className="eyebrow">Our Project</span>
            <h2 className="mt-4 font-heading text-h2">Projects</h2>
            <div className="mx-auto mt-5 h-px w-16 bg-primary-deep" />
          </div>
        </Reveal>

        <Reveal variant="scale" delay={150}>
          <Link
            href="/projects/tower-36"
            className="group relative mx-auto mt-12 block max-w-4xl overflow-hidden rounded-md shadow-card transition-shadow duration-500 hover:shadow-cardHover"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/assets/graphics/tower-360.jpeg"
                alt="Tower 36 — Bahria Town, Rawalpindi"
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                quality={75}
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              {/* Dark overlay for text contrast — lightened so the building stays visible */}
              <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/25" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 90%)",
                }}
              />

              {/* Centered overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="eyebrow !text-accent drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Flagship Development
                </span>
                <h3 className="mt-3 font-heading text-5xl font-bold uppercase tracking-wide text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)] md:text-7xl">
                  Tower 36
                </h3>
                <p className="mt-3 font-medium tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] md:text-lg">
                  Bahria Town, Rawalpindi
                </p>
                <span className="mt-7 inline-flex items-center gap-2 rounded border border-white/80 bg-black/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/20 group-hover:text-accent">
                  View Project →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
