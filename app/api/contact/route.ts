import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silent success
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const ua = req.headers.get("user-agent") ?? null;

  // 1) Persist to Supabase (best-effort — we still try to email even if this fails)
  let persisted = false;
  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("contact_submissions").insert({
      name, email, phone, interest, message,
      source: "website", ip, user_agent: ua,
    });
    if (error) {
      console.error("[contact] Supabase insert failed:", error);
    } else {
      persisted = true;
    }
  } else {
    console.info("[contact] Supabase not configured — skipping DB insert.");
  }

  // 2) Send email notification (also best-effort — admin gets email or it stays in DB)
  const mail = await sendContactNotification({
    name, email, phone, interest, message,
    ip, userAgent: ua,
  });
  if (!mail.sent) {
    console.info(`[contact] Email skipped: ${mail.reason}`);
  }

  // If both failed completely, surface an error so the user knows to retry / call us
  if (!persisted && !mail.sent) {
    return NextResponse.json(
      { error: "Could not send your message. Please try again or call us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, persisted, emailed: mail.sent });
}
