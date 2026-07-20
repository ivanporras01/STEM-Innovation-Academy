/**
 * NOVA STEM HUB impact layer — mission, access tiers, pillars, and aspirational goals.
 * College-first: employability for students without access to quality tech training.
 */

import { NOVA_COLLEGE, NOVA_STEM_HUB, NOVA_STEM_HUB_LADDER } from "./novahub-brand";

export const NOVA_STEM_HUB_MISSION = {
  headlineEs: "Empleabilidad real para quienes no tienen acceso",
  headlineEn: "Real employability for those without access",
  bodyEs:
    `${NOVA_STEM_HUB.name} existe para que estudiantes sin oportunidades reales de aprendizaje técnico accedan a empleabilidad verificable — con o sin hardware, con o sin expertos en el aula.`,
  bodyEn:
    `${NOVA_STEM_HUB.name} exists so students without real technical learning opportunities can access verifiable employability — with or without hardware, with or without expert teachers in the classroom.`,
  visionEs:
    "Un ecosistema global donde cada joven pueda subir del aula al primer empleo tech — y más allá, hacia la computación cuántica.",
  visionEn:
    "A global ecosystem where every young person can climb from classroom to first tech job — and beyond, toward quantum computing.",
  callToActionEs: "Cada beca es una puerta hacia certificados verificables y primer empleo.",
  callToActionEn: "Every scholarship is a door to verifiable certificates and a first tech job.",
} as const;

/** @deprecated Use NOVA_STEM_HUB_MISSION */
export const NOVAHUB_MISSION = NOVA_STEM_HUB_MISSION;

/** How students and institutions reach NOVA College content. */
export const NOVA_STEM_HUB_ACCESS_TIERS = [
  {
    id: "institutional" as const,
    labelEs: "Institucional",
    labelEn: "Institutional",
    descriptionEs:
      "Licencia B2B para colegios técnicos y centros de formación. Currículo + plataforma + guía del facilitador.",
    descriptionEn:
      "B2B license for technical schools and training centers. Curriculum + platform + facilitator guide.",
    status: "active" as const,
    ctaEs: "Aliarse como institución",
    ctaEn: "Become a NOVA Partner",
    ctaHref: "/partnership",
  },
  {
    id: "scholarship" as const,
    labelEs: "Beca",
    labelEn: "Scholarship",
    descriptionEs:
      "Acceso subsidiado o gratuito para estudiantes sin recursos suficientes. Cupos limitados — revisión humana.",
    descriptionEn:
      "Subsidized or free access for underserved students worldwide. Limited seats — human review.",
    status: "pilot" as const,
    ctaEs: "Solicitar beca",
    ctaEn: "Apply for scholarship",
    ctaHref: "/scholarships/apply",
  },
  {
    id: "direct" as const,
    labelEs: "Matrícula directa",
    labelEn: "Direct enrollment",
    descriptionEs:
      "Inscripción individual B2C para quienes pueden pagar. Financia becas y contenido abierto a largo plazo.",
    descriptionEn:
      "Individual B2C enrollment for those who can pay. Helps fund scholarships and open content long-term.",
    status: "roadmap" as const,
    ctaEs: "Explorar NOVA College",
    ctaHref: NOVA_COLLEGE.path,
  },
  {
    id: "open" as const,
    labelEs: "Recursos abiertos",
    labelEn: "Open resources",
    descriptionEs:
      "Módulos introductorios gratuitos para explorar antes de matricularse. Roadmap — sin certificado verificable.",
    descriptionEn:
      "Free intro modules to explore before enrolling. Roadmap — no verifiable certificate.",
    status: "roadmap" as const,
    ctaEs: "Ver catálogo",
    ctaHref: NOVA_COLLEGE.path,
  },
] as const;

/** @deprecated Use NOVA_STEM_HUB_ACCESS_TIERS */
export const NOVAHUB_ACCESS_TIERS = NOVA_STEM_HUB_ACCESS_TIERS;

