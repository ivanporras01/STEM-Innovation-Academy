/**
 * Single source of truth for public navigation — locale-aware via LOCALE_PATHS.
 */

import { LOCALE_PATHS, type AppLocale } from "@/lib/locale";
import { getNovaResourcePaths } from "@/lib/nova-resources";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { NOVA_STEM_HUB_IMPACT } from "@/lib/novahub-impact";
import { PARTNERSHIP_PATH } from "@/data/novahub/partnerships";

export type NovaNavItem = {
  href: string;
  label: string;
  description?: string;
};

export type NovaHeaderNavItem = NovaNavItem & {
  kind: "product" | "resources";
};

export type NovaNavSection = {
  title: string;
  links: readonly NovaNavItem[];
};

export type NovaStemHubNav = {
  /** Dropdown trigger — short label, not the full brand name */
  menuLabel: string;
  homeLabel: string;
  megaTitle: string;
  homeHref: string;
  sections: readonly NovaNavSection[];
  /** @deprecated flat list — derived from sections */
  links: readonly NovaNavItem[];
};

const STEM_HUB_LABELS = {
  en: {
    menuLabel: "NOVA Resources",
    homeLabel: "Hub overview",
    megaTitle: "NOVA Resources",
    sectionPrograms: "Programs",
    sectionFunding: "Funding",
    sectionCareers: "Careers",
    sectionInstitutions: "Institutions",
    catalog: "Program Catalog",
    catalogDesc: "21 programs — play demo missions, browse pricing & syllabi",
    enrollHub: "Enroll & Pay",
    enrollHubDesc: "Register, choose a program, pay online (students)",
    missionPaths: "School Mission Paths",
    missionPathsDesc: "Free demo missions for youth electives",
    verify: "Verify Certificate",
    verifyDesc: "Confirm NOVA credentials online",
    mission: "Mission & Impact",
    missionDesc: "Access tiers and our why",
    roadmap: "Roadmap",
    roadmapDesc: "What we are building next",
    novaScholarships: "NOVA Scholarships",
    novaScholarshipsDesc: "Funded by NOVA — apply online",
    partnerScholarships: "Partner Scholarships",
    partnerScholarshipsDesc: "Institutions, tech companies & NGOs — apply online",
    internships: "Internships",
    internshipsDesc: "STEM internships via NOVA network — apply online",
    partnership: "NOVA Partnership",
    partnershipDesc: "License School, College & Language",
    partnershipApply: "Partnership Application",
    partnershipApplyDesc: "Register your institution online",
    contact: "Contact",
    contactDesc: "Reach the NOVA STEM HUB team",
  },
  es: {
    menuLabel: "NOVA Resources",
    homeLabel: "Inicio del hub",
    megaTitle: "NOVA Resources",
    sectionPrograms: "Programas",
    sectionFunding: "Financiamiento",
    sectionCareers: "Carreras",
    sectionInstitutions: "Instituciones",
    catalog: "Catálogo de programas",
    catalogDesc: "21 programas — misiones demo gratis, precios y syllabus",
    enrollHub: "Inscribirse y pagar",
    enrollHubDesc: "Registro, programa y pago en línea (estudiantes)",
    missionPaths: "Mission Paths School",
    missionPathsDesc: "Misiones demo gratis para electivas juveniles",
    verify: "Verificar certificado",
    verifyDesc: "Confirma credenciales NOVA en línea",
    mission: "Misión e impacto",
    missionDesc: "Niveles de acceso y nuestro propósito",
    roadmap: "Roadmap",
    roadmapDesc: "Lo que estamos construyendo",
    novaScholarships: "Becas NOVA",
    novaScholarshipsDesc: "Financiadas por NOVA — solicitud en línea",
    partnerScholarships: "Becas de partners",
    partnerScholarshipsDesc: "Instituciones, tech companies y ONGs — solicitud en línea",
    internships: "Pasantías / Internships",
    internshipsDesc: "Pasantías STEM vía red NOVA — solicitud en línea",
    partnership: "NOVA Partnership",
    partnershipDesc: "Licencia School, College e Language",
    partnershipApply: "Solicitud de partnership",
    partnershipApplyDesc: "Registra tu institución en línea",
    contact: "Contacto",
    contactDesc: "Equipo NOVA STEM HUB",
  },
  pt: {
    menuLabel: "NOVA Resources",
    homeLabel: "Visão geral do hub",
    megaTitle: "NOVA Resources",
    sectionPrograms: "Programas",
    sectionFunding: "Financiamento",
    sectionCareers: "Carreiras",
    sectionInstitutions: "Instituições",
    catalog: "Catálogo de programas",
    catalogDesc: "21 programas — missões demo grátis, preços e syllabus",
    enrollHub: "Inscrever-se e pagar",
    enrollHubDesc: "Registo, programa e pagamento online (estudantes)",
    missionPaths: "Mission Paths School",
    missionPathsDesc: "Missões demo gratuitas para eletivas juvenis",
    verify: "Verificar certificado",
    verifyDesc: "Confirme credenciais NOVA online",
    mission: "Missão e impacto",
    missionDesc: "Níveis de acesso e nosso propósito",
    roadmap: "Roadmap",
    roadmapDesc: "O que estamos construindo",
    novaScholarships: "Bolsas NOVA",
    novaScholarshipsDesc: "Financiadas pela NOVA — candidatura online",
    partnerScholarships: "Bolsas de parceiros",
    partnerScholarshipsDesc: "Instituições, tech companies e ONGs — candidatura online",
    internships: "Estágios",
    internshipsDesc: "Estágios STEM via rede NOVA — candidatura online",
    partnership: "NOVA Partnership",
    partnershipDesc: "Licencie School, College e Language",
    partnershipApply: "Candidatura partnership",
    partnershipApplyDesc: "Registe a sua instituição online",
    contact: "Contacto",
    contactDesc: "Equipa NOVA STEM HUB",
  },
} as const;

