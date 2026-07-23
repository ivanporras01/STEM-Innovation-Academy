/**
 * NOVA STEM HUB umbrella — single source of truth for product naming, URLs, and ladder.
 *
 * Architecture:
 *   NOVA STEM HUB (mother) → NOVA School + NOVA College + NOVA Language + NOVA Shop
 *   QCW (Quantum Computing Workforce) = NOVA College Tier 2 program — NOT a sibling product
 *
 * Related repos:
 *   - This app: NOVA College curriculum + NOVA School LMS
 *   - quantum-workforce-academy: QCW interactive delivery app (College program layer)
 */

export const NOVA_STEM_HUB = {
  name: "NOVA STEM HUB",
  tagline: "Where STEM careers begin",
  taglineEs: "Donde comienzan las carreras STEM",
  taglinePt: "Onde começam as carreiras STEM",
  /** Hub landing hero — professional entry message (not the nav tagline) */
  heroHeadline: "Explore the frontier of STEM education",
  heroSubhead:
    "Three integrated programs — youth exploration, technical employability tracks, and language learning — united in one global ecosystem with verifiable credentials and institutional partnerships.",
  heroHeadlineEs: "Explora la frontera de la educación STEM",
  heroSubheadEs:
    "Tres programas integrados — exploración juvenil, empleabilidad técnica e idiomas — en un ecosistema global con certificados verificables y alianzas institucionales.",
  heroHeadlinePt: "Explore a fronteira da educação STEM",
  heroSubheadPt:
    "Três programas integrados — exploração juvenil, empregabilidade técnica e idiomas — em um ecossistema global com certificados verificáveis e parcerias institucionais.",
  /** Essential NOVA STEM HUB mission — featured on hub landing hero */
  missionStatement:
    "Empowering future innovators through practical STEM education, emerging technologies, mentorship, and authentic projects.",
  missionStatementEs:
    "Empoderando a futuros innovadores con educación STEM práctica, tecnologías emergentes, mentoría y proyectos auténticos.",
  missionStatementPt:
    "Empoderando futuros inovadores com educação STEM prática, tecnologias emergentes, mentoria e projetos autênticos.",
  /** Primary go-to-market product under the umbrella */
  entryProduct: "college" as const,
  entryPath: "/college",
  verifyUrl: "https://verify.novastemhub.education",
  /** Planned production domains — update when DNS is live */
  domains: {
    hub: "https://novastemhub.education",
    school: "https://school.novastemhub.education",
    college: "https://college.novastemhub.education",
    /** QCW delivery subdomain — serves College quantum program, not a separate product */
    qcwDelivery: "https://qcw.novastemhub.education",
    /** @deprecated Use qcwDelivery */
    qwaDelivery: "https://qcw.novastemhub.education",
    verify: "https://verify.novastemhub.education",
  },
  deliveryModel: {
    b2c: "Direct enrollment · online request",
    b2b: "Institutional license · curriculum + platform + facilitator guide",
  },
  path: "/",
  pathEs: "/es",
  pathPt: "/pt",
  metadataTitle: "NOVA STEM HUB — STEM Education Ecosystem",
  metadataTemplate: "%s | NOVA STEM HUB",
  homeLabel: "NOVA STEM HUB Home",
} as const;

/** @deprecated Use NOVA_STEM_HUB */
export const NOVAHUB = NOVA_STEM_HUB;

/** K-12 / middle & high school — youth line under NOVA STEM HUB (parallel to College). */
export const NOVA_SCHOOL = {
  shortName: "NOVA",
  name: "School",
  tagline: "STEM Innovation for Young Explorers",
  taglinePt: "Inovação STEM para jovens Explorers",
  fullTitle: "School — STEM Innovation for Young Explorers",
  description:
    "NOVA School helps middle and high school learners explore technology, develop practical skills, build meaningful projects, and grow into confident innovators.",
  portalName: "NOVA School Portal",
  homeLabel: "School Home",
  metadataTitle: "School — STEM Innovation for Young Explorers",
  metadataTemplate: "%s | NOVA STEM HUB",
  pillars: "Learn • Build • Innovate • Inspire",
  electiveCount: 9,
  path: "/school",
  pathEs: "/es/school",
  /** Mission Paths catalog (LMS courses) — not the product homepage */
  coursesPath: "/courses",
} as const;

/** @deprecated Use NOVA_SCHOOL */
export const NOVA_ACADEMY = NOVA_SCHOOL;

