import Link from "next/link";
import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase-server";
import { deletePropertyAction } from "../_lib/actions";
import DeleteButton from "../_components/DeleteButton";
import type { Property } from "@/lib/types";

export const dynamic = "force-dynamic";

const fmtPKR = (n: number) =>
  n >= 10_000_000
    ? `PKR ${(n / 10_000_000).toFixed(2)} Cr`
    : n >= 100_000
      ? `PKR ${(n / 100_000).toFixed(1)} Lac`
      : `PKR ${n.toLocaleString()}`;

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string; deleted?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createSupabaseServer();
  const { data, error } = supabase
    ? await supabase.from("properties").select("*").order("created_at", { ascending: false })
    : { data: [] as Property[], error: { message: "Supabase isn't configured." } as { message: string } };

  const properties = (data ?? []) as Property[];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-extralight text-primary">Properties</h1>
          <p className="mt-1 text-sm text-muted">
            {properties.length} listing{properties.length === 1 ? "" : "s"} in the database.
          </p>
        </div>
        <Link href="/admin/properties/new" className="btn-primary">
          + New Property
        </Link>
      </div>

      {(sp.created || sp.updated || sp.deleted) && (
        <p className="mt-4 rounded bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {sp.created && "Property created."}
          {sp.updated && "Property updated."}
          {sp.deleted && "Property deleted."}
        </p>
      )}

      {error && (
        <p className="mt-4 rounded bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load: {error.message}
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Listing</th>
              <th className="hidden px-4 py-3 md:table-cell">Type</th>
              <th className="hidden px-4 py-3 md:table-cell">Price</th>
              <th className="hidden px-4 py-3 md:table-cell">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {properties.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted">
                  No properties yet. Click "+ New Property" to create one.
                </td>
              </tr>
            )}
            {properties.map((p) => (
              <tr key={p.id} className="hover:bg-surface/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.images?.[0] ? (
                      <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded bg-surface">
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-16 flex-shrink-0 rounded bg-surface" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-primary">{p.title}</p>
                      <p className="truncate text-xs text-muted">{p.location}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 capitalize text-primary md:table-cell">{p.type}</td>
                <td className="hidden px-4 py-3 text-primary md:table-cell">
                  {fmtPKR(p.price)}
                  {p.purpose === "rent" && <span className="text-muted">/mo</span>}
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/properties/${p.slug ?? p.id}`}
                      target="_blank"
                      className="rounded border border-line bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="rounded border border-line bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-gold hover:text-gold"
                    >
                      Edit
                    </Link>
                    <form action={deletePropertyAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <DeleteButton title={p.title} />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    available: "bg-emerald-50 text-emerald-700",
    sold: "bg-red-50 text-red-700",
    reserved: "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`inline-block rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${styles[status] ?? "bg-surface text-muted"}`}>
      {status}
    </span>
  );
}

