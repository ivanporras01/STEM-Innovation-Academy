import type { ExperienceStageId } from "./catalog";
import { getExperience } from "./catalog";
import { getBuddy, type BuddyId, type BuddyTrait } from "./buddies";

type LabContext = "code" | "robot" | "iot";

const SLUG_BRIEFING: Record<string, string> = {
  "restore-nova-signal":
    "Theta-9 is silent. We'll read the decoder together — one line at a time until Mission Control sees green.",
  "rescue-rover":
    "Dr. Vega is counting on us. Plan each move on the grid before you launch ARIA-7.",
  "smart-greenhouse":
    "Those plants are someone's semester of work. Let's arm the automation before it's too late.",
  "pixel-portal-escape":
    "The Arcade Nebula needs a fair level. Paint the path, dodge the glitch, playtest like a pro.",
  "viral-signal-brief":
    "No spam. No fear hooks. We'll craft a brief that Explorers actually want to share.",
  "founder-orbit-pitch":
    "Demo Day is live. Specific problem, clear solution, real customer — let's score this pitch.",
  "story-beacon-reel":
    "Five beats, one trailer. Sequence the arc until the premiere feels inevitable.",
  "phish-shadow-ops":
    "Stay sharp. Urgency and fake domains are bait — classify, then seal the vault.",
  "community-spark-lab":
    "People first. Pick a need, choose a creative tool, write a promise you can keep.",
};

const SLUG_LAB: Record<string, string> = {
  "restore-nova-signal": "Watch the signal meter — every edit you make moves the needle.",
  "rescue-rover": "Build your queue, launch, watch ARIA-7 move. Iterate until the module is reached.",
  "smart-greenhouse": "Plant viability is dropping. Configure fast, test smart, protect the crop.",
  "pixel-portal-escape": "Tap tiles to forge the path. Playtest until EXIT lights up.",
  "viral-signal-brief": "Audience + hook + channel. Watch Signal Strength climb past 80.",
  "founder-orbit-pitch": "Write sharp. Score again. Mentors reward clarity.",
  "story-beacon-reel": "▲ / ▼ until Hook → Problem → Hero → Twist → Win. Then preview.",
  "phish-shadow-ops": "Mark every lure. Forge a vault password with real strength.",
  "community-spark-lab": "Assemble need + tool + promise. Impact over flashy tech.",
};

const SLUG_QUIZ: Record<string, string> = {
  "restore-nova-signal": "Think like a coder — why did the logic work?",
  "rescue-rover": "Engineers learn from failure. Which mindset matches NOVA?",
  "smart-greenhouse": "IoT is about connected action. Pick the answer that proves you get it.",
  "pixel-portal-escape": "Why do designers playtest before shipping?",
  "viral-signal-brief": "What makes a campaign ethical and effective?",
  "founder-orbit-pitch": "What makes a youth pitch strong?",
  "story-beacon-reel": "Why does story order matter in a short trailer?",
  "phish-shadow-ops": "Which clue often marks phishing?",
  "community-spark-lab": "What should lead a social-impact tech project?",
};

const SLUG_REFLECTION: Record<string, string> = {
  "restore-nova-signal": "Dream bigger — what would YOUR beacon detect next?",
  "rescue-rover": "You're the engineer now. What upgrade would you ship on ARIA-8?",
  "smart-greenhouse": "Imagine the whole campus connected. What would you automate first?",
  "pixel-portal-escape": "What power-up would make your portal escape even more fun?",
  "viral-signal-brief": "What story from your life would make a powerful campaign next?",
  "founder-orbit-pitch": "If Mentors funded one prototype tomorrow, what would you build?",
  "story-beacon-reel": "What real NOVA moment would you storyboard next?",
  "phish-shadow-ops": "What safety habit will you teach a friend this week?",
  "community-spark-lab": "Whose life gets easier if your prototype works next month?",
};

const TRAIT_BRIEFING: Record<BuddyTrait, Record<LabContext, string>> = {
  PATIENT: {
    code: "We'll read the signal together. No step is too small.",
    robot: "Plan the route calmly. Every command is a choice.",
    iot: "Plants need care — we'll tune the system gently.",
  },
  LOGICAL: {
    code: "Trace the condition: if READY, then restore. Pure logic.",
    robot: "Forward moves advance. Turns change heading. Sequence = path.",
    iot: "If temperature > threshold, activate cooling. Simple rule.",
  },
  CURIOUS: {
    code: "What else could the beacon send? Explore after we fix it.",
    robot: "Why that route? Test and discover the pattern.",
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
    robot: "Dr. Vega waits. We will reach her.",
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
    robot: "Visualize ARIA-7 rolling toward the module.",
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
    robot: "Precise commands. Precise path. No guesswork.",
    iot: "Set threshold ≤ 28°C. Precision saves plants.",
  },
  OBSERVANT: {
    code: "Watch the output closely — the clue is in the details.",
    robot: "Observe how each command changes the rover's path.",
    iot: "Notice how small temperature shifts trigger big changes.",
  },
  STRATEGIC: {
    code: "Strategy: locate READY, print success, activate uplink.",
    robot: "Strategy: route around debris, reach the module.",
    iot: "Strategy: automate before viability hits zero.",
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
  const exp = getExperience(experienceSlug);

  switch (stage) {
    case "buddy":
      return buddy.intro;
    case "briefing":
      return SLUG_BRIEFING[experienceSlug] ?? TRAIT_BRIEFING[trait][ctx];
    case "lab":
      return SLUG_LAB[experienceSlug] ?? TRAIT_LAB[trait];
    case "quiz":
      return SLUG_QUIZ[experienceSlug] ?? "Think it through. Pick the answer that shows you understand the system.";
    case "reflection":
      return SLUG_REFLECTION[experienceSlug] ?? "I want to hear YOUR idea. What would you build next?";
    case "debrief":
      return TRAIT_DEBRIEF[trait];
    case "achievement":
      return exp ? `${buddy.cheer} ${exp.achievementMessage.split(".")[0]}.` : buddy.cheer;
    default:
      return buddy.intro;
  }
}

export function getBuddyDisplayName(buddyId: BuddyId | string, nickname?: string | null): string {
  if (nickname?.trim()) return nickname.trim();
  return getBuddy(buddyId).name;
}