/** English · Spanish · Portuguese — structured language programs under NOVA STEM HUB. */
export const NOVA_LANGUAGE = {
  name: "Languages",
  tagline: "English · Spanish · Portuguese — learn with confidence",
  taglineEs: "Inglés · Español · Portugués — aprende con confianza",
  taglinePt: "Inglês · Espanhol · Português — aprenda com confiança",
  description:
    "Three CEFR-aligned language programs with speaking labs, cultural context, and verifiable completion certificates. License for schools and institutions.",
  descriptionEs:
    "Tres programas de idiomas alineados al MCER con labs de conversación, contexto cultural y certificados verificables. Licencia para colegios e instituciones.",
  descriptionPt:
    "Três programas de idiomas alinhados ao CEFR com labs de conversação, contexto cultural e certificados verificáveis. Licença para escolas e instituições.",
  metadataTitle: "Languages — NOVA STEM HUB",
  metadataTemplate: "%s | NOVA STEM HUB",
  courseCount: 3,
  path: "/language",
  pathEs: "/es/language",
  pathPt: "/pt/language",
} as const;

/** NOVA-branded merchandise — apparel, accessories, and stationery for Explorers worldwide. */
export const NOVA_SHOP = {
  name: "NOVA Shop",
  heroTitle: "Shop",
  tagline: "Wear the mission",
  taglineEs: "Viste la misión",
  taglinePt: "Vista a missão",
  description:
    "NOVA-branded apparel, accessories, and stationery — for Explorers, mentors, and STEM fans everywhere.",
  metadataTitle: "NOVA Shop — NOVA STEM HUB",
  metadataTemplate: "%s | NOVA Shop",
  path: "/shop",
  pathEs: "/es/shop",
  cartPath: "/shop/cart",
  cartPathEs: "/es/shop/cart",
  contactEmail: "shop@steminnovationacademy.org",
} as const;

/** Technical employability tracks (16–25+) — NOVA STEM HUB entry product. Curriculum in src/data/nova-college. */
export const NOVA_COLLEGE = {
  name: "College",
  tagline: "From classroom to first tech job",
  taglineEs: "Del aula al primer empleo tech",
  taglinePt: "Da sala de aula ao primeiro emprego tech",
  description:
    "~120-hour technical programs, verifiable certificates, aligned to CompTIA, ETA, IBM Quantum, and more. B2B licensing for technical schools and community colleges.",
  descriptionEs:
    "Programas técnicos de ~120 horas, certificados verificables, alineados a CompTIA, ETA, IBM Quantum y más. Modelo B2B para colegios técnicos y community colleges.",
  descriptionPt:
    "Programas técnicos de ~120 horas, certificados verificables, alineados a CompTIA, ETA, IBM Quantum y mais. Modelo B2B para colégios técnicos e community colleges.",
  metadataTitle: "College — NOVA STEM HUB",
  metadataTemplate: "%s | NOVA STEM HUB",
  isEntryProduct: true,
  ages: "16–25+",
  path: "/college",
  pathEs: "/es/college",
  trackCount: 10,
  tier1TrackCount: 9,
  format: {
    hours: 120,
    theoryPercent: 40,
    labsPercent: 40,
    softSkillsPercent: 10,
    examPrepPercent: 10,
  },
} as const;

/**
 * Quantum Computing Workforce (QCW) — NOVA College Tier 2 advanced program.
 * Interactive delivery runs in the QCW app; catalog, enrollment, and certificates live in College.
 */
export const QUANTUM_WORKFORCE = {
  name: "Quantum Computing Workforce",
  shortName: "QCW",
  /** Branded program name within NOVA College — not a separate academy */
  programLabel: "Quantum Computing Workforce (QCW)",
  tagline: "Industry-ready quantum computing workforce development",
  taglineEs: "Desarrollo de fuerza laboral en computación cuántica industry-ready",
  tier: "advanced" as const,
  parentProduct: NOVA_COLLEGE.name,
  parentPath: NOVA_COLLEGE.path,
  trackSlug: "quantum-workforce",
  trackPath: "/college/quantum-workforce",
  appUrl: "https://quantum-workforce-academy.vercel.app",
  courseSlug: "quantum-computing-workforce-development",
  verifyPrefix: "NOVA-COL-QNT",
  repo: "quantum-workforce-academy",
  prerequisites: ["Python intro", "College algebra", "NOVA College track recommended"],
} as const;

