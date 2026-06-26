import { getSupabase } from "./supabase";
import type { Property } from "./types";

export interface PropertyQuery {
  type?: string;
  beds?: number;
  max?: number;
  purpose?: "sale" | "rent";
  limit?: number;
}

/** Listings added locally — always visible alongside any Supabase data. */
const localListings: Property[] = [
  {
    id: "local-dha-ph2-home-1",
    slug: "dha-phase-2-1-kanal-corner-designer-house",
    title: "Modern Model House — DHA Phase 2, Islamabad",
    description:
      "Step into elegance with this stunning 1 Kanal Designer House, perfectly located in DHA Phase 2 Islamabad. Crafted with exceptional attention to detail, this home blends luxury, comfort, and timeless architecture—ideal for families seeking an elite lifestyle in one of Islamabad's most prestigious communities.",
    location: "DHA Phase 2, Islamabad",
    city: "Islamabad",
    type: "house",
    purpose: "sale",
    status: "available",
    price: 135_300_000,
    bedrooms: 5,
    bathrooms: null,
    area_sqft: 4500,
    features: [
      "5 Spacious Bedrooms",
      "Grand Double-Height Entrance Lobby",
      "Elegant Drawing Room & Dedicated Dining Area",
      "Modern Open Kitchen + Dirty Kitchen",
      "Beautiful Terrace Space",
      "Striking Front Elevation",
      "Breathtaking Night Views",
      "Solid Pine Wood Doors Throughout",
    ],
    images: [
      "/assets/properties/home-1/main.jpeg",
      "/assets/properties/home-1/gallery-1.jpeg",
      "/assets/properties/home-1/gallery-2.jpeg",
      "/assets/properties/home-1/gallery-3.jpeg",
      "/assets/properties/home-1/gallery-4.jpeg",
    ],
    project: null,
    is_featured: true,
    created_at: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "local-dha-ph2-home-2",
    slug: "dha-phase-2-1-kanal-corner-designer-house-ii",
    title: "A Masterpiece of Luxury Living — DHA Phase 2, Islamabad",
    description:
      "Step into elegance with this stunning 1 Kanal Corner Designer House, perfectly located in the heart of DHA Phase 2. Crafted with exceptional attention to detail, this home blends luxury, comfort, and timeless architecture—ideal for families seeking an elite lifestyle in one of Islamabad's most prestigious communities.",
    location: "DHA Phase 2, Islamabad",
    city: "Islamabad",
    type: "house",
    purpose: "sale",
    status: "available",
    price: 138_000_000,
    bedrooms: 5,
    bathrooms: null,
    area_sqft: 4500,
    features: [
      "5 Spacious Bedrooms",
      "Grand Double-Height Entrance Lobby",
      "Elegant Drawing Room & Dedicated Dining Area",
      "Open Lounge Concept",
      "Modern Open Kitchen + Dirty Kitchen",
      "Beautiful Terrace Space",
      "Striking Front Elevation",
      "Breathtaking Night Views",
      "Premium Pakistan Cables Wiring",
      "Solid Pine Wood Doors Throughout",
    ],
    images: [
      "/assets/properties/home-2/main.jpeg",
      "/assets/properties/home-2/gallery-1.jpeg",
      "/assets/properties/home-2/gallery-2.jpeg",
      "/assets/properties/home-2/gallery-3.jpeg",
      "/assets/properties/home-2/gallery-4.jpeg",
    ],
    project: null,
    is_featured: true,
    created_at: "2026-06-15T00:01:00.000Z",
  },
  {
    id: "local-bt-ph8-overseas6-home-3",
    slug: "bahria-town-phase-8-overseas-6-10-marla-ultra-modern-house",
    title: "10 Marla Ultra-Modern House — Overseas 6, Bahria Town Phase 8",
    description:
      "Experience luxury living in this stunning 10 Marla, 5-Bedroom Ultra-Modern House located in the prestigious Overseas 6, Bahria Town Phase 8, Rawalpindi. Modern architecture, premium finishes, and an ideal location for families seeking comfort and luxury.",
    location: "Overseas 6, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "house",
    purpose: "sale",
    status: "available",
    price: 59_000_000,
    bedrooms: 5,
    bathrooms: null,
    area_sqft: 2250,
    features: [
      "10 Marla Plot",
      "Modern Architecture & Premium Finishes",
      "Luxury Kitchen with All Amenities",
      "Dirty Kitchen Attached",
      "Elegant Living Spaces",
      "Prime Location in Overseas 6",
    ],
    images: [
      "/assets/properties/home-3/main.jpeg",
      "/assets/properties/home-3/gallery-1.jpeg",
      "/assets/properties/home-3/gallery-2.jpeg",
      "/assets/properties/home-3/gallery-3.jpeg",
      "/assets/properties/home-3/gallery-4.jpeg",
    ],
    project: null,
    is_featured: true,
    created_at: "2026-06-15T00:02:00.000Z",
  },
  {
    id: "local-bt-ph7-park-facing-home-4",
    slug: "bahria-town-phase-7-54-marla-luxury-park-facing-residence",
    title: "Luxury Park-Facing Residence for Sale in Bahria Town Phase 7",
    description:
      "Presenting an exceptional 54 Marla Luxury Home located on Corniche Road, Intellectual Village, Spring North, Bahria Town Phase 7. This magnificent park-facing property offers an unmatched blend of elegance, space, and premium craftsmanship with imported fittings throughout.",
    location: "Corniche Road, Intellectual Village, Spring North, Bahria Town Phase 7, Rawalpindi",
    city: "Rawalpindi",
    type: "house",
    purpose: "sale",
    status: "available",
    price: 265_000_000,
    bedrooms: 6,
    bathrooms: null,
    area_sqft: 6075,
    features: [
      "54 Marla Plot (27 Marla Covered Area + 27 Marla Landscaped Lawn)",
      "6 Spacious Bedrooms",
      "2 TV Lounges",
      "2 Modern Kitchens",
      "Elegant Drawing Room",
      "Formal Dining Room",
      "2 Independent Terraces (One can be converted into a 7th Bedroom)",
      "Beautiful Park-Facing Location",
      "Solid Construction with Premium Finishes",
      "Imported Fittings Throughout",
      "Solid Ash Wood Doors",
      "Imported Turkish Kitchen & Wardrobe Cabinets",
      "Imported Floor & Bathroom Tiles",
    ],
    images: [
      "/assets/properties/home-4/main.jpeg",
      "/assets/properties/home-4/gallery-1.jpeg",
      "/assets/properties/home-4/gallery-2.jpeg",
      "/assets/properties/home-4/gallery-3.jpeg",
      "/assets/properties/home-4/gallery-4.jpeg",
    ],
    project: null,
    is_featured: true,
    created_at: "2026-06-15T00:03:00.000Z",
  },
];

