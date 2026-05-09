import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nexus Realty Marketing. Visit our office in Bahria Town Phase 8 or call 0331 444 6666.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-nexus-gradient py-20 text-white">
        <div className="container-x">
          <span className="eyebrow !text-gold">Contact</span>
          <h1 className="mt-3 font-heading text-h1 text-white">Let's talk property</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Reach out for sales, rentals, investment consultancy or to enquire about Tower 36. We'll get
            back to you within 24 hours.
          </p>
        </div>
      </section>

      <ContactSection />

      <section className="bg-white pb-20">
        <div className="container-x">
          <div className="overflow-hidden rounded-md shadow-card">
            <iframe
              title="Nexus Realty Marketing office"
              src="https://www.google.com/maps?q=Plaza+36+Lakeview+Avenue+Bahria+Town+Phase+8+Rawalpindi&output=embed"
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
