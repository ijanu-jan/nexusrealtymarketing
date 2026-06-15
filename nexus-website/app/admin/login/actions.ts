"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerStrict } from "@/lib/supabase-server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/properties");

  if (!email || !password) {
    return redirect(`/admin/login?error=missing&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseServerStrict();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect(
      `/admin/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`
    );
  }

  redirect(next.startsWith("/admin") ? next : "/admin/properties");
}

export async function signOut() {
  const supabase = await createSupabaseServerStrict();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
