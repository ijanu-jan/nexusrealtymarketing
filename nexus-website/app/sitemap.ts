import type { MetadataRoute } from "next";
import { listProperties } from "@/lib/properties";

const base = "https://nexusrealtymarketing.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await listProperties();
  const propertyEntries: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${base}/properties/${p.slug ?? p.id}`,
    lastModified: p.created_at,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects/tower-36`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/properties`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
    ...propertyEntries,
  ];
}
