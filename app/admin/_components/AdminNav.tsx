"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../login/actions";

const links = [
  { href: "/admin/properties", label: "Properties" },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/admin/properties" className="flex items-center gap-3">
          <Image
            src="/assets/logo-mark.png"
            alt="Nexus Realty Marketing"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
          <span className="font-heading text-sm font-light text-primary">
            Admin <span className="text-muted">·</span> Nexus Realty Marketing
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-gold" : "text-primary hover:text-gold"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted sm:block">{email}</span>
          <Link
            href="/"
            target="_blank"
            className="hidden text-xs font-medium text-primary hover:text-gold sm:block"
          >
            View site ↗
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded border border-line bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
