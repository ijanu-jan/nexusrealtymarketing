export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-deep">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/graphics/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>

        {/* Layered overlay — guarantees readable text against any video frame
            without darkening the whole video too much. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>

      <div className="container-x relative z-10 flex min-h-[88vh] flex-col items-start justify-center py-20 text-left text-white md:min-h-[92vh] md:items-center md:py-32 md:text-center">
        <span
          className="eyebrow !text-accent drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] word-rise"
          style={{ animationDelay: "200ms" } as React.CSSProperties}
        >
          Built to Last. Guaranteed to Deliver.
        </span>

        <h1
          className="word-rise mt-4 max-w-4xl font-heading font-normal leading-[1.08] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] md:mt-5 md:leading-[1.1]"
          style={{ animationDelay: "320ms", fontSize: "clamp(2.1rem, 9vw, 4.25rem)" } as React.CSSProperties}
        >
          Redefining Real Estate in <span className="font-normal text-accent">Islamabad &amp; Rawalpindi</span>
        </h1>

        <p
          className="word-rise mt-5 max-w-3xl text-[0.95rem] font-light leading-relaxed text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] md:mt-6 md:text-lg"
          style={{ animationDelay: "460ms" } as React.CSSProperties}
        >
          At Nexus Realty Marketing, we connect discerning buyers, investors, and businesses with
          exceptional property opportunities. From premium residential and commercial sales to
          strategic investment consultancy and high-end developments, we deliver tailored real estate
          solutions built on expertise, trust, and results.
        </p>
      </div>
    </section>
  );
}
