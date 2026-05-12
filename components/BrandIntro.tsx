import Reveal from "./Reveal";

export default function BrandIntro() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x max-w-4xl text-center">
        <Reveal variant="up">
          <span className="eyebrow">About</span>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <h2 className="mt-4 font-heading text-3xl font-normal tracking-wide text-primary md:text-4xl">
            NEXUS REALTY MARKETING
          </h2>
        </Reveal>

        <Reveal variant="up" delay={200}>
          <div className="mx-auto mt-5 h-px w-16 bg-primary-deep" />
        </Reveal>

        <Reveal variant="up" delay={300}>
          <p className="serif mt-8 text-lg leading-relaxed text-primary md:text-xl md:leading-[1.75]">
            is a professional real estate marketing company committed to delivering high-quality
            property solutions across residential and commercial sectors. With a strong
            understanding of market dynamics and client needs, we provide reliable services in
            property sales, purchases, rentals, and investment consultancy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
