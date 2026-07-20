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

export type LabType = "code" | "robot" | "iot" | "quest";

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
  /** Where "continue" / path links go after the mission (school elective or LMS path). */
  homeHref: string;
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
    homeHref: "/courses/intro-python-ai",
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
    homeHref: "/courses/robotics-engineering",
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
    homeHref: "/courses/iot-smart-systems",
    difficulty: 2,
    durationMinutes: 28,
    questTeaser:
      "Heat spike in the research greenhouse. Configure sensors, arm automation, and save 200 student crops before viability hits zero.",
  },
  {
    slug: "pixel-portal-escape",
    labCode: "NOVA LAB 004",
    title: "Forge the Pixel Portal",
    headline: "Pixel Portal Escape",
    launchTagline: "Game design ops · Build a playable world under pressure",
    storyHook:
      "The Arcade Nebula collapsed mid-tournament. Thousands of Explorers are trapped in a half-built level. Mission Control needs YOU to forge a safe path from START to EXIT, dodge the glitch virus, and playtest the portal before the server wipes.",
    stakes: "🎮 Tournament freeze in 8 minutes · Glitch virus spreading tile by tile",
    pathway: "CODING_AI",
    pathwayTitle: "Gaming & Game Design",
    labType: "quest",
    accent: "#a855f7",
    accentSecondary: "#22d3ee",
    achievementTitle: "Level Architect",
    achievementMessage:
      "You didn't just place tiles — you designed play. That's how game creators think.",
    missionObjective:
      "Paint a connected floor path from START to EXIT, avoid the glitch hazard, and pass Playtest.",
    missionLead:
      "Great levels teach with every step. Build, playtest, iterate — ship only what works.",
    briefingBeats: [
      {
        label: "Situation",
        text: "The escape level is corrupted. Only a designer who playtests can reopen the portal.",
      },
      {
        label: "Your role",
        text: "You are the Level Architect — forge a fair path players can actually finish.",
      },
      {
        label: "Success criteria",
        text: "Playtest reaches EXIT without stepping on the glitch tile.",
      },
    ],
    skills: ["Level Design", "Playtesting", "Spatial Logic"],
    quizQuestion: "Why do game designers playtest before shipping a level?",
    quizOptions: [
      { text: "To discover blocked paths and fix fairness before players get stuck.", correct: true },
      { text: "Because pretty colors matter more than playable routes.", correct: false },
      { text: "Playtesting is optional if the art looks cool.", correct: false },
    ],
    quizSuccess: "Exactly. Design is a loop: build → test → improve.",
    reflectionPrompt: "What power-up would you add to this portal escape next?",
    debriefLead:
      "You turned empty tiles into a journey. Every game you love started with a designer who playtested like this.",
    courseSlug: "gaming-game-design",
    homeHref: "/school/gaming-game-design",
    difficulty: 2,
    durationMinutes: 22,
    questTeaser:
      "Arcade Nebula is collapsing. Forge a playable escape path, dodge the glitch, and playtest the portal before wipe.",
  },
  {
    slug: "viral-signal-brief",
    labCode: "NOVA LAB 005",
    title: "Launch the Viral Signal",
    headline: "Viral Signal Brief",
    launchTagline: "Digital marketing · Ethical campaigns that actually spread",
    storyHook:
      "NOVA School's new Explore missions are ready — but nobody knows. Mission Control needs an ethical launch brief: the right audience, a curiosity hook, and a channel that respects people. Spam will crash Signal Strength. Smart storytelling will light up the network.",
    stakes: "📡 Launch window open 12 hours · Reputation on the line",
    pathway: "CODING_AI",
    pathwayTitle: "Digital Marketing & Social Media",
    labType: "quest",
    accent: "#f97316",
    accentSecondary: "#fbbf24",
    achievementTitle: "Signal Storyteller",
    achievementMessage:
      "You grew reach without dark patterns. That's marketing with integrity — and it works.",
    missionObjective:
      "Build a campaign brief that hits 80+ Signal Strength with ethical audience, hook, and channel choices.",
    missionLead:
      "Great campaigns invite — they don't manipulate. Craft the brief, launch, read the meter.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Three missions launched silently. Explorers need a spark, not spam.",
      },
      {
        label: "Your role",
        text: "You are Campaign Lead — pick audience, hook, and channel like a pro.",
      },
      {
        label: "Success criteria",
        text: "Signal Strength ≥ 80 after Launch Campaign.",
      },
    ],
    skills: ["Audience Focus", "Messaging", "Ethical Growth"],
    quizQuestion: "What makes a campaign ethical AND effective?",
    quizOptions: [
      {
        text: "Clear audience, honest curiosity hook, and a respectful channel.",
        correct: true,
      },
      { text: "Fear, fake urgency, and mass DM spam to everyone.", correct: false },
      { text: "Posting once with no idea who it's for.", correct: false },
    ],
    quizSuccess: "Yes — precision + respect beats noise every time.",
    reflectionPrompt: "What story from YOUR life would make a powerful NOVA campaign next?",
    debriefLead:
      "You treated attention as a gift, not a loot box. Brands that last think like that.",
    courseSlug: "digital-marketing",
    homeHref: "/school/digital-marketing",
    difficulty: 2,
    durationMinutes: 20,
    questTeaser:
      "Craft an ethical launch brief, hit 80+ Signal Strength, and light up NOVA's network without spam.",
  },
  {
    slug: "founder-orbit-pitch",
    labCode: "NOVA LAB 006",
    title: "Founder Orbit Pitch",
    headline: "Demo Day: Orbit Pitch",
    launchTagline: "Startup innovation · Problem → solution → customer under the clock",
    storyHook:
      "NOVA Demo Day starts in ten minutes. Mentors are assembling. You have one shot: name a real problem, a STEM-powered solution, and the customer who benefits — then score a pitch sharp enough to unlock Founders Circle.",
    stakes: "🚀 Demo Day live · Mentors scoring in real time",
    pathway: "CODING_AI",
    pathwayTitle: "Startup & Business Innovation",
    labType: "quest",
    accent: "#fb7185",
    accentSecondary: "#38bdf8",
    achievementTitle: "Orbit Founder",
    achievementMessage:
      "You turned a fuzzy idea into a crisp pitch. Founders win by clarifying, not by shouting.",
    missionObjective:
      "Write problem, solution, and customer with enough specificity to score 72+ on Pitch Pad.",
    missionLead:
      "Specificity is rocket fuel. Vague pitches stall on the pad.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Mentors fund clarity. Fuzzy ideas get polite smiles — sharp ones get next steps.",
      },
      {
        label: "Your role",
        text: "You are Founder on Deck — fill Pitch Pad and score until GO.",
      },
      {
        label: "Success criteria",
        text: "Pitch score ≥ 72 with real problem, solution, and customer text.",
      },
    ],
    skills: ["Problem Framing", "Value Prop", "Pitch Craft"],
    quizQuestion: "What makes a youth startup pitch strong?",
    quizOptions: [
      {
        text: "A specific problem, a clear solution, and a defined customer.",
        correct: true,
      },
      { text: "Saying you'll make a billion dollars somehow.", correct: false },
      { text: "Hiding who the product is for.", correct: false },
    ],
    quizSuccess: "Perfect. Clarity is the first product.",
    reflectionPrompt: "If Mentors funded one prototype tomorrow, what would you build first?",
    debriefLead:
      "You practiced the founder loop: problem → solution → who cares. That's how startups leave the launchpad.",
    courseSlug: "startup-business",
    homeHref: "/school/startup-business",
    difficulty: 2,
    durationMinutes: 22,
    questTeaser:
      "Demo Day is live. Lock problem, solution, and customer — score 72+ and enter Founders Circle.",
  },
  {
    slug: "story-beacon-reel",
    labCode: "NOVA LAB 007",
    title: "Story Beacon Trailer",
    headline: "Story Beacon Reel",
    launchTagline: "Digital content · Sequence a trailer that hits hard",
    storyHook:
      "NOVA News needs a 15-second trailer tonight. Five storyboard beats are scrambled. Reorder them into a cinematic arc — Hook, Problem, Hero, Twist, Win — before the premiere clock hits zero.",
    stakes: "🎬 Premiere in 15 minutes · Global feed waiting",
    pathway: "CODING_AI",
    pathwayTitle: "Digital Content Creation",
    labType: "quest",
    accent: "#e11d48",
    accentSecondary: "#f472b6",
    achievementTitle: "Story Director",
    achievementMessage:
      "You shaped emotion with order. That's directing — and audiences feel it.",
    missionObjective:
      "Reorder the five storyboard beats into Hook → Problem → Hero → Twist → Win, then Preview Trailer.",
    missionLead:
      "Story is architecture. Move the beats until the trailer breathes.",
    briefingBeats: [
      {
        label: "Situation",
        text: "The beats are brilliant — but shuffled. Wrong order = flat trailer.",
      },
      {
        label: "Your role",
        text: "You are Story Director — sequence tension, then release it.",
      },
      {
        label: "Success criteria",
        text: "Preview Trailer locks the classic five-beat arc.",
      },
    ],
    skills: ["Storyboarding", "Narrative Arc", "Editing Judgment"],
    quizQuestion: "Why does story order matter in a short trailer?",
    quizOptions: [
      {
        text: "Tension then payoff keeps viewers emotionally invested.",
        correct: true,
      },
      { text: "Any random order works if the music is loud.", correct: false },
      { text: "The win should always come first.", correct: false },
    ],
    quizSuccess: "Yes — structure is invisible craft that audiences feel.",
    reflectionPrompt: "What real NOVA moment would you storyboard for next week's News reel?",
    debriefLead:
      "You directed with intention. Creators who ship trailers like this build audiences that care.",
    courseSlug: "digital-content-creation",
    homeHref: "/school/digital-content-creation",
    difficulty: 1,
    durationMinutes: 18,
    questTeaser:
      "Scrambled storyboard. Sequence Hook → Problem → Hero → Twist → Win before premiere.",
  },
  {
    slug: "phish-shadow-ops",
    labCode: "NOVA LAB 008",
    title: "Phish Shadow Ops",
    headline: "Inbox Under Siege",
    launchTagline: "Cyber defense · Spot lures, seal the vault",
    storyHook:
      "A social-engineering swarm just hit Explorer inboxes. Some messages look almost real. Classify each as SAFE or PHISH, then forge a vault password strong enough that Mission Control trusts you with the network keys.",
    stakes: "🛡 Active phishing wave · Credential theft in progress",
    pathway: "CODING_AI",
    pathwayTitle: "Cybersecurity Basics for Teens",
    labType: "quest",
    accent: "#14b8a6",
    accentSecondary: "#67e8f9",
    achievementTitle: "Shadow Defender",
    achievementMessage:
      "You saw through the bait and sealed the vault. Defenders think twice — then act once.",
    missionObjective:
      "Correctly classify every inbox message, then create an 80+ strength vault password.",
    missionLead:
      "Urgency, fake domains, and password asks are classic lures. Trust, then verify.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Four messages landed. Two are traps. Hesitation costs accounts.",
      },
      {
        label: "Your role",
        text: "You are Shadow Ops Analyst — classify, then seal the vault.",
      },
      {
        label: "Success criteria",
        text: "100% correct classifications + password strength ≥ 80.",
      },
    ],
    skills: ["Phishing Awareness", "Password Hygiene", "Threat Spotting"],
    quizQuestion: "Which clue often marks a phishing message?",
    quizOptions: [
      {
        text: "Urgent threats plus weird domains asking for your password.",
        correct: true,
      },
      { text: "A calm update from a known official NOVA address.", correct: false },
      { text: "Any email that mentions STEM.", correct: false },
    ],
    quizSuccess: "Nailed it. Urgency + credential asks = stop and verify.",
    reflectionPrompt: "What habit will you teach a friend this week to stay safer online?",
    debriefLead:
      "You practiced real digital self-defense. The best hackers never get your password — because you never give it away.",
    courseSlug: "cybersecurity-basics",
    homeHref: "/school/cybersecurity-basics",
    difficulty: 2,
    durationMinutes: 20,
    questTeaser:
      "Phishing swarm inbound. Classify SAFE vs PHISH, forge a strong vault password, seal Mission Control.",
  },
  {
    slug: "community-spark-lab",
    labCode: "NOVA LAB 009",
    title: "Community Spark Lab",
    headline: "Ignite a Community Spark",
    launchTagline: "Creative tech · Design with empathy for real people",
    storyHook:
      "Your neighborhood needs a spark — not another unused gadget. Pair a real community need with a creative tech approach, write a clear impact promise, and assemble a prototype card Mentors can believe in.",
    stakes: "💛 Showcase tonight · Community partners watching",
    pathway: "CODING_AI",
    pathwayTitle: "Creative Tech & Social Impact",
    labType: "quest",
    accent: "#84cc16",
    accentSecondary: "#fde047",
    achievementTitle: "Impact Spark",
    achievementMessage:
      "You designed with people at the center. That's STEAM with purpose.",
    missionObjective:
      "Choose a community need + creative tool, write a 20+ character impact promise, and Assemble Prototype.",
    missionLead:
      "Purpose beats flashy tech. Empathy first, then build.",
    briefingBeats: [
      {
        label: "Situation",
        text: "Partners want tiny interventions that help — not slide decks that fade.",
      },
      {
        label: "Your role",
        text: "You are Impact Designer — pick need, tool, and promise.",
      },
      {
        label: "Success criteria",
        text: "Prototype assembled with a clear, human impact promise.",
      },
    ],
    skills: ["Empathy", "Design Thinking", "Creative Tech"],
    quizQuestion: "What should lead a social-impact tech project?",
    quizOptions: [
      {
        text: "A real community need and a promise you can actually keep.",
        correct: true,
      },
      { text: "The fanciest tool, even if nobody asked for it.", correct: false },
      { text: "Skipping people and jumping straight to code.", correct: false },
    ],
    quizSuccess: "Yes — human need first, tech second.",
    reflectionPrompt: "Whose life gets easier if your prototype works next month?",
    debriefLead:
      "You practiced design that listens. Creative tech that helps communities is innovation at its best.",
    courseSlug: "creative-tech-social-impact-teens",
    homeHref: "/school/creative-tech-social-impact-teens",
    difficulty: 1,
    durationMinutes: 20,
    questTeaser:
      "Pair a community need with creative tech, write your impact promise, and spark a mentor-ready prototype.",
  },
];

export function getExperience(slug: string): NovaExperience | undefined {
  return EXPERIENCES.find((e) => e.slug === slug);
}
