import Link from "next/link";
import { ArrowLeft, BrainCircuit, Lightbulb, Zap } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";
import { RefreshIntelligenceButton } from "./refresh-button";

export const dynamic = "force-dynamic";
export const metadata = { title: "Intelligence — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function IntelligencePage() {
  const { user, db } = await requirePrivateDb();
  const [actions, recs, insights, scores] = await Promise.all([
    db`SELECT id, title, reason, impact_score, effort_minutes, priority_rank, status, due_date FROM public.next_best_actions WHERE owner_id=${user.id}::uuid ORDER BY priority_rank ASC NULLS LAST, impact_score DESC NULLS LAST LIMIT 25`.catch(() => []),
    db`SELECT id, title, rationale, expected_impact, effort_minutes, status, created_at FROM public.ai_recommendations WHERE owner_id=${user.id}::uuid ORDER BY created_at DESC LIMIT 20`.catch(() => []),
    db`SELECT id, insight_type, title, summary, confidence, created_at FROM public.ai_insights WHERE owner_id=${user.id}::uuid ORDER BY created_at DESC LIMIT 20`.catch(() => []),
    db`SELECT snapshot_date, capability, proof, distribution, network, commercialization, ownership, personal_value FROM public.score_snapshots WHERE owner_id=${user.id}::uuid ORDER BY snapshot_date DESC LIMIT 1`.catch(() => []),
  ]);
  const s=scores[0];
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0,justifyContent:"space-between"}}><div><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link></div><RefreshIntelligenceButton /></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Phase 4 · Intelligence</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>AI intelligence layer.</h1></div><p className="section-lead">A decision-support layer that turns private workspace signals into insights and next actions. Yusuf remains the decision maker.</p></div>
    <div className="os-hero-grid" style={{width:"100%",marginTop:0}}><article className="os-highlight"><span className="kicker">Next best actions</span><h2>{actions.length} queued.</h2><p>Actions are ranked by expected impact, effort and priority. The system should surface leverage, not create noise.</p></article><article className="os-status"><div><span className="kicker">Personal value</span><strong>{s ? Number(s.personal_value).toFixed(1) : "Not measured"}</strong><p>{s ? `Latest snapshot ${new Date(s.snapshot_date).toLocaleDateString("en-GB")}` : "Capture a score snapshot after enough evidence exists."}</p></div><div className="os-stat-row"><span><small>Insights</small><b>{insights.length}</b></span><span><small>Recommendations</small><b>{recs.length}</b></span></div></article></div>
    {s && <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Value score</div><h2>Multi-dimensional signal.</h2></div></div><div className="os-module-grid">{[["Capability",s.capability],["Proof",s.proof],["Distribution",s.distribution],["Network",s.network],["Commercialization",s.commercialization],["Ownership",s.ownership]].map(([k,v])=><article className="card os-module" key={k}><BrainCircuit size={18}/><h3>{k}</h3><p style={{fontSize:28,fontFamily:"Manrope",color:"var(--ink)",fontWeight:800}}>{Number(v).toFixed(1)}</p></article>)}</div></section>}
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Decision queue</div><h2>What deserves attention next.</h2></div></div><div className="timeline">{actions.map((a:{id:string;title:string;reason:string|null;impact_score:number|null;effort_minutes:number|null;priority_rank:number|null;status:string;due_date:string|null})=><article className="timeline-item" key={a.id}><div className="period">#{a.priority_rank ?? "—"}</div><div><h3>{a.title}</h3><p>{a.reason || "No rationale yet."} · impact {a.impact_score ?? "—"} · {a.effort_minutes ?? 0} min · {a.status}{a.due_date ? ` · due ${new Date(a.due_date).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
    <section style={{marginTop:55}}><div className="os-module-grid">{insights.map((i:{id:string;insight_type:string;title:string;summary:string;confidence:number|null})=><article className="card os-module" key={i.id}><Lightbulb size={18}/><h3>{i.title}</h3><p>{i.summary}</p><span className="os-module-link">{i.insight_type} · confidence {i.confidence ?? "—"}</span></article>)}</div></section>
    <section style={{marginTop:55}}><div className="os-module-grid">{recs.map((r:{id:string;title:string;rationale:string;expected_impact:string|null;effort_minutes:number|null;status:string})=><article className="card os-module" key={r.id}><Zap size={18}/><h3>{r.title}</h3><p>{r.rationale}</p><span className="os-module-link">{r.status} · {r.effort_minutes ?? 0} min</span></article>)}</div></section>
    <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"56px 0"}}><div className="kicker">AI principle</div><h2>AI proposes. Evidence supports. Yusuf decides.</h2><p>Private intelligence can reason over private workspace data only after authorization; public AI is restricted to published projections.</p></div></section>
  </div></main>;
}
