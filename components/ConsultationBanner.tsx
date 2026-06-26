"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function ConsultationBanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "—",
          interest: "consultation",
          message: `Free consultation requested.`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setName(""); setEmail(""); setPhone("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-primary-deep py-6 text-white md:py-7">
      <div className="container-x">
        <Reveal variant="up">
          <div className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:gap-8">
            {/* Left: logo + headline (2 rows max) */}
            <div className="flex items-center gap-4 lg:flex-1 lg:min-w-0">
              <Image
                src="/assets/nexus-icon.svg"
                alt="Nexus Realty Marketing"
                width={56}
                height={56}
                unoptimized
                className="h-11 w-auto flex-shrink-0 md:h-12"
              />
              <p className="font-heading text-sm font-light leading-snug text-white md:text-base">
                Looking to invest in <span className="text-accent">Rawalpindi / Islamabad</span>? Our real estate
                team is ready to insist you.
              </p>
            </div>

            {/* Right: form */}
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:flex lg:flex-shrink-0 lg:items-stretch lg:gap-2.5"
              aria-label="Free consultation booking"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="rounded border border-primary-light bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-accent lg:w-40"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email address"
                className="rounded border border-primary-light bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-accent lg:w-48"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                required
                placeholder="Phone number"
                className="rounded border border-primary-light bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-accent lg:w-40"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-gold !py-2.5 !px-5 disabled:opacity-60"
              >
                {status === "submitting" ? "..." : "Book Now"}
              </button>
            </form>
          </div>

          {status === "success" && (
            <p className="mt-3 rounded bg-white/10 px-4 py-2 text-xs text-white">
              Thanks — we'll be in touch within 24 hours to confirm your consultation.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 rounded bg-red-500/20 px-4 py-2 text-xs text-white">
              Couldn't send the request. Please try again or call us directly.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