export const NOVA_STEM_HUB_IMPACT_PILLARS = [
  {
    id: "employability" as const,
    titleEs: "Empleabilidad real",
    titleEn: "Real employability",
    descriptionEs:
      "Tracks alineados a CompTIA, ETA, IBM Quantum y más. El objetivo es el primer empleo tech, no solo un diploma.",
    descriptionEn:
      "Tracks aligned to CompTIA, ETA, IBM Quantum, and more. The goal is a first tech job, not just a diploma.",
  },
  {
    id: "verifiable-certs" as const,
    titleEs: "Certificados verificables",
    titleEn: "Verifiable certificates",
    descriptionEs:
      "Código único en verify.novastemhub.education — empleadores pueden confirmar competencias.",
    descriptionEn:
      "Unique code at verify.novastemhub.education — employers can confirm competencies.",
  },
  {
    id: "facilitator-guided" as const,
    titleEs: "Guiado por facilitadores",
    titleEn: "Facilitator-guided",
    descriptionEs:
      "No se requieren profesores expertos. Una guía del facilitador permite escalar en colegios con recursos limitados.",
    descriptionEn:
      "No expert teachers required. A facilitator guide enables scaling in schools with limited resources.",
  },
  {
    id: "global-access" as const,
    titleEs: "Acceso global",
    titleEn: "Global access",
    descriptionEs:
      "Contenido en inglés con edición en español bajo /es — diseñado para instituciones y estudiantes en cualquier región.",
    descriptionEn:
      "English default with a Spanish edition under /es — built for institutions and learners anywhere in the world.",
  },
] as const;

/** @deprecated Use NOVA_STEM_HUB_IMPACT_PILLARS */
export const NOVAHUB_IMPACT_PILLARS = NOVA_STEM_HUB_IMPACT_PILLARS;

/** Honest aspirational targets — labeled as "objetivo" in UI. */
export const NOVA_STEM_HUB_IMPACT_GOALS = [
  {
    id: "students-served",
    metricEs: "10,000+ estudiantes formados",
    metricEn: "10,000+ students trained",
    objetivo: true,
    timeframe: "2030",
    noteEs: "Meta acumulada — College + becas + instituciones aliadas.",
    noteEn: "Cumulative goal — College + scholarships + partner institutions.",
  },
  {
    id: "scholarships",
    metricEs: "500+ becas NOVA STEM HUB",
    metricEn: "500+ NOVA STEM HUB scholarships",
    objetivo: true,
    timeframe: "2028",
    noteEs: "Cupos subsidiados para estudiantes sin acceso.",
    noteEn: "Subsidized seats for students without access.",
  },
  {
    id: "partner-institutions",
    metricEs: "50+ instituciones aliadas",
    metricEn: "50+ partner institutions",
    objetivo: true,
    timeframe: "2028",
    noteEs: "Colegios técnicos y centros de formación en todo el mundo.",
    noteEn: "Technical schools and training centers worldwide.",
  },
  {
    id: "tracks-live",
    metricEs: `${NOVA_COLLEGE.trackCount} tracks NOVA College`,
    metricEn: `${NOVA_COLLEGE.trackCount} NOVA College tracks`,
    objetivo: true,
    timeframe: "2026",
    noteEs: `Catálogo publicado — ${NOVA_COLLEGE.trackCount} tracks incl. programa QCW (Tier 2 College).`,
    noteEn: `Published catalog — ${NOVA_COLLEGE.trackCount} tracks incl. QCW program (College Tier 2).`,
  },
] as const;

/** @deprecated Use NOVA_STEM_HUB_IMPACT_GOALS */
export const NOVAHUB_IMPACT_GOALS = NOVA_STEM_HUB_IMPACT_GOALS;

/** College tiers with impact context for mission page — QCW links to College track, not standalone product. */
export const NOVA_STEM_HUB_IMPACT_LADDER = NOVA_STEM_HUB_LADDER.map((step) => ({
  ...step,
  cta: step.path,
  external: false as const,
  deliveryAppUrl: "deliveryAppUrl" in step ? step.deliveryAppUrl : undefined,
}));

/** @deprecated Use NOVA_STEM_HUB_IMPACT_LADDER */
export const NOVAHUB_IMPACT_LADDER = NOVA_STEM_HUB_IMPACT_LADDER;

export type NovaStemHubAccessTierId = (typeof NOVA_STEM_HUB_ACCESS_TIERS)[number]["id"];
export type NovaStemHubImpactPillarId = (typeof NOVA_STEM_HUB_IMPACT_PILLARS)[number]["id"];
/** @deprecated */
export type NovaHubAccessTierId = NovaStemHubAccessTierId;
/** @deprecated */
export type NovaHubImpactPillarId = NovaStemHubImpactPillarId;

export type RoadmapStatus = "done" | "in_progress" | "planned";

