import { novaSchoolElectives } from "@/data/nova-school";
import { novaCollegeCourses } from "@/data/nova-college";
import { novaLanguageCourses } from "@/data/nova-language";
import { formatCourseHours } from "@/lib/course-hours";
import type { LaunchBlocker, NovaProgram, ProgramBundle } from "./types";

const SCHOOL_TUITION: Record<string, { usd: number; demo?: { href: string; label: string } }> = {
  "gaming-game-design": { usd: 179 },
  "digital-marketing": { usd: 179 },
  "startup-business": { usd: 179 },
  "coding-ai": {
    usd: 249,
    demo: { href: "/experiences/restore-nova-signal", label: "Try mission: The Signal Goes Dark" },
  },
  "robotics-engineering": {
    usd: 249,
    demo: { href: "/experiences/rescue-rover", label: "Try mission: Rescue at Sector 7" },
  },
  "iot-smart-systems": {
    usd: 249,
    demo: { href: "/experiences/smart-greenhouse", label: "Try mission: Red Alert Greenhouse" },
  },
  "digital-content-creation": { usd: 179 },
  "cybersecurity-basics": { usd: 199 },
  "creative-tech-social-impact-teens": { usd: 179 },
};

const COLLEGE_TUITION: Record<string, number> = {
  "it-support-cloud-technician": 899,
  "cybersecurity-analyst": 949,
  "data-analytics-technician": 899,
  "iot-smart-systems-technician": 899,
  "robotics-automation-technician": 949,
  "intro-telecommunications": 849,
  "electronics-technician": 849,
  "digital-marketing-business": 749,
  "startup-innovation-digital-launch": 799,
  "quantum-workforce": 1899,
};

const LANGUAGE_TUITION: Record<string, number> = {
  english: 449,
  spanish: 449,
  portuguese: 449,
};

function schoolPrograms(): NovaProgram[] {
  return novaSchoolElectives.map((e) => {
    const pricing = SCHOOL_TUITION[e.slug] ?? { usd: 179 };
    const demo = e.experienceSlug
      ? {
          href: `/experiences/${e.experienceSlug}`,
          label: `Try mission: ${e.experienceTitle ?? e.title}`,
        }
      : pricing.demo;
    return {
      slug: e.slug,
      vertical: "school",
      tier: "youth",
      title: e.title,
      tagline: e.tagline,
      description: e.description,
      catalogHref: `/school/${e.slug}`,
      durationLabel: formatCourseHours(e.durationHours),
      contactHours: e.durationHours,
      ageRange: "Middle & High School",
      tuitionUsd: pricing.usd,
      tuitionLabel: `$${pricing.usd} / elective`,
      access: demo ? "demo-then-paid" : "paid",
      checkoutStatus: "ready",
      readiness: "ready",
      demoHref: demo?.href,
      demoLabel: demo?.label,
      highlights: e.highlights,
      deliveryNote: e.missionPathHref
        ? "Includes interactive Mission Path + mentor sessions"
        : "Project-based modules + Innovation Mentor check-ins",
    };
  });
}

function collegePrograms(): NovaProgram[] {
  return novaCollegeCourses.map((c) => ({
    slug: c.slug,
    vertical: "college",
    tier: c.tier === "advanced" ? "advanced" : "entry",
    title: c.title,
    tagline: c.tagline,
    description: c.description,
    catalogHref: `/college/${c.slug}`,
    durationLabel: formatCourseHours(c.durationHours),
    contactHours: c.durationHours,
    ageRange: "16–25+",
    tuitionUsd: COLLEGE_TUITION[c.slug] ?? 899,
    tuitionLabel:
      c.tier === "advanced"
        ? `$${COLLEGE_TUITION[c.slug] ?? 1899} / Tier 2 program`
        : `$${COLLEGE_TUITION[c.slug] ?? 899} / track`,
    access: "paid" as const,
    checkoutStatus: "ready",
    readiness: "ready",
    demoHref: c.slug === "quantum-workforce" ? "https://quantum-workforce-academy.vercel.app" : undefined,
    demoLabel:
      c.slug === "quantum-workforce" ? "Preview QCW interactive platform" : "Module 1 preview (post-launch)",
    certCode: c.verifyCertificatePrefix,
    certAlignment: c.certificationAlignment?.primary?.[0],
    highlights: c.learningOutcomes.slice(0, 4),
    deliveryNote:
      c.contentDelivery?.platform === "qcw"
        ? "Interactive labs in QCW app · Certificate NOVA-COL-QNT"
        : "QCW-style lessons · verifiable certificate · exam prep included",
  }));
}

function languagePrograms(): NovaProgram[] {
  return novaLanguageCourses.map((c) => ({
    slug: c.slug,
    vertical: "language",
    tier: "entry" as const,
    title: c.title,
    tagline: c.tagline,
    description: c.description,
    catalogHref: `/language/${c.slug}`,
    durationLabel: `${formatCourseHours(c.durationHours)} · ${c.cefrLevel}`,
    contactHours: c.durationHours,
    ageRange: c.ageRange,
    tuitionUsd: LANGUAGE_TUITION[c.slug] ?? 449,
    tuitionLabel: `$${LANGUAGE_TUITION[c.slug] ?? 449} / program`,
    access: "paid" as const,
    checkoutStatus: "ready",
    readiness: "ready",
    demoLabel: "Speaking lab demo (post-launch)",
    highlights: c.highlights,
    deliveryNote: "CEFR-aligned path · speaking labs · verifiable completion",
  }));
}

