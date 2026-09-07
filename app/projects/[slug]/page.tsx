import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import { building } from "@/lib/content";
import { whatsappMessage } from "@/lib/whatsapp";
import { getPublishedProject } from "@/lib/db/publications";

export const dynamic = "force-dynamic";

function slugify(value: string) {
  return value.toLowerCase().replace(/×/g, "x").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const published = await getPublishedProject(slug);
  if (published) return { title: `${published.public_title} — Project`, description: published.public_summary ?? "Published project case study." };
  const item = building.find((project) => slugify(project.title) === slug);
  return { title: item ? `${item.title} — Project` : "Project — Yusuf B. Situmorang", description: item?.text ?? "Project detail page for Yusuf B. Situmorang." };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const published = await getPublishedProject(slug);
  const item = building.find((project) => slugify(project.title) === slug);

  if (!published && !item) return <main className="section section-white"><div className="container"><div className="kicker">Project not found</div><h1 style={{fontSize:"clamp(44px,7vw,76px)",marginBottom:20}}>This project page does not exist.</h1><Link className="btn btn-dark" href="/projects"><ArrowLeft size={15}/> Back to projects</Link></div></main>;

  if (published) {
    const payload = (published.public_payload || {}) as { kind?:string; summary?:string; problem?:string; objective?:string; approach?:string; tools?:string; outcome?:string; lessons?:string };
    return <main className="section section-white"><div className="container">
      <div className="actions" style={{marginTop:0,marginBottom:42}}><Link className="btn btn-dark" href="/projects"><ArrowLeft size={15}/> Back to projects</Link></div>
      <header className="section-head"><div><div className="kicker">Published proof · {payload.kind || "Project"}</div><h1 style={{fontSize:"clamp(46px,7vw,82px)"}}>{published.public_title}</h1></div><p className="section-lead">{published.public_summary || payload.summary || "Published project case study."}</p></header>
      <div className="editorial-grid">
        <article className="card" style={{borderRadius:24,minHeight:320}}><div className="tag">Case study</div><h2 style={{margin:"18px 0 10px",fontSize:30}}>What was done</h2><p>{payload.approach || payload.objective || "The published record does not include a detailed methodology yet."}</p><div className="pill-row" style={{marginTop:28}}><span className="pill"><ShieldCheck size={13}/> Explicitly published</span><span className="pill">Evidence-backed</span></div></article>
        <article className="statement-stack"><article><span>PROBLEM</span><h3>{payload.problem || "Problem statement not captured."}</h3></article><article><span>OUTCOME</span><h3>{payload.outcome || "Outcome not captured."}</h3></article><article><span>LESSONS</span><h3>{payload.lessons || "Lessons will be added as the work matures."}</h3></article></article>
      </div>
      <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"58px 0"}}><div className="kicker">Discuss this project</div><h2>Interested in the work or want to collaborate?</h2><p>Published at {new Date(published.published_at).toLocaleDateString("en-GB")}.</p><div className="actions"><a className="btn btn-primary" href={whatsappMessage("collaborate")} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Collaborate</a><a className="btn btn-secondary" href={whatsappMessage("hire")} target="_blank" rel="noreferrer">Hire / Engage <ArrowUpRight size={15}/></a></div></div></section>
    </div></main>;
  }

  return <main className="section section-white"><div className="container"><div className="actions" style={{marginTop:0,marginBottom:42}}><Link className="btn btn-dark" href="/projects"><ArrowLeft size={15}/> Back to projects</Link></div><header className="section-head"><div><div className="kicker">{item!.tag}</div><h1 style={{fontSize:"clamp(46px,7vw,82px)"}}>{item!.title}</h1></div><p className="section-lead">A transparent project page. Evidence will be added as the work becomes real, validated and publicly presentable.</p></header><div className="editorial-grid"><article className="card" style={{borderRadius:24,minHeight:320}}><div className="tag">Current state</div><h2 style={{margin:"18px 0 10px",fontSize:30}}>In progress</h2><p>{item!.text}</p><div className="pill-row" style={{marginTop:28}}><span className="pill">Evidence-first</span><span className="pill">No invented results</span><span className="pill">Continuously evolving</span></div></article><article className="statement-stack"><article><span>OBJECTIVE</span><h3>Turn the idea into a useful, measurable system.</h3></article><article><span>EVIDENCE</span><h3>Published after a real artifact, result, case study or validated milestone exists.</h3></article><article><span>NEXT STEP</span><h3>Build → validate → document → publish.</h3></article></article></div><section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"58px 0"}}><div className="kicker">Discuss this project</div><h2>Interested in the work or want to collaborate?</h2><p>Start the conversation with the right context already prepared.</p><div className="actions"><a className="btn btn-primary" href={whatsappMessage("collaborate")} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Collaborate</a><a className="btn btn-secondary" href={whatsappMessage("hire")} target="_blank" rel="noreferrer">Hire / Engage <ArrowUpRight size={15}/></a></div></div></section></div></main>;
}
