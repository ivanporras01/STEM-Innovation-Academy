import type { Metadata } from "next";
import { NovaNewsFeed } from "@/components/news/nova-news-feed";
import { NOVA_NEWS_ITEMS } from "@/data/nova-news";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "NOVA News | STEM market & skills briefings",
  description:
    "Fresh STEM market signals, career trends, and skills briefings aligned to NOVA School, College, and Language programs—AI, robotics, IoT, quantum, and more.",
  path: "/news",
});

export default function NovaNewsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-12 text-white sm:py-16">
        <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_15%_20%,rgba(0,212,255,0.18),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(214,94,20,0.12),transparent_26%)]" />
        <div className="nova-container relative">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">NOVA News</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-nova-cyan-light/85 sm:text-lg">
            A calm, high-signal place to scan STEM market trends tied to what we teach—AI &amp; coding, robotics, IoT,
            quantum, languages, digital skills, and careers. Come curious. Leave oriented.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/60">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
              {NOVA_NEWS_ITEMS.length}+ curated stories
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Market pulse</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Aligned to NOVA tracks</span>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1 py-10">
        <div className="nova-container">
          <NovaNewsFeed />
        </div>
      </main>

      </div>
  );
}
