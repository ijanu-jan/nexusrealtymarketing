"use client";

import Image from "next/image";
import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

interface Props {
  initial?: string[];
  /** folder inside the bucket — usually the property slug */
  folder: string;
  /** name of the hidden input the form submits */
  name?: string;
  bucket?: string;
}

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB per file

export default function ImageUploader({
  initial = [],
  folder,
  name = "images",
  bucket = "property-images",
}: Props) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = (() => {
    try {
      return getSupabaseBrowser();
    } catch {
      return null;
    }
  })();

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!supabase) {
      setError("Supabase isn't configured. Add env vars to upload images.");
      return;
    }
    setError(null);
    setBusy(true);
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        if (!ALLOWED.includes(file.type)) {
          throw new Error(`Unsupported file type: ${file.name} (${file.type || "unknown"})`);
        }
        if (file.size > MAX_BYTES) {
          throw new Error(`${file.name} is larger than 8 MB.`);
        }
        const safe = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
        const path = `${folder || "misc"}/${Date.now()}-${safe}`;
        const { error: upErr } = await supabase.storage
          .from(bucket)
          .upload(path, file, {
            cacheControl: "31536000",
            upsert: false,
            contentType: file.type,
          });
        if (upErr) throw new Error(upErr.message);
        const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
        uploaded.push(pub.publicUrl);
      }
      setUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const removeAt = (i: number) => {
    setUrls((prev) => prev.filter((_, idx) => idx !== i));
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    setUrls((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  };

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      <div className="rounded border border-dashed border-line bg-white p-5">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded bg-surface p-6 text-center transition-colors hover:bg-line/40">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-muted">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-3 text-sm text-primary">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-xs text-muted">JPG, PNG, WebP or AVIF · up to 8 MB each</p>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="hidden"
            disabled={busy}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {busy && <p className="mt-3 text-sm text-primary">Uploading…</p>}
        {error && <p className="mt-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </div>

      {urls.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {urls.map((u, i) => (
            <li key={u + i} className="group relative overflow-hidden rounded border border-line bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={u} alt={`Image ${i + 1}`} fill sizes="200px" className="object-cover" />
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Cover
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-1 border-t border-line bg-white px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="rounded px-2 py-1 text-xs text-primary hover:bg-surface disabled:opacity-30"
                  title="Move up (set as cover)"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
