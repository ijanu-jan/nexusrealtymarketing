import Hero from "@/components/Hero";
import ConsultationBanner from "@/components/ConsultationBanner";
import BrandIntro from "@/components/BrandIntro";
import FeaturedProject from "@/components/FeaturedProject";
import Expertise from "@/components/Expertise";
import Services from "@/components/Services";
import LuxurySection from "@/components/LuxurySection";
import ThisIsBahria from "@/components/ThisIsBahria";
import MeetAgents from "@/components/MeetAgents";
import ContactSection from "@/components/ContactSection";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { listFeaturedProperties } from "@/lib/properties";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await listFeaturedProperties(3);

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Consultation booking banner (right below hero) */}
      <ConsultationBanner />

      {/* 3. Brand intro paragraph */}
      <BrandIntro />

      {/* 4. Single project — Tower 36, Bahria Town, Rawalpindi */}
      <FeaturedProject />

      {/* 5. Our Expertise, Your Advantage */}
      <Expertise />

      {/* 6. Properties (featured listings) */}
      <section className="section bg-surface" id="featured-listings">
        <div className="container-x">
          <Reveal variant="up">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Featured Listings</span>
                <h2 className="mt-4 font-heading text-4xl font-extralight text-primary md:text-5xl">
                  Available now
                </h2>
                <div className="mt-5 h-px w-16 bg-gold" />
              </div>
              <Link href="/properties" className="btn-secondary">View all properties</Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} variant="up" delay={120 + i * 100}>
                <PropertyCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Luxury & Resort Properties */}
      <LuxurySection />

      {/* 8. This is Bahria — dark stats section */}
      <ThisIsBahria />

      {/* 9. Meet Our Agents */}
      <MeetAgents />

      {/* 10. Services */}
      <Services />

      {/* 11. Contact */}
      <ContactSection />
    </>
  );
}
