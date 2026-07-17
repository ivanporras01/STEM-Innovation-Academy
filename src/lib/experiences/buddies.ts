export type BuddyTier = "friendly" | "pro";

export type BuddyTrait =
  | "PATIENT"
  | "LOGICAL"
  | "CURIOUS"
  | "THOUGHTFUL"
  | "ADVENTUROUS"
  | "DETERMINED"
  | "CREATIVE"
  | "ENERGETIC"
  | "ANALYTICAL"
  | "IMAGINATIVE"
  | "INNOVATIVE"
  | "INSIGHTFUL"
  | "FOCUSED"
  | "OBSERVANT"
  | "STRATEGIC"
  | "PRECISE"
  | "VISIONARY"
  | "RELIABLE"
  | "PRAGMATIC"
  | "EFFICIENCY";

export type BuddyId =
  | "navito"
  | "r3"
  | "luna"
  | "milo"
  | "ollie"
  | "koda"
  | "zara"
  | "bolt"
  | "pixel"
  | "astra"
  | "orion"
  | "eleo"
  | "prof-hoot"
  | "chelsea"
  | "marina"
  | "leo"
  | "dr-bunny"
  | "skylar"
  | "rhino"
  | "nexo";

export type Buddy = {
  id: BuddyId;
  number: number;
  name: string;
  subtitle: string;
  tier: BuddyTier;
  tierLabel: string;
  trait: BuddyTrait;
  image: string;
  color: string;
  glow: string;
  intro: string;
  cheer: string;
};

/** Metadata synced from coding-ai-lab-demo(2).html — user's 20 NOVA Buddies */
export const FRIENDLY_BUDDIES: Buddy[] = [
  {
    id: "navito",
    number: 1,
    name: "Navito",
    subtitle: "Wise Panda",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "PATIENT",
    image: "/buddies/navito.jpg",
    color: "from-slate-100 via-blue-50 to-cyan-100",
    glow: "shadow-[0_0_24px_rgba(0,180,216,0.35)]",
    intro: "No rush. We explore together, one step at a time.",
    cheer: "See? Patience turns confusion into clarity.",
  },
  {
    id: "r3",
    number: 2,
    name: "R3",
    subtitle: "Robot Buddy",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "LOGICAL",
    image: "/buddies/r3.jpg",
    color: "from-slate-100 via-indigo-50 to-violet-100",
    glow: "shadow-[0_0_24px_rgba(118,87,232,0.35)]",
    intro: "Logic is our superpower. Let's trace every step.",
    cheer: "Clean logic, clean results. Well done.",
  },
  {
    id: "luna",
    number: 3,
    name: "Luna",
    subtitle: "Space Explorer",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "CURIOUS",
    image: "/buddies/luna.jpg",
    color: "from-indigo-50 via-purple-50 to-pink-50",
    glow: "shadow-[0_0_24px_rgba(167,139,250,0.35)]",
    intro: "Every mission starts with a question. What do you wonder?",
    cheer: "Your curiosity just opened a new door.",
  },
  {
    id: "milo",
    number: 4,
    name: "Mike",
    subtitle: "Smart Cat",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "THOUGHTFUL",
    image: "/buddies/milo.jpg",
    color: "from-amber-50 via-orange-50 to-yellow-50",
    glow: "shadow-[0_0_24px_rgba(255,122,0,0.3)]",
    intro: "Let's think it through before we build. Good ideas need care.",
    cheer: "Thoughtful work — that's how great Explorers grow.",
  },
  {
    id: "ollie",
    number: 5,
    name: "Ollie",
    subtitle: "Clever Otter",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "ADVENTUROUS",
    image: "/buddies/ollie.jpg",
    color: "from-cyan-50 via-teal-50 to-emerald-50",
    glow: "shadow-[0_0_24px_rgba(0,180,216,0.35)]",
    intro: "Let's dive in — the best discoveries need courage.",
    cheer: "Bold moves! The ocean of ideas is yours.",
  },
  {
    id: "koda",
    number: 6,
    name: "Koda",
    subtitle: "Strong Thinker",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "DETERMINED",
    image: "/buddies/koda.jpg",
    color: "from-yellow-50 via-amber-100 to-orange-50",
    glow: "shadow-[0_0_24px_rgba(255,193,7,0.35)]",
    intro: "We build until it works. Determination beats doubt.",
    cheer: "That focus paid off. Engineers think like you.",
  },
  {
    id: "zara",
    number: 7,
    name: "Zara",
    subtitle: "Creative Creator",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "CREATIVE",
    image: "/buddies/zara.jpg",
    color: "from-pink-50 via-rose-50 to-fuchsia-50",
    glow: "shadow-[0_0_24px_rgba(236,72,153,0.3)]",
    intro: "Rules are starting points. Your idea might be better.",
    cheer: "Creative thinking — that's pure NOVA energy.",
  },
  {
    id: "bolt",
    number: 8,
    name: "Bolt",
    subtitle: "Energy Buddy",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "ENERGETIC",
    image: "/buddies/bolt.jpg",
    color: "from-yellow-100 via-amber-50 to-orange-100",
    glow: "shadow-[0_0_24px_rgba(255,214,0,0.4)]",
    intro: "Let's move! Energy + action = breakthroughs.",
    cheer: "High energy, high impact. You're on fire!",
  },
  {
    id: "pixel",
    number: 9,
    name: "Pixel",
    subtitle: "Logic Penguin",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "ANALYTICAL",
    image: "/buddies/pixel.jpg",
    color: "from-sky-50 via-blue-50 to-indigo-50",
    glow: "shadow-[0_0_24px_rgba(59,130,246,0.3)]",
    intro: "Data tells stories. Let's read what the system says.",
    cheer: "Sharp analysis. You saw what others missed.",
  },
  {
    id: "astra",
    number: 10,
    name: "Astra",
    subtitle: "Dream Dragon",
    tier: "friendly",
    tierLabel: "Friendly Explorer",
    trait: "IMAGINATIVE",
    image: "/buddies/astra.jpg",
    color: "from-violet-100 via-purple-50 to-indigo-100",
    glow: "shadow-[0_0_24px_rgba(139,92,246,0.35)]",
    intro: "Imagine the impossible — then let's build toward it.",
    cheer: "Your imagination just changed the mission.",
  },
];

