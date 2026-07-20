export const NOVA_LANGUAGE_PAGE_EN = {
  heroDescription:
    "Three structured language programs — English, Spanish, and Portuguese — with speaking labs, cultural context, and progress you can prove.",
  coursesSectionTitle: "Language programs",
  coursesSectionSubtitle:
    "3 courses · CEFR-aligned paths · speaking practice · verifiable completion certificates",
  b2bTitle: "License NOVA Language for your institution",
  b2bBody:
    "Add English, Spanish, or Portuguese to your campus — curriculum + platform + facilitator guide.",
  b2bCta: "Contact NOVA STEM HUB",
} as const;

export const NOVA_LANGUAGE_COURSES_EN: Record<
  string,
  Pick<{ title: string; tagline: string; description: string }, "title" | "tagline" | "description">
> = {
  english: {
    title: "Learn English",
    tagline: "From first conversation to professional fluency — grammar, speaking, and real-world confidence.",
    description:
      "Structured English program with listening, speaking, reading, and writing — CEFR A1→B2 path for learners worldwide.",
  },
  spanish: {
    title: "Learn Spanish",
    tagline: "Speak, read, and connect — practical Spanish for travel, work, and everyday life.",
    description:
      "Comprehensive Spanish program with conversation labs, grammar in context, and cultural communication skills.",
  },
  portuguese: {
    title: "Learn Portuguese",
    tagline: "Brazilian and European foundations — pronunciation, conversation, and professional basics.",
    description:
      "Portuguese program covering core grammar, speaking practice, and cultural nuance for global learners.",
  },
};

export function getLanguageCourseEn(slug: string) {
  return NOVA_LANGUAGE_COURSES_EN[slug];
}
