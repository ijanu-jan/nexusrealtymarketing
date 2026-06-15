-- Nexus Realty Marketing — Supabase schema (database + storage + auth policies)
-- Run inside the Supabase SQL editor on a fresh project, in this order.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────
-- 1. properties table
-- ─────────────────────────────────────────────────────────────────────
create table if not exists public.properties (
    id           uuid primary key default gen_random_uuid(),
    slug         text unique not null,
    title        text not null,
    description  text,
    location     text not null,
    city         text,
    type         text not null check (type in ('apartment','office','retail','house','plot','commercial')),
    purpose      text not null check (purpose in ('sale','rent')) default 'sale',
    status       text not null check (status in ('available','sold','reserved')) default 'available',
    price        bigint not null,
    bedrooms     integer,
    bathrooms    integer,
    area_sqft    integer,
    features     text[] default '{}',
    images       text[] default '{}',
    project      text,
    is_featured  boolean default false,
    created_at   timestamptz default now(),
    updated_at   timestamptz default now()
);

create index if not exists properties_type_idx     on public.properties(type);
create index if not exists properties_purpose_idx  on public.properties(purpose);
create index if not exists properties_price_idx    on public.properties(price);
create index if not exists properties_featured_idx on public.properties(is_featured) where is_featured = true;

alter table public.properties enable row level security;

-- Public can read everything.
drop policy if exists "Public can read properties" on public.properties;
create policy "Public can read properties"
    on public.properties for select
    using (true);

-- Any authenticated Supabase user can write. (Single-tenant admin model.)
drop policy if exists "Authenticated users can insert properties" on public.properties;
create policy "Authenticated users can insert properties"
    on public.properties for insert
    to authenticated
    with check (true);

drop policy if exists "Authenticated users can update properties" on public.properties;
create policy "Authenticated users can update properties"
    on public.properties for update
    to authenticated
    using (true)
    with check (true);

drop policy if exists "Authenticated users can delete properties" on public.properties;
create policy "Authenticated users can delete properties"
    on public.properties for delete
    to authenticated
    using (true);

-- updated_at auto-bump
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end $$;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
    before update on public.properties
    for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────
-- 2. contact_submissions table
-- ─────────────────────────────────────────────────────────────────────
create table if not exists public.contact_submissions (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text not null,
    phone       text not null,
    interest    text,
    message     text not null,
    source      text default 'website',
    user_agent  text,
    ip          text,
    created_at  timestamptz default now()
);

alter table public.contact_submissions enable row level security;

-- Public/anon: no read, no write. Only the service role (used by /api/contact) inserts.
drop policy if exists "Service role only" on public.contact_submissions;
create policy "Service role only"
    on public.contact_submissions for all
    using (false)
    with check (false);

-- Authenticated admins can READ submissions in the dashboard.
drop policy if exists "Authenticated users can read submissions" on public.contact_submissions;
create policy "Authenticated users can read submissions"
    on public.contact_submissions for select
    to authenticated
    using (true);

-- ─────────────────────────────────────────────────────────────────────
-- 3. Storage bucket for property images
-- ─────────────────────────────────────────────────────────────────────
-- Bucket: property-images (public read so URLs work in <img> tags).
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do update set public = true;

-- Public can read uploaded images
drop policy if exists "Public can read property images" on storage.objects;
create policy "Public can read property images"
    on storage.objects for select
    using (bucket_id = 'property-images');

-- Authenticated users can upload, update and delete property images
drop policy if exists "Authenticated can upload property images" on storage.objects;
create policy "Authenticated can upload property images"
    on storage.objects for insert
    to authenticated
    with check (bucket_id = 'property-images');

drop policy if exists "Authenticated can update property images" on storage.objects;
create policy "Authenticated can update property images"
    on storage.objects for update
    to authenticated
    using (bucket_id = 'property-images')
    with check (bucket_id = 'property-images');

drop policy if exists "Authenticated can delete property images" on storage.objects;
create policy "Authenticated can delete property images"
    on storage.objects for delete
    to authenticated
    using (bucket_id = 'property-images');

-- ─────────────────────────────────────────────────────────────────────
-- 4. Seed: Tower 36 sample listings
-- ─────────────────────────────────────────────────────────────────────
insert into public.properties
    (slug, title, description, location, city, type, purpose, price, bedrooms, bathrooms, area_sqft, features, images, project, is_featured)
values
('tower-36-corporate-suite',
 'Tower 36 — Corporate Suite',
 'Premium corporate office on a high floor in Tower 36. Floor-to-ceiling glazing, serviced lobby and reserved parking.',
 'Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi',
 'Rawalpindi',
 'office', 'sale', 32500000, null, 2, 1450,
 array['Backup Power','Central A/C','Reserved Parking','Concierge'],
 array['/assets/graphics/graphic-2.jpg'],
 'Tower 36', true),

('tower-36-2bed-apartment',
 'Tower 36 — 2-Bed Sky Apartment',
 'A bright two-bedroom residence in Tower 36 with skyline views over Bahria Town''s central business district.',
 'Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi',
 'Rawalpindi',
 'apartment', 'sale', 24900000, 2, 2, 1180,
 array['Balcony','Modular Kitchen','Gym Access','24/7 Security'],
 array['/assets/graphics/graphic-3.jpg'],
 'Tower 36', true),

('tower-36-retail-unit',
 'Tower 36 — Ground Floor Retail',
 'Prime ground-floor retail with high pedestrian footfall on Lakeview Avenue I.',
 'Tower 36, Lakeview Avenue I, Bahria Town Phase 8, Rawalpindi',
 'Rawalpindi',
 'retail', 'sale', 48000000, null, 1, 920,
 array['Glass Frontage','Mezzanine','Roller Shutter'],
 array['/assets/graphics/graphic-4.jpg'],
 'Tower 36', true)
on conflict (slug) do nothing;