export const PRO_BUDDIES: Buddy[] = [
  {
    id: "orion",
    number: 11,
    name: "Orion",
    subtitle: "AI Programmer",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "INNOVATIVE",
    image: "/buddies/orion.jpg",
    color: "from-slate-100 via-zinc-100 to-blue-50",
    glow: "shadow-[0_0_24px_rgba(30,58,138,0.3)]",
    intro: "Innovation means seeing what doesn't exist yet.",
    cheer: "You didn't follow — you led. That's innovation.",
  },
  {
    id: "eleo",
    number: 12,
    name: "Eleo",
    subtitle: "Robotics Engineer",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "ANALYTICAL",
    image: "/buddies/eleo.jpg",
    color: "from-gray-50 via-slate-100 to-blue-50",
    glow: "shadow-[0_0_24px_rgba(100,116,139,0.3)]",
    intro: "Measure twice, execute once. Precision wins missions.",
    cheer: "Evidence-based thinking. Professional grade.",
  },
  {
    id: "prof-hoot",
    number: 13,
    name: "Prof. Hoot",
    subtitle: "Data Scientist",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "INSIGHTFUL",
    image: "/buddies/prof-hoot.jpg",
    color: "from-amber-50 via-yellow-50 to-orange-50",
    glow: "shadow-[0_0_24px_rgba(180,83,9,0.25)]",
    intro: "Look deeper. The insight is often hidden in the pattern.",
    cheer: "Insight unlocked. You understand the why.",
  },
  {
    id: "chelsea",
    number: 14,
    name: "Chelsea",
    subtitle: "Mechanical Engineer",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "FOCUSED",
    image: "/buddies/chelsea.jpg",
    color: "from-orange-50 via-amber-50 to-yellow-50",
    glow: "shadow-[0_0_24px_rgba(255,122,0,0.3)]",
    intro: "Excellence lives in the details. Make every step count.",
    cheer: "Precision under pressure. Leader-level work.",
  },
  {
    id: "marina",
    number: 15,
    name: "Marina",
    subtitle: "Marine Scientist",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "OBSERVANT",
    image: "/buddies/marina.jpg",
    color: "from-cyan-50 via-blue-50 to-teal-50",
    glow: "shadow-[0_0_24px_rgba(0,180,216,0.35)]",
    intro: "Watch closely — the clue is often in the small details.",
    cheer: "Sharp eyes. You noticed what mattered.",
  },
  {
    id: "leo",
    number: 16,
    name: "Leo",
    subtitle: "System Architect",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "STRATEGIC",
    image: "/buddies/leo.jpg",
    color: "from-amber-100 via-yellow-50 to-orange-50",
    glow: "shadow-[0_0_24px_rgba(234,179,8,0.35)]",
    intro: "Strategy first, action second. Plan the win.",
    cheer: "Strategic mind. You played the long game.",
  },
  {
    id: "dr-bunny",
    number: 17,
    name: "Dr. Bunny",
    subtitle: "Biotech Researcher",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "PRECISE",
    image: "/buddies/dr-bunny.jpg",
    color: "from-rose-50 via-pink-50 to-red-50",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.25)]",
    intro: "Focus beats distraction. One mission, full attention.",
    cheer: "Laser focus. Research-grade completion.",
  },
  {
    id: "skylar",
    number: 18,
    name: "Skylar",
    subtitle: "Aerospace Engineer",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "VISIONARY",
    image: "/buddies/skylar.jpg",
    color: "from-sky-100 via-blue-50 to-indigo-100",
    glow: "shadow-[0_0_24px_rgba(14,165,233,0.35)]",
    intro: "See the horizon. Great explorers navigate the future.",
    cheer: "Vision confirmed. You're flying at NOVA altitude.",
  },
  {
    id: "rhino",
    number: 19,
    name: "Rhino",
    subtitle: "Civil Engineer",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "PRAGMATIC",
    image: "/buddies/rhino.jpg",
    color: "from-stone-100 via-gray-50 to-slate-100",
    glow: "shadow-[0_0_24px_rgba(100,116,139,0.3)]",
    intro: "Strong foundations hold every great build together.",
    cheer: "Solid work. Built to last.",
  },
  {
    id: "nexo",
    number: 20,
    name: "Nexo",
    subtitle: "Systems Engineer",
    tier: "pro",
    tierLabel: "Pro Explorer",
    trait: "EFFICIENCY",
    image: "/buddies/nexo.jpg",
    color: "from-emerald-50 via-teal-50 to-cyan-50",
    glow: "shadow-[0_0_24px_rgba(18,166,106,0.35)]",
    intro: "Systems change. We adapt faster than the problem.",
    cheer: "Adaptive thinking — ready for any mission.",
  },
];

