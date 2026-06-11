import Reveal from "./Reveal";

export default function BrandIntro() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x max-w-4xl text-center">
        <Reveal variant="up">
          <span className="eyebrow">About</span>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <h2 className="mt-4 font-heading text-3xl font-normal text-primary md:text-4xl">
            Elevating Real Estate Across Islamabad &amp; Rawalpindi
          </h2>
        </Reveal>

        <Reveal variant="up" delay={200}>
          <div className="mx-auto mt-5 h-px w-16 bg-primary-deep" />
        </Reveal>

        <Reveal variant="up" delay={300}>
          <p className="serif mt-8 text-lg leading-relaxed text-primary md:text-xl md:leading-[1.75]">
            Nexus Realty Marketing specializes in premium residential and commercial properties,
            offering expert guidance in sales, rentals, investments, and exclusive developments. We
            help clients make confident property decisions through market insight, personalized
            service, and a commitment to excellence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
