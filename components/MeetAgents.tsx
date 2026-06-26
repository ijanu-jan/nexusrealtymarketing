import Reveal from "./Reveal";

const agents = [
  {
    name: "Mehmood Mushtaq",
    role: "C.E.O",
    initials: "MM",
    phone: "0321 504 0200",
    email: "mehmood_mushtaq@outlook.com",
  },
  {
    name: "Malik Shahid Awan",
    role: "Director Sales",
    initials: "MS",
    phone: "0333 544 4780",
    email: "malikshahidimran222@gmail.com",
  },
  {
    name: "Muhammad Ishfaq Awan",
    role: "Director Admin",
    initials: "MI",
    phone: "0300 067 3070",
    email: "malickashfaq9@gmail.com",
  },
  {
    name: "Ishaq Jan",
    role: "Director Marketing",
    initials: "IJ",
    phone: "0321 513 9897",
    email: "ishaqjan@live.com",
  },
  {
    name: "Ali Ameen",
    role: "Social Media Manager",
    initials: "AA",
    phone: "0343 724 2300",
    email: "aliameen.co@gmail.com",
  },
];

export default function MeetAgents() {
  return (
    <section className="section bg-surface" id="team">
      <div className="container-x">
        <Reveal variant="up">
          <div className="text-center">
            <span className="eyebrow">The Team</span>
            <h2 className="mt-4 font-heading text-4xl font-normal text-primary md:text-5xl">
              Meet Our Team
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-primary-deep" />
            <p className="mx-auto mt-5 max-w-2xl text-sm text-muted md:text-base">
              A dedicated team of advisors with deep local knowledge of Bahria Town and Islamabad–Rawalpindi
              real estate. Reach out to any of them directly.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {agents.map((a, i) => (
            <Reveal key={a.name} variant="up" delay={120 + i * 100}>
              <article className="group flex h-full w-full flex-col rounded-md bg-white p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-cardHover sm:w-72">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-nexus-gradient text-2xl font-light tracking-wider text-white shadow-md transition-transform duration-500 group-hover:scale-105">
                  {a.initials}
                </div>
                <h3 className="mt-5 font-heading text-lg font-light text-primary">{a.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary-deep">{a.role}</p>
                <a
                  href={`tel:${a.phone.replace(/\s/g, "")}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-normal text-primary transition-colors hover:text-primary-deep"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.2 1z" />
                  </svg>
                  {a.phone}
                </a>
                <a
                  href={`mailto:${a.email}`}
                  className="mt-2 inline-flex items-center justify-center gap-2 break-all text-xs font-normal text-muted transition-colors hover:text-primary-deep"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {a.email}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
