import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

// Lightweight endpoint that runs a cheap query to keep Supabase from pausing.
// Hit this once a day via cron-job.org or any cron service.
export async function GET() {
  const sb = getSupabase();

  if (!sb) {
    return NextResponse.json({ ok: false, reason: "supabase not configured" }, { status: 503 });
  }

  const { error } = await sb.from("properties").select("id").limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
