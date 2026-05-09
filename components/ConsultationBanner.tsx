"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function ConsultationBanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
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
          phone: "—",
          interest: "consultation",
          message: `Free consultation requested. Preferred time: ${time || "Anytime"}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setName(""); setEmail(""); setTime("");
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
                src="/assets/logo-mark.png"
                alt="Nexus Realty Marketing"
                width={56}
                height={56}
                className="h-11 w-auto flex-shrink-0 md:h-12"
              />
              <p className="font-heading text-sm font-light leading-snug text-white md:text-base">
                Looking to invest in <span className="text-gold">Bahria Town</span>? Our real estate
                team is ready when you are.
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
                className="rounded border border-primary-light bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-gold lg:w-40"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email address"
                className="rounded border border-primary-light bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-gold lg:w-48"
              />
              <div className="relative lg:w-36">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full appearance-none rounded border border-primary-light bg-primary px-3.5 py-2.5 pr-9 text-sm text-white outline-none transition-colors focus:border-gold"
                  aria-label="Preferred time"
                >
                  <option value="">Choose time</option>
                  <option value="Morning (9–12)">Morning (9–12)</option>
                  <option value="Afternoon (12–4)">Afternoon (12–4)</option>
                  <option value="Evening (4–8)">Evening (4–8)</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
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
