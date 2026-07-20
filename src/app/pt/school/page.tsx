import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SchoolElectiveCard } from "@/components/school/school-elective-card";
import { novaSchoolElectiveIndex } from "@/data/nova-school";
import { NOVA_COLLEGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_SCHOOL.name} — Edição em Português`,
  description: NOVA_SCHOOL.taglinePt,
  path: "/pt/school",
  locale: "pt",
});

export default function PortugueseSchoolCatalogPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name} · {NOVA_SCHOOL.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{NOVA_SCHOOL.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_SCHOOL.taglinePt}</p>
          <p className="mt-3 max-w-2xl text-sm text-nova-cyan-light/75">
            {NOVA_SCHOOL.electiveCount} eletivas STEM para jovens Explorers — Mission Paths, tech criativa e
            impacto social, dentro do ecossistema {NOVA_STEM_HUB.name}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/pt/college" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_COLLEGE.name}
            </Link>
            <Link href="/school" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              English edition ↗
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Eletivas NOVA School</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              {NOVA_SCHOOL.electiveCount} eletivas · idades {NOVA_SCHOOL.ages} · Mission Paths interativos
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {novaSchoolElectiveIndex.map((elective) => (
                <SchoolElectiveCard key={elective.slug} elective={elective} locale="pt" />
              ))}
            </div>
          </section>

          <section className="nova-glass-island text-center">
            <h2 className="text-lg font-bold text-white">Licencie NOVA School para sua instituição</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80">
              Currículo, plataforma, guia do facilitador e certificados — tudo dentro do NOVA Partnership.
            </p>
            <Link href="/partnership" className="nova-btn-secondary mt-4 inline-flex border-white/20 text-white">
              Conhecer NOVA Partnership →
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
