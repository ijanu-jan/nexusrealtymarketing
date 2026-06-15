import Image from "next/image";
import Reveal from "./Reveal";

const points = [
  "Pakistan's #1 Master-Planned Community",
  "30-Year Track Record of Delivery",
  "9–12% Average Rental Yields",
  "Phase 8 — Premium Address",
  "Dedicated CBD &amp; Lakeview Districts",
  "World-Class Infrastructure",
  "24/7 Gated Security",
  "Major Capital Appreciation Zones",
];

const stats = [
  { value: "30+", label: "Years of Bahria Town Delivery" },
  { value: "9–12%", label: "Avg. Annual Rental Yield" },
  { value: "1M+", label: "Residents Across Phases" },
  { value: "PKR 12K+", label: "Avg. Price per sq ft (CBD Phase 8)" },
];

export default function ThisIsBahria() {
  return (
    <section className="bg-primary-deep py-20 text-white md:py-28">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal variant="up">
              <h2 className="font-heading text-5xl font-normal uppercase tracking-tight text-white md:text-7xl">
                This is <span className="text-white">Bahria</span>
              </h2>
              <p className="mt-3 text-xs font-normal uppercase tracking-[0.3em] text-accent">
                Pakistan's premium real-estate destination is leading the market
              </p>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <p className="mt-7 max-w-2xl text-sm leading-relaxed text-accent md:text-base">
                Bahria Town's Phase 8 has emerged as Rawalpindi-Islamabad's strongest performing
                investment corridor, anchored by the Central Business District and Lakeview Avenue.
                With Tower 36, the GT Road expansion, and continuous infrastructure rollouts, the area
                is shaping a high-growth landscape for residential and commercial investors alike.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p} variant="up" delay={150 + i * 60}>
                  <li className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm text-white/90">
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm bg-accent text-[10px] font-semibold text-primary-deep">
                      ◆
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: p }} />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal variant="right" delay={120}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-md">
              <Image
                src="/assets/graphics/night-view.webp"
                alt="Bahria Town Phase 8 — night view"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-16">
          <Reveal variant="up">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-accent">Details</p>
          </Reveal>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} variant="scale" delay={120 + i * 100}>
                <div className="rounded-md bg-white/5 p-6 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                  <dt className="font-heading text-4xl font-extralight text-white md:text-5xl">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-wider text-accent">{s.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
