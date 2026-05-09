export type PropertyPurpose = "sale" | "rent";
export type PropertyType =
  | "apartment"
  | "office"
  | "retail"
  | "house"
  | "plot"
  | "commercial";
export type PropertyStatus = "available" | "sold" | "reserved";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location: string;
  city: string | null;
  type: PropertyType;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  features: string[] | null;
  images: string[] | null;
  project: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  created_at?: string;
}
