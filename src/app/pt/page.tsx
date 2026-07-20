import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NovaOrbitRings } from "@/components/ui/nova-universe";
import { NovaHeroLogoMark } from "@/components/ui/nova-logo-mark";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_STEM_HUB.name} — Edição em Português`,
  description: NOVA_STEM_HUB.taglinePt,
  path: "/pt",
  locale: "pt",
});

const PRODUCT_CARDS = [
  {
    product: NOVA_SCHOOL,
    href: "/pt/school",
    accent: "border-nova-cyan/30 hover:border-nova-cyan/30",
    badge: "Juventude · 8–16 anos",
    highlights: [
      `${NOVA_SCHOOL.electiveCount} eletivas escolares`,
      "Mission Paths",
      "Tech criativa para teens · Impacto social · mais",
    ],
    cta: "Entrar no NOVA School",
    ctaClass: "nova-btn-primary nova-btn-glow",
  },
  {
    product: NOVA_COLLEGE,
    href: "/pt/college",
    accent: "border-nova-orange/30 hover:border-nova-orange/50",
    badge: "Empregabilidade · 16–25+ anos",
    highlights: [
      `${NOVA_COLLEGE.trackCount} trilhas técnicas`,
      "Certificados verificáveis",
      "Programa QCW (Tier 2)",
    ],
    cta: `Explorar ${NOVA_COLLEGE.name}`,
    ctaClass: "nova-btn-primary nova-btn-glow bg-nova-orange hover:bg-nova-orange/90",
  },
  {
    product: NOVA_LANGUAGE,
    href: "/pt/language",
    accent: "border-nova-green/30 hover:border-nova-green/50",
    badge: "Idiomas · Todas as idades",
    highlights: [
      `${NOVA_LANGUAGE.courseCount} programas de idiomas`,
      "Inglês · Espanhol · Português",
      "CEFR · labs de conversação",
    ],
    cta: `Explorar ${NOVA_LANGUAGE.name}`,
    ctaClass: "nova-btn-primary nova-btn-glow bg-nova-green hover:bg-nova-green/90",
  },
] as const;

export default function PortugueseStemHubLandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="relative flex-1">
        <section className="nova-section-cosmic relative overflow-hidden py-20 text-white sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-green/10 via-transparent to-nova-cyan/10" />
          <div className="nova-container relative text-center">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-nova-green">
              ✦ {NOVA_STEM_HUB.name}
            </p>

            <div className="nova-glass-island mx-auto mb-8 max-w-3xl border border-nova-cyan/35 px-6 py-5 shadow-[0_0_40px_rgba(0,212,255,0.12)] sm:px-8 sm:py-6">
              <p className="text-lg font-semibold leading-relaxed text-nova-cyan-light sm:text-xl sm:leading-relaxed">
                {NOVA_STEM_HUB.missionStatementPt}
              </p>
            </div>

            <h1 className="mx-auto max-w-3xl text-3xl font-black text-white/95 sm:text-4xl lg:text-5xl">
              {NOVA_STEM_HUB.heroHeadlinePt}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {NOVA_STEM_HUB.heroSubheadPt}
            </p>
            <div className="relative mx-auto mt-10 flex max-w-sm items-center justify-center">
              <NovaOrbitRings size="sm" />
              <div className="absolute flex items-center justify-center">
                <NovaHeroLogoMark />
              </div>
            </div>
          </div>
        </section>

        <section className="nova-space-section pb-20">
          <div className="nova-container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white">Escolha sua missão</h2>
              <p className="mt-3 text-nova-cyan-light/80">
                Os três produtos vivem dentro do {NOVA_STEM_HUB.name}.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_CARDS.map((card) => (
                <Link
                  key={card.product.name}
                  href={card.href}
                  className={`nova-glass-card group flex h-full flex-col border-2 p-8 transition ${card.accent}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    {card.badge}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{card.product.name}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">
                    {card.product.name === NOVA_SCHOOL.name
                      ? NOVA_SCHOOL.taglinePt
                      : card.product.name === NOVA_COLLEGE.name
                        ? NOVA_COLLEGE.taglinePt
                        : NOVA_LANGUAGE.taglinePt}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-nova-cyan-light/80">
                    {card.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0 text-nova-cyan">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className={`${card.ctaClass} mt-8 inline-flex w-full justify-center`}>{card.cta}</span>
                </Link>
              ))}
            </div>

            <section className="mx-auto mt-16 max-w-5xl">
              <div className="nova-glass-island flex flex-col items-start gap-6 border border-nova-cyan/20 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    Para escolas e instituições
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">NOVA Partnership</h2>
                  <p className="mt-3 max-w-xl text-sm text-nova-cyan-light/80">
                    Licencie {NOVA_SCHOOL.name}, {NOVA_COLLEGE.name} e {NOVA_LANGUAGE.name} para seu campus
                    — currículo, plataforma, guias do facilitador e certificados verificáveis.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <Link href="/partnership/apply" className="nova-btn-primary nova-btn-glow inline-flex">
                    Registrar instituição
                  </Link>
                  <Link
                    href="/partnership"
                    className="nova-btn-secondary inline-flex border-white/20 text-white"
                  >
                    Ver vantagens
                  </Link>
                </div>
              </div>
            </section>

            <section className="mx-auto mt-12 max-w-5xl">
              <Link
                href="/shop"
                className="nova-glass-island group flex flex-col items-start gap-4 border border-nova-orange/25 p-8 transition hover:border-nova-orange/45 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-nova-orange">
                    {NOVA_SHOP.name}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white group-hover:text-nova-orange">
                    {NOVA_SHOP.taglinePt}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-nova-cyan-light/80">
                    Roupas, acessórios e papelaria NOVA — para Explorers, mentores e fãs STEM em todo o mundo.
                  </p>
                </div>
                <span className="nova-btn-primary nova-btn-glow inline-flex shrink-0 bg-nova-orange hover:bg-nova-orange/90">
                  Ver coleção →
                </span>
              </Link>
            </section>

            <p className="mt-10 text-center text-sm text-nova-cyan-light/60">
              English edition:{" "}
              <Link href="/" className="text-nova-cyan underline-offset-2 hover:underline">
                {NOVA_STEM_HUB.name}
              </Link>
              {" · "}
              Edición en español:{" "}
              <Link href="/es" className="text-nova-cyan underline-offset-2 hover:underline">
                {NOVA_STEM_HUB.name} en Español
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
