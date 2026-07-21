import { LessonType } from "@prisma/client";
import type { SeedLesson } from "@/data/pathways/types";

type MissionLessonInput = {
  title: string;
  order: number;
  type?: LessonType;
  duration?: number;
  /** One-line mission stakes / why this matters */
  brief: string;
  objectives: string[];
  /** Core teaching — markdown paragraphs / lists / code */
  teach: string;
  /** Hands-on practice or assignment */
  practice: string;
  stretch?: string;
  /** Optional Explore Now / demo mission link */
  exploreNote?: string;
  videoUrl?: string;
};

/** Build a NOVA STEM HUB mission-style lesson body (matches READY pathway voice). */
export function missionLesson(input: MissionLessonInput): SeedLesson {
  const type = input.type ?? LessonType.READING;
  const duration = input.duration ?? (type === LessonType.LAB ? 35 : type === LessonType.QUIZ ? 15 : 20);
  const objectives = input.objectives.map((o) => `- ${o}`).join("\n");
  const stretch = input.stretch
    ? `\n\n## Stretch goal\n${input.stretch}`
    : "";
  const explore = input.exploreNote
    ? `\n\n## Explore Now\n${input.exploreNote}`
    : "";

  const content = `# ${input.title}

**Mission brief.** ${input.brief}

## Learning objectives
${objectives}

## Discovery
${input.teach}

## Mission practice
${input.practice}
${stretch}${explore}

## Submit
Mark this mission complete when you can explain the key idea in your own words and your practice artifact is ready for mentor review.
`;

  return {
    title: input.title,
    type,
    order: input.order,
    duration,
    content,
    videoUrl: input.videoUrl,
  };
}

/** Convert structured college LessonContent sections into LMS markdown. */
export function collegeLessonToMarkdown(opts: {
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
  summary?: string;
  careerInsight?: string;
  practicePrompt?: string;
}): string {
  const sections = opts.sections
    .map((s) => `## ${s.heading}\n\n${s.body}`)
    .join("\n\n");
  const summary = opts.summary ? `\n\n## Summary\n\n${opts.summary}` : "";
  const career = opts.careerInsight
    ? `\n\n## Career insight\n\n${opts.careerInsight}`
    : "";
  const practice = opts.practicePrompt
    ? `\n\n## Practice assignment\n\n${opts.practicePrompt}`
    : `\n\n## Practice assignment\n\nDocument your notes, complete the module lab, and prepare a 90-second STAR story about what you practiced.`;

  return `# ${opts.title}

${opts.description}

${sections}${summary}${career}${practice}
`;
}
