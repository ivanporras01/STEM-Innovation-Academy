export type {
  NovaSchoolElective,
  NovaSchoolElectiveSummary,
  NovaSchoolModule,
} from "./types";

export { NOVA_SCHOOL_PAGE_EN, NOVA_SCHOOL_ELECTIVES_EN, getSchoolElectiveEn } from "./catalog-en";
export { NOVA_SCHOOL_PAGE_ES, NOVA_SCHOOL_ELECTIVES_ES, getSchoolElectiveEs } from "./catalog-es";

import type { NovaSchoolElective, NovaSchoolElectiveSummary } from "./types";

const PLACEHOLDER_MODULES: NovaSchoolElective["modules"] = [
  { order: 1, title: "Discovery Launch", description: "Mission briefing, buddy intro, and first hands-on station." },
  { order: 2, title: "Core Skills Lab", description: "Guided practice with interactive stations and knowledge checks." },
  { order: 3, title: "Build Sprint", description: "Project-based build connecting concepts to a real deliverable." },
  { order: 4, title: "Innovation Showcase", description: "Mentor review, iteration, and portfolio presentation." },
];

export const novaSchoolElectives: NovaSchoolElective[] = [
  {
    slug: "gaming-game-design",
    title: "Gaming & Game Design",
    tagline: "From player to creator — design levels, characters, and playable worlds.",
    description:
      "Explorers learn game loops, level design, and basic coding through Scratch and Unity-style projects — building portfolio-ready games they can share.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 12,
    highlights: ["Game loops & mechanics", "Level & character design", "Scratch + intro game engines", "Portfolio showcase"],
    learningOutcomes: [
      "Explain core game design principles (rules, feedback, challenge)",
      "Design and prototype a playable level or mini-game",
      "Apply basic scripting logic to game behavior",
      "Present a game project to peers and mentors",
    ],
    modules: PLACEHOLDER_MODULES,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Social Media",
    tagline: "Tell stories that spread — branding, content, and analytics for young creators.",
    description:
      "Hands-on elective covering personal brand, social campaigns, visual content, and ethical digital citizenship for the next generation of creators.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 10,
    highlights: ["Personal brand basics", "Content planning", "Visual storytelling", "Ethical digital citizenship"],
    learningOutcomes: [
      "Define a personal or project brand identity",
      "Plan and publish a short content campaign",
      "Read basic engagement metrics and iterate",
      "Apply ethical guidelines for online presence",
    ],
    modules: PLACEHOLDER_MODULES,
  },
  {
    slug: "startup-business",
    title: "Startup & Business Innovation",
    tagline: "Idea to pitch — entrepreneurship, prototyping, and problem-solving for young founders.",
    description:
      "Explorers develop a real mini-startup: identify a problem, build a prototype, craft a pitch, and present to mentors in a celebration showcase.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 12,
    highlights: ["Problem discovery", "Lean canvas for youth", "Prototype sprint", "Pitch & showcase"],
    learningOutcomes: [
      "Identify and validate a real-world problem",
      "Build a simple business model and prototype",
      "Craft a compelling pitch deck",
      "Present to mentors in a celebration session",
    ],
    modules: PLACEHOLDER_MODULES,
  },
  {
    slug: "coding-ai",
    title: "Coding & AI",
    tagline: "Python, algorithms, and AI concepts — from first script to intelligent projects.",
    description:
      "Aligned with the Coding & AI Mission Path. Programming fundamentals, computational thinking, and AI discovery through guided missions and LAB builds.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 16,
    highlights: ["Python fundamentals", "Computational thinking", "AI discovery missions", "ESP32 optional builds"],
    learningOutcomes: [
      "Write Python programs with variables, loops, and functions",
      "Apply computational thinking to break down problems",
      "Explain basic AI/ML concepts through hands-on demos",
      "Complete an Explore Now mission and portfolio artifact",
    ],
    modules: PLACEHOLDER_MODULES,
    missionPathHref: "/courses/intro-python-ai",
    pathwaySlug: "coding-ai",
    experienceSlug: "restore-nova-signal",
    experienceTitle: "The Signal Goes Dark",
  },
  {
    slug: "robotics-engineering",
    title: "Introduction to Robotics",
    tagline: "Design, wire, and program robots — engineering process from sketch to autonomous bot.",
    description:
      "Aligned with the Robotics Mission Path. Electronics, microcontrollers, ESP32 builds, and engineering design challenges with Wokwi simulation fallback.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 16,
    highlights: ["Engineering design process", "Electronics & wiring", "ESP32 programming", "Wokwi simulation fallback"],
    learningOutcomes: [
      "Follow the engineering design process from sketch to prototype",
      "Wire basic circuits and program a microcontroller",
      "Debug hardware with mentor support or Wokwi simulation",
      "Complete a robotics mission showcase project",
    ],
    modules: PLACEHOLDER_MODULES,
    missionPathHref: "/courses/robotics-engineering",
    pathwaySlug: "robotics",
    experienceSlug: "rescue-rover",
    experienceTitle: "Rescue at Sector 7",
  },
  {
    slug: "iot-smart-systems",
    title: "IoT & Smart Systems",
    tagline: "Sensors, connectivity, and smart devices — build the connected world.",
    description:
      "Aligned with the IoT Mission Path. Smart sensors, wireless systems, cloud dashboards, and real-world automation projects.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 16,
    highlights: ["Sensors & actuators", "MQTT & connectivity", "Cloud dashboards", "Smart automation projects"],
    learningOutcomes: [
      "Connect sensors and actuators to a microcontroller",
      "Send data over wireless protocols to a dashboard",
      "Design a smart system for a real-world scenario",
      "Complete an IoT mission with mentor celebration review",
    ],
    modules: PLACEHOLDER_MODULES,
    missionPathHref: "/courses/iot-smart-systems",
    pathwaySlug: "iot",
    experienceSlug: "smart-greenhouse",
    experienceTitle: "Red Alert: Greenhouse",
  },
  {
    slug: "digital-content-creation",
    title: "Digital Content Creation",
    tagline: "Video, design, and media — craft stories that inspire and inform.",
    description:
      "Explorers produce videos, graphics, and multimedia portfolios using industry-inspired tools — storytelling, editing, and visual design fundamentals.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 10,
    highlights: ["Storyboarding", "Video editing basics", "Graphic design intro", "Multimedia portfolio"],
    learningOutcomes: [
      "Plan a short video or media piece with a storyboard",
      "Edit video and graphics with beginner-friendly tools",
      "Apply visual design principles to a portfolio piece",
      "Publish work in a digital STEM portfolio",
    ],
    modules: PLACEHOLDER_MODULES,
  },
  {
    slug: "cybersecurity-basics",
    title: "Cybersecurity Basics for Teens",
    tagline: "Defend your digital life — passwords, privacy, phishing, and ethical hacking intro.",
    description:
      "Age-appropriate security elective: safe online habits, threat awareness, basic network concepts, and ethical responsibility in the digital world.",
    ageRange: "10–16",
    grades: "Middle & High School",
    durationWeeks: 8,
    highlights: ["Password hygiene", "Phishing awareness", "Privacy fundamentals", "Ethical hacking intro"],
    learningOutcomes: [
      "Apply strong password and authentication habits",
      "Recognize phishing and social engineering attempts",
      "Explain basic network and privacy concepts",
      "Discuss ethical boundaries in security exploration",
    ],
    modules: PLACEHOLDER_MODULES,
  },
  {
    slug: "creative-tech-social-impact-teens",
    title: "Creative Tech & Social Impact for Teens",
    tagline:
      "Design, creativity, and purpose — a welcoming STEAM path for teens exploring STEM beyond wires and code.",
    description:
      "A creative elective for teens: design thinking, creative coding with Scratch, digital storytelling, diverse STEM role models, and team projects that solve real community problems — less hardware-heavy, more human-centered.",
    ageRange: "8–16",
    grades: "Middle & High School",
    durationWeeks: 10,
    highlights: [
      "STEM role models & careers",
      "Design thinking & empathy",
      "Creative coding (Scratch)",
      "Social-impact team projects",
    ],
    learningOutcomes: [
      "Apply design thinking to a community problem",
      "Build a creative coding or digital storytelling project",
      "Identify STEM career paths beyond traditional engineering",
      "Present a social-impact prototype to mentors and peers",
    ],
    modules: PLACEHOLDER_MODULES,
  },
];

export function getNovaSchoolElectiveBySlug(slug: string): NovaSchoolElective | undefined {
  return novaSchoolElectives.find((e) => e.slug === slug);
}

export const novaSchoolElectiveIndex: NovaSchoolElectiveSummary[] = novaSchoolElectives.map(
  (elective) => ({
    slug: elective.slug,
    title: elective.title,
    tagline: elective.tagline,
    ageRange: elective.ageRange,
    highlights: elective.highlights,
    missionPathHref: elective.missionPathHref,
    pathwaySlug: elective.pathwaySlug,
  }),
);

export const NOVA_SCHOOL_FORMAT = {
  electiveCount: 9,
  ageRange: "8–16",
  deliveryModel: "B2B — elective catalog + platform + facilitator guide",
} as const;
