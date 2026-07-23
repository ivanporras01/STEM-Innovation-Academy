import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/components/seo/json-ld";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { PARTNERSHIP_APPLY_PATH } from "@/data/novahub/partnerships";
import { buildPageMetadata, SEO_DEFAULT_DESCRIPTION } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = buildPageMetadata({
  title: NOVA_STEM_HUB.metadataTitle,
  description: SEO_DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [
    "NOVA STEM HUB",
    "STEM education online",
    "NOVA School electives",
    "NOVA College certificates",
    "learn English Spanish Portuguese",
    "NOVA Shop merchandise",
    "institutional STEM licensing",
  ],
});

const PRODUCT_CARDS = [
  {
    product: NOVA_SCHOOL,
    href: NOVA_SCHOOL.path,
    accent: "border-nova-cyan/30 hover:border-nova-cyan/50",
    badge: "Youth · Middle & High School",
    highlights: [
      `${NOVA_SCHOOL.electiveCount} school electives`,
      "Mission Paths",
      "Creative Tech for Teens · Social impact · more",
    ],
    cta: `Explore NOVA ${NOVA_SCHOOL.name}`,
    ctaClass: "nova-btn-primary nova-btn-glow",
  },
  {
    product: NOVA_COLLEGE,
    href: NOVA_COLLEGE.path,
    accent: "border-nova-orange/30 hover:border-nova-orange/50",
    badge: "Employability · Ages 16–25+",
    highlights: [
      `${NOVA_COLLEGE.trackCount} technical tracks`,
      "Verifiable certificates",
      "QCW quantum program (Tier 2)",
    ],
    cta: `Explore NOVA ${NOVA_COLLEGE.name}`,
    ctaClass: "nova-btn-primary nova-btn-glow bg-nova-orange hover:bg-nova-orange/90",
  },
  {
    product: NOVA_LANGUAGE,
    href: NOVA_LANGUAGE.path,
    accent: "border-nova-green/30 hover:border-nova-green/50",
    badge: "Languages · All ages",
    highlights: [
      `${NOVA_LANGUAGE.courseCount} language programs`,
      "English · Spanish · Portuguese",
      "CEFR-aligned · speaking labs",
    ],
    cta: `Explore NOVA ${NOVA_LANGUAGE.name}`,
    ctaClass: "nova-btn-primary nova-btn-glow bg-nova-green hover:bg-nova-green/90",
  },
] as const;

export default function StemHubLandingPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
      <main className="relative flex-1">
        <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
          <div className="nova-nebula-glow absolute -left-32 top-0 h-96 w-96 bg-nova-cyan/25" />
          <div className="nova-nebula-glow absolute -right-32 bottom-0 h-[28rem] w-[28rem] bg-nova-orange/15" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-deep-blue/45 via-[#0a1628]/30 to-nova-deep-blue/50" />

          <div className="nova-container relative">
            <div className="nova-glass-island mb-8 max-w-3xl border border-nova-cyan/35 px-6 py-5 shadow-[0_0_40px_rgba(0,212,255,0.12)] sm:px-8 sm:py-6">
              <p className="text-lg font-semibold leading-relaxed text-nova-cyan-light sm:text-xl sm:leading-relaxed">
                {NOVA_STEM_HUB.missionStatement}
              </p>
            </div>
          </div>

          <PageHero
            title={NOVA_STEM_HUB.heroHeadline}
            subtitle={NOVA_STEM_HUB.heroSubhead}
            subtitleClassName="text-nova-cyan-light"
            titleClassName="max-w-4xl"
          >
            <div className="flex flex-wrap items-center justify-start gap-3">
              <Link href="/catalog" className="nova-btn-primary nova-btn-glow inline-flex">
                Explore programs
              </Link>
              <Link href="/enroll" className="nova-btn-secondary inline-flex border-white/25 text-white">
                Start your mission
              </Link>
              <Link href="/news" className="nova-btn-secondary inline-flex border-nova-cyan/40 text-nova-cyan-light">
                News
              </Link>
            </div>
            <div className="mt-8 flex max-w-3xl flex-wrap items-center justify-start gap-x-5 gap-y-2 text-xs font-semibold text-white/70">
              <Link href="/verify" className="hover:text-nova-cyan-light">Verifiable certificates</Link>
              <span className="text-white/30" aria-hidden>·</span>
              <span>EN · ES · PT</span>
              <span className="text-white/30" aria-hidden>·</span>
              <Link href="/partnership" className="hover:text-nova-cyan-light">Institutional partnership</Link>
            </div>
          </PageHero>
        </section>

        <section className="nova-space-section pb-24">
          <div className="nova-container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Choose your path</h2>
              <p className="mt-3 text-nova-cyan-light/85">
                Pick the product that fits your journey — all three live inside {NOVA_STEM_HUB.name}.
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
                  <h3 className="mt-3 text-2xl font-bold text-white group-hover:text-nova-cyan-light">
                    {card.product.name}
                  </h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{card.product.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-nova-cyan-light/80">
                    {card.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0 text-nova-cyan">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className={`${card.ctaClass} mt-8 inline-flex w-full justify-center`}>
                    {card.cta}
                  </span>
                </Link>
              ))}
            </div>

            <section className="mx-auto mt-16 max-w-5xl">
              <div className="nova-glass-island flex flex-col items-start gap-6 border border-nova-cyan/25 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">NOVA News</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">STEM market briefings</h2>
                  <p className="mt-3 max-w-xl text-sm text-nova-cyan-light/85">
                    Stay current on AI, robotics, IoT, quantum, languages, and careers—signals tied to the programs we teach.
                  </p>
                </div>
                <Link href="/news" className="nova-btn-primary nova-btn-glow inline-flex shrink-0">
                  Read NOVA News
                </Link>
              </div>
            </section>

            <section className="mx-auto mt-16 max-w-5xl">
              <div className="nova-glass-island flex flex-col items-start gap-6 border border-nova-cyan/20 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    For schools & colleges
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">NOVA Partnership</h2>
                  <p className="mt-3 max-w-xl text-sm text-nova-cyan-light/85">
                    License {NOVA_SCHOOL.name}, {NOVA_COLLEGE.name}, and {NOVA_LANGUAGE.name} for your
                    institution — curriculum, platform, facilitator guides, and verifiable certificates.
                    No in-house STEM experts required.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <Link href={PARTNERSHIP_APPLY_PATH} className="nova-btn-primary nova-btn-glow inline-flex">
                    Register your institution
                  </Link>
                  <Link
                    href="/partnership"
                    className="nova-btn-secondary inline-flex border-white/20 text-white"
                  >
                    View benefits
                  </Link>
                </div>
              </div>
            </section>

            <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-nova-cyan-light/75">
              Official merchandise is available in{" "}
              <Link href={NOVA_SHOP.path} className="font-semibold text-nova-cyan underline-offset-2 hover:underline">
                {NOVA_SHOP.name}
              </Link>
              {" · "}
              Edición en español:{" "}
              <Link href="/es" className="text-nova-cyan underline-offset-2 hover:underline">
                Español
              </Link>
              {" · "}
              Português:{" "}
              <Link href="/pt" className="text-nova-cyan underline-offset-2 hover:underline">
                Português
              </Link>
            </p>
          </div>
        </section>
      </main>

      </div>
  );
}
