import type { Metadata } from "next";
import { NovaNewsFeed } from "@/components/news/nova-news-feed";
import { PageHero } from "@/components/ui/page-hero";
import { NOVA_NEWS_ITEMS } from "@/data/nova-news";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Noticias | Briefings STEM y mercado",
  description:
    "Señales del mercado STEM, tendencias de carrera y briefings de habilidades alineados a NOVA School, College y Language.",
  path: "/es/news",
  locale: "es",
});

export default function NovaNewsEsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_15%_20%,rgba(0,212,255,0.18),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(214,94,20,0.12),transparent_26%)]" />
        <PageHero
          title="Noticias"
          description="Briefings del mercado STEM conectados a nuestros cursos—IA &amp; coding, robótica, IoT, quantum, idiomas, habilidades digitales y empleabilidad. Mucho flujo. Vuelve seguido."
        >
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-white/70">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
              {NOVA_NEWS_ITEMS.length}+ historias
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Market pulse</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Alineado a tracks NOVA</span>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-white/55">
            Briefings editoriales en inglés para una audiencia global — el marco del sitio está en español.
          </p>
        </PageHero>
      </section>

      <main className="nova-space-section relative flex-1 py-10">
        <div className="nova-container">
          <NovaNewsFeed />
        </div>
      </main>

      </div>
  );
}