function getContactPath(locale: AppLocale): string {
  const paths = LOCALE_PATHS[locale];
  return `${paths.school}#contact`;
}

/** NOVA Shop is not live yet — keep footer links for now, hide from header nav + cart. */
export const NOVA_SHOP_HEADER_ENABLED = false;

/** Primary product tabs — footer and ecosystem links (flat list, no mega-menu). */
export function getNovaPrimaryNav(locale: AppLocale): readonly NovaNavItem[] {
  const paths = LOCALE_PATHS[locale];
  const hub = getNovaStemHubNav(locale);
  return [
    { href: paths.school, label: NOVA_SCHOOL.name },
    { href: paths.college, label: NOVA_COLLEGE.name },
    { href: paths.language, label: NOVA_LANGUAGE.name },
    { href: "/ai-tutoring", label: "NOVA AI Tutoring" },
    { href: hub.homeHref, label: hub.menuLabel },
  ];
}

/**
 * Header ordering: School → College → Language → AI Tutoring → NOVA Resources.
 * Shop omitted until NOVA_SHOP_HEADER_ENABLED.
 */
export function getNovaHeaderNav(locale: AppLocale): readonly NovaHeaderNavItem[] {
  const paths = LOCALE_PATHS[locale];
  const hub = getNovaStemHubNav(locale);

  const items: NovaHeaderNavItem[] = [
    { href: paths.school, label: NOVA_SCHOOL.name, kind: "product" },
    { href: paths.college, label: NOVA_COLLEGE.name, kind: "product" },
    { href: paths.language, label: NOVA_LANGUAGE.name, kind: "product" },
    { href: "/ai-tutoring", label: "NOVA AI Tutoring", kind: "product" },
    { href: hub.homeHref, label: hub.menuLabel, kind: "resources" },
  ];

  if (NOVA_SHOP_HEADER_ENABLED) {
    items.push({ href: paths.shop, label: NOVA_SHOP.name, kind: "product" });
  }

  return items;
}

/** Secondary hub links — nested under NOVA STEM HUB in the header. */
export function getNovaStemHubNav(locale: AppLocale): NovaStemHubNav {
  const paths = LOCALE_PATHS[locale];
  const resources = getNovaResourcePaths(locale);
  const labels = STEM_HUB_LABELS[locale];

  const sections: readonly NovaNavSection[] = [
    {
      title: labels.sectionPrograms,
      links: [
        { href: "/enroll", label: labels.enrollHub, description: labels.enrollHubDesc },
        { href: paths.catalog, label: labels.catalog, description: labels.catalogDesc },
        { href: NOVA_SCHOOL.coursesPath, label: labels.missionPaths, description: labels.missionPathsDesc },
        { href: paths.verify, label: labels.verify, description: labels.verifyDesc },
        { href: paths.mission, label: labels.mission, description: labels.missionDesc },
        { href: paths.roadmap, label: labels.roadmap, description: labels.roadmapDesc },
      ],
    },
    {
      title: labels.sectionFunding,
      links: [
        {
          href: resources.novaScholarships,
          label: labels.novaScholarships,
          description: labels.novaScholarshipsDesc,
        },
        {
          href: resources.partnerScholarships,
          label: labels.partnerScholarships,
          description: labels.partnerScholarshipsDesc,
        },
      ],
    },
    {
      title: labels.sectionCareers,
      links: [
        { href: resources.internships, label: labels.internships, description: labels.internshipsDesc },
      ],
    },
    {
      title: labels.sectionInstitutions,
      links: [
        { href: paths.partnership, label: labels.partnership, description: labels.partnershipDesc },
        {
          href: resources.partnershipApply,
          label: labels.partnershipApply,
          description: labels.partnershipApplyDesc,
        },
        { href: getContactPath(locale), label: labels.contact, description: labels.contactDesc },
      ],
    },
  ];

  const flatLinks = sections.flatMap((s) => s.links);

  return {
    menuLabel: labels.menuLabel,
    homeLabel: labels.homeLabel,
    megaTitle: labels.megaTitle,
    homeHref: paths.hub,
    sections,
    links: flatLinks,
  };
}

