"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to submit");
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-md bg-primary p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" placeholder="Full Name" required />
        <Field name="email" type="email" placeholder="Email Address" required />
        <Field name="phone" type="tel" placeholder="Phone Number" required />
        <Select name="interest" required>
          <option value="" disabled>I am interested in...</option>
          <option value="tower-36">Tower 36</option>
          <option value="buying">Buying a property</option>
          <option value="selling">Selling a property</option>
          <option value="rental">Rental services</option>
          <option value="investment">Investment consultancy</option>
        </Select>
      </div>

      <textarea
        name="message"
        rows={5}
        placeholder="Your message"
        required
        className="rounded border border-primary-light bg-primary px-4 py-3 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-accent"
      />

      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
        <p className="order-2 text-xs text-accent sm:order-1">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold order-1 w-full sm:order-2 sm:w-auto disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </div>

      {status === "success" && (
        <p className="rounded bg-white/10 px-4 py-3 text-sm text-white">
          Thank you. Your message has been received — our team will be in touch shortly.
        </p>
      )}
      {status === "error" && error && (
        <p className="rounded bg-red-500/20 px-4 py-3 text-sm text-white">{error}</p>
      )}
    </form>
  );
}

function Field({
  name,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="rounded border border-primary-light bg-primary px-4 py-3 text-sm text-white placeholder:text-accent outline-none transition-colors focus:border-accent"
    />
  );
}

/* Select with custom chevron — strips the native arrow on all browsers. */
function Select({
  name,
  required,
  children,
}: {
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full appearance-none rounded border border-primary-light bg-primary px-4 py-3 pr-10 text-sm text-white outline-none transition-colors focus:border-accent"
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
