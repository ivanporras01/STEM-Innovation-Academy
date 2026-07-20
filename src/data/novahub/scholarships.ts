/**
 * NOVA STEM HUB scholarship (beca) programs — data-only, no enrollment logic.
 */

import {
  novaCollegeAdvancedTracks,
  novaCollegeEntryTracks,
} from "@/data/nova-college";

export type ScholarshipCoverage = "full" | "partial" | "track-specific";

export interface ScholarshipProgram {
  id: string;
  slug: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  eligibility: string[];
  eligibilityEs: string[];
  coverage: ScholarshipCoverage;
  tracksEligible: string[];
  /** Partial coverage note — honest seat limits */
  seatNote?: string;
  seatNoteEs?: string;
  applicationPath: string;
}

export interface ScholarshipApplicationField {
  id: string;
  label: string;
  labelEs: string;
  type: "text" | "email" | "number" | "select" | "textarea";
  required: boolean;
  placeholder?: string;
  placeholderEs?: string;
  options?: { value: string; label: string; labelEs: string }[];
}

const tier1Slugs = novaCollegeEntryTracks.map((c) => c.slug);
const quantumSlugs = novaCollegeAdvancedTracks.map((c) => c.slug);

export const SCHOLARSHIP_PROGRAMS: ScholarshipProgram[] = [
  {
    id: "techhub-beca",
    slug: "techhub-beca",
    name: "NOVA STEM HUB Scholarship",
    nameEs: "Beca NOVA STEM HUB",
    description:
      "Full or partial scholarship for underserved students aged 16–25+ who need financial support to start a NOVA College Tier 1 track. Human review — approval is not guaranteed.",
    descriptionEs:
      "Beca completa o parcial para estudiantes (16–25+) con necesidad económica que requieren apoyo para iniciar un track Tier 1 de NOVA College. Revisión humana — la aprobación no está garantizada.",
    eligibility: [
      "Age 16–25+",
      "Genuine financial need — cannot afford equivalent paid technical training",
      "Commitment to complete ~120 hours and earn a verifiable certificate",
      "School, community, or mentor reference (recommended)",
    ],
    eligibilityEs: [
      "Edad 16–25+",
      "Necesidad económica real — sin acceso a formación técnica paga equivalente",
      "Compromiso de completar ~120 horas y obtener certificado verificable",
      "Referencia escolar, comunitaria o de mentor (recomendada)",
    ],
    coverage: "full",
    tracksEligible: tier1Slugs,
    seatNote: "Pilot: ~25 seats per cohort — subject to available funding",
    seatNoteEs: "Piloto: ~25 cupos por cohorte — sujeto a fondos disponibles",
    applicationPath: "/scholarships/apply?program=techhub-beca",
  },
  {
    id: "beca-quantum",
    slug: "beca-quantum",
    name: "Quantum Scholarship",
    nameEs: "Beca Quantum",
    description:
      "Partial scholarship for Tier 2 Quantum Workforce track. Limited seats — priority for students who completed a Tier 1 track or demonstrate strong STEM foundation.",
    descriptionEs:
      "Beca parcial para el track Tier 2 Quantum Workforce. Cupos limitados — prioridad para quienes completaron un track Tier 1 o demuestran base STEM sólida.",
    eligibility: [
      "Age 18+",
      "Completed NOVA College Tier 1 track or equivalent technical foundation",
      "Financial need for Tier 2 premium pricing",
      "Motivation letter explaining quantum career interest",
    ],
    eligibilityEs: [
      "Edad 18+",
      "Track Tier 1 de NOVA College completado o base técnica equivalente",
      "Necesidad económica para el precio premium del Tier 2",
      "Carta de motivación sobre interés en carrera cuántica",
    ],
    coverage: "partial",
    tracksEligible: quantumSlugs,
    seatNote: "Very limited seats — typically 5–10 per year",
    seatNoteEs: "Cupos muy limitados — típicamente 5–10 al año",
    applicationPath: "/scholarships/apply?program=beca-quantum",
  },
  {
    id: "beca-institucional",
    slug: "beca-institucional",
    name: "Institutional Nomination Scholarship",
    nameEs: "Beca Institucional",
    description:
      "For schools and training centers nominating students who need financial support. The institution validates enrollment; NOVA STEM HUB reviews scholarship need.",
    descriptionEs:
      "Para colegios y centros de formación que nominan estudiantes con necesidad económica. La institución valida la matrícula; NOVA STEM HUB revisa la necesidad de beca.",
    eligibility: [
      "Nominated by a formal educational institution or vocational training center",
      "Student meets NOVA College age and readiness requirements",
      "Institution commits facilitator support or cohort structure",
      "Minimum cohort size may apply for institutional pilots",
    ],
    eligibilityEs: [
      "Nominado por institución educativa formal o centro de formación profesional",
      "Estudiante cumple requisitos de edad y preparación de NOVA College",
      "Institución compromete acompañamiento de facilitador o estructura de cohorte",
      "Puede aplicar tamaño mínimo de cohorte en pilotos institucionales",
    ],
    coverage: "track-specific",
    tracksEligible: [...tier1Slugs, ...quantumSlugs],
    seatNote: "Institution-led — contact NOVA STEM HUB for pilot terms",
    seatNoteEs: "Liderado por institución — contactar NOVA STEM HUB para términos piloto",
    applicationPath: "/scholarships/apply?program=beca-institucional",
  },
];