const fallback: Property[] = [
  {
    id: "demo-1",
    slug: "tower-36-corporate-suite",
    title: "Tower 36 — Corporate Suite",
    description:
      "Premium corporate office on a high floor in Tower 36, Bahria Town's CBD. Floor-to-ceiling glazing and serviced lobby.",
    location: "Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "office",
    purpose: "sale",
    status: "available",
    price: 32_500_000,
    bedrooms: null,
    bathrooms: 2,
    area_sqft: 1450,
    features: ["Backup Power", "Central A/C", "Reserved Parking", "Concierge"],
    images: ["/assets/graphics/corporate-suite.webp"],
    project: "Tower 36",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    slug: "tower-36-2bed-apartment",
    title: "Tower 36 — 2-Bed Sky Apartment",
    description:
      "A bright two-bedroom residence in Tower 36 with skyline views over Bahria Town's central business district.",
    location: "Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "apartment",
    purpose: "sale",
    status: "available",
    price: 24_900_000,
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1180,
    features: ["Balcony", "Modular Kitchen", "Gym Access", "24/7 Security"],
    images: ["/assets/graphics/lounge-cam-1.webp"],
    project: "Tower 36",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    slug: "tower-36-retail-unit",
    title: "Tower 36 — Ground Floor Retail",
    description:
      "Prime ground-floor retail with high pedestrian footfall on Lakeview Avenue I.",
    location: "Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "retail",
    purpose: "sale",
    status: "available",
    price: 48_000_000,
    bedrooms: null,
    bathrooms: 1,
    area_sqft: 920,
    features: ["Glass Frontage", "Mezzanine", "Roller Shutter"],
    images: ["/assets/graphics/retail-bed-cam.webp"],
    project: "Tower 36",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    slug: "phase-8-villa",
    title: "10 Marla Designer Villa",
    description: "Modern villa with double-height living and private terrace in Bahria Town Phase 8.",
    location: "Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    type: "house",
    purpose: "sale",
    status: "available",
    price: 68_500_000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqft: 4500,
    features: ["Garden", "Servant Quarters", "Smart Home", "Solar"],
    images: ["/assets/graphics/graphic-1.jpg"],
    project: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-5",
    slug: "phase-7-apartment-rent",
    title: "1-Bed Furnished Apartment",
    description: "Fully furnished apartment ready for occupancy.",
    location: "Bahria Town Phase 7, Rawalpindi",
    city: "Rawalpindi",
    type: "apartment",
    purpose: "rent",
    status: "available",
    price: 95_000,
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 720,
    features: ["Furnished", "Lift", "Backup Power"],
    images: ["/assets/graphics/graphic-2.jpg"],
    project: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-6",
    slug: "cbd-commercial-plot",
    title: "5 Marla Commercial Plot",
    description: "Corner commercial plot with two open sides in CBD North.",
    location: "CBD North Phase 8, Bahria Town, Rawalpindi",
    city: "Rawalpindi",
    type: "plot",
    purpose: "sale",
    status: "available",
    price: 95_000_000,
    bedrooms: null,
    bathrooms: null,
    area_sqft: 1361,
    features: ["Corner", "Two-Side Open", "Possession Ready"],
    images: ["/assets/graphics/graphic-3.jpg"],
    project: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

function applyFilters(items: Property[], q: PropertyQuery): Property[] {
  return items.filter((p) => {
    if (q.type && p.type !== q.type) return false;
    if (q.purpose && p.purpose !== q.purpose) return false;
    if (q.beds && (p.bedrooms ?? 0) < q.beds) return false;
    if (q.max && p.price > q.max) return false;
    return true;
  });
}

export async function listProperties(q: PropertyQuery = {}): Promise<Property[]> {
  const sb = getSupabase();

  let dbResults: Property[] = [];
  if (sb) {
    let query = sb.from("properties").select("*").order("created_at", { ascending: false });
    if (q.type) query = query.eq("type", q.type);
    if (q.purpose) query = query.eq("purpose", q.purpose);
    if (q.beds) query = query.gte("bedrooms", q.beds);
    if (q.max) query = query.lte("price", q.max);
    if (q.limit) query = query.limit(q.limit);
    const { data, error } = await query;
    if (!error && data) dbResults = data as Property[];
  } else {
    dbResults = applyFilters(fallback, q);
  }

  const filtered = applyFilters(localListings, q);
  const combined = [...filtered, ...dbResults];
  return q.limit ? combined.slice(0, q.limit) : combined;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  // Always check local listings first
  const local = localListings.find((p) => p.id === id || p.slug === id);
  if (local) return local;

  const sb = getSupabase();
  if (!sb) return fallback.find((p) => p.id === id || p.slug === id) ?? null;

  // Try by id first, then by slug
  const { data: byId } = await sb.from("properties").select("*").eq("id", id).maybeSingle();
  if (byId) return byId as Property;
  const { data: bySlug } = await sb.from("properties").select("*").eq("slug", id).maybeSingle();
  return (bySlug as Property | null) ?? null;
}

export async function listFeaturedProperties(limit = 3): Promise<Property[]> {
  const sb = getSupabase();

  let dbFeatured: Property[] = [];
  if (sb) {
    const { data, error } = await sb
      .from("properties")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (!error && data) dbFeatured = data as Property[];
  } else {
    dbFeatured = fallback.filter((p) => p.is_featured);
  }

  const localFeatured = localListings.filter((p) => p.is_featured);
  return [...localFeatured, ...dbFeatured].slice(0, limit);
}
