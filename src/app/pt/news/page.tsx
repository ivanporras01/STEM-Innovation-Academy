import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NovaNewsFeed } from "@/components/news/nova-news-feed";
import { NOVA_NEWS_ITEMS } from "@/data/nova-news";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "NOVA News | Briefings STEM e mercado",
  description:
    "Sinais do mercado STEM, tendências de carreira e briefings de habilidades alinhados a NOVA School, College e Language.",
  path: "/pt/news",
});

export default function NovaNewsPtPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-12 text-white sm:py-16">
        <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_15%_20%,rgba(0,212,255,0.18),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(214,94,20,0.12),transparent_26%)]" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">NOVA News</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-nova-cyan-light/85 sm:text-lg">
            Briefings do mercado STEM ligados aos nossos cursos—IA &amp; coding, robótica, IoT, quantum,
            idiomas, habilidades digitais e carreira. Alto fluxo de informação. Volte sempre.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/60">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
              {NOVA_NEWS_ITEMS.length}+ histórias
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Market pulse</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Alinhado aos tracks NOVA</span>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1 py-10">
        <div className="nova-container">
          <NovaNewsFeed />
        </div>
      </main>

      <Footer />
    </div>
  );
}
