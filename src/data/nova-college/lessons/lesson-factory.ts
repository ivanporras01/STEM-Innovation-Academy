import type { GlossaryTerm, LessonContent, LessonVisualType, Reference } from "../types";
import { buildLesson, fourSectionLesson } from "./content-builder";

export type TheorySeed = {
  slug: string;
  headings: [string, string, string, string];
  bodies: [string, string, string, string];
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
  extraSections?: { heading: string; body: string }[];
};

/** Build LessonContent from a theory seed; supports optional 5th–6th sections. */
export function theoryContent(seed: TheorySeed): LessonContent {
  const sections = seed.headings.map((heading, i) => ({
    heading,
    body: seed.bodies[i],
  }));
  if (seed.extraSections?.length) {
    sections.push(...seed.extraSections);
  }
  return buildLesson({
    sections,
    summary: seed.summary,
    careerInsight: seed.careerInsight,
    glossary: seed.glossary,
    references: seed.references,
    visual: seed.visual,
  });
}

/** Shorthand for four-section theory lessons. */
export function theoryFour(
  slug: string,
  headings: TheorySeed["headings"],
  bodies: TheorySeed["bodies"],
  summary: string,
  careerInsight: string,
  glossary: GlossaryTerm[],
  references: Reference[],
  visual?: TheorySeed["visual"],
): [string, LessonContent] {
  return [
    slug,
    fourSectionLesson(
      headings,
      bodies,
      summary,
      careerInsight,
      glossary,
      references,
      visual,
    ),
  ];
}

/** Common reference URLs reused across tracks. */
export const REF = {
  comptia: (path: string, title: string): Reference => ({
    title,
    url: `https://www.comptia.org/${path}`,
    author: "CompTIA",
  }),
  aws: (path: string, title: string): Reference => ({
    title,
    url: `https://docs.aws.amazon.com/${path}`,
    author: "Amazon Web Services",
  }),
  microsoft: (path: string, title: string): Reference => ({
    title,
    url: `https://learn.microsoft.com/${path}`,
    author: "Microsoft Learn",
  }),
  owasp: (title: string): Reference => ({
    title,
    url: "https://owasp.org/www-project-top-ten/",
    author: "OWASP",
  }),
  nist: (pub: string, title: string): Reference => ({
    title,
    url: `https://csrc.nist.gov/publications/detail/${pub}`,
    author: "NIST",
  }),
  grafana: (title: string): Reference => ({
    title,
    url: "https://grafana.com/docs/grafana/latest/",
    author: "Grafana Labs",
  }),
  ros: (title: string): Reference => ({
    title,
    url: "https://docs.ros.org/en/humble/",
    author: "Open Robotics",
  }),
  siemens: (title: string): Reference => ({
    title,
    url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual",
    author: "Siemens",
  }),
  google: (path: string, title: string): Reference => ({
    title,
    url: `https://${path}`,
    author: "Google",
  }),
  mqtt: (title: string): Reference => ({
    title,
    url: "https://mqtt.org/mqtt-specification/",
    author: "OASIS MQTT TC",
  }),
} as const;

/** Collect theory seeds into a slug → content map. */
export function mapFromSeeds(seeds: TheorySeed[]): Record<string, LessonContent> {
  return Object.fromEntries(seeds.map((s) => [s.slug, theoryContent(s)]));
}
