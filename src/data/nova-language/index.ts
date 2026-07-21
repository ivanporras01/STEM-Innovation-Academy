export type {
  NovaLanguageCourse,
  NovaLanguageCourseSummary,
  NovaLanguageModule,
} from "./types";

export {
  NOVA_LANGUAGE_PAGE_EN,
  NOVA_LANGUAGE_COURSES_EN,
  getLanguageCourseEn,
} from "./catalog-en";
export {
  NOVA_LANGUAGE_PAGE_ES,
  NOVA_LANGUAGE_COURSES_ES,
  getLanguageCourseEs,
} from "./catalog-es";
export {
  NOVA_LANGUAGE_PAGE_PT,
  NOVA_LANGUAGE_COURSES_PT,
  getLanguageCoursePt,
} from "./catalog-pt";

import type { NovaLanguageCourse, NovaLanguageCourseSummary } from "./types";

/** Marketing syllabus modules — full lesson bodies unlock in LMS after payment via ensureProgramCourse. */
const LANGUAGE_SYLLABUS_MODULES: NovaLanguageCourse["modules"] = [
  {
    order: 1,
    title: "Foundations & First Conversation",
    description:
      "Sounds, greetings, self-introduction, and repair phrases with guided speaking labs and phrase banks.",
  },
  {
    order: 2,
    title: "Grammar in Context",
    description:
      "Form → meaning → use cycles: notice patterns in real dialogues, transform sentences, and rewrite for natural register.",
  },
  {
    order: 3,
    title: "Listening & Pronunciation Lab",
    description:
      "Three-pass listening, shadowing, intelligibility drills, and peer feedback for clearer speech.",
  },
  {
    order: 4,
    title: "Culture & Real-World Use",
    description:
      "Politeness levels, professional messages, and scenario role-plays for travel, school, and work.",
  },
  {
    order: 5,
    title: "Capstone & Certificate",
    description:
      "CEFR can-do portfolio: speaking demo, writing sample, self-assessment, and a 4-week practice plan.",
  },
]

export const novaLanguageCourses: NovaLanguageCourse[] = [
  {
    slug: "english",
    title: "Learn English",
    tagline: "From first conversation to professional fluency — grammar, speaking, and real-world confidence.",
    description:
      "Structured English program with listening, speaking, reading, and writing — CEFR A1→B2 path for learners worldwide.",
    targetLanguage: "English",
    cefrLevel: "A1 → B2",
    durationHours: 80,
    ageRange: "All ages",
    highlights: ["CEFR-aligned path", "Speaking labs", "Professional basics", "Verifiable certificate"],
    learningOutcomes: [
      "Hold everyday conversations with clear pronunciation and confidence",
      "Read and write at an intermediate level for work and study",
      "Apply grammar patterns in real dialogues and written tasks",
      "Demonstrate progress in a capstone speaking assessment",
    ],
    modules: LANGUAGE_SYLLABUS_MODULES,
  },
  {
    slug: "spanish",
    title: "Learn Spanish",
    tagline: "Speak, read, and connect — practical Spanish for travel, work, and everyday life.",
    description:
      "Comprehensive Spanish program with conversation labs, grammar in context, and cultural communication skills.",
    targetLanguage: "Spanish",
    cefrLevel: "A1 → B2",
    durationHours: 80,
    ageRange: "All ages",
    highlights: ["Conversation-first", "Grammar in context", "Cultural communication", "Verifiable certificate"],
    learningOutcomes: [
      "Communicate in common travel, work, and social situations",
      "Understand core Spanish grammar and apply it in speech and writing",
      "Build listening comprehension through guided audio labs",
      "Complete a capstone presentation in Spanish",
    ],
    modules: LANGUAGE_SYLLABUS_MODULES,
  },
  {
    slug: "portuguese",
    title: "Learn Portuguese",
    tagline: "Brazilian and European foundations — pronunciation, conversation, and professional basics.",
    description:
      "Portuguese program covering core grammar, speaking practice, and cultural nuance for global learners.",
    targetLanguage: "Portuguese",
    cefrLevel: "A1 → B2",
    durationHours: 80,
    ageRange: "All ages",
    highlights: ["BR + EU foundations", "Pronunciation labs", "Professional basics", "Verifiable certificate"],
    learningOutcomes: [
      "Pronounce Portuguese clearly with guided phonetics practice",
      "Handle everyday conversations in Brazilian and European contexts",
      "Apply essential grammar for reading and writing tasks",
      "Demonstrate fluency growth in a final speaking portfolio",
    ],
    modules: LANGUAGE_SYLLABUS_MODULES,
  },
];

export function getNovaLanguageCourseBySlug(slug: string): NovaLanguageCourse | undefined {
  return novaLanguageCourses.find((course) => course.slug === slug);
}

export const novaLanguageCourseIndex: NovaLanguageCourseSummary[] = novaLanguageCourses.map((course) => ({
  slug: course.slug,
  title: course.title,
  tagline: course.tagline,
  targetLanguage: course.targetLanguage,
  cefrLevel: course.cefrLevel,
  durationHours: course.durationHours,
  highlights: course.highlights,
}));

export const NOVA_LANGUAGE_FORMAT = {
  courseCount: 3,
  languages: ["English", "Spanish", "Portuguese"] as const,
  deliveryModel: "B2B — language catalog + platform + facilitator guide",
} as const;
