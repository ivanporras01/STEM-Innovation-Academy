/**
 * NOVA Partnership — B2B institutional licensing for schools and colleges.
 */

import { NOVA_COLLEGE, NOVA_SCHOOL } from "@/lib/novahub-brand";

export const PARTNERSHIP_PATH = "/partnership";
export const PARTNERSHIP_APPLY_PATH = "/partnership/apply";
export const PARTNERSHIP_PAYMENT_PATH = "/partnership/apply/payment";

export const INSTITUTION_TYPES = [
  { id: "k12", labelEn: "K-12 / Middle & High School", labelEs: "K-12 / Secundaria y preparatoria" },
  { id: "technical", labelEn: "Technical / Vocational School", labelEs: "Colegio técnico / vocacional" },
  { id: "community-college", labelEn: "Community College", labelEs: "Community college" },
  { id: "university", labelEn: "University", labelEs: "Universidad" },
  { id: "training-center", labelEn: "Training Center / Bootcamp", labelEs: "Centro de formación / bootcamp" },
  { id: "other", labelEn: "Other", labelEs: "Otro" },
] as const;

export const PRODUCT_INTERESTS = [
  { id: "school", labelEn: NOVA_SCHOOL.name, labelEs: NOVA_SCHOOL.name },
  { id: "college", labelEn: NOVA_COLLEGE.name, labelEs: NOVA_COLLEGE.name },
  { id: "both", labelEn: "Both School & College", labelEs: "School y College" },
] as const;

export const PARTNERSHIP_BENEFITS_EN = [
  {
    icon: "📚",
    title: "Ready-to-teach curriculum",
    description: `${NOVA_SCHOOL.electiveCount} youth electives and ${NOVA_COLLEGE.trackCount} college tracks (~120h each) — no need to build STEM content from scratch.`,
  },
  {
    icon: "🖥️",
    title: "Licensed platform access",
    description:
      "Mission Paths, lesson delivery, progress tracking, and facilitator tools — your teachers focus on mentoring, not tooling.",
  },
  {
    icon: "🎓",
    title: "Verifiable certificates",
    description:
      "Students earn NOVA certificates employers can verify at verify.novastemhub.education — real employability outcomes.",
  },
  {
    icon: "👩‍🏫",
    title: "Facilitator guides included",
    description:
      "Structured facilitator guides so non-expert teachers can run labs, projects, and mentor sessions confidently.",
  },
  {
    icon: "🌎",
    title: "Bilingual & globally accessible",
    description:
      "English default product with a dedicated Spanish edition (/es) — accessible to institutions and learners worldwide.",
  },
  {
    icon: "🤝",
    title: "Dedicated partner onboarding",
    description:
      "Human onboarding, pilot planning, and co-branded rollout support — we grow with your institution.",
  },
] as const;

export const PARTNERSHIP_BENEFITS_ES = [
  {
    icon: "📚",
    title: "Currículo listo para enseñar",
    description: `${NOVA_SCHOOL.electiveCount} electivas juveniles y ${NOVA_COLLEGE.trackCount} tracks college (~120h c/u) — sin crear contenido STEM desde cero.`,
  },
  {
    icon: "🖥️",
    title: "Acceso licenciado a la plataforma",
    description:
      "Mission Paths, lecciones, seguimiento de progreso y herramientas para facilitadores — tus docentes se enfocan en mentoría.",
  },
  {
    icon: "🎓",
    title: "Certificados verificables",
    description:
      "Tus estudiantes obtienen certificados NOVA verificables en verify.novastemhub.education — empleabilidad real.",
  },
  {
    icon: "👩‍🏫",
    title: "Guías del facilitador incluidas",
    description:
      "Guías estructuradas para que docentes sin perfil técnico profundo dirijan labs, proyectos y sesiones con confianza.",
  },
  {
    icon: "🌎",
    title: "Bilingüe y acceso global",
    description:
      "Producto en inglés con edición en español dedicada (/es) — accesible para instituciones y estudiantes en cualquier región.",
  },
  {
    icon: "🤝",
    title: "Onboarding de partner dedicado",
    description:
      "Onboarding humano, plan piloto y soporte de lanzamiento co-branded — crecemos con tu institución.",
  },
] as const;

