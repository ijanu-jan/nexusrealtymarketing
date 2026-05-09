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
            <div className="mx-auto mt-5 h-px w-16 bg-gold" />
          </div>
        </Reveal>

        <Reveal variant="scale" delay={150}>
          <Link
            href="/projects/tower-36"
            className="group relative mx-auto mt-12 block max-w-4xl overflow-hidden rounded-md shadow-card transition-shadow duration-500 hover:shadow-cardHover"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/assets/graphics/tower36-render.jpg"
                alt="Tower 36 — Bahria Town, Rawalpindi"
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              {/* Strong dark overlay for guaranteed text contrast */}
              <div className="absolute inset-0 bg-black/55 transition-colors duration-500 group-hover:bg-black/45" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 85%)",
                }}
              />

              {/* Centered overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="eyebrow !text-gold drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                  Flagship Development
                </span>
                <h3 className="mt-3 font-heading text-5xl font-extralight tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-7xl">
                  Tower 36
                </h3>
                <p className="mt-3 font-light tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] md:text-lg">
                  Bahria Town, Rawalpindi
                </p>
                <span className="mt-7 inline-flex items-center gap-2 rounded border border-white/80 bg-black/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/20 group-hover:text-gold">
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
