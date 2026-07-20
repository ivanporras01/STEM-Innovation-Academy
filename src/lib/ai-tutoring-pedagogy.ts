export type LearnerAction =
  | "message"
  | "continue"
  | "understood"
  | "hint"
  | "different-explanation"
  | "slower";

export type SuggestedAction = {
  label: string;
  action: LearnerAction;
  message?: string;
};

export const CORE_TUTOR_ACTIONS: SuggestedAction[] = [
  { label: "I got it — continue", action: "continue", message: "Continue to the next small step." },
  { label: "Show me a hint", action: "hint", message: "Please give one hint for this exact step." },
  { label: "Explain differently", action: "different-explanation", message: "Please explain this same step in a different way." },
  { label: "Slow down", action: "slower", message: "Please slow down and restate this step in smaller pieces." },
];

const ACTION_PATTERNS: Array<{ pattern: RegExp; action: LearnerAction; message?: string }> = [
  { pattern: /\b(continue|next step|i got it|got it|keep going)\b/i, action: "continue", message: "Continue to the next small step." },
  { pattern: /\b(hint|clue|nudge)\b/i, action: "hint", message: "Please give one hint for this exact step." },
  { pattern: /\b(different|another way|explain again|explain differently)\b/i, action: "different-explanation", message: "Please explain this same step in a different way." },
  { pattern: /\b(slow|smaller|one step at a time|go slower)\b/i, action: "slower", message: "Please slow down and restate this step in smaller pieces." },
  { pattern: /\b(understood|makes sense|i see it)\b/i, action: "understood", message: "I understand this step — let's continue." },
  { pattern: /\b(question|ask|wonder)\b/i, action: "message" },
];

export function mapSuggestedActionToLearnerAction(label: string): SuggestedAction {
  const trimmed = label.trim();
  for (const { pattern, action, message } of ACTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { label: trimmed, action, message: message ?? trimmed };
    }
  }
  return { label: trimmed, action: "message", message: trimmed };
}

export function mergeSuggestedActions(apiActions: string[]): SuggestedAction[] {
  const seen = new Set<string>();
  const merged: SuggestedAction[] = [];

  for (const label of apiActions) {
    const mapped = mapSuggestedActionToLearnerAction(label);
    const key = mapped.action === "message" ? mapped.label.toLowerCase() : mapped.action;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(mapped);
  }

  for (const core of CORE_TUTOR_ACTIONS) {
    if (merged.length >= 4) break;
    if (seen.has(core.action)) continue;
    seen.add(core.action);
    merged.push(core);
  }

  return merged.slice(0, 4);
}

export type FormulaReference = {
  title: string;
  items: string[];
};

const MATH_REFERENCES: Record<string, FormulaReference> = {
  "Algebra & equations": {
    title: "Algebra quick refs",
    items: ["Isolate the variable with inverse operations", "What you do to one side, do to the other", "Check by substituting your answer back"],
  },
  Geometry: {
    title: "Geometry quick refs",
    items: ["Interior angles of a triangle sum to 180°", "Slope = rise ÷ run", "Pythagorean theorem: a² + b² = c²"],
  },
  "Pre-algebra": {
    title: "Pre-algebra quick refs",
    items: ["Order of operations: PEMDAS", "Fractions: same denominator to add/subtract", "Ratios compare two quantities"],
  },
  "Statistics & probability": {
    title: "Statistics quick refs",
    items: ["Mean = sum ÷ count", "Probability = favorable outcomes ÷ total outcomes", "Range = max − min"],
  },
  "Functions & advanced algebra": {
    title: "Functions quick refs",
    items: ["Slope-intercept: y = mx + b", "Slope = (y₂ − y₁) ÷ (x₂ − x₁)", "Input → output: f(x)"],
  },
};

const SCIENCE_REFERENCES: Record<string, FormulaReference> = {
  Biology: {
    title: "Biology quick refs",
    items: ["Cell = basic unit of life", "Plants: cell wall + chloroplasts", "Animals: no cell wall; mitochondria for energy"],
  },
  Chemistry: {
    title: "Chemistry quick refs",
    items: ["Balance equations: same atoms on both sides", "Coefficients multiply whole formulas", "Subscripts count atoms inside a formula"],
  },
  Physics: {
    title: "Physics quick refs",
    items: ["Speed = distance ÷ time", "Acceleration = change in velocity ÷ time", "Force = mass × acceleration"],
  },
  "Earth & space science": {
    title: "Earth & space quick refs",
    items: ["Rock cycle: igneous → sedimentary → metamorphic", "Seasons from Earth's tilt", "Gravity pulls objects together"],
  },
  "Scientific investigation": {
    title: "Scientific method",
    items: ["Question → Hypothesis → Experiment → Data → Conclusion", "Control what you change (variable)", "Repeat trials for reliable data"],
  },
};

export function formulaReference(subject: "Math" | "Science", topic: string): FormulaReference {
  const catalog = subject === "Math" ? MATH_REFERENCES : SCIENCE_REFERENCES;
  return catalog[topic] ?? {
    title: subject === "Math" ? "Math mission refs" : "Science mission refs",
    items: subject === "Math"
      ? ["One small step at a time", "Draw or label what you know", "Check your units and signs"]
      : ["Observe before you explain", "Name the variable you change", "Use evidence, not guesses"],
  };
}

export type UnderstandingLevel = "starting" | "thinking" | "confident" | "needs-support";

export const UNDERSTANDING_LABELS: Record<UnderstandingLevel, { label: string; detail: string; color: string }> = {
  starting: { label: "Mission launch", detail: "Getting oriented", color: "text-nova-cyan" },
  thinking: { label: "Exploring", detail: "Working through the idea", color: "text-nova-cyan" },
  confident: { label: "Breakthrough zone", detail: "Solid grasp on this step", color: "text-nova-green" },
  "needs-support": { label: "Signal boost", detail: "Órbita will go slower", color: "text-nova-orange" },
};
