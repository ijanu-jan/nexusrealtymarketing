import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function Expertise() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal variant="up">
            <div>
              <span className="eyebrow">Our Team</span>
              <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.1] text-primary md:text-5xl">
                Our Expertise,
                <br />
                Your Advantage
              </h2>
              <div className="mt-5 h-px w-16 bg-primary-deep" />
            </div>
          </Reveal>

          <div className="hidden h-24 w-px bg-line lg:block" />

          <Reveal variant="up" delay={120}>
            <div>
              <p className="text-base leading-relaxed text-muted md:text-lg">
                Whether you're buying, selling, or investing — our expert team is here to guide you
                every step of the way. Find your perfect place with ease.
              </p>
              <div className="mt-7">
                <a
                  href="tel:+923314446666"
                  className="inline-flex items-center gap-3 rounded bg-white px-7 py-3.5 text-sm font-normal uppercase tracking-wider text-primary-deep ring-1 ring-line transition-all duration-300 hover:bg-surface hover:translate-y-[-2px] hover:shadow-lg"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.2 1z" />
                  </svg>
                  +92 331 444 6666
                </a>
                <Link href="/about" className="ml-3 text-sm font-normal uppercase tracking-wider text-primary hover:text-primary-deep">
                  Meet the team →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
