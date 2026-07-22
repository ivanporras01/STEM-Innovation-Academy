export type {
  NovaSchoolElective,
  NovaSchoolElectiveSummary,
  NovaSchoolModule,
} from "./types";

export { NOVA_SCHOOL_PAGE_EN, NOVA_SCHOOL_ELECTIVES_EN, getSchoolElectiveEn } from "./catalog-en";
export { NOVA_SCHOOL_PAGE_ES, NOVA_SCHOOL_ELECTIVES_ES, getSchoolElectiveEs } from "./catalog-es";

import type { NovaSchoolElective, NovaSchoolElectiveSummary } from "./types";

export const novaSchoolElectives: NovaSchoolElective[] = [
  {
    slug: "gaming-game-design",
    title: "Gaming & Game Design",
    tagline: "From player to creator — design levels, characters, and playable worlds.",
    description:
      "Explorers learn game loops, level design, and basic coding through Scratch and Unity-style projects — building portfolio-ready games they can share.",
    grades: "Middle & High School",
    durationHours: 36,
    highlights: ["Game loops & mechanics", "Level & character design", "Scratch + intro game engines", "Portfolio showcase"],
    learningOutcomes: [
      "Explain core game design principles (rules, feedback, challenge)",
      "Design and prototype a playable level or mini-game",
      "Apply basic scripting logic to game behavior",
      "Present a game project to peers and mentors",
    ],
    modules: [
      { order: 1, title: "Player Mindset", description: "Break down a favorite game: rules, feedback loops, and what makes challenge fun." },
      { order: 2, title: "Level Forge Lab", description: "Sketch maps, place hazards, and playtest fairness with peers." },
      { order: 3, title: "Mechanics Sprint", description: "Prototype interactions in Scratch or a simple engine — iterate fast." },
      { order: 4, title: "Arcade Showcase", description: "Ship a playable demo and present design decisions to mentors." },
    ],
    experienceSlug: "pixel-portal-escape",
    experienceTitle: "Pixel Portal Escape",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Social Media",
    tagline: "Tell stories that spread — branding, content, and analytics for young creators.",
    description:
      "Hands-on elective covering personal brand, social campaigns, visual content, and ethical digital citizenship for the next generation of creators.",
    grades: "Middle & High School",
    durationHours: 30,
    highlights: ["Personal brand basics", "Content planning", "Visual storytelling", "Ethical digital citizenship"],
    learningOutcomes: [
      "Define a personal or project brand identity",
      "Plan and publish a short content campaign",
      "Read basic engagement metrics and iterate",
      "Apply ethical guidelines for online presence",
    ],
    modules: [
      { order: 1, title: "Brand Spark", description: "Define audience, voice, and a promise you can keep online." },
      { order: 2, title: "Hook Studio", description: "Craft curiosity-driven messages — no fear tactics, no spam." },
      { order: 3, title: "Campaign Sprint", description: "Ship a mini campaign across one channel and track Signal Strength." },
      { order: 4, title: "Ethics Review", description: "Critique campaigns for integrity and present improvements." },
    ],
    experienceSlug: "viral-signal-brief",
    experienceTitle: "Viral Signal Brief",
  },
  {
    slug: "startup-business",
    title: "Startup & Business Innovation",
    tagline: "Idea to pitch — entrepreneurship, prototyping, and problem-solving for young founders.",
    description:
      "Explorers develop a real mini-startup: identify a problem, build a prototype, craft a pitch, and present to mentors in a celebration showcase.",
    grades: "Middle & High School",
    durationHours: 36,
    highlights: ["Problem discovery", "Lean canvas for youth", "Prototype sprint", "Pitch & showcase"],
    learningOutcomes: [
      "Identify and validate a real-world problem",
      "Build a simple business model and prototype",
      "Craft a compelling pitch deck",
      "Present to mentors in a celebration session",
    ],
    modules: [
      { order: 1, title: "Problem Hunt", description: "Interview peers, spot friction, and frame a problem worth solving." },
      { order: 2, title: "Lean Orbit Canvas", description: "Map customer, value, and first experiment on a youth lean canvas." },
      { order: 3, title: "Prototype Sprint", description: "Build a no-code or low-fi MVP and gather feedback fast." },
      { order: 4, title: "Demo Day Pitch", description: "Score your pitch and present to the Founders Circle." },
    ],
    experienceSlug: "founder-orbit-pitch",
    experienceTitle: "Demo Day: Orbit Pitch",
  },
  {
    slug: "coding-ai",
    title: "Coding & AI",
    tagline: "Python, algorithms, and AI concepts — from first script to intelligent projects.",
    description:
      "Aligned with the Coding & AI Mission Path. Programming fundamentals, computational thinking, and AI discovery through guided missions and LAB builds.",
    grades: "Middle & High School",
    durationHours: 48,
    highlights: ["Python fundamentals", "Computational thinking", "AI discovery missions", "ESP32 optional builds"],
    learningOutcomes: [
      "Write Python programs with variables, loops, and functions",
      "Apply computational thinking to break down problems",
      "Explain basic AI/ML concepts through hands-on demos",
      "Complete an Explore Now mission and portfolio artifact",
    ],
    modules: [
      { order: 1, title: "Signal Decoder Launch", description: "First commands, variables, and restoring a broken uplink story." },
      { order: 2, title: "Logic Circuits", description: "Conditionals, loops, and pattern matching under mission pressure." },
      { order: 3, title: "AI Discovery Lab", description: "Explore how models decide — demos, ethics, and simple automations." },
      { order: 4, title: "Innovation Showcase", description: "Ship a personal coding/AI artifact with mentor review." },
    ],
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
    grades: "Middle & High School",
    durationHours: 48,
    highlights: ["Engineering design process", "Electronics & wiring", "ESP32 programming", "Wokwi simulation fallback"],
    learningOutcomes: [
      "Follow the engineering design process from sketch to prototype",
      "Wire basic circuits and program a microcontroller",
      "Debug hardware with mentor support or Wokwi simulation",
      "Complete a robotics mission showcase project",
    ],
    modules: [
      { order: 1, title: "Rescue Briefing", description: "Mission stakes, engineering notebook, and first command sequences." },
      { order: 2, title: "Grid Navigation Lab", description: "Spatial logic, turns, and iterating routes around obstacles." },
      { order: 3, title: "Hardware / Wokwi Sprint", description: "Wire or simulate sensors and actuators; debug like an engineer." },
      { order: 4, title: "Sector Showcase", description: "Demonstrate an autonomous or semi-autonomous rescue routine." },
    ],
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
    grades: "Middle & High School",
    durationHours: 48,
    highlights: ["Sensors & actuators", "MQTT & connectivity", "Cloud dashboards", "Smart automation projects"],
    learningOutcomes: [
      "Connect sensors and actuators to a microcontroller",
      "Send data over wireless protocols to a dashboard",
      "Design a smart system for a real-world scenario",
      "Complete an IoT mission with mentor celebration review",
    ],
    modules: [
      { order: 1, title: "Greenhouse Alert", description: "Sense → decide → act: the IoT loop that protects living systems." },
      { order: 2, title: "Threshold Lab", description: "Tune automation rules and prove cooling responds to heat spikes." },
      { order: 3, title: "Dashboard Sprint", description: "Visualize live data and fire alerts stakeholders can trust." },
      { order: 4, title: "Campus Systems Showcase", description: "Present a smart system idea for school or community." },
    ],
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
    grades: "Middle & High School",
    durationHours: 30,
    highlights: ["Storyboarding", "Video editing basics", "Graphic design intro", "Multimedia portfolio"],
    learningOutcomes: [
      "Plan a short video or media piece with a storyboard",
      "Edit video and graphics with beginner-friendly tools",
      "Apply visual design principles to a portfolio piece",
      "Publish work in a digital STEM portfolio",
    ],
    modules: [
      { order: 1, title: "Story Beacon", description: "Hook, problem, hero, twist, win — map emotional arcs for short media." },
      { order: 2, title: "Reel Lab", description: "Capture, cut, and pace a 15–30 second trailer." },
      { order: 3, title: "Visual Polish", description: "Typography, color, and composition for thumb-stopping frames." },
      { order: 4, title: "Premiere Night", description: "Publish and present your media piece to mentors and peers." },
    ],
    experienceSlug: "story-beacon-reel",
    experienceTitle: "Story Beacon Reel",
  },
  {
    slug: "cybersecurity-basics",
    title: "Cybersecurity Basics for Teens",
    tagline: "Defend your digital life — passwords, privacy, phishing, and ethical hacking intro.",
    description:
      "Age-appropriate security elective: safe online habits, threat awareness, basic network concepts, and ethical responsibility in the digital world.",
    grades: "Middle & High School",
    durationHours: 24,
    highlights: ["Password hygiene", "Phishing awareness", "Privacy fundamentals", "Ethical hacking intro"],
    learningOutcomes: [
      "Apply strong password and authentication habits",
      "Recognize phishing and social engineering attempts",
      "Explain basic network and privacy concepts",
      "Discuss ethical boundaries in security exploration",
    ],
    modules: [
      { order: 1, title: "Shadow Ops Brief", description: "How attackers think — and how defenders stay calm under pressure." },
      { order: 2, title: "Phish Lab", description: "Spot lures: urgency, fake domains, and password traps." },
      { order: 3, title: "Vault Forge", description: "Build strong credentials and privacy habits that stick." },
      { order: 4, title: "Ethics Council", description: "Debate boundaries: curiosity vs. harm in digital exploration." },
    ],
    experienceSlug: "phish-shadow-ops",
    experienceTitle: "Inbox Under Siege",
  },
  {
    slug: "creative-tech-social-impact-teens",
    title: "Creative Tech & Social Impact for Teens",
    tagline:
      "Design, creativity, and purpose — a welcoming STEAM path for teens exploring STEM beyond wires and code.",
    description:
      "A creative elective for teens: design thinking, creative coding with Scratch, digital storytelling, diverse STEM role models, and team projects that solve real community problems — less hardware-heavy, more human-centered.",
    grades: "Middle & High School",
    durationHours: 30,
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
    modules: [
      { order: 1, title: "Empathy Orbit", description: "Listen to a community need and map who is affected." },
      { order: 2, title: "Creative Toolbelt", description: "Scratch stories, media, or simple sensor ideas — pick with purpose." },
      { order: 3, title: "Spark Prototype", description: "Assemble a tiny intervention with a clear impact promise." },
      { order: 4, title: "Impact Showcase", description: "Present to mentors, partners, and peers — celebrate purpose." },
    ],
    experienceSlug: "community-spark-lab",
    experienceTitle: "Ignite a Community Spark",
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
    highlights: elective.highlights,
    missionPathHref: elective.missionPathHref,
    pathwaySlug: elective.pathwaySlug,
  }),
);

export const NOVA_SCHOOL_FORMAT = {
  electiveCount: 9,
  deliveryModel: "B2B — elective catalog + platform + facilitator guide",
} as const;
