"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NOVA_FOOTER_PORTAL,
  getNovaHeaderNav,
} from "@/lib/nova-nav";
import { getLocaleFromPath, LOCALE_PATHS } from "@/lib/locale";
import { getNovaResourcePaths } from "@/lib/nova-resources";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { NovaLogo } from "@/components/ui/nova-logo-mark";

const MISSION_BY_LOCALE = {
  en: NOVA_STEM_HUB.missionStatement,
  es: NOVA_STEM_HUB.missionStatementEs,
  pt: NOVA_STEM_HUB.missionStatementPt,
} as const;

const COPY = {
  en: {
    partOf: "Part of",
    products: "Programs",
    resources: "Resources",
    portal: "Portal",
    principle: "Our Principle",
    principleText:
      "Every NOVA Explorer has the potential to learn, build, innovate, and inspire.",
  },
  es: {
    partOf: "Parte de",
    products: "Programas",
    resources: "Recursos",
    portal: "Portal",
    principle: "Nuestro principio",
    principleText:
      "Cada Explorer NOVA tiene el potencial de aprender, construir, innovar e inspirar.",
  },
  pt: {
    partOf: "Parte de",
    products: "Programas",
    resources: "Recursos",
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
  const paths = LOCALE_PATHS[locale];
  const resources = getNovaResourcePaths(locale);
  const productLinks = getNovaHeaderNav(locale).map((item) => ({
    href: item.href,
    label: item.label,
  }));
  const resourceLinks = [
    { href: paths.catalog, label: locale === "es" ? "Catálogo" : locale === "pt" ? "Catálogo" : "Program Catalog" },
    { href: paths.partnership, label: "NOVA Partnership" },
    { href: resources.novaScholarships, label: locale === "es" ? "Becas NOVA" : locale === "pt" ? "Bolsas NOVA" : "NOVA Scholarships" },
    { href: resources.internships, label: locale === "es" ? "Pasantías" : locale === "pt" ? "Estágios" : "Internships" },
    { href: paths.verify, label: locale === "es" ? "Verificar certificado" : locale === "pt" ? "Verificar certificado" : "Verify Certificate" },
    { href: `${paths.school}#contact`, label: locale === "es" ? "Contacto" : locale === "pt" ? "Contacto" : "Contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712]/50 text-white backdrop-blur-md">
      <div className="relative">
        <div className="nova-container grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <NovaLogo size="sm" />
              <span className="mt-2 block text-xs text-nova-cyan-light/75">
                {copy.partOf} {NOVA_STEM_HUB.name}
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-nova-cyan-light/85">{MISSION_BY_LOCALE[locale]}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">{copy.products}</h3>
            <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/85">
              {productLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">{copy.resources}</h3>
            <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/85">
              {resourceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {locale !== "pt" && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">{copy.portal}</h3>
                <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/85">
                  {NOVA_FOOTER_PORTAL.map((link) => (
                    <Link key={link.href} href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">{copy.principle}</h3>
              <p className="text-sm italic leading-relaxed text-nova-cyan-light/85">{copy.principleText}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="nova-container flex flex-col items-center justify-between gap-3 py-5 text-xs text-nova-cyan-light/70 sm:flex-row">
            <p>© 2026 NOVA STEM HUB. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy" className="transition hover:text-white">
                {locale === "es" ? "Política de privacidad" : locale === "pt" ? "Política de privacidade" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                {locale === "es" ? "Términos de servicio" : locale === "pt" ? "Termos de serviço" : "Terms of Service"}
              </Link>
              <Link href="/cookies" className="transition hover:text-white">
                {locale === "es" ? "Política de cookies" : locale === "pt" ? "Política de cookies" : "Cookie Policy"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