export const BUDDIES: Buddy[] = [...FRIENDLY_BUDDIES, ...PRO_BUDDIES];

export function getBuddy(id: string): Buddy {
  return BUDDIES.find((b) => b.id === id) ?? BUDDIES[0];
}

export function isValidBuddyId(id: string): id is BuddyId {
  return BUDDIES.some((b) => b.id === id);
}

export const TRAIT_COLORS: Record<BuddyTrait, string> = {
  PATIENT: "bg-sky-100 text-sky-800 border-sky-200",
  LOGICAL: "bg-indigo-100 text-indigo-800 border-indigo-200",
  CURIOUS: "bg-purple-100 text-purple-800 border-purple-200",
  THOUGHTFUL: "bg-teal-100 text-teal-800 border-teal-200",
  ADVENTUROUS: "bg-cyan-100 text-cyan-900 border-cyan-200",
  DETERMINED: "bg-amber-100 text-amber-900 border-amber-200",
  CREATIVE: "bg-pink-100 text-pink-800 border-pink-200",
  ENERGETIC: "bg-yellow-100 text-yellow-900 border-yellow-200",
  ANALYTICAL: "bg-blue-100 text-blue-800 border-blue-200",
  IMAGINATIVE: "bg-violet-100 text-violet-800 border-violet-200",
  INNOVATIVE: "bg-emerald-100 text-emerald-900 border-emerald-200",
  INSIGHTFUL: "bg-amber-100 text-amber-900 border-amber-200",
  FOCUSED: "bg-orange-100 text-orange-900 border-orange-200",
  OBSERVANT: "bg-teal-100 text-teal-900 border-teal-200",
  STRATEGIC: "bg-green-100 text-green-900 border-green-200",
  PRECISE: "bg-rose-100 text-rose-800 border-rose-200",
  VISIONARY: "bg-sky-100 text-sky-900 border-sky-200",
  RELIABLE: "bg-slate-100 text-slate-800 border-slate-200",
  PRAGMATIC: "bg-teal-100 text-teal-900 border-teal-200",
  EFFICIENCY: "bg-green-100 text-green-900 border-green-200",
};

/** Pro Explorers use green trait pills like the NOVA mockup */
export const PRO_TRAIT_COLORS: Partial<Record<BuddyTrait, string>> = {
  INNOVATIVE: "bg-emerald-100 text-emerald-900 border-emerald-200",
  ANALYTICAL: "bg-teal-100 text-teal-900 border-teal-200",
  INSIGHTFUL: "bg-green-100 text-green-900 border-green-200",
  FOCUSED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  OBSERVANT: "bg-teal-100 text-teal-900 border-teal-200",
  STRATEGIC: "bg-green-100 text-green-900 border-green-200",
  PRECISE: "bg-emerald-100 text-emerald-900 border-emerald-200",
  VISIONARY: "bg-teal-100 text-teal-900 border-teal-200",
  PRAGMATIC: "bg-green-100 text-green-900 border-green-200",
  EFFICIENCY: "bg-emerald-100 text-emerald-900 border-emerald-200",
};

export function traitColor(trait: BuddyTrait, tier: BuddyTier): string {
  if (tier === "pro" && PRO_TRAIT_COLORS[trait]) return PRO_TRAIT_COLORS[trait]!;
  return TRAIT_COLORS[trait];
}