/** Primary header tabs + NOVA Resources — same order as the shared navbar. */
export function getOrbitaMenuItems(locale: AppLocale): readonly NovaNavItem[] {
  return getNovaHeaderNav(locale);
}

/** @deprecated Use getNovaPrimaryNav("en") */
export const NOVA_PUBLIC_NAV = getNovaPrimaryNav("en");

/** @deprecated Use getNovaStemHubNav("en") */
export const NOVA_STEM_HUB_NAV = getNovaStemHubNav("en");

export const NOVA_FOOTER_EXPLORE = [
  ...getNovaPrimaryNav("en"),
  { href: PARTNERSHIP_PATH, label: "NOVA Partnership" },
  { href: getContactPath("en"), label: "Contact" },
] as const;

export const NOVA_STEM_HUB_FOOTER_ECOSYSTEM = [
  { href: NOVA_STEM_HUB.path, label: NOVA_STEM_HUB.name },
  ...getNovaPrimaryNav("en"),
  { href: PARTNERSHIP_PATH, label: "NOVA Partnership" },
  { href: NOVA_STEM_HUB_IMPACT.scholarshipsPath, label: "NOVA Scholarships" },
  { href: "/scholarships/partners", label: "Partner Scholarships" },
  { href: "/internships", label: "Internships" },
  { href: NOVA_STEM_HUB_IMPACT.verifyPath, label: "Verify Certificate" },
  { href: NOVA_STEM_HUB_IMPACT.roadmapPath, label: "Roadmap" },
  { href: NOVA_STEM_HUB_IMPACT.missionPath, label: "Mission & Impact" },
  { href: "/es", label: "Español" },
  { href: "/pt", label: "Português" },
] as const;

/** @deprecated Use NOVA_STEM_HUB_FOOTER_ECOSYSTEM */
export const NOVAHUB_FOOTER_ECOSYSTEM = NOVA_STEM_HUB_FOOTER_ECOSYSTEM;

export const NOVA_FOOTER_PORTAL = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/dashboard", label: NOVA_SCHOOL.portalName },
] as const;

export const NOVA_FOOTER_EXPLORE_ES = [
  ...getNovaPrimaryNav("es"),
  { href: LOCALE_PATHS.es.partnership, label: "NOVA Partnership" },
  { href: getContactPath("es"), label: "Contacto" },
] as const;

export const NOVA_STEM_HUB_FOOTER_ECOSYSTEM_ES = [
  { href: "/es", label: NOVA_STEM_HUB.name },
  ...getNovaPrimaryNav("es"),
  { href: LOCALE_PATHS.es.partnership, label: "NOVA Partnership" },
  { href: LOCALE_PATHS.es.scholarships, label: "Becas" },
  { href: LOCALE_PATHS.es.verify, label: "Verificar certificado" },
  { href: LOCALE_PATHS.es.roadmap, label: "Roadmap" },
  { href: LOCALE_PATHS.es.mission, label: "Misión e impacto" },
  { href: "/", label: "English edition" },
  { href: "/pt", label: "Português" },
] as const;

/** @deprecated Use NOVA_STEM_HUB_FOOTER_ECOSYSTEM_ES */
export const NOVAHUB_FOOTER_ECOSYSTEM_ES = NOVA_STEM_HUB_FOOTER_ECOSYSTEM_ES;

export const NOVA_FOOTER_EXPLORE_PT = [
  ...getNovaPrimaryNav("pt"),
  { href: LOCALE_PATHS.pt.partnership, label: "NOVA Partnership" },
  { href: getContactPath("pt"), label: "Contacto" },
] as const;

export const NOVA_STEM_HUB_FOOTER_ECOSYSTEM_PT = [
  { href: "/pt", label: NOVA_STEM_HUB.name },
  ...getNovaPrimaryNav("pt"),
  { href: LOCALE_PATHS.pt.partnership, label: "NOVA Partnership" },
  { href: LOCALE_PATHS.pt.scholarships, label: "Bolsas" },
  { href: LOCALE_PATHS.pt.verify, label: "Verificar certificado" },
  { href: LOCALE_PATHS.pt.roadmap, label: "Roadmap" },
  { href: LOCALE_PATHS.pt.mission, label: "Missão e impacto" },
  { href: "/", label: "English edition" },
  { href: "/es", label: "Español" },
] as const;

/** @deprecated Use getNovaPrimaryNav("es") */
export const NOVA_PUBLIC_NAV_ES = getNovaPrimaryNav("es");

/** @deprecated Use getNovaPrimaryNav("pt") */
export const NOVA_PUBLIC_NAV_PT = getNovaPrimaryNav("pt");
