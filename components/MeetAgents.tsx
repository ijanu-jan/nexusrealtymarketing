import Reveal from "./Reveal";

const agents = [
  {
    name: "Ahmad Khan",
    role: "Senior Sales Consultant",
    specialty: "Tower 36 · Commercial",
    initials: "AK",
    phone: "+92 331 444 6666",
  },
  {
    name: "Sarah Malik",
    role: "Investment Advisor",
    specialty: "Phase 8 · Residential",
    initials: "SM",
    phone: "+92 331 444 6666",
  },
  {
    name: "Bilal Hussain",
    role: "Rentals Manager",
    specialty: "Bahria Town · CBD",
    initials: "BH",
    phone: "+92 331 444 6666",
  },
  {
    name: "Hina Raza",
    role: "Marketing Lead",
    specialty: "Brand · Digital",
    initials: "HR",
    phone: "+92 331 444 6666",
  },
];

export default function MeetAgents() {
  return (
    <section className="section bg-surface" id="team">
      <div className="container-x">
        <Reveal variant="up">
          <div className="text-center">
            <span className="eyebrow">The Team</span>
            <h2 className="mt-4 font-heading text-4xl font-extralight text-primary md:text-5xl">
              Meet Our Agents
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-gold" />
            <p className="mx-auto mt-5 max-w-2xl text-sm text-muted md:text-base">
              A dedicated team of advisors with deep local knowledge of Bahria Town and Islamabad–Rawalpindi
              real estate. Reach out to any of them directly.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => (
            <Reveal key={a.name} variant="up" delay={120 + i * 100}>
              <article className="group flex h-full flex-col rounded-md bg-white p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-cardHover">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-nexus-gradient text-2xl font-light tracking-wider text-white shadow-md transition-transform duration-500 group-hover:scale-105">
                  {a.initials}
                </div>
                <h3 className="mt-5 font-heading text-lg font-light text-primary">{a.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-gold">{a.role}</p>
                <p className="mt-3 text-sm text-muted">{a.specialty}</p>
                <a
                  href={`tel:${a.phone.replace(/\s/g, "")}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-gold"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.2 1z" />
                  </svg>
                  {a.phone}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
