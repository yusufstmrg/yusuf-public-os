"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const translations: Record<string, string> = {
  "About":"Tentang","Expertise":"Keahlian","Experience":"Pengalaman","Building":"Membangun","Insights":"Insight","Projects":"Proyek","Resume":"CV","Contact Me":"Hubungi Saya",
  "Explore My Work":"Lihat Karya Saya","WhatsApp Me":"WhatsApp Saya","Read My Story":"Baca Cerita Saya","Explore Expertise":"Lihat Keahlian","View Career Journey":"Lihat Perjalanan Karier","View My Resume":"Lihat CV Saya","Open Insights Hub":"Buka Pusat Insight",
  "Finance.":"Keuangan.","Business.":"Bisnis.","AI. Growth.":"AI. Pertumbuhan.","Finance Professional":"Profesional Keuangan","Builder":"Builder","Lifelong Learner":"Pembelajar Seumur Hidup",
  "Turning complexity into clarity.":"Mengubah kompleksitas menjadi kejelasan.","Numbers are only the beginning.":"Angka hanyalah permulaan.","A stack built for leverage.":"Kapabilitas yang dibangun untuk leverage.","A finance career in progress.":"Perjalanan karier keuangan yang terus berkembang.","Proof, not promises.":"Bukti, bukan janji.","Learning in public.":"Belajar secara terbuka.","Building the system behind the journey.":"Membangun sistem di balik perjalanan.","Choose the reason you're reaching out.":"Pilih alasan Anda menghubungi saya.","Start with context.":"Mulai dengan konteks.",
  "How this portfolio will compound.":"Bagaimana portofolio ini akan bertumbuh secara majemuk.","Show, don’t tell":"Tunjukkan, jangan hanya katakan","Build in public":"Bangun secara terbuka","Compound value":"Nilai yang berlipat",
  "View projects":"Lihat proyek","View projects ":"Lihat proyek ","Back to Yusuf":"Kembali ke Yusuf","Back to projects":"Kembali ke proyek","Open WhatsApp":"Buka WhatsApp","Hire / Engage":"Hire / Engage","Career / Recruitment":"Karier / Rekrutmen","Collaborate":"Kolaborasi","Speaking / Content":"Speaking / Konten",
  "Currently building":"Sedang dibangun","In progress":"Sedang dikerjakan","Current state":"Status saat ini","Published proof":"Bukti yang dipublikasikan","Current builds":"Pembangunan saat ini","Proof of work, built in public.":"Bukti karya, dibangun secara terbuka.","Ideas worth sharing.":"Ide yang layak dibagikan.",
  "The Direction":"Arah","Career Capital Strategy":"Strategi Modal Karier","How the stack compounds":"Bagaimana kapabilitas ini bertumbuh","Discuss this project":"Diskusikan proyek ini","Interested in the work or want to collaborate?":"Tertarik dengan karya ini atau ingin berkolaborasi?",
  "Finance":"Keuangan","Business":"Bisnis","Technology & AI":"Teknologi & AI","Accounting & Tax":"Akuntansi & Pajak","Financial Analysis":"Analisis Keuangan","Corporate Finance":"Keuangan Korporasi","AI & Technology":"AI & Teknologi","Business Building":"Membangun Bisnis","Communication":"Komunikasi",
  "Home Base":"Domisili","POSITIONING":"POSITIONING","PHILOSOPHY":"FILOSOFI","ROLE":"PERAN","HOME BASE":"DOMISILI"
};

const reverse: Record<string,string> = Object.fromEntries(Object.entries(translations).map(([en,id])=>[id,en]));

function applyLanguage(lang: "en" | "id") {
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key) {
      const entry = key === "contact" ? ["Contact Me","Hubungi Saya"] : key === "about" ? ["About","Tentang"] : key === "expertise" ? ["Expertise","Keahlian"] : key === "experience" ? ["Experience","Pengalaman"] : key === "building" ? ["Building","Membangun"] : key === "insights" ? ["Insights","Insight"] : key === "projects" ? ["Projects","Proyek"] : key === "resume" ? ["Resume","CV"] : key === "explore" ? ["Explore My Work","Lihat Karya Saya"] : key === "whatsapp" ? ["WhatsApp Me","WhatsApp Saya"] : key === "story" ? ["Read My Story","Baca Cerita Saya"] : key === "exploreExpertise" ? ["Explore Expertise","Lihat Keahlian"] : key === "career" ? ["View Career Journey","Lihat Perjalanan Karier"] : key === "resumeView" ? ["View My Resume","Lihat CV Saya"] : key === "insightsHub" ? ["Open Insights Hub","Buka Pusat Insight"] : null;
      if (entry) node.textContent = entry[lang === "en" ? 0 : 1];
    }
  });

  const map = lang === "en" ? reverse : translations;
  document.querySelectorAll<HTMLElement>("body *").forEach((node) => {
    if (node.children.length === 0) {
      const raw = node.textContent?.trim() ?? "";
      if (!raw || raw.length > 140) return;
      const translated = map[raw];
      if (translated) node.textContent = translated;
    }
  });
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "id">("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("yusuf-language");
    const next = saved === "id" ? "id" : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted preference after the browser is available.
    setLang(next);
    applyLanguage(next);
  }, [pathname]);

  useEffect(() => {
    applyLanguage(lang);
  }, [pathname, lang]);

  function change(next: "en" | "id") {
    setLang(next);
    window.localStorage.setItem("yusuf-language", next);
    applyLanguage(next);
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      <Languages size={15} aria-hidden="true" />
      <button type="button" className={lang === "en" ? "selected" : ""} aria-pressed={lang === "en"} onClick={() => change("en")}>EN</button>
      <span>/</span>
      <button type="button" className={lang === "id" ? "selected" : ""} aria-pressed={lang === "id"} onClick={() => change("id")}>ID</button>
    </div>
  );
}