export const SCHOLARSHIP_FAQ = [
  {
    questionEs: "¿La beca está garantizada al enviar la solicitud?",
    questionEn: "Is the scholarship guaranteed when I submit?",
    answerEs:
      "No. Cada solicitud pasa por revisión humana. Evaluamos necesidad económica, motivación y cupos disponibles. Te contactaremos con el resultado — no hay aprobación instantánea.",
    answerEn:
      "No. Every application goes through human review. We evaluate financial need, motivation, and available seats. We will contact you with the outcome — there is no instant approval.",
  },
  {
    questionEs: "¿Qué cubre exactamente la beca?",
    questionEn: "What exactly does the scholarship cover?",
    answerEs:
      "Depende del programa: acceso completo o parcial a un track NOVA College (~120h), plataforma y certificado verificable al completar. No cubre hardware, transporte ni gastos personales salvo acuerdo específico.",
    answerEn:
      "It depends on the program: full or partial access to a NOVA College track (~120h), platform, and verifiable certificate on completion. It does not cover hardware, transport, or personal expenses unless specifically agreed.",
  },
  {
    questionEs: "¿Necesito experiencia previa en programación?",
    questionEn: "Do I need prior programming experience?",
    answerEs:
      "No para tracks Tier 1 entry — están diseñados para primer empleo tech. Para Beca Quantum sí se requiere base técnica o haber completado un track Tier 1.",
    answerEn:
      "Not for Tier 1 entry tracks — they are designed for first tech jobs. For Quantum Scholarship, technical foundation or a completed Tier 1 track is required.",
  },
  {
    questionEs: "¿Cuánto tarda la respuesta?",
    questionEn: "How long until I hear back?",
    answerEs:
      "Objetivo: responder en 2–4 semanas según volumen de solicitudes y ciclos de cohorte. Si no recibes noticias en ese plazo, escríbenos a info@steminnovationacademy.org.",
    answerEn:
      "Target: respond within 2–4 weeks depending on application volume and cohort cycles. If you have not heard back in that timeframe, email info@steminnovationacademy.org.",
  },
] as const;

export const SCHOLARSHIP_APPLICATION_FIELDS: ScholarshipApplicationField[] = [
  {
    id: "name",
    label: "Full name",
    labelEs: "Nombre completo",
    type: "text",
    required: true,
    placeholder: "María García López",
    placeholderEs: "María García López",
  },
  {
    id: "email",
    label: "Email",
    labelEs: "Correo electrónico",
    type: "email",
    required: true,
    placeholder: "tu@email.com",
    placeholderEs: "tu@email.com",
  },
  {
    id: "age",
    label: "Age",
    labelEs: "Edad",
    type: "number",
    required: true,
  },
  {
    id: "country",
    label: "Country",
    labelEs: "País",
    type: "text",
    required: true,
    placeholder: "United States, Canada, Spain…",
    placeholderEs: "Estados Unidos, España, México…",
  },
  {
    id: "trackInterest",
    label: "Track of interest",
    labelEs: "Track de interés",
    type: "select",
    required: true,
  },
  {
    id: "whyNeedScholarship",
    label: "Why do you need this scholarship?",
    labelEs: "¿Por qué necesitas esta beca?",
    type: "textarea",
    required: true,
    placeholder: "Tell us about your situation and motivation…",
    placeholderEs: "Cuéntanos tu situación y motivación…",
  },
  {
    id: "institution",
    label: "School or institution (if any)",
    labelEs: "Colegio o institución (si aplica)",
    type: "text",
    required: false,
    placeholder: "Optional — required for Beca Institucional",
    placeholderEs: "Opcional — requerido para Beca Institucional",
  },
];

export function getScholarshipBySlug(slug: string): ScholarshipProgram | undefined {
  return SCHOLARSHIP_PROGRAMS.find((p) => p.slug === slug);
}

export function getScholarshipById(id: string): ScholarshipProgram | undefined {
  return SCHOLARSHIP_PROGRAMS.find((p) => p.id === id);
}