/** NOVA College employability tiers — QCW is Tier 2 program within College, not a separate product. */
export const NOVA_COLLEGE_TIERS = [
  {
    order: 1,
    tier: "Tier 1",
    product: NOVA_COLLEGE.name,
    label: "Technical employability",
    ages: NOVA_COLLEGE.ages,
    focus: "8 entry-level tracks · ~120h · verifiable certificates",
    path: NOVA_COLLEGE.path,
  },
  {
    order: 2,
    tier: "Tier 2",
    product: QUANTUM_WORKFORCE.programLabel,
    label: QUANTUM_WORKFORCE.shortName,
    ages: "18+",
    focus: "Advanced quantum computing · Qiskit · QCW interactive delivery",
    path: QUANTUM_WORKFORCE.trackPath,
    slug: QUANTUM_WORKFORCE.trackSlug,
    deliveryAppUrl: QUANTUM_WORKFORCE.appUrl,
  },
] as const;

/** @deprecated Use NOVA_COLLEGE_TIERS — kept for impact/mission ladder imports */
export const NOVAHUB_LADDER = NOVA_COLLEGE_TIERS;
export const NOVA_STEM_HUB_LADDER = NOVA_COLLEGE_TIERS;

/** Products under NOVA STEM HUB — School, College, and Language. QCW lives inside College programs. */
export const NOVA_STEM_HUB_PRODUCTS = [
  {
    order: 1,
    product: NOVA_SCHOOL.name,
    tier: "Youth",
    ages: "Middle & High School",
    focus: `${NOVA_SCHOOL.electiveCount} electives · Mission Paths · buddies`,
    path: NOVA_SCHOOL.path,
    role: "youth" as const,
  },
  {
    order: 2,
    product: NOVA_COLLEGE.name,
    tier: "Entry",
    ages: NOVA_COLLEGE.ages,
    focus: `${NOVA_COLLEGE.trackCount} tracks including ${QUANTUM_WORKFORCE.shortName} · verifiable certificates`,
    path: NOVA_COLLEGE.path,
    role: "entry" as const,
  },
  {
    order: 3,
    product: NOVA_LANGUAGE.name,
    tier: "Languages",
    ages: "All ages",
    focus: `${NOVA_LANGUAGE.courseCount} courses · English · Spanish · Portuguese · CEFR-aligned`,
    path: NOVA_LANGUAGE.path,
    role: "language" as const,
  },
] as const;

/** @deprecated Use NOVA_STEM_HUB_PRODUCTS */
export const NOVAHUB_PRODUCTS = NOVA_STEM_HUB_PRODUCTS;

export type NovaStemHubProduct = "school" | "college" | "language";
/** @deprecated Use NovaStemHubProduct */
export type NovaHubProduct = NovaStemHubProduct;

export function getNovaStemHubProductMeta(product: NovaStemHubProduct) {
  switch (product) {
    case "school":
      return NOVA_SCHOOL;
    case "college":
      return NOVA_COLLEGE;
    case "language":
      return NOVA_LANGUAGE;
  }
}

/** @deprecated Use getNovaStemHubProductMeta */
export function getNovaHubProductMeta(product: NovaStemHubProduct) {
  return getNovaStemHubProductMeta(product);
}

/** College program metadata — e.g. QCW quantum track delivery layer. */
export function getCollegeProgramMeta(slug: typeof QUANTUM_WORKFORCE.trackSlug) {
  if (slug === QUANTUM_WORKFORCE.trackSlug) return QUANTUM_WORKFORCE;
  return undefined;
}

function isLocalePath(pathname: string, segment: string): boolean {
  return pathname.startsWith(`/${segment}`) || pathname.startsWith(`/${segment}/`);
}

/** Navbar brand — always NOVA STEM HUB (product name lives in page hero + nav tabs). */
export function getNavBrandContext(pathname: string) {
  const isEs = isLocalePath(pathname, "es");
  const isPt = isLocalePath(pathname, "pt");

  return {
    name: NOVA_STEM_HUB.name,
    tagline: isPt
      ? NOVA_STEM_HUB.taglinePt
      : isEs
        ? NOVA_STEM_HUB.taglineEs
        : NOVA_STEM_HUB.tagline,
    homeHref: isPt ? NOVA_STEM_HUB.pathPt : isEs ? NOVA_STEM_HUB.pathEs : NOVA_STEM_HUB.path,
    homeLabel: NOVA_STEM_HUB.homeLabel,
  };
}
