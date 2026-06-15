import { getCurrentUser } from "@/lib/supabase-server";
import AdminNav from "./_components/AdminNav";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // Middleware already bounces unauthenticated requests to /admin/login.
  // If we get here without a user, we're on the login page — render it bare.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-surface">
      <AdminNav email={user.email ?? ""} />
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">{children}</div>
    </div>
  );
}
