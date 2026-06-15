import Reveal from "./Reveal";

const services = [
  {
    title: "Property Sales & Purchase",
    body:
      "We assist clients in buying and selling residential and commercial properties with complete transparency and professionalism.",
    icon: "M3 12l9-9 9 9M5 10v10h14V10",
  },
  {
    title: "Property Marketing",
    body:
      "Our marketing strategies include digital promotion, social media campaigns, and targeted outreach to ensure maximum visibility and quick results.",
    icon: "M3 11l18-7-7 18-2-8-9-3z",
  },
  {
    title: "Investment Consultancy",
    body:
      "We guide investors towards secure and high-return opportunities based on market insights and future growth potential.",
    icon: "M3 17l6-6 4 4 8-8M14 7h7v7",
  },
  {
    title: "Rental Services",
    body:
      "We provide reliable rental solutions by connecting property owners with suitable tenants and helping clients find ideal spaces.",
    icon: "M4 21V10l8-6 8 6v11M9 21v-6h6v6",
  },
];

export default function Services() {
  return (
    <section className="section bg-surface" id="services">
      <div className="container-x">
        <Reveal variant="up">
          <div className="text-center">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-4 font-heading text-4xl font-normal text-primary md:text-5xl">
              Complete real estate solutions
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-primary-deep" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} variant="up" delay={120 + i * 90}>
              <article className="group h-full rounded-md bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-cardHover">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-primary text-white transition-all duration-300 group-hover:bg-primary-deep group-hover:rotate-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-5 font-heading text-base font-light text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
