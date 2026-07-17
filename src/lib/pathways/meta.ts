import type { PathwayKey } from "@/components/ui/pathway-icon";

export type PathwayMeta = {
  slug: string;
  pathway: PathwayKey;
  experienceSlug: string;
  experienceTitle: string;
  badge: string;
  phases: number;
  missions: number;
  hook: string;
};

export const PATHWAY_META: Record<string, PathwayMeta> = {
  "intro-python-ai": {
    slug: "intro-python-ai",
    pathway: "CODING_AI",
    experienceSlug: "restore-nova-signal",
    experienceTitle: "The Signal Goes Dark",
    badge: "Signal Coder",
    phases: 5,
    missions: 24,
    hook:
      "From your first Python command to a personal AI innovation — decode signals, automate tasks, and ship something real.",
  },
  "robotics-engineering": {
    slug: "robotics-engineering",
    pathway: "ROBOTICS",
    experienceSlug: "rescue-rover",
    experienceTitle: "Rescue at Sector 7",
    badge: "Rover Engineer",
    phases: 5,
    missions: 24,
    hook:
      "Sketch, build, program, and iterate robots using the same design cycle NASA and competition teams rely on.",
  },
  "iot-smart-systems": {
    slug: "iot-smart-systems",
    pathway: "IOT",
    experienceSlug: "smart-greenhouse",
    experienceTitle: "Red Alert: Greenhouse",
    badge: "Smart Systems Builder",
    phases: 5,
    missions: 24,
    hook:
      "Connect sensors, dashboards, and automation to protect greenhouses, classrooms, and communities.",
  },
};

export function getPathwayMeta(slug: string): PathwayMeta | undefined {
  return PATHWAY_META[slug];
}
