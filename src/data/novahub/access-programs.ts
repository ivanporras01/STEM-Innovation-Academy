/**
 * NOVA STEM HUB access programs — scholarships + institutional B2B placeholder.
 * Re-exports scholarship data; institutional program for school partnerships.
 */

export {
  SCHOLARSHIP_PROGRAMS,
  SCHOLARSHIP_FAQ,
  SCHOLARSHIP_APPLICATION_FIELDS,
  getScholarshipBySlug,
  getScholarshipById,
  type ScholarshipProgram,
  type ScholarshipApplicationField,
  type ScholarshipCoverage,
} from "./scholarships";

import { NOVA_COLLEGE, NOVA_SCHOOL } from "@/lib/novahub-brand";

export type AccessProgramStatus = "active" | "pilot" | "waitlist" | "roadmap";

/** B2B institutional placeholder — full license model, not individual scholarship. */
export const NOVAHUB_INSTITUTIONAL_PROGRAM = {
  id: "institucion-aliada",
  slug: "institucion-aliada",
  name: "Institución Aliada",
  nameEn: "Partner Institution",
  status: "pilot" as AccessProgramStatus,
  description:
    "Programa piloto B2B para colegios técnicos y centros de formación. Licencia de currículo + plataforma + capacitación del facilitador.",
  descriptionEn:
    "B2B pilot for technical schools and training centers. Curriculum license + platform + facilitator training.",
  eligibility:
    "Instituciones educativas formales o centros de formación profesional en cualquier región. Mínimo 15 estudiantes por cohorte piloto.",
  eligibilityEn:
    "Formal educational institutions or vocational training centers worldwide. Minimum 15 students per pilot cohort.",
  benefits: [
    `Licencia NOVA College — ${NOVA_COLLEGE.tier1TrackCount} tracks Tier 1 + QCW`,
    "Licencia NOVA School — electivas juveniles + Mission Paths",
    "Guía del facilitador (sin expertos requeridos)",
    "Dashboard institucional (roadmap)",
    "Certificados verificables para graduados",
  ],
  benefitsEn: [
    `NOVA College license — ${NOVA_COLLEGE.tier1TrackCount} Tier 1 tracks + QCW`,
    `NOVA School license — ${NOVA_SCHOOL.electiveCount} youth electives + Mission Paths`,
    "Facilitator guide (no experts required)",
    "Institutional dashboard (roadmap)",
    "Verifiable certificates for graduates",
  ],
  contactLabel: "Aliarse como institución",
  contactHref: "/partnership",
  seatCap: 10,
  region: "Global",
} as const;