/** Master catalog — 22 programs (9 School + 10 College + 3 Language). */
export const NOVA_PROGRAM_CATALOG: readonly NovaProgram[] = [
  ...schoolPrograms(),
  ...collegePrograms(),
  ...languagePrograms(),
];

export const NOVA_PROGRAM_BUNDLES: readonly ProgramBundle[] = [
  {
    slug: "school-explorer-pass",
    title: "NOVA School Explorer Pass",
    description: "All 9 youth electives for one Explorer — best value for homeschool & gifted programs.",
    programSlugs: schoolPrograms().map((p) => p.slug),
    tuitionUsd: 1299,
    savingsUsd: 500,
    tuitionLabel: "$1,299 / year · save ~$500 vs individual",
  },
  {
    slug: "college-career-starter",
    title: "College Career Starter (pick 2)",
    description: "Choose any two Tier 1 employability tracks — stack skills for your first tech role.",
    programSlugs: collegePrograms()
      .filter((p) => p.tier === "entry")
      .map((p) => p.slug),
    tuitionUsd: 1499,
    savingsUsd: 300,
    tuitionLabel: "$1,499 · any 2 Tier 1 tracks",
  },
  {
    slug: "language-trilingual",
    title: "NOVA Language Trilingual Pack",
    description: "English, Spanish, and Portuguese — full CEFR paths for global learners.",
    programSlugs: languagePrograms().map((p) => p.slug),
    tuitionUsd: 999,
    savingsUsd: 348,
    tuitionLabel: "$999 · all 3 languages",
  },
];

export function getProgramBySlug(slug: string): NovaProgram | undefined {
  return NOVA_PROGRAM_CATALOG.find((p) => p.slug === slug);
}

export function getProgramsByVertical(vertical: NovaProgram["vertical"]): NovaProgram[] {
  return NOVA_PROGRAM_CATALOG.filter((p) => p.vertical === vertical);
}

export const CATALOG_STATS = {
  totalPrograms: NOVA_PROGRAM_CATALOG.length,
  school: getProgramsByVertical("school").length,
  college: getProgramsByVertical("college").length,
  language: getProgramsByVertical("language").length,
} as const;

/** Internal launch checklist — drives engineering priorities. */
export const LAUNCH_READINESS: readonly LaunchBlocker[] = [
  {
    id: "catalog-public",
    area: "content",
    title: "Unified program catalog (descriptions + tuition)",
    status: "done",
    note: "/catalog live with all 21 programs.",
  },
  {
    id: "stripe-checkout",
    area: "payments",
    title: "Stripe Checkout + webhooks",
    status: "pending",
    note: "Create Payment record → Enrollment only after PAID.",
  },
  {
    id: "access-gate",
    area: "access",
    title: "Lesson gate: paid OR demo mission",
    status: "partial",
    note: "/courses/* gated; college/language lesson routes require ACTIVE enrollment.",
  },
  {
    id: "course-db-sync",
    area: "content",
    title: "Sync 21 programs to Prisma CourseProduct",
    status: "partial",
    note: "ensureProgramCourse + seed sync curriculum into LMS for all verticals; pathway trio remains source of truth for Coding/Robotics/IoT.",
  },
  {
    id: "school-demos",
    area: "content",
    title: "School demo missions marked isDemo",
    status: "done",
    note: "All 9 School electives expose a public NOVA Experience before paid enrollment.",
  },
  {
    id: "domain-dns",
    area: "infra",
    title: "Production domain novastemhub.education",
    status: "pending",
    note: "Point DNS to Vercel; subdomains school/college/qcw/verify.",
  },
  {
    id: "email-transactional",
    area: "ops",
    title: "Receipt + welcome email on purchase",
    status: "pending",
    note: "Resend or SendGrid integration.",
  },
  {
    id: "scholarship-bypass",
    area: "payments",
    title: "Scholarship approval unlocks enrollment",
    status: "partial",
    note: "Apply flow exists; admin approve → free access not wired.",
  },
  {
    id: "qcw-sso",
    area: "access",
    title: "QCW app enrollment token from NOVA paywall",
    status: "pending",
    note: "Quantum track bridges to external app after payment.",
  },
  {
    id: "cert-verify",
    area: "ops",
    title: "Certificate issuance on completion",
    status: "partial",
    note: "/verify page live; auto-issue on track complete pending.",
  },
];

export const RECOMMENDED_HOSTING = {
  primary: {
    platform: "Vercel Pro",
    role: "NOVA STEM HUB + NOVA School/College/Language frontends",
    why: "Already deployed, edge CDN, auto-scaling, preview branches, Neon integration.",
  },
  database: {
    platform: "Neon PostgreSQL",
    role: "Users, enrollments, payments, progress",
    why: "Serverless Postgres, scales with traffic, used in production build.",
  },
  dns: {
    platform: "Cloudflare",
    role: "DNS + DDoS + optional WAF in front of Vercel",
    why: "Enterprise-grade protection; keep Vercel as origin.",
  },
  domains: {
    apex: "novastemhub.education",
    subdomains: ["school", "college", "language", "qcw", "verify", "shop"],
  },
  payments: "Stripe",
  email: "Resend (transactional)",
  quantumApp: "Vercel — quantum-workforce-academy → qcw.novastemhub.education",
} as const;
