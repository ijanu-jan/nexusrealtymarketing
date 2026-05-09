import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";

const fmtPKR = (n: number) =>
  n >= 10_000_000
    ? `PKR ${(n / 10_000_000).toFixed(2)} Cr`
    : n >= 100_000
      ? `PKR ${(n / 100_000).toFixed(1)} Lac`
      : `PKR ${n.toLocaleString()}`;

export default function PropertyCard({ p }: { p: Property }) {
  const cover = p.images?.[0] ?? "/assets/graphics/graphic-2.jpg";
  return (
    <Link
      href={`/properties/${p.id}`}
      className="group block overflow-hidden rounded-md bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-cardHover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={cover}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
          {p.purpose === "rent" ? "For Rent" : "For Sale"}
        </span>
        <span className="absolute right-3 top-3 rounded bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm">
          {fmtPKR(p.price)}
          {p.purpose === "rent" ? "/mo" : ""}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-light text-primary transition-colors duration-300 group-hover:text-gold">
          {p.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-muted">{p.location}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-primary">
          {p.bedrooms != null && (
            <span className="inline-flex items-center gap-1">
              <Bed /> {p.bedrooms} Bd
            </span>
          )}
          {p.bathrooms != null && (
            <span className="inline-flex items-center gap-1">
              <Bath /> {p.bathrooms} Ba
            </span>
          )}
          {p.area_sqft != null && (
            <span className="inline-flex items-center gap-1">
              <Area /> {p.area_sqft.toLocaleString()} sq ft
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function Bed() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 18v-3a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v3M2 18h20M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg>; }
function Bath() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3zM6 12V6a2 2 0 0 1 2-2h2"/></svg>; }
function Area() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l16 16"/></svg>; }
