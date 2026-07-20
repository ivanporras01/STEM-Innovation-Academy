/**
 * NOVA STEM HUB public API — brand constants + NOVA College catalog + impact + scholarships.
 *
 * @example
 * import { NOVA_STEM_HUB, NOVA_ACADEMY, novaCollegeCourses, SCHOLARSHIP_PROGRAMS } from "@/lib/novahub";
 */

export {
  NOVA_STEM_HUB,
  NOVAHUB,
  NOVA_SCHOOL,
  NOVA_ACADEMY,
  NOVA_COLLEGE,
  QUANTUM_WORKFORCE,
  NOVA_COLLEGE_TIERS,
  NOVA_STEM_HUB_LADDER,
  NOVAHUB_LADDER,
  NOVA_STEM_HUB_PRODUCTS,
  NOVAHUB_PRODUCTS,
  getNovaStemHubProductMeta,
  getNovaHubProductMeta,
  getCollegeProgramMeta,
  getNavBrandContext,
  type NovaStemHubProduct,
  type NovaHubProduct,
} from "./novahub-brand";

export {
  NOVA_STEM_HUB_MISSION,
  NOVAHUB_MISSION,
  NOVA_STEM_HUB_ACCESS_TIERS,
  NOVAHUB_ACCESS_TIERS,
  NOVA_STEM_HUB_IMPACT_PILLARS,
  NOVAHUB_IMPACT_PILLARS,
  NOVA_STEM_HUB_IMPACT_GOALS,
  NOVAHUB_IMPACT_GOALS,
  NOVA_STEM_HUB_IMPACT_LADDER,
  NOVAHUB_IMPACT_LADDER,
  NOVA_STEM_HUB_IMPACT,
  NOVAHUB_IMPACT,
  NOVA_STEM_HUB_ROADMAP,
  NOVAHUB_ROADMAP,
  NOVA_STEM_HUB_ROADMAP_ES,
  NOVAHUB_ROADMAP_ES,
  type NovaStemHubAccessTierId,
  type NovaHubAccessTierId,
  type NovaStemHubImpactPillarId,
  type NovaHubImpactPillarId,
  type RoadmapStatus,
} from "./novahub-impact";

export {
  novaCollegeCourses,
  novaCollegeEntryTracks,
  novaCollegeAdvancedTracks,
  novaCollegeTrackIndex,
  getNovaCollegeCourseBySlug,
  NOVA_COLLEGE_FORMAT,
} from "@/data/nova-college";

export type {
  NovaCollegeCourse,
  NovaCollegeTrackSummary,
  NovaCollegeContentDelivery,
} from "@/data/nova-college";

export {
  SCHOLARSHIP_PROGRAMS,
  SCHOLARSHIP_FAQ,
  SCHOLARSHIP_APPLICATION_FIELDS,
  getScholarshipBySlug,
  getScholarshipById,
  type ScholarshipProgram,
  type ScholarshipApplicationField,
  type ScholarshipCoverage,
} from "@/data/novahub/scholarships";

export {
  novaSchoolElectives,
  novaSchoolElectiveIndex,
  getNovaSchoolElectiveBySlug,
  NOVA_SCHOOL_FORMAT,
  NOVA_SCHOOL_PAGE_EN,
  NOVA_SCHOOL_PAGE_ES,
} from "@/data/nova-school";

export type {
  NovaSchoolElective,
  NovaSchoolElectiveSummary,
} from "@/data/nova-school";
