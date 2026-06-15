"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function ConsultationBanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
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
          interest: area || "consultation",
          message: `Consultation requested. Interested in: ${area || "Not specified"}.`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setName(""); setEmail(""); setPhone(""); setArea("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-primary-deep py-4 text-white">
      <div className="container-x">
        <Reveal variant="up">
          <form
            onSubmit={onSubmit}
            className="flex flex-wrap justify-center items-center gap-2.5"
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
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                aria-label="Area of interest"
                className="rounded border border-primary-light bg-primary px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent lg:w-44 appearance-none"
              >
                <option value="" disabled>Interested in…</option>
                <option value="DHA Islamabad">DHA Islamabad</option>
                <option value="Bahria Town Rawalpindi">Bahria Town Rawalpindi</option>
                <option value="Bahria Town Islamabad">Bahria Town Islamabad</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-gold !py-2.5 !px-5 disabled:opacity-60"
              >
                {status === "submitting" ? "..." : "Book Now"}
              </button>
          </form>

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
