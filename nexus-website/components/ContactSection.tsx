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
                <WhatsApp />
                <a
                  href={
                    "https://wa.me/923001491799?text=" +
                    encodeURIComponent(
                      "Hello Nexus Realty Marketing — I'd like more information about your properties."
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-deep"
                >
                  WhatsApp: +92 300 149 1799
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Globe />
                <a href="https://nexusrealtymarketing.com" className="hover:text-primary-deep">
                  nexusrealtymarketing.com
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
function WhatsApp() { return <svg className={iconClass} viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.83-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.85.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.02 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 2.11.62 4.07 1.68 5.72L5 27.33l5.78-1.51a10.65 10.65 0 0 0 5.24 1.37c5.9 0 10.69-4.79 10.69-10.69 0-2.86-1.11-5.54-3.13-7.56a10.61 10.61 0 0 0-7.56-3.11z"/></svg>; }
