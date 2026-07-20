"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NOVA_FOOTER_EXPLORE,
  NOVA_FOOTER_EXPLORE_ES,
  NOVA_FOOTER_EXPLORE_PT,
  NOVA_FOOTER_PORTAL,
  NOVA_STEM_HUB_FOOTER_ECOSYSTEM,
  NOVA_STEM_HUB_FOOTER_ECOSYSTEM_ES,
  NOVA_STEM_HUB_FOOTER_ECOSYSTEM_PT,
} from "@/lib/nova-nav";
import { getLocaleFromPath } from "@/lib/locale";
import { NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { NovaLogo } from "@/components/ui/nova-logo-mark";

const MISSION_BY_LOCALE = {
  en: NOVA_STEM_HUB.missionStatement,
  es: NOVA_STEM_HUB.missionStatementEs,
  pt: NOVA_STEM_HUB.missionStatementPt,
} as const;

const COPY = {
  en: {
    partOf: "Part of",
    ecosystem: "Ecosystem",
    explore: "Explore the Universe",
    portal: "Portal",
    principle: "Our Principle",
    principleText:
      "Every NOVA Explorer has the potential to learn, build, innovate, and inspire.",
  },
  es: {
    partOf: "Parte de",
    ecosystem: "Ecosistema",
    explore: "Explora el universo",
    portal: "Portal",
    principle: "Nuestro principio",
    principleText:
      "Cada Explorer NOVA tiene el potencial de aprender, construir, innovar e inspirar.",
  },
  pt: {
    partOf: "Parte de",
    ecosystem: "Ecossistema",
    explore: "Explore o universo",
    portal: "Portal",
    principle: "Nosso princípio",
    principleText:
      "Cada Explorer NOVA tem o potencial de aprender, construir, inovar e inspirar.",
  },
} as const;

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const copy = COPY[locale];
  const ecosystemLinks =
    locale === "es"
      ? NOVA_STEM_HUB_FOOTER_ECOSYSTEM_ES
      : locale === "pt"
        ? NOVA_STEM_HUB_FOOTER_ECOSYSTEM_PT
        : NOVA_STEM_HUB_FOOTER_ECOSYSTEM;
  const exploreLinks =
    locale === "es"
      ? NOVA_FOOTER_EXPLORE_ES
      : locale === "pt"
        ? NOVA_FOOTER_EXPLORE_PT
        : NOVA_FOOTER_EXPLORE;
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712]/50 text-white backdrop-blur-md">
      <div className="relative">
        <div className="nova-container grid gap-8 py-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="mb-4">
              <NovaLogo size="sm" />
              <span className="mt-2 block text-xs text-nova-cyan-light/60">
                {copy.partOf} {NOVA_STEM_HUB.name}
              </span>
            </div>
            <p className="text-sm text-nova-cyan-light/80">{MISSION_BY_LOCALE[locale]}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">
              {NOVA_STEM_HUB.name} {copy.ecosystem}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
              {ecosystemLinks.map((link) =>
                "external" in link && link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{copy.explore}</h3>
            <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
              {exploreLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {locale !== "pt" && (
            <div>
              <h3 className="mb-3 text-sm font-semibold">{copy.portal}</h3>
              <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
                {NOVA_FOOTER_PORTAL.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold">{copy.principle}</h3>
            <p className="text-sm italic text-nova-cyan-light/80">{copy.principleText}</p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="nova-container flex flex-col items-center justify-between gap-2 py-4 text-xs text-nova-cyan-light/60 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {NOVA_STEM_HUB.name}
            </p>
            <p>{NOVA_SCHOOL.pillars}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
