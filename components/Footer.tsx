import Image from "next/image";
import Link from "next/link";

const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" },
  { href: "https://instagram.com", label: "Instagram", icon: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.9.2 2.3.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.4-1.1-.4-2.3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.4-.5.2-.9.5-1.3.9s-.7.8-.9 1.3c-.1.4-.3 1-.4 2.1 0 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.4 2.1.2.5.5.9.9 1.3s.8.7 1.3.9c.4.1 1 .3 2.1.4 1.2 0 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.4.5-.2.9-.5 1.3-.9s.7-.8.9-1.3c.1-.4.3-1 .4-2.1 0-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.4-2.1-.2-.5-.5-.9-.9-1.3s-.8-.7-1.3-.9c-.4-.1-1-.3-2.1-.4-1.2 0-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3v-8H5.7v8h2.6zM7 9.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.1v-4.4c0-2.4-1.3-3.5-3-3.5-1.4 0-2 .8-2.4 1.3v-1.1h-2.6c0 .8 0 8 0 8h2.6v-4.5c0-.2 0-.5.1-.6.2-.4.6-.9 1.3-.9.9 0 1.3.7 1.3 1.7v4.3h2.7z" },
  { href: "https://tiktok.com", label: "TikTok", icon: "M19.6 6.7a5.4 5.4 0 0 1-3.3-1.2 5.4 5.4 0 0 1-2-3.5h-3v12.7a2.5 2.5 0 1 1-2.5-2.5c.2 0 .5 0 .7.1V9.2a5.6 5.6 0 1 0 5 5.6V9.4a8.5 8.5 0 0 0 5.1 1.7V8a5.5 5.5 0 0 1 0 0z" },
  { href: "https://wa.me/923314446666", label: "WhatsApp", icon: "M20.5 3.5A10.4 10.4 0 0 0 3.4 16.7L2 22l5.4-1.4a10.4 10.4 0 0 0 5 1.3 10.4 10.4 0 0 0 8.1-18.4zm-8.1 16.1a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.6 8.6 0 1 1 7.2 4zm4.7-6.5c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1c-.1.1-.3.2-.5.1a7 7 0 0 1-3.5-3.1c-.3-.5.3-.4.7-1.4.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4s-1 1-1 2.4 1 2.8 1.2 3 2 3 4.8 4.2c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z" },
  { href: "https://youtube.com", label: "YouTube", icon: "M23 7.3s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.4 3.7 12 3.7 12 3.7s-4.4 0-7.8.3c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.7 9.1.7 11v1.8c0 1.9.3 3.7.3 3.7s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .2 8 .2s4.4 0 7.8-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.8.3-3.6V11c-.1-1.9-.4-3.7-.4-3.7zM9.7 14.6V8.2l5.7 3.2-5.7 3.2z" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-deep text-white">
      <div className="container-x py-14 md:py-16">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/logo-full.png"
            alt="Nexus Realty Marketing"
            width={220}
            height={220}
            className="h-32 w-auto md:h-40"
          />

          <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
            Built to Last. Guaranteed to Deliver.
          </p>

          <a
            href="tel:+923314446666"
            className="mt-6 font-heading text-2xl font-bold tracking-wide text-white hover:text-accent md:text-3xl"
          >
            0331 444 6666
          </a>

          <ul className="mt-6 flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded bg-white/10 text-white transition-colors hover:bg-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://maps.app.goo.gl/Wvhx9njshHMwXRZx9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-accent hover:text-white"
            aria-label="Open address in Google Maps"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
          </a>

          <p className="mt-3 max-w-2xl text-sm text-accent">
            <span className="font-semibold text-white">Address:</span> Plaza 36, 1st Floor, Office 103, Lakeview Avenue I,
            Central Business District North Phase 8, Bahria Town, Rawalpindi.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-accent md:flex-row">
          <p>© {new Date().getFullYear()} Nexus Realty Marketing Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/properties" className="hover:text-white">Properties</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
