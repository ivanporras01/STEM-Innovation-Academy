import type {
  GlossaryTerm,
  LessonContent,
  LessonSection,
  LessonVisual,
  LessonVisualType,
  Reference,
} from "../types";

type BuildLessonInput = {
  sections: LessonSection[];
  summary: string;
  careerInsight: string;
  glossary: GlossaryTerm[];
  references: Reference[];
  visual?: {
    type: LessonVisualType;
    title: string;
    afterSection: number;
    caption?: string;
  };
};

/** Compose a QCW-style LessonContent block with optional single visual. */
export function buildLesson(input: BuildLessonInput): LessonContent {
  const visuals: LessonVisual[] | undefined = input.visual
    ? [
        {
          type: input.visual.type,
          title: input.visual.title,
          caption: input.visual.caption,
          afterSection: input.visual.afterSection,
        },
      ]
    : undefined;

  return {
    sections: input.sections,
    visuals,
    summary: input.summary,
    careerInsight: input.careerInsight,
    glossary: input.glossary,
    references: input.references,
  };
}

/** Four-section lesson scaffold — headings + bodies supplied by caller. */
export function fourSectionLesson(
  headings: [string, string, string, string],
  bodies: [string, string, string, string],
  summary: string,
  careerInsight: string,
  glossary: GlossaryTerm[],
  references: Reference[],
  visual?: BuildLessonInput["visual"]
): LessonContent {
  const sections = headings.map((heading, i) => ({
    heading,
    body: bodies[i],
  }));
  return buildLesson({ sections, summary, careerInsight, glossary, references, visual });
}
