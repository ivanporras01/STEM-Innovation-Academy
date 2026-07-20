/** NOVA College — technical certificate tracks (ages 16–25+, B2B licensable). NOVA Academy = K-12 youth app. */

export type LessonType =
  | "theory"
  | "lab"
  | "project"
  | "soft-skills"
  | "exam-prep";

export type LessonVisualType =
  | "network-topology"
  | "cloud-architecture"
  | "terminal-lab"
  | "security-scenario"
  | "data-pipeline"
  | "iot-schematic"
  | "circuit-schematic"
  | "troubleshooting-flowchart";

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Reference {
  title: string;
  url: string;
  author?: string;
}

export interface LessonSection {
  heading: string;
  body: string;
}

export interface LessonVisual {
  type: LessonVisualType;
  title?: string;
  caption?: string;
  /** Insert visual after this section index (0-based). Omit to show at top. */
  afterSection?: number;
  props?: Record<string, unknown>;
}

/** Rich reading content — QCW-style structured curriculum for NOVA College. */
export interface LessonContent {
  sections: LessonSection[];
  visuals?: LessonVisual[];
  summary: string;
  careerInsight: string;
  glossary: GlossaryTerm[];
  references: Reference[];
}

export type NovaCollegeLesson = {
  slug: string;
  title: string;
  description: string;
  type: LessonType;
  hours: number;
  /** Full body content — present for published theory lessons */
  content?: LessonContent;
};

export type NovaCollegeModule = {
  order: number;
  title: string;
  description: string;
  contactHours: number;
  lessons: NovaCollegeLesson[];
  labOrProject: {
    title: string;
    description: string;
    hours: number;
  };
};

export type CertificationAlignment = {
  primary: string[];
  secondary?: string[];
  examPrepHours: number;
  notes?: string;
};

export type FormatBreakdown = {
  theoryHours: number;
  labsProjectsHours: number;
  softSkillsHours: number;
  examPrepHours: number;
};

export type AssessmentRubricSummary = {
  components: { name: string; weight: number; description: string }[];
  passingCriteria: string;
};

export type NovaCollegeTrackSummary = {
  slug: string;
  title: string;
  tagline: string;
  durationHours: number;
  moduleCount: number;
  primaryCerts: string[];
  audience: string;
  /** entry = employability técnica; advanced = requisitos previos mayores */
  tier?: "entry" | "advanced";
};

/** Tracks whose lecciones interactivas viven en la app QCW desplegada. */
export type NovaCollegeContentDelivery = {
  platform: "qcw";
  appBaseUrl: string;
  courseSlug: string;
  notes?: string;
};

export type NovaCollegeCourse = {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  targetAudience: string;
  durationHours: number;
  prerequisites: string[];
  learningOutcomes: string[];
  certificationAlignment: CertificationAlignment;
  formatBreakdown: FormatBreakdown;
  modules: NovaCollegeModule[];
  capstone: {
    title: string;
    description: string;
    deliverables: string[];
    hours: number;
  };
  assessmentRubric: AssessmentRubricSummary;
  facilitatorNotes: string[];
  employabilitySkills: string[];
  /** Links to K-12 NOVA pathways where applicable */
  pathwayBridge?: {
    relatedPathwaySlug?: string;
    notes: string;
  };
  verifyCertificatePrefix: string;
  tier?: "entry" | "advanced";
  /** When set, lecciones interactivas (Bloch, gates, optical bench) se sirven desde QCW. */
  contentDelivery?: NovaCollegeContentDelivery;
};
