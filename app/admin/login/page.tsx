import Image from "next/image";
import { signIn } from "./actions";

export const metadata = { title: "Admin Sign In" };

const errorMessages: Record<string, string> = {
  missing: "Please enter both email and password.",
  "supabase-missing": "Supabase isn't configured yet. Add the env vars and restart.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp.error
    ? errorMessages[sp.error] ?? decodeURIComponent(sp.error)
    : null;
  const next = sp.next ?? "/admin/properties";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/logo-mark.png"
            alt="Nexus Realty Marketing"
            width={64}
            height={64}
            className="h-14 w-auto"
            priority
          />
          <h1 className="mt-5 font-heading text-2xl font-extralight text-primary">
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-muted">
            Manage Nexus Realty Marketing property listings.
          </p>
        </div>

        <form action={signIn} className="mt-8 grid gap-4">
          <input type="hidden" name="next" value={next} />

          <label className="text-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              className="mt-1 block w-full rounded border border-line bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-gold"
            />
          </label>

          <label className="text-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded border border-line bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-gold"
            />
          </label>

          {error && (
            <p className="rounded bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <button type="submit" className="btn-primary mt-2 w-full !py-3">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Trouble signing in? Contact the site administrator.
        </p>
      </div>
    </div>
  );
}
