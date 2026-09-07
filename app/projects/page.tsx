import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import { building } from "@/lib/content";
import { whatsappMessage } from "@/lib/whatsapp";
import { getPublishedProjects } from "@/lib/db/publications";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Projects — Yusuf B. Situmorang",
  description: "Selected projects and current builds by Yusuf B. Situmorang.",
};

export default async function ProjectsPage() {
  const publications = await getPublishedProjects(40);

  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}>
          <Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link>
        </div>
        <div className="section-head">
          <div><div className="kicker">Projects</div><h1 style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>Proof of work, built in public.</h1></div>
          <p className="section-lead">Only explicitly published projections appear here. Private and draft work remains in the Personal OS.</p>
        </div>

        {publications.length > 0 && <section style={{ marginBottom: 54 }}>
          <div className="kicker">Published proof</div>
          <div className="build-grid" style={{ borderTop: "1px solid var(--line)" }}>
            {publications.map((item:{public_slug:string;public_title:string;public_summary:string|null;published_at:string}) => <Link href={`/projects/${item.public_slug}`} className="card" key={item.public_slug} style={{ borderRadius:0, boxShadow:"none", minHeight:240, display:"flex", flexDirection:"column" }}>
              <div className="tag">PUBLISHED</div><h2 style={{ margin:"22px 0 10px", fontSize:30 }}>{item.public_title}</h2><p>{item.public_summary || "Published case study."}</p><span className="os-module-link" style={{marginTop:"auto"}}>Open case study <ArrowUpRight size={14}/></span>
            </Link>)}
          </div>
        </section>}

        <section>
          <div className="kicker">Current builds</div>
          <div className="build-grid" style={{ borderTop: "1px solid var(--line)" }}>
            {building.map((item) => (
              <article className="card" key={item.title} style={{ borderRadius: 0, boxShadow: "none", minHeight: 300, display: "flex", flexDirection: "column" }}>
                <div className="tag">{item.tag}</div>
                <h2 style={{ margin: "22px 0 10px", fontSize: 30 }}>{item.title}</h2>
                <p>{item.text}</p>
                <div style={{ marginTop: "auto", paddingTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <span className="pill">Currently building</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" style={{ marginTop: 70, borderRadius: 26 }}>
          <div className="container" style={{ padding: "58px 0" }}>
            <div className="kicker">Work / Collaborate</div>
            <h2>Have a project that could benefit from this skill stack?</h2>
            <p>For hiring, consulting, collaboration or speaking, start with a contextual WhatsApp message.</p>
            <div className="actions">
              <a className="btn btn-primary" href={whatsappMessage("hire")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Hire / Engage</a>
              <a className="btn btn-secondary" href={whatsappMessage("collaborate")} target="_blank" rel="noreferrer">Collaborate <ArrowUpRight size={16} /></a>
              <Link className="btn btn-secondary" href="/"><ShieldCheck size={15}/> Privacy by default</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