export const NOVA_STEM_HUB_ROADMAP_ES = [
  {
    phase: "Fundación",
    status: "done" as RoadmapStatus,
    items: [
      "Marca NOVA STEM HUB + NOVA College como entrada",
      `${NOVA_COLLEGE.trackCount} tracks currículo (~120h c/u)`,
      "Catálogo /college + detalle por track",
      "Becas MVP + formulario + admin review",
      "Misión /mission + docs IMPACT",
    ],
  },
  {
    phase: "Plataforma",
    status: "in_progress" as RoadmapStatus,
    items: [
      "Visor de lecciones College (teoría rich content)",
      "Portal verify.novastemhub.education (/verify MVP)",
      "Panel admin becas",
      "Enrollment NOVA College en LMS",
    ],
  },
  {
    phase: "Escala",
    status: "planned" as RoadmapStatus,
    items: [
      "Stripe matrícula directa B2C",
      "Dashboard institucional B2B",
      "Emisión real de certificados post-capstone",
      "Edición en español completa bajo /es",
      "Dominio novastemhub.education + DNS",
    ],
  },
  {
    phase: "Impacto",
    status: "planned" as RoadmapStatus,
    items: [
      "500+ becas (objetivo 2028)",
      "50+ instituciones aliadas",
      "Enrollment programa QCW (Tier 2 College)",
      "Módulos abiertos gratuitos (sin cert)",
    ],
  },
] as const;

/** @deprecated Use NOVA_STEM_HUB_ROADMAP_ES */
export const NOVAHUB_ROADMAP_ES = NOVA_STEM_HUB_ROADMAP_ES;

export const NOVA_STEM_HUB_ROADMAP = [
  {
    phase: "Foundation",
    status: "done" as RoadmapStatus,
    items: [
      "NOVA STEM HUB brand + NOVA College as entry product",
      "9 curriculum tracks (~120h each)",
      "Catalog at /college + per-track detail pages",
      "Scholarships MVP + application form + admin review",
      "Mission page /mission + impact docs",
    ],
  },
  {
    phase: "Platform",
    status: "in_progress" as RoadmapStatus,
    items: [
      "College lesson viewer (rich theory content)",
      "verify.novastemhub.education portal (/verify MVP)",
      "Scholarship admin panel",
      "NOVA College enrollment in LMS",
    ],
  },
  {
    phase: "Scale",
    status: "planned" as RoadmapStatus,
    items: [
      "Stripe direct B2C enrollment",
      "Institutional B2B dashboard",
      "Real certificate issuance post-capstone",
      "Full Spanish edition i18n under /es/*",
      "novastemhub.education domain + DNS",
    ],
  },
  {
    phase: "Impact",
    status: "planned" as RoadmapStatus,
    items: [
      "500+ scholarships (2028 goal)",
      "50+ partner institutions",
      "QCW Tier 2 enrollment integration",
      "Free open modules (no certificate)",
    ],
  },
] as const;

/** @deprecated Use NOVA_STEM_HUB_ROADMAP */
export const NOVAHUB_ROADMAP = NOVA_STEM_HUB_ROADMAP;

/** Consolidated impact paths + copy for nav and homepage sections. */
export const NOVA_STEM_HUB_IMPACT = {
  missionPath: "/mission",
  partnershipPath: "/partnership",
  partnershipApplyPath: "/partnership/apply",
  scholarshipsPath: "/scholarships",
  applyPath: "/scholarships/apply",
  verifyPath: "/verify",
  roadmapPath: "/roadmap",
  contactEmail: "info@steminnovationacademy.org",
  mission: {
    headline: NOVA_STEM_HUB_MISSION.headlineEn,
    body: NOVA_STEM_HUB_MISSION.bodyEn,
    vision: NOVA_STEM_HUB_MISSION.visionEn,
    callToAction: NOVA_STEM_HUB_MISSION.callToActionEn,
    /** @deprecated Use headline/body — Spanish edition only under /es */
    es: NOVA_STEM_HUB_MISSION.bodyEs,
    en: NOVA_STEM_HUB_MISSION.bodyEn,
    visionEs: NOVA_STEM_HUB_MISSION.visionEs,
    visionEn: NOVA_STEM_HUB_MISSION.visionEn,
  },
  pillars: NOVA_STEM_HUB_IMPACT_PILLARS.map((p) => ({
    id: p.id,
    title: p.titleEn,
    description: p.descriptionEn,
    titleEs: p.titleEs,
    descriptionEs: p.descriptionEs,
  })),
  accessTiers: NOVA_STEM_HUB_ACCESS_TIERS,
  goals: NOVA_STEM_HUB_IMPACT_GOALS,
  ladder: NOVA_STEM_HUB_IMPACT_LADDER,
} as const;

/** @deprecated Use NOVA_STEM_HUB_IMPACT */
export const NOVAHUB_IMPACT = NOVA_STEM_HUB_IMPACT;
