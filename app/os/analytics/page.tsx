import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { getDb } from "@/lib/db/server";

export default async function AnalyticsPage() {
  const session = await auth?.getSession();
  if (!session?.data?.session) redirect("/auth/sign-in");

  const db = getDb();
  const empty = { total: 0, visitors: 0, sessions: 0, pages: 0, topPages: [], sources: [], devices: [] };
  const data = db ? await Promise.all([
    db`SELECT COUNT(*)::int AS total, COUNT(DISTINCT visitor_id)::int AS visitors, COUNT(DISTINCT session_id)::int AS sessions, COUNT(DISTINCT path)::int AS pages FROM public.site_events WHERE created_at >= now() - interval '30 days'`,
    db`SELECT path, COUNT(*)::int AS views FROM public.site_events WHERE created_at >= now() - interval '30 days' GROUP BY path ORDER BY views DESC LIMIT 6`,
    db`SELECT COALESCE(utm_source, NULLIF(split_part(referrer, '/', 3), ''), 'Direct') AS source, COUNT(*)::int AS visits FROM public.site_events WHERE created_at >= now() - interval '30 days' GROUP BY source ORDER BY visits DESC LIMIT 6`,
    db`SELECT COALESCE(device_type, 'Unknown') AS device, COUNT(*)::int AS visits FROM public.site_events WHERE created_at >= now() - interval '30 days' GROUP BY device ORDER BY visits DESC`,
  ]).then(([summary, topPages, sources, devices]) => ({ ...summary[0], topPages, sources, devices })).catch(() => empty) : empty;

  return (
    <main className="page-shell" style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div className="kicker">Private OS / Intelligence</div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", flexWrap: "wrap" }}>
        <div><h1 style={{ marginTop: 10 }}>Traffic command center.</h1><p className="section-lead" style={{ maxWidth: 650 }}>A private view of attention, acquisition and behavior across Yusuf Platform.</p></div>
        <span className="pill">Last 30 days · first-party events</span>
      </div>
      <section className="proof-grid" style={{ marginTop: 38 }} aria-label="Traffic overview">
        {[['Page views', data.total], ['Unique visitors', data.visitors], ['Sessions', data.sessions], ['Pages reached', data.pages]].map(([label, value]) => <article className="card" key={String(label)} style={{ padding: 22 }}><small>{label}</small><strong style={{ display: "block", fontSize: 32, marginTop: 10 }}>{String(value)}</strong></article>)}
      </section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 22 }}>
        <section className="card" style={{ padding: 24 }}><div className="kicker">Content</div><h2 style={{ marginTop: 8 }}>Top pages</h2>{data.topPages.map((row: { path: string; views: number }) => <div key={row.path} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}><span>{row.path}</span><strong>{row.views}</strong></div>)}</section>
        <section className="card" style={{ padding: 24 }}><div className="kicker">Acquisition</div><h2 style={{ marginTop: 8 }}>Where attention comes from</h2>{data.sources.map((row: { source: string; visits: number }) => <div key={row.source} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}><span>{row.source}</span><strong>{row.visits}</strong></div>)}</section>
        <section className="card" style={{ padding: 24 }}><div className="kicker">Audience</div><h2 style={{ marginTop: 8 }}>Device mix</h2>{data.devices.map((row: { device: string; visits: number }) => <div key={row.device} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}><span>{row.device}</span><strong>{row.visits}</strong></div>)}</section>
      </div>
    </main>
  );
}
