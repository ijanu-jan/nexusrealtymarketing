import Image from "next/image";

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
          poster="/assets/graphics/tower36-render.jpg"
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

      <div className="container-x relative z-10 flex min-h-[92vh] flex-col items-center justify-center py-24 text-center text-white md:py-32">
        {/* Logo above heading */}
        <Image
          src="/assets/logo-mark.png"
          alt="Nexus Realty Marketing"
          width={120}
          height={120}
          priority
          className="mb-8 h-16 w-auto opacity-95 drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] md:h-20 word-rise"
          style={{ animationDelay: "60ms" } as React.CSSProperties}
        />

        <span
          className="eyebrow !text-gold drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] word-rise"
          style={{ animationDelay: "200ms" } as React.CSSProperties}
        >
          Built to Last. Guaranteed to Deliver.
        </span>

        <h1
          className="word-rise mt-5 max-w-4xl font-heading font-extralight leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
          style={{ animationDelay: "320ms", fontSize: "clamp(2.5rem, 6vw, 4.25rem)" } as React.CSSProperties}
        >
          Redefining Real Estate in <span className="font-light text-gold">Bahria Town</span>
        </h1>

        <p
          className="word-rise mt-6 max-w-2xl text-base font-light text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] md:text-lg"
          style={{ animationDelay: "460ms" } as React.CSSProperties}
        >
          Nexus Realty Marketing delivers premium residential and commercial property solutions —
          from sales and rentals to investment consultancy and high-end developments like Tower&nbsp;36.
        </p>
      </div>
    </section>
  );
}
