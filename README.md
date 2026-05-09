# Nexus Realty Marketing — Website + Admin

Production website for **Nexus Realty Marketing Pvt. Ltd.** with a full admin panel for managing property listings.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS + Supabase + Nodemailer**, deployed on **Vercel**.

---

## What it includes

- Public marketing site (Home, Properties, Tower 36, About, Contact)
- Property listings backed by Supabase, with filters
- Contact form → saves to Supabase **and** emails the team via SMTP
- Admin panel at `/admin` — sign in, create / edit / delete listings, drag-drop image upload to Supabase Storage
- Auth via Supabase, sessions cookied by Next 16's `proxy.ts`
- ISR — saves in admin auto-revalidate the relevant public pages

---

## Local development

```bash
npm install
cp .env.local.example .env.local      # fill in Supabase + SMTP values
npm run dev                            # → http://localhost:3000
```

Without env vars the public site still renders with demo property data, but admin login and contact-form email won't work.

---

## Environment variables

All env vars live in **Vercel → Project → Settings → Environment Variables** in production. Locally, put them in `.env.local` (gitignored).

### Required — Supabase

| Variable | Where to find it | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | Use the bare project URL (e.g. `https://xxx.supabase.co`). **Do not** include `/rest/v1/`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → `anon` key | Safe to expose to the browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` key | **Server-only.** Mark as **Sensitive** in Vercel. |

### Optional — SMTP (contact form email notifications)

If you set these, every public contact-form submission emails `CONTACT_TO_EMAIL` in addition to being saved in Supabase. If you skip them, the form still works — submissions just stay in the `contact_submissions` table.

| Variable | Example | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `smtp.zoho.com`, `smtp.gmail.com`, `smtp.sendgrid.net` | Provider-specific |
| `SMTP_PORT` | `465` (SSL) or `587` (STARTTLS) | |
| `SMTP_USER` | `noreply@nexusrealtymarketing.pk` | Usually the full email |
| `SMTP_PASSWORD` | App password / API key | Mark **Sensitive** in Vercel. Gmail / Outlook need an *app password*, not the account password. |
| `SMTP_FROM` | `Nexus Realty <noreply@nexusrealtymarketing.pk>` | Display name + address |
| `CONTACT_TO_EMAIL` | `info@nexusrealtymarketing.pk` | Inbox that receives the notification |
| `SMTP_SECURE` | `true` / `false` | Optional. Defaults to `true` when port is `465`. |

---

## Supabase setup (one-time)

1. **Create a project** at https://supabase.com
2. **Run the schema** — Supabase dashboard → SQL Editor → paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) → Run. This creates the tables, RLS policies, the `property-images` Storage bucket, and 3 demo Tower 36 listings.
3. **Create your admin user** — Supabase dashboard → Authentication → Users → Add user. Tick *Auto Confirm User*. Use this email/password to sign in at `/admin/login`.
4. **Copy the API keys** from Settings → API into your env vars (locally `.env.local`, in production Vercel).

---

## Deploy to Vercel

1. Push to GitHub: https://github.com/ijanu-jan/nexusrealtymarketing
2. https://vercel.com/new → import the repo
3. Framework: **Next.js** (auto-detected)
4. Add all env vars from the tables above (Settings → Environment Variables) — make sure to add them for **Production** *and* **Preview** if you want previews to work
5. Deploy. Subsequent pushes to `main` auto-deploy.

---

## Admin panel — using it

Sign in at `/admin/login`, then:

| URL | What it does |
| --- | --- |
| `/admin/properties` | All listings, with View / Edit / Delete |
| `/admin/properties/new` | Create a new listing |
| `/admin/properties/<id>/edit` | Edit existing |

**Creating a listing** — fill in title, address, type, purpose, status, price (required). Optional: description, beds/baths, area, features (one per line), project, images.

**Images** drag & drop into the uploader → uploads directly to Supabase Storage → public URLs saved on the row. The first image is the cover everywhere on the site. Use ↑ on each thumbnail to reorder.

**Featured toggle** controls whether the listing appears in the home-page "Featured Listings" row.

Saves immediately revalidate the relevant public pages (`/`, `/properties`, the detail page, `/projects/tower-36`).

---

## Project structure

```
app/
  (site)/                       Public site — has Navbar + Footer
    layout.tsx
    page.tsx                    Home
    about/, contact/, properties/, projects/
  admin/                        Admin panel — protected by proxy.ts
    layout.tsx                  AdminNav + sign-out
    login/                      Sign in + signIn/signOut server actions
    properties/                 List + new + [id]/edit
    _components/                AdminNav, PropertyForm, ImageUploader, DeleteButton
    _lib/actions.ts             createProperty / updateProperty / deleteProperty
  api/contact/route.ts          Public contact form → Supabase + SMTP

components/                     Public components
lib/
  supabase.ts                   Public read + admin (service-role) clients
  supabase-server.ts            Cookie-based server client (auth)
  supabase-browser.ts           Browser client (image uploader)
  email.ts                      Nodemailer transport + sendContactNotification
  properties.ts                 Public query helpers + demo fallback
  types.ts
proxy.ts                        Auth proxy — protects /admin/*
supabase/schema.sql             Database + storage + RLS setup
public/assets/                  Logos, hero video, graphics
```

---

## Performance & security

- Server Components by default; only Navbar, Hero buttons, ContactForm, ImageUploader, PropertyForm and a few small islands are `"use client"`.
- `next/image` everywhere with AVIF/WebP. Supabase Storage URLs whitelisted in `next.config.ts`.
- Fonts via `next/font`: Plus Jakarta Sans + Poppins (200/300/400/500) + Lora.
- ISR: public listing pages revalidate every 60 s; admin saves trigger immediate `revalidatePath`.
- RLS on every table. Public can read `properties`; only authenticated users can write. `contact_submissions` writable only by the service-role key (server-only).
- Storage RLS: `property-images` is public-read, write restricted to authenticated users.
- Honeypot + email validation on the public contact form.
- Admin pages are `noindex/nofollow` and gated by `proxy.ts`.
- All secrets read from env vars — nothing hard-coded.

---

## Brand

- Tagline: **Built to Last. Guaranteed to Deliver.**
- Phone: **0331 444 6666** · Email: **info@nexusrealtymarketing.pk**
- Address: Plaza 36, 1st Floor, Office 103, Lakeview Avenue I, CBD North Phase 8, Bahria Town, Rawalpindi.
- Flagship project: **Tower 36**.
