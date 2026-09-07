import Image from "next/image";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Calculator,
  Download,
  Github,
  GraduationCap,
  Heart,
  Instagram,
  Linkedin,
  MessageCircle,
  Music2,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { building, contentPillars, experience, expertise, profile } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { WhatsappIntent, whatsappMessage } from "@/lib/whatsapp";

const socials = [
  ["LinkedIn", profile.linkedin, "Professional authority", Linkedin],
  ["Instagram", profile.instagram, "Personal brand", Instagram],
  ["TikTok", profile.tiktok, "Short-form ideas", Music2],
  ["YouTube", profile.youtube, "Deep-dive content", Youtube],
] as const;

const proofPrinciples = [
  ["01", "Show, don’t tell", "Every major claim should eventually have a project, result, case study, credential, or other evidence behind it."],
  ["02", "Build in public", "The portfolio starts from zero by design. New work will be documented as it becomes real and useful."],
  ["03", "Compound value", "Skills, audience, relationships, assets and ownership should reinforce one another over time."],
];

const contactOptions: Array<readonly [string, string, WhatsappIntent]> = [
  ["Hire / Engage", "For consulting, finance/business projects and professional engagements.", "hire"],
  ["Career / Recruitment", "For recruiters and employers exploring relevant roles, interviews or talent conversations.", "career"],
  ["Collaborate", "For partnerships, products, content, business ventures and strategic collaborations.", "collaborate"],
  ["Speaking / Content", "For speaking, knowledge-sharing, interviews, podcasts and creator collaborations.", "speaking"],
];

