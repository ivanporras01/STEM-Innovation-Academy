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

export type BriefingBeat = { label: string; text: string };

export type PathwayKey = "CODING_AI" | "ROBOTICS" | "IOT";

export type NovaExperience = {
  slug: string;
  labCode: string;
  title: string;
  headline: string;
  launchTagline: string;
  storyHook: string;
  stakes: string;
  pathway: PathwayKey;
  pathwayTitle: string;
  labType: LabType;
  accent: string;
  accentSecondary: string;
  achievementTitle: string;
  achievementMessage: string;
  missionObjective: string;
  missionLead: string;
  briefingBeats: BriefingBeat[];
  skills: string[];
  quizQuestion: string;
  quizOptions: QuizOption[];
  quizSuccess: string;
  reflectionPrompt: string;
  debriefLead: string;
  courseSlug: string;
  difficulty: 1 | 2 | 3;
  durationMinutes: number;
  questTeaser: string;
};

export const EXPERIENCES: NovaExperience[] = [
  {
    slug: "restore-nova-signal",
    labCode: "NOVA LAB 001",
    title: "Restore the NOVA Signal",
    headline: "The Signal Goes Dark",
    launchTagline: "Deep-space relay · Coding & AI · First contact mission",
    storyHook:
      "NOVA Academy lost its deep-space relay twelve minutes ago. Without it, Explorers across three continents cannot receive tomorrow's launch codes. Mission Control needs YOU to decode the beacon and bring the uplink back online.",
    stakes: "⏱ Launch window closes in 6 hours · 2,400 Explorers waiting for connection",
    pathway: "CODING_AI",
    pathwayTitle: "Coding & Artificial Intelligence",
    labType: "code",
    accent: "#00b4d8",
    accentSecondary: "#7657e8",
    achievementTitle: "Signal Coder",
    achievementMessage:
      "You didn't just fix code — you restored hope across the NOVA network. That's what innovators do.",
    missionObjective:
      'Repair the decoder: set message to "NOVA READY", confirm with print("Signal restored!"), then activate the uplink line.',
    missionLead:
      "The beacon is broadcasting garbled data. Your job: read the logic, patch the script, and prove the signal is alive again.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Relay Station Theta-9 stopped responding. Last ping showed a corrupted message string.",
      },
      {
        label: "Your role",
        text: "You are the Signal Coder — edit the decoder script until Mission Control sees ONLINE.",
      },
      {
        label: "Success criteria",
        text: "100% signal strength + valid uplink confirmation in the console output.",
      },
    ],
    skills: ["Variables", "Conditionals", "Pattern Matching"],
    quizQuestion: "Why did your program restore the signal?",
    quizOptions: [
      {
        text: "The condition detected READY in the message and ran the restore logic.",
        correct: true,
      },
      { text: "The computer randomly picked a success message.", correct: false },
      { text: "Printing any text always fixes broken signals.", correct: false },
    ],
    quizSuccess: "Exactly. You connected data → decision → action. That's computational thinking.",
    reflectionPrompt: "If you could add ONE smart feature to this beacon next, what would it detect?",
    debriefLead:
      "You traced a real failure, patched live code, and verified the fix. Every AI system in the world starts with moments like this.",
    courseSlug: "intro-python-ai",
    difficulty: 2,
    durationMinutes: 25,
    questTeaser:
      "A silent deep-space relay. Patch the decoder, watch signal strength climb, and restore NOVA's uplink before launch window closes.",
  },
  {
    slug: "rescue-rover",
    labCode: "NOVA LAB 002",
    title: "Guide the Rescue Rover",
    headline: "Rescue at Sector 7",
    launchTagline: "Robotics field ops · Engineering under pressure",
    storyHook:
      "Innovation Mentor Dr. Vega is stranded at Sector 7 after a debris storm. Rover ARIA-7 is powered up — but it needs an Explorer to program the rescue route. Every command you write moves real hardware closer to her pod.",
    stakes: "🛰 Life-support pod at 78% · Debris field expanding eastward",
    pathway: "ROBOTICS",
    pathwayTitle: "Robotics & Engineering Design",
    labType: "robot",
    accent: "#ff7a00",
    accentSecondary: "#ffd166",
    achievementTitle: "Rover Engineer",
    achievementMessage:
      "You navigated chaos with logic and precision. Dr. Vega would be proud — and so is NOVA Mission Control.",
    missionObjective:
      "Program ARIA-7 from Launch Pad to the Rescue Module on the 4×4 grid. Use turns and forward moves. Avoid the debris field.",
    missionLead:
      "This is not a simulation on paper — it's sequencing, spatial reasoning, and engineering iteration. Build your command queue, launch, watch, improve.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Dr. Vega's pod is at Grid Sector [1,1]. Debris blocks the direct northern route.",
      },
      {
        label: "Your role",
        text: "Program ARIA-7's command queue — Forward moves advance; turns change heading before the next move.",
      },
      {
        label: "Success criteria",
        text: "Rover reaches the Rescue Module without collision. Route logged to Mission Control.",
      },
    ],
    skills: ["Sequencing", "Spatial Logic", "Iteration"],
    quizQuestion: "Your first route failed. What does a NOVA engineer do next?",
    quizOptions: [
      { text: "Analyze the failure, adjust commands, and test again.", correct: true },
      { text: "Assume the rover is broken and stop.", correct: false },
      { text: "Repeat the exact same route hoping for luck.", correct: false },
    ],
    quizSuccess: "That's the engineering design cycle — test, learn, improve. You're thinking like a builder.",
    reflectionPrompt: "What sensor would you add to ARIA-7 so it avoids debris automatically?",
    debriefLead:
      "You turned abstract commands into motion in a dangerous environment. Robotics is code made visible — and you made it work.",
    courseSlug: "robotics-engineering",
    difficulty: 2,
    durationMinutes: 30,
    questTeaser:
      "Dr. Vega is stranded. Command rover ARIA-7 through a live grid, dodge debris, and log the rescue route to Mission Control.",
  },
  {
    slug: "smart-greenhouse",
    labCode: "NOVA LAB 003",
    title: "Protect the Smart Greenhouse",
    headline: "Red Alert: Greenhouse",
    launchTagline: "IoT emergency response · Sensors save lives (and plants)",
    storyHook:
      "NOVA's research greenhouse just hit a heat spike — 34°C and climbing. Two hundred student-grown plants are at risk. The sensors work. The cooling system works. But nobody armed the automation rules. You're the Explorer who connects them.",
    stakes: "🌱 Crop viability dropping · 200 student research projects at risk",
    pathway: "IOT",
    pathwayTitle: "IoT & Emerging Technologies",
    labType: "iot",
    accent: "#12a66a",
    accentSecondary: "#6ee7b7",
    achievementTitle: "Smart Systems Builder",
    achievementMessage:
      "You turned raw sensor data into action that protects living things. That's IoT with purpose — and it's only the beginning.",
    missionObjective:
      "Arm the smart greenhouse: threshold ≤ 28°C, enable automation, trigger a heat-spike test, and confirm cooling + alert.",
    missionLead:
      "Smart systems aren't magic — they're sensors, rules, and actuators working together. Configure yours before the greenhouse crosses the danger zone.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Temperature is 34°C. Plants tolerate max 28°C. Cooling hardware is idle — rules not armed.",
      },
      {
        label: "Your role",
        text: "Set the automation threshold, enable the controller, and prove the system responds to a live spike.",
      },
      {
        label: "Success criteria",
        text: "Cooling activates, temperature drops to safe range, dashboard alert fires.",
      },
    ],
    skills: ["Sensors", "Automation Rules", "Connected Systems"],
    quizQuestion: "What makes this a true IoT system?",
    quizOptions: [
      {
        text: "A sensor sends data to a controller that automatically takes action.",
        correct: true,
      },
      { text: "It uses a green-colored interface.", correct: false },
      { text: "Someone manually checks temperature once a day.", correct: false },
    ],
    quizSuccess: "Yes — sense, decide, act, connected. You built a real IoT loop.",
    reflectionPrompt: "What other environmental danger would you automate for this greenhouse?",
    debriefLead:
      "You protected a living ecosystem with code and configuration. Smart agriculture, smart cities — they all start here.",
    courseSlug: "iot-smart-systems",
    difficulty: 2,
    durationMinutes: 28,
    questTeaser:
      "Heat spike in the research greenhouse. Configure sensors, arm automation, and save 200 student crops before viability hits zero.",
  },
];

export function getExperience(slug: string): NovaExperience | undefined {
  return EXPERIENCES.find((e) => e.slug === slug);
}
