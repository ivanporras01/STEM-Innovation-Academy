export type { BuddyId, Buddy, BuddyTrait, BuddyTier } from "./buddies";
export {
  BUDDIES,
  FRIENDLY_BUDDIES,
  PRO_BUDDIES,
  getBuddy,
  isValidBuddyId,
  TRAIT_COLORS,
  traitColor,
  PRO_TRAIT_COLORS,
} from "./buddies";
export { getBuddyDialogue, getBuddyDisplayName } from "./dialogues";

export type LabType = "code" | "robot" | "iot";

export type ExperienceStageId =
  | "launch"
  | "buddy"
  | "briefing"
  | "lab"
  | "quiz"
  | "reflection"
  | "debrief"
  | "achievement";

export const STAGE_LABELS: Record<ExperienceStageId, string> = {
  launch: "Mission Launch",
  buddy: "Choose Your Buddy",
  briefing: "Mission Briefing",
  lab: "Interactive LAB",
  quiz: "Innovation Check",
  reflection: "Explorer Reflection",
  debrief: "Mission Debrief",
  achievement: "Achievement Unlocked",
};

export const STAGE_ORDER: ExperienceStageId[] = [
  "launch",
  "buddy",
  "briefing",
  "lab",
  "quiz",
  "reflection",
  "debrief",
  "achievement",
];

export type QuizOption = { text: string; correct: boolean };

export type PathwayKey = "CODING_AI" | "ROBOTICS" | "IOT";

export type NovaExperience = {
  slug: string;
  labCode: string;
  title: string;
  headline: string;
  pathway: PathwayKey;
  pathwayTitle: string;
  labType: LabType;
  accent: string;
  accentSecondary: string;
  achievementTitle: string;
  missionObjective: string;
  missionLead: string;
  skills: string[];
  quizQuestion: string;
  quizOptions: QuizOption[];
  quizSuccess: string;
  reflectionPrompt: string;
  debriefLead: string;
  courseSlug: string;
};

export const EXPERIENCES: NovaExperience[] = [
  {
    slug: "restore-nova-signal",
    labCode: "NOVA LAB 001",
    title: "Restore the NOVA Signal",
    headline: "Restore the NOVA Signal",
    pathway: "CODING_AI",
    pathwayTitle: "Coding & Artificial Intelligence",
    labType: "code",
    accent: "#00b4d8",
    accentSecondary: "#7657e8",
    achievementTitle: "Signal Coder",
    missionObjective: "Edit the message, keep READY, and run the mission.",
    missionLead:
      "A communication beacon has gone silent. Build a smart message analyzer that recognizes the signal and restores the connection.",
    skills: ["Variables", "Conditionals", "AI Thinking"],
    quizQuestion: "Why does the program restore the signal?",
    quizOptions: [
      { text: "Because the message contains READY.", correct: true },
      { text: "Because every program prints it.", correct: false },
      { text: "Because the computer guesses randomly.", correct: false },
    ],
    quizSuccess: "Correct. You explained how the system works.",
    reflectionPrompt: "What would you improve or invent next?",
    debriefLead:
      "You observed, tested, learned from feedback, and improved a system. That is how innovators work.",
    courseSlug: "intro-python-ai",
  },
  {
    slug: "rescue-rover",
    labCode: "NOVA LAB 002",
    title: "Guide the Rescue Rover",
    headline: "Guide the Rescue Rover",
    pathway: "ROBOTICS",
    pathwayTitle: "Robotics & Engineering Design",
    labType: "robot",
    accent: "#ff7a00",
    accentSecondary: "#ffd166",
    achievementTitle: "Rover Engineer",
    missionObjective: "Create a route with three Forward commands and one Right turn.",
    missionLead:
      "A rover must reach a stranded research module. Build a command sequence, test it, and improve the route.",
    skills: ["Sequencing", "Sensors", "Engineering Design"],
    quizQuestion: "What should an engineer do when a first design fails?",
    quizOptions: [
      { text: "Test, learn, and improve it.", correct: true },
      { text: "Hide the result.", correct: false },
      { text: "Never change the plan.", correct: false },
    ],
    quizSuccess: "Correct. Iteration is the heart of engineering.",
    reflectionPrompt: "What would you improve or invent next?",
    debriefLead:
      "You observed, tested, learned from feedback, and improved a system. That is how innovators work.",
    courseSlug: "robotics-engineering",
  },
  {
    slug: "smart-greenhouse",
    labCode: "NOVA LAB 003",
    title: "Protect the Smart Greenhouse",
    headline: "Protect the Smart Greenhouse",
    pathway: "IOT",
    pathwayTitle: "IoT & Emerging Technologies",
    labType: "iot",
    accent: "#12a66a",
    accentSecondary: "#6ee7b7",
    achievementTitle: "Smart Systems Builder",
    missionObjective: "Set the cooling threshold below 30°C and activate automation.",
    missionLead:
      "A greenhouse is overheating. Connect its sensor to automatic cooling and return the plants to a safe temperature.",
    skills: ["Sensors", "Automation", "Connected Systems"],
    quizQuestion: "What makes this an Internet of Things system?",
    quizOptions: [
      { text: "A sensor shares data with a connected controller.", correct: true },
      { text: "It uses electricity.", correct: false },
      { text: "It has a green display.", correct: false },
    ],
    quizSuccess: "Correct. Connected sensing and action define IoT.",
    reflectionPrompt: "What would you improve or invent next?",
    debriefLead:
      "You observed, tested, learned from feedback, and improved a system. That is how innovators work.",
    courseSlug: "iot-smart-systems",
  },
];

export function getExperience(slug: string): NovaExperience | undefined {
  return EXPERIENCES.find((e) => e.slug === slug);
}