export const PARTNERSHIP_INCLUDES_EN = [
  {
    product: NOVA_SCHOOL.name,
    items: [
      `${NOVA_SCHOOL.electiveCount} elective catalog + Mission Paths`,
      "Explorer portal, buddies, and mentor session framework",
      "Institutional admin and cohort management (pilot)",
      "Facilitator guide per elective",
    ],
  },
  {
    product: NOVA_COLLEGE.name,
    items: [
      `${NOVA_COLLEGE.tier1TrackCount} Tier 1 employability tracks + QCW (Tier 2)`,
      "Rich lesson viewer and capstone rubrics",
      "Certificate issuance + verify portal integration",
      "Scholarship nomination pathway for your students",
    ],
  },
] as const;

export const PARTNERSHIP_INCLUDES_ES = [
  {
    product: NOVA_SCHOOL.name,
    items: [
      `${NOVA_SCHOOL.electiveCount} electivas + Mission Paths`,
      "Portal Explorer, buddies y marco de sesiones con mentores",
      "Admin institucional y gestión de cohortes (piloto)",
      "Guía del facilitador por electiva",
    ],
  },
  {
    product: NOVA_COLLEGE.name,
    items: [
      `${NOVA_COLLEGE.tier1TrackCount} tracks Tier 1 + QCW (Tier 2)`,
      "Visor de lecciones y rúbricas de capstone",
      "Emisión de certificados + portal verify",
      "Vía de nominación a becas para tus estudiantes",
    ],
  },
] as const;

export const PARTNERSHIP_FAQ_EN = [
  {
    question: "Who is NOVA Partnership for?",
    answer:
      "Schools, technical colleges, community colleges, and training centers that want licensed access to NOVA School and/or NOVA College — curriculum, platform, and facilitator support — without hiring a full in-house STEM team.",
  },
  {
    question: "Do we need expert STEM teachers?",
    answer:
      "No. Our B2B model includes facilitator guides designed so motivated teachers can run programs with mentor support. We recommend at least one tech-comfortable lead facilitator per cohort.",
  },
  {
    question: "What happens after we register?",
    answer:
      "Our partnerships team reviews your application within 5–7 business days, schedules a discovery call, and proposes a pilot scope (products, seat count, timeline, and licensing terms).",
  },
  {
    question: "Can we start with a pilot?",
    answer:
      "Yes. Most partners begin with a single cohort pilot — one elective or one college track — before scaling institution-wide.",
  },
] as const;

export const PARTNERSHIP_FAQ_ES = [
  {
    question: "¿Para quién es NOVA Partnership?",
    answer:
      "Colegios, institutos técnicos, community colleges y centros de formación que quieren acceso licenciado a NOVA School y/o NOVA College — currículo, plataforma y soporte al facilitador — sin armar un equipo STEM interno completo.",
  },
  {
    question: "¿Necesitamos docentes expertos en STEM?",
    answer:
      "No. Nuestro modelo B2B incluye guías del facilitador para que docentes motivados dirijan programas con apoyo de mentores. Recomendamos al menos un facilitador líder cómodo con tecnología por cohorte.",
  },
  {
    question: "¿Qué pasa después de registrarnos?",
    answer:
      "Nuestro equipo revisa tu solicitud en 5–7 días hábiles, agenda una llamada de discovery y propone un alcance piloto (productos, cupos, cronograma y términos de licencia).",
  },
  {
    question: "¿Podemos empezar con un piloto?",
    answer:
      "Sí. La mayoría de partners inician con un piloto de una cohorte — una electiva o un track college — antes de escalar a toda la institución.",
  },
] as const;
