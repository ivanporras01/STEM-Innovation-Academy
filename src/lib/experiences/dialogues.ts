import type { ExperienceStageId } from "./catalog";
import { getBuddy, type BuddyId, type BuddyTrait } from "./buddies";

type LabContext = "code" | "robot" | "iot";

const TRAIT_BRIEFING: Record<BuddyTrait, Record<LabContext, string>> = {
  PATIENT: {
    code: "We'll read the signal together. No step is too small.",
    robot: "Plan the route calmly. Every command is a choice.",
    iot: "Plants need care — we'll tune the system gently.",
  },
  LOGICAL: {
    code: "Trace the condition: if READY, then restore. Pure logic.",
    robot: "Forward × 3, Right × 1. Sequence = solution.",
    iot: "If temperature > threshold, activate cooling. Simple rule.",
  },
  CURIOUS: {
    code: "What else could the beacon send? Explore after we fix it.",
    robot: "Why three forwards? Test and discover the pattern.",
    iot: "What other sensors could protect these plants?",
  },
  THOUGHTFUL: {
    code: "First run might fail. Think it through, adjust, and run again.",
    robot: "Route not working? Pause, rethink, relaunch.",
    iot: "Keep testing until automation saves the greenhouse.",
  },
  ADVENTUROUS: {
    code: "This mission is your launchpad. Go bold in the LAB.",
    robot: "Rescue missions need courage. Command your rover.",
    iot: "Smart systems are an adventure in connected tech.",
  },
  DETERMINED: {
    code: "We don't stop until the signal reads ONLINE.",
    robot: "The module waits. We will reach it.",
    iot: "Those plants depend on us. Build the automation.",
  },
  CREATIVE: {
    code: "Could you detect more than READY? Dream after you succeed.",
    robot: "Maybe there's a smarter path than the obvious one.",
    iot: "Imagine alerts, charts, mobile apps — start here.",
  },
  ENERGETIC: {
    code: "Let's fire up that console and move fast!",
    robot: "Build that sequence with momentum!",
    iot: "Crank down that threshold and activate — go!",
  },
  ANALYTICAL: {
    code: "Analyze the string. Find the trigger. Execute.",
    robot: "Count your commands. Verify before launch.",
    iot: "Watch the numbers. Threshold drives behavior.",
  },
  IMAGINATIVE: {
    code: "Picture the beacon glowing again because of YOUR code.",
    robot: "Visualize the rover rolling toward the module.",
    iot: "Envision a farm that runs itself. You're building it.",
  },
  INNOVATIVE: {
    code: "Innovators fix broken signals. You're one of them.",
    robot: "Engineering rescue routes — classic innovation.",
    iot: "IoT innovation starts with one smart greenhouse.",
  },
  INSIGHTFUL: {
    code: "The insight: conditionals connect data to action.",
    robot: "Insight: sequencing is programming in motion.",
    iot: "Insight: sensors + rules = autonomous care.",
  },
  PRECISE: {
    code: "Exact syntax. Exact condition. Exact result.",
    robot: "Precisely three forwards, one right. No shortcuts.",
    iot: "Set threshold below 30°C. Precision matters.",
  },
  OBSERVANT: {
    code: "Watch the output closely — the clue is in the details.",
    robot: "Observe how each command changes the rover's path.",
    iot: "Notice how small temperature shifts trigger big changes.",
  },
  STRATEGIC: {
    code: "Strategy: locate READY, print success, mission done.",
    robot: "Strategy: shortest valid path to the module.",
    iot: "Strategy: automate before temperature spikes.",
  },
  FOCUSED: {
    code: "One mission. One goal. Restore the signal.",
    robot: "Focus on the command sequence. Nothing else.",
    iot: "Focus on threshold + automation. Execute.",
  },
  VISIONARY: {
    code: "Today a signal. Tomorrow an AI network. Start here.",
    robot: "Today a rover. Tomorrow autonomous fleets.",
    iot: "Today one greenhouse. Tomorrow smart agriculture.",
  },
  RELIABLE: {
    code: "Check every line. Solid foundations restore the connection.",
    robot: "Review each command before launch.",
    iot: "Every degree on the slider changes outcomes.",
  },
  PRAGMATIC: {
    code: "Practical fixes beat perfect theory. Ship what works.",
    robot: "Build the route that reaches the module — reliably.",
    iot: "Real-world constraints shape smart systems. Plan for them.",
  },
  EFFICIENCY: {
    code: "Clean code, clear logic, fast results.",
    robot: "Minimum commands, maximum progress.",
    iot: "Automate once, protect the greenhouse forever.",
  },
};

