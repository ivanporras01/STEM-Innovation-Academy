/**
 * English catalog copy for NOVA School (default product).
 * Spanish metadata lives in catalog-es.ts — served under /es/school/* routes.
 */

export const NOVA_SCHOOL_PAGE_EN = {
  heroDescription:
    "Nine elective programs for middle and high school Explorers — project-based STEM, Innovation Mentors, and Mission Paths that turn curiosity into real builds.",
  electivesSectionTitle: "School electives",
  electivesSectionSubtitle:
    "9 youth programs · ages 8–16 · structured missions, buddies, and monthly mentor sessions",
  missionPathsTitle: "Mission Paths",
  missionPathsBody:
    "Three immersive STEM adventures — Coding & AI, Robotics, and IoT — with interactive Explore Now quests and mentor-led builds.",
  missionPathsCta: "Explore Mission Paths",
  portalTitle: "NOVA School Portal",
  portalBody:
    "Live for logged-in Explorers, Innovation Mentors, and administrators — track missions, resume quests, and see what's next.",
  b2bTitle: "License NOVA School for your institution",
  b2bBody:
    "Elective catalog + platform + facilitator guide. No in-house STEM experts required.",
  b2bCta: "Contact NOVA STEM HUB",
} as const;

export const NOVA_SCHOOL_ELECTIVES_EN: Record<
  string,
  Pick<{ title: string; tagline: string; description: string }, "title" | "tagline" | "description">
> = {
  "gaming-game-design": {
    title: "Gaming & Game Design",
    tagline: "From player to creator — design levels, characters, and playable worlds.",
    description:
      "Explorers learn game loops, level design, and basic coding through Scratch and Unity-style projects — building portfolio-ready games they can share.",
  },
  "digital-marketing": {
    title: "Digital Marketing & Social Media",
    tagline: "Tell stories that spread — branding, content, and analytics for young creators.",
    description:
      "Hands-on elective covering personal brand, social campaigns, visual content, and ethical digital citizenship for the next generation of creators.",
  },
  "startup-business": {
    title: "Startup & Business Innovation",
    tagline: "Idea to pitch — entrepreneurship, prototyping, and problem-solving for young founders.",
    description:
      "Explorers develop a real mini-startup: identify a problem, build a prototype, craft a pitch, and present to mentors in a celebration showcase.",
  },
  "coding-ai": {
    title: "Coding & AI",
    tagline: "Python, algorithms, and AI concepts — from first script to intelligent projects.",
    description:
      "Aligned with the Coding & AI Mission Path. Programming fundamentals, computational thinking, and AI discovery through guided missions and LAB builds.",
  },
  "robotics-engineering": {
    title: "Introduction to Robotics",
    tagline: "Design, wire, and program robots — engineering process from sketch to autonomous bot.",
    description:
      "Aligned with the Robotics Mission Path. Electronics, microcontrollers, ESP32 builds, and engineering design challenges with Wokwi simulation fallback.",
  },
  "iot-smart-systems": {
    title: "IoT & Smart Systems",
    tagline: "Sensors, connectivity, and smart devices — build the connected world.",
    description:
      "Aligned with the IoT Mission Path. Smart sensors, wireless systems, cloud dashboards, and real-world automation projects.",
  },
  "digital-content-creation": {
    title: "Digital Content Creation",
    tagline: "Video, design, and media — craft stories that inspire and inform.",
    description:
      "Explorers produce videos, graphics, and multimedia portfolios using industry-inspired tools — storytelling, editing, and visual design fundamentals.",
  },
  "cybersecurity-basics": {
    title: "Cybersecurity Basics for Teens",
    tagline: "Defend your digital life — passwords, privacy, phishing, and ethical hacking intro.",
    description:
      "Age-appropriate security elective: safe online habits, threat awareness, basic network concepts, and ethical responsibility in the digital world.",
  },
  "creative-tech-social-impact-teens": {
    title: "Creative Tech & Social Impact for Teens",
    tagline:
      "Design, creativity, and purpose — a welcoming STEAM path for teens exploring STEM beyond wires and code.",
    description:
      "A creative elective for teens: design thinking, creative coding with Scratch, digital storytelling, diverse STEM role models, and team projects that solve real community problems.",
  },
};

export function getSchoolElectiveEn(slug: string) {
  return NOVA_SCHOOL_ELECTIVES_EN[slug];
}