function slugify(value: string) {
  return value.toLowerCase().replace(/×/g, "x").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Home() {
  return (
    <main>
      <SiteNav />

      <section id="top" className="hero">
        <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        <div className="container hero-grid">
          <div className="reveal">
            <p className="hero-label">Yusuf B. Situmorang</p>
            <h1>Finance.<br /><em>Business.</em><br />AI. Growth.</h1>
            <p className="hero-copy">{profile.intro} I&apos;m building a career and body of work around practical finance, business building, emerging technology and meaningful impact.</p>
            <div className="hero-meta"><span>Finance Professional</span><span>Builder</span><span>Lifelong Learner</span></div>
            <div className="actions">
              <Link className="btn btn-primary" href="/projects"><span data-i18n="explore">Explore My Work</span> <ArrowUpRight size={16} /></Link>
              <a className="btn btn-secondary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> <span data-i18n="whatsapp">WhatsApp Me</span></a>
            </div>
          </div>
          <div className="hero-card reveal delay"><div className="hero-portrait"><Image src="/yusuf-profile.png" alt="Yusuf B. Situmorang" width={1917} height={2725} priority sizes="(max-width: 900px) 520px, 42vw" className="hero-profile-image" /><div className="portrait-shade" /><div className="portrait-frame" /><div className="portrait-caption"><strong>Build. Serve. Grow. Give.</strong><span>Finance • Business • Technology • Purpose</span></div></div></div>
        </div>

          <div className="hero-proof-bar reveal">
            <article><span className="proof-icon"><Target size={19}/></span><strong>5+</strong><span>Years</span><small>Finance, accounting & tax</small></article>
            <article><span className="proof-icon"><Briefcase size={19}/></span><strong>20+</strong><span>Projects</span><small>Finance • business • technology</small></article>
            <article><span className="proof-icon"><GraduationCap size={19}/></span><strong>7+</strong><span>Certifications</span><small>Finance • analytics • technology</small></article>
            <article><span className="proof-icon"><TrendingUp size={19}/></span><strong>AI</strong><span>+ Technology</span><small>Automation • data • software</small></article>
            <article><span className="proof-icon"><Heart size={19}/></span><strong>Purpose</strong><span>Driven</span><small>Build • Serve • Grow • Give</small></article>
          </div>
      </section>


      <section className="section what-i-do">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">01.5 / What I Do</div><h2>Turning complexity into clarity.</h2></div>
            <p className="section-lead">I connect finance, business thinking and emerging technology to make better decisions, build useful systems and create measurable value.</p>
          </div>
          <div className="what-grid">
            <article><div className="what-icon"><Calculator size={20}/></div><span>01</span><h3>Finance</h3><p>Accounting, tax, financial analysis, reporting, controls and decision support.</p></article>
            <article><div className="what-icon"><Building2 size={20}/></div><span>02</span><h3>Business</h3><p>Strategy, operating systems, venture building, commercial thinking and growth.</p></article>
            <article><div className="what-icon"><Sparkles size={20}/></div><span>03</span><h3>Technology & AI</h3><p>AI-assisted workflows, automation, data and software experiments that turn ideas into leverage.</p></article>
          </div>
        </div>
      </section>

      <section id="about" className="section section-white"><div className="container"><div className="section-head"><div><div className="kicker">01 / About</div><h2>Numbers are only the beginning.</h2></div><p className="section-lead">My work starts with finance, but the bigger ambition is to connect financial thinking with business decisions, technology and human growth.</p></div><div className="editorial-grid"><article className="editorial-lead"><span className="large-mark">YBS</span><p>I am deliberately building from a strong finance foundation toward a broader stack of business, technology, communication and ownership.</p><p>The public website is designed to evolve with that journey. It will show the work as it is built—not pretend that tomorrow&apos;s achievements already exist.</p></article><div className="statement-stack"><article><span>POSITIONING</span><h3>{profile.positioning}</h3></article><article><span>PHILOSOPHY</span><h3>{profile.philosophy}</h3></article><article><span>HOME BASE</span><h3>{profile.location}</h3></article></div></div><div className="actions"><Link className="btn btn-dark" href="/about"><span data-i18n="story">Read My Story</span> <ArrowUpRight size={15} /></Link></div></div></section>

      <section id="expertise" className="section"><div className="container"><div className="section-head"><div><div className="kicker">02 / Expertise</div><h2>A stack built for leverage.</h2></div><p className="section-lead">Established finance capability forms the base. Business, data, AI and communication are the next layers being intentionally developed.</p></div><div className="expertise-list">{expertise.map((item) => <article className="expertise-row" key={item.number}><span className="number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="row-arrow" size={20} /></article>)}</div><div className="actions"><Link className="btn btn-dark" href="/expertise"><span data-i18n="exploreExpertise">Explore Expertise</span> <ArrowUpRight size={15} /></Link></div></div></section>

      <section id="experience" className="section section-white"><div className="container"><div className="section-head"><div><div className="kicker">03 / Experience</div><h2>A finance career in progress.</h2></div><p className="section-lead">Professional experience is the foundation. Proof-of-work is the next layer.</p></div><div className="timeline">{experience.map((item) => <article className="timeline-item" key={item.role + item.company}><div className="period">{item.period}</div><div><h3>{item.role} <span className="gold-dot">·</span> {item.company}</h3><p>{item.text}</p></div></article>)}</div><div className="actions"><Link className="btn btn-dark" href="/experience"><span data-i18n="career">View Career Journey</span> <ArrowUpRight size={15} /></Link><Link className="btn btn-dark" href="/resume"><Download size={16} /> <span data-i18n="resumeView">View My Resume</span></Link></div></div></section>

      <section id="building" className="section dark-band"><div className="container"><div className="section-head"><div><div className="kicker">04 / Building</div><h2>Proof, not promises.</h2></div><p className="section-lead">The portfolio is intentionally starting from zero. These are the systems and ventures being built now; each will become richer as real evidence accumulates.</p></div><div className="build-grid">{building.map((item) => <Link href={`/projects/${slugify(item.title)}`} className="build-item" key={item.title}><div className="build-index">{item.tag}</div><h3>{item.title}</h3><p>{item.text}</p><span className="build-status">VIEW PROJECT <span /></span></Link>)}</div></div></section>

      <section className="section section-white"><div className="container"><div className="section-head"><div><div className="kicker">05 / Proof standard</div><h2>How this portfolio will compound.</h2></div><p className="section-lead">The objective is not to collect certificates or decorate a profile. It is to create a visible trail of useful work.</p></div><div className="proof-grid">{proofPrinciples.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section id="insights" className="section"><div className="container"><div className="section-head"><div><div className="kicker">06 / Insights</div><h2>Learning in public.</h2></div><p className="section-lead">Practical ideas across finance, business, AI, career growth and purpose—shared while the underlying knowledge is being built.</p></div><div className="pill-row">{contentPillars.map((p) => <span className="pill" key={p}>{p}</span>)}</div><div className="social-grid">{socials.map(([name, url, desc, Icon]) => <a className="social" href={url} target="_blank" rel="noreferrer" key={name}><Icon size={18} /><span><strong>{name}</strong><small>{desc}</small></span><ArrowUpRight size={15} /></a>)}</div><div className="actions"><Link className="btn btn-dark" href="/insights"><span data-i18n="insightsHub">Open Insights Hub</span> <ArrowUpRight size={15} /></Link></div></div></section>

      <section className="section digital-presence-section">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">06.5 / Digital Presence</div><h2>Follow the work as it compounds.</h2></div>
            <p className="section-lead">The public portfolio is one layer of a wider body of work. Follow the channels where I share ideas, experiments, lessons and new projects.</p>
          </div>
          <div className="presence-grid">
            {socials.map(([name, url, desc, Icon]) => <a className="presence-card" href={url} target="_blank" rel="noreferrer" key={name}><span className="presence-icon"><Icon size={21} /></span><span><strong>{name}</strong><small>{desc}</small></span><ArrowUpRight size={16} /></a>)}
          </div>
        </div>
      </section>

      <section className="section technology-section"><div className="container technology-grid"><div><div className="kicker">07 / Technology</div><h2>Building the system behind the journey.</h2><p className="section-lead">Yusuf OS is the private operating system behind the public platform—tracking personal value, career capital, execution, wealth and purpose with an AI-assisted decision layer.</p></div><div className="tech-stack"><article><Sparkles size={19} /><div><strong>AI Chief of Staff</strong><p>Reviews, bottleneck detection and next-best actions.</p></div></article><article><Github size={19} /><div><strong>Open Build</strong><p>Selected technical experiments and future proof-of-work.</p></div></article><article><Play size={19} /><div><strong>Build in Public</strong><p>Documenting what I learn and build across media.</p></div></article></div></div></section>

      <section id="contact" className="cta"><div className="container"><div className="section-head"><div><div className="kicker">08 / Work with me</div><h2>Choose the reason you&apos;re reaching out.</h2></div><p className="section-lead">Contextual WhatsApp messages make it easier for you to start a useful conversation—and easier for me to understand what you need.</p></div><div className="proof-grid contact-grid">{contactOptions.map(([title, text, intent]) => <article key={title}><span><MessageCircle size={14} /></span><h3>{title}</h3><p style={{color:"#b9c9d6"}}>{text}</p><a className="btn btn-primary" href={whatsappMessage(intent)} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={15} /></a></article>)}</div><div className="actions"><a className="btn btn-secondary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> General WhatsApp</a><Link className="btn btn-secondary" href="/contact">Contact page <ArrowUpRight size={15} /></Link></div></div></section>

      <footer className="footer"><div className="container footer-inner"><div>© {new Date().getFullYear()} <strong>Yusuf B. Situmorang</strong></div><div className="footer-links"><Link href="/about">About</Link><Link href="/expertise">Expertise</Link><Link href="/experience">Experience</Link><Link href="/projects">Projects</Link><Link href="/insights">Insights</Link><Link href="/resume">Resume</Link><Link href="/contact">Contact</Link><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={profile.tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={profile.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div></div></footer>
    </main>
  );
}
