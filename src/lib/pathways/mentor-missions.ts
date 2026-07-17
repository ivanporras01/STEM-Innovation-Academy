import type { KitTier } from "@/lib/nova-kit";

export type MentorMissionMeta = {
  /** Shown in mission UI — Innovation Mentor reviews at monthly session */
  mentorLed: boolean;
  kitTier: KitTier;
  /** Warm one-liner so Explorers feel supported, not tested */
  explorerNote: string;
  checkpoints?: string[];
};

/** Key by `${courseSlug}::${lessonTitle}` — matches seed pathway lesson titles */
export const MENTOR_MISSIONS: Record<string, MentorMissionMeta> = {
  // ── Robotics & Engineering ──
  "robotics-engineering::LAB: Wire Your First Sensor": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "Your first real circuit — every Explorer starts here. Your mentor will help you troubleshoot like a pro.",
    checkpoints: ["Photo of wiring", "Serial Monitor reading", "Short reflection"],
  },
  "robotics-engineering::LAB: LED Response System": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "When your LEDs respond to the world, you're officially building robots. Show your mentor at the next session!",
    checkpoints: ["Working LED logic", "Video clip", "What you'd improve next"],
  },
  "robotics-engineering::LAB: Blink & Beep Protocol": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "This is your rover's handshake with the universe — beeps, blinks, and confidence. You've got this.",
    checkpoints: ["Startup sequence video", "Serial log", "Stretch goal attempt (optional)"],
  },
  "robotics-engineering::LAB: Calibrate Line Sensors": {
    mentorLed: true,
    kitTier: "robotics-plus",
    explorerNote:
      "Calibration is where good robots become great ones. Your mentor loves this mission — bring your test runs.",
    checkpoints: ["Calibration notes", "Before/after comparison", "Photo of setup"],
  },
  "robotics-engineering::Build Challenge: Line Follower Prototype": {
    mentorLed: true,
    kitTier: "robotics-plus",
    explorerNote:
      "Your mid-path masterpiece — a rover that thinks for itself. We celebrate every run, perfect or not.",
    checkpoints: ["5 trial log", "Best-run video", "One improvement documented"],
  },
  "robotics-engineering::Build Challenge: Rescue Rover Design Portfolio": {
    mentorLed: true,
    kitTier: "robotics-plus",
    explorerNote:
      "This is your capstone story — show the world what you built and who you became as an innovator.",
    checkpoints: ["Portfolio link", "Final demo video", "Reflection for mentor feedback"],
  },

  // ── IoT & Smart Systems ──
  "iot-smart-systems::LAB: Temperature Probe": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "Your ESP32 just learned to feel temperature — that's IoT magic. Share your first reading with pride.",
    checkpoints: ["DHT11 wired", "Serial output screenshot", "Real-world test photo"],
  },
  "iot-smart-systems::LAB: Serial Data Logger": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "Data is the language of smart devices. You're learning to listen — your mentor will review your logs together.",
    checkpoints: ["Logged data sample", "Code snippet", "What the data tells you"],
  },
  "iot-smart-systems::LAB: Automated Water Trigger": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "You built something that acts on the world. That's engineering with heart — greenhouse heroes start here.",
    checkpoints: ["Trigger demo", "Threshold explanation", "Safety check noted"],
  },
  "iot-smart-systems::LAB: Air Quality Alert Prototype": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "Protecting spaces with sensors — you're thinking like a community innovator. Bring questions to mentor time.",
    checkpoints: ["Alert demo", "Sensor placement photo", "Who this helps (1 sentence)"],
  },
  "iot-smart-systems::Build Challenge: Classroom Climate Station": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "A station your classmates could actually use — that's NOVA Build in action. We can't wait to see it live.",
    checkpoints: ["Multi-sensor dashboard", "Installation sketch", "Demo video"],
  },
  "iot-smart-systems::Build Challenge: Community Smart System Blueprint": {
    mentorLed: true,
    kitTier: "base",
    explorerNote:
      "Dream big for your community — your blueprint is the start of real change. Mentors are here to amplify your idea.",
    checkpoints: ["System diagram", "BOM list", "Impact statement"],
  },
};

export function getMentorMissionMeta(
  courseSlug: string,
  lessonTitle: string
): MentorMissionMeta | undefined {
  return MENTOR_MISSIONS[`${courseSlug}::${lessonTitle}`];
}

export function isHardwareMission(type: string): boolean {
  return type === "LAB" || type === "PROJECT";
}