const TRAIT_LAB: Record<BuddyTrait, string> = {
  PATIENT: "Take your time. I'm right here with you.",
  LOGICAL: "Run the logic. Check the output.",
  CURIOUS: "What happens if you change one line?",
  THOUGHTFUL: "Not yet? Think it through — we're closer.",
  ADVENTUROUS: "Push the mission. Learn by doing.",
  DETERMINED: "Keep going. Finish line is ahead.",
  CREATIVE: "Your twist on the solution might surprise us.",
  ENERGETIC: "Let's go! Run it!",
  ANALYTICAL: "Read the output carefully.",
  IMAGINATIVE: "Picture success, then make it real.",
  INNOVATIVE: "This is where innovators separate themselves.",
  INSIGHTFUL: "What pattern do you see in the results?",
  PRECISE: "Double-check before you continue.",
  OBSERVANT: "You noticed what mattered. That's how experts work.",
  STRATEGIC: "Stick to the plan — it's sound.",
  FOCUSED: "Eyes on the objective.",
  VISIONARY: "You're building the future, one test at a time.",
  RELIABLE: "Small fixes, big impact.",
  PRAGMATIC: "Keep it practical — build what works.",
  EFFICIENCY: "Optimize and execute.",
};

const TRAIT_DEBRIEF: Record<BuddyTrait, string> = {
  PATIENT: "You stayed calm and solved it. That's real growth.",
  LOGICAL: "Logic won. You should be proud.",
  CURIOUS: "Your questions led to answers. Keep asking.",
  THOUGHTFUL: "You thought it through and solved it. That's NOVA spirit.",
  ADVENTUROUS: "Bold explorer. Mission complete.",
  DETERMINED: "Determination delivered. Outstanding.",
  CREATIVE: "You brought creativity to STEM. Love it.",
  ENERGETIC: "High energy, high achievement!",
  ANALYTICAL: "Sharp work. Data doesn't lie — you succeeded.",
  IMAGINATIVE: "You imagined success and made it happen.",
  INNOVATIVE: "Innovator badge earned in my book.",
  INSIGHTFUL: "Deep understanding. You get the why.",
  PRECISE: "Precision performance. Excellent.",
  OBSERVANT: "You saw what others missed. Outstanding.",
  STRATEGIC: "Strategy executed. Well played.",
  FOCUSED: "Focused effort, focused results.",
  VISIONARY: "You're seeing the bigger picture. Keep climbing.",
  RELIABLE: "Built on solid foundations. Excellent.",
  PRAGMATIC: "Practical engineering wins. Well done.",
  EFFICIENCY: "Efficient execution. Mission optimized.",
};

function labContextFromSlug(slug: string): LabContext {
  if (slug.includes("rover") || slug.includes("rescue")) return "robot";
  if (slug.includes("greenhouse") || slug.includes("smart")) return "iot";
  return "code";
}

export function getBuddyDialogue(
  buddyId: BuddyId | string,
  experienceSlug: string,
  stage: ExperienceStageId
): string {
  const buddy = getBuddy(buddyId);
  const ctx = labContextFromSlug(experienceSlug);
  const trait = buddy.trait;

  switch (stage) {
    case "buddy":
      return buddy.intro;
    case "briefing":
      return TRAIT_BRIEFING[trait][ctx];
    case "lab":
      return TRAIT_LAB[trait];
    case "quiz":
      return "Think it through. Pick the answer that shows you understand the system.";
    case "reflection":
      return "I want to hear YOUR idea. What would you build next?";
    case "debrief":
      return TRAIT_DEBRIEF[trait];
    case "achievement":
      return buddy.cheer;
    default:
      return buddy.intro;
  }
}

export function getBuddyDisplayName(buddyId: BuddyId | string, nickname?: string | null): string {
  if (nickname?.trim()) return nickname.trim();
  return getBuddy(buddyId).name;
}
