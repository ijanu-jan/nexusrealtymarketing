import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section className="section bg-surface" id="contact">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <Reveal variant="left">
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 className="mt-4 font-heading text-4xl font-normal text-primary md:text-5xl">
              Speak with a <span className="text-primary-deep">Nexus advisor</span>
            </h2>
            <div className="mt-5 h-px w-16 bg-primary-deep" />
            <p className="mt-7 text-base text-muted md:text-lg">
              Whether you're buying, selling, renting or investing — our team is ready to help. Send us
              a message or reach out directly.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-primary">
              <li className="flex items-start gap-3">
                <Pin />
                <span>
                  Plaza 36, 1st Floor, Office 103, Lakeview Avenue I, CBD North Phase 8, Bahria Town,
                  Rawalpindi.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone />
                <a href="tel:+923314446666" className="hover:text-primary-deep">0331 444 6666</a>
              </li>
              <li className="flex items-start gap-3">
                <Globe />
                <a href="https://nexusrealtymarketing.pk" className="hover:text-primary-deep">
                  nexusrealtymarketing.pk
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

const iconClass = "mt-0.5 h-5 w-5 text-primary-deep flex-shrink-0";

function Pin() { return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>; }
function Phone() { return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.2 1z"/></svg>; }
function Globe() { return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>; }
