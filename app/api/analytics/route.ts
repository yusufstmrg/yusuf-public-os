import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/server";

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.slice(0, 500) : null;
}

export async function POST(request: Request) {
  const db = getDb();
  if (!db) return NextResponse.json({ ok: false }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false }, { status: 400 });

  const eventName = typeof body.eventName === "string" ? body.eventName.slice(0, 80) : "page_view";
  const path = typeof body.path === "string" ? body.path.slice(0, 500) : "/";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 120) : "unknown";
  const visitorId = typeof body.visitorId === "string" ? body.visitorId.slice(0, 120) : "unknown";

  try {
    await db`
      INSERT INTO public.site_events
        (event_name, path, referrer, utm_source, utm_medium, utm_campaign, session_id, visitor_id, device_type, browser, os, country, city)
      VALUES
        (${eventName}, ${path}, ${clean(body.referrer)}, ${clean(body.utmSource)}, ${clean(body.utmMedium)}, ${clean(body.utmCampaign)}, ${sessionId}, ${visitorId}, ${clean(body.deviceType)}, ${clean(body.browser)}, ${clean(body.os)}, ${clean(body.country)}, ${clean(body.city)})
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[v0] analytics ingest failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
