"use client";

import Link from "next/link";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import type { Property } from "@/lib/types";

interface Props {
  initial?: Partial<Property>;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string } | void>;
  submitLabel: string;
}

const TYPES = ["apartment", "office", "retail", "house", "plot", "commercial"] as const;
const PURPOSES = ["sale", "rent"] as const;
const STATUSES = ["available", "sold", "reserved"] as const;

export default function PropertyForm({ initial = {}, action, submitLabel }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(initial.slug ?? "");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await action(new FormData(e.currentTarget));
      if (result && !result.ok) {
        setError(result.error ?? "Failed to save.");
      }
    } catch (err) {
      // Server actions throw NEXT_REDIRECT after a successful redirect — that's expected.
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) throw err;
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSubmitting(false);
    }
  };

  const folder = slug || initial.slug || "drafts";

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      {/* Basic info */}
      <Section title="Basic Info">
        <Row>
          <Field name="title" label="Title" required defaultValue={initial.title ?? ""} placeholder="Tower 36 — 2 Bed Sky Apartment" />
          <Field
            name="slug"
            label="URL Slug"
            defaultValue={initial.slug ?? ""}
            placeholder="auto-generated from title"
            help="Used in /properties/<slug>. Leave blank to auto-generate."
            onChange={(e) => setSlug(e.target.value)}
          />
        </Row>
        <Textarea
          name="description"
          label="Description"
          defaultValue={initial.description ?? ""}
          rows={5}
          placeholder="A bright two-bedroom residence with skyline views…"
        />
      </Section>

      {/* Location */}
      <Section title="Location">
        <Row>
          <Field
            name="location"
            label="Full Address"
            required
            defaultValue={initial.location ?? ""}
            placeholder="Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi"
          />
          <Field name="city" label="City" defaultValue={initial.city ?? ""} placeholder="Rawalpindi" />
        </Row>
        <Field name="project" label="Project" defaultValue={initial.project ?? ""} placeholder="Tower 36 (leave empty for standalone listing)" />
      </Section>

      {/* Classification */}
      <Section title="Classification">
        <Row>
          <Select name="type" label="Type" required defaultValue={initial.type ?? "apartment"} options={TYPES} />
          <Select name="purpose" label="Purpose" required defaultValue={initial.purpose ?? "sale"} options={PURPOSES} />
          <Select name="status" label="Status" required defaultValue={initial.status ?? "available"} options={STATUSES} />
        </Row>
      </Section>

      {/* Pricing & specs */}
      <Section title="Pricing &amp; Specs">
        <Row>
          <Field
            name="price"
            label="Price (PKR)"
            type="number"
            required
            defaultValue={initial.price?.toString() ?? ""}
            placeholder="24900000"
            help="Total amount for sale, or monthly amount for rent."
          />
          <Field
            name="area_sqft"
            label="Area (sq ft)"
            type="number"
            defaultValue={initial.area_sqft?.toString() ?? ""}
            placeholder="1180"
          />
        </Row>
        <Row>
          <Field
            name="bedrooms"
            label="Bedrooms"
            type="number"
            defaultValue={initial.bedrooms?.toString() ?? ""}
            placeholder="2"
          />
          <Field
            name="bathrooms"
            label="Bathrooms"
            type="number"
            defaultValue={initial.bathrooms?.toString() ?? ""}
            placeholder="2"
          />
        </Row>
      </Section>

      {/* Features */}
      <Section title="Features">
        <Textarea
          name="features"
          label="Features (one per line)"
          defaultValue={(initial.features ?? []).join("\n")}
          rows={5}
          placeholder={"Backup Power\nCentral A/C\nReserved Parking"}
        />
      </Section>

      {/* Images */}
      <Section title="Images" help="The first image is used as the cover everywhere on the site.">
        <ImageUploader initial={initial.images ?? []} folder={folder} />
      </Section>

      {/* Flags */}
      <Section title="Visibility">
        <label className="flex items-start gap-3 rounded border border-line bg-white p-4 text-sm text-primary">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={initial.is_featured ?? false}
            className="mt-0.5 h-4 w-4 accent-gold"
          />
          <span>
            <span className="font-medium">Featured listing</span>
            <span className="block text-xs text-muted">Show this property in the "Featured Listings" row on the home page.</span>
          </span>
        </label>
      </Section>

      {error && (
        <p className="rounded bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-col items-center justify-end gap-3 border-t border-line pt-6 sm:flex-row">
        <Link href="/admin/properties" className="text-sm text-muted hover:text-primary">
          Cancel
        </Link>
        <button type="submit" disabled={submitting} className="btn-primary !py-3 disabled:opacity-60">
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

/* ─── Small primitives ─────────────────────────────────────────────── */

function Section({ title, help, children }: { title: string; help?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-md border border-line bg-white p-5 md:p-6">
      <legend className="px-2 font-heading text-sm font-medium uppercase tracking-wider text-muted">
        {title}
      </legend>
      {help && <p className="mb-4 text-xs text-muted">{help}</p>}
      <div className="grid gap-4">{children}</div>
    </fieldset>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">{children}</div>;
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  help?: string;
}

function Field({ label, help, name, ...rest }: FieldProps) {
  return (
    <label className="text-sm">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
      <input
        name={name}
        {...rest}
        className="mt-1 block w-full rounded border border-line bg-white px-3 py-2.5 text-sm text-primary outline-none transition-colors focus:border-gold"
      />
      {help && <span className="mt-1 block text-xs text-muted">{help}</span>}
    </label>
  );
}

function Textarea({
  name,
  label,
  ...rest
}: { name: string; label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="text-sm">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
      <textarea
        name={name}
        {...rest}
        className="mt-1 block w-full rounded border border-line bg-white px-3 py-2.5 text-sm text-primary outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 block w-full rounded border border-line bg-white px-3 py-2.5 text-sm capitalize text-primary outline-none transition-colors focus:border-gold"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
