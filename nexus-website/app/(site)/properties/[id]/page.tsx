import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { getPropertyById } from "@/lib/properties";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

const fmtPKR = (n: number) =>
  n >= 10_000_000
    ? `PKR ${(n / 10_000_000).toFixed(2)} Crore`
    : n >= 100_000
      ? `PKR ${(n / 100_000).toFixed(1)} Lac`
      : `PKR ${n.toLocaleString()}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await getPropertyById(id);
  if (!p) return { title: "Property not found" };
  return {
    title: p.title,
    description: p.description ?? `${p.title} in ${p.location}.`,
  };
}

export default async function PropertyDetail({ params }: Props) {
  const { id } = await params;
  const p = await getPropertyById(id);
  if (!p) notFound();

  const cover = p.images?.[0] ?? "/assets/graphics/graphic-2.jpg";
  const gallery = (p.images ?? []).slice(1);

  return (
    <article className="bg-white">
      <div className="container-x pt-8 text-sm text-muted">
        <Link href="/properties" className="hover:text-primary-deep">← Back to properties</Link>
      </div>

      <header className="container-x mt-4 grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
        <div>
          <span className="eyebrow">{p.project ?? "Listing"}</span>
          <h1 className="mt-2 font-heading text-h1">{p.title}</h1>
          <p className="mt-2 text-sm text-muted">{p.location}</p>
        </div>
        <div className="rounded bg-primary p-5 text-white md:text-right">
          <p className="text-xs uppercase tracking-wider text-accent">
            {p.purpose === "rent" ? "Monthly Rent" : "Asking Price"}
          </p>
          <p className="mt-1 font-heading text-3xl font-bold text-accent">{fmtPKR(p.price)}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-accent">
            Status: <span className="text-white">{p.status}</span>
          </p>
        </div>
      </header>

      <div className="container-x mt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-surface">
          <Image
            src={cover}
            alt={p.title}
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {gallery.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded">
                <Image src={src} alt={`${p.title} photo ${i + 2}`} fill sizes="25vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container-x mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="font-heading text-h2">Overview</h2>
          <div className="mt-4 h-1 w-12 rounded bg-primary-deep" />
          <p className="mt-6 leading-relaxed text-primary">{p.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Type" value={cap(p.type)} />
            <Stat label="Bedrooms" value={p.bedrooms ?? "—"} />
            <Stat label="Bathrooms" value={p.bathrooms ?? "—"} />
            <Stat label="Area" value={p.area_sqft ? `${p.area_sqft.toLocaleString()} sq ft` : "—"} />
          </dl>

          {p.features && p.features.length > 0 && (
            <>
              <h3 className="mt-12 font-heading text-h3">Features</h3>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-deep" /> {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="self-start lg:sticky lg:top-24">
          <h3 className="mb-4 font-heading text-h3">Enquire about this property</h3>
          <ContactForm />
        </aside>
      </div>

      <div className="h-16" />
    </article>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded bg-surface p-4">
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 font-heading text-base font-semibold text-primary">{value}</dd>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
