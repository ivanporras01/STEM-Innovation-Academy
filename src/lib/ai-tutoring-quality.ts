export type LearnerIntent =
  | "new-problem"
  | "answer-attempt"
  | "confusion"
  | "continue"
  | "hint"
  | "worked-example"
  | "slower"
  | "different-explanation";

export type DeterministicCoach = {
  explanation: string;
  formula: string;
  guidingQuestion: string;
  suggestedActions: string[];
  correctness?: "correct" | "needs-revision";
  visual?: "linear" | "triangle";
};

export function detectLearnerIntent(message: string, selectedAction = "message"): LearnerIntent {
  const value = message.trim().toLowerCase();
  if (selectedAction === "continue" || /^(continue|next|i got it|got it)\b/.test(value)) return "continue";
  if (selectedAction === "hint" || /\b(hint|clue)\b/.test(value)) return "hint";
  if (selectedAction === "slower" || /\b(slow|smaller steps|one step at a time)\b/.test(value)) return "slower";
  if (selectedAction === "different-explanation" || /\b(different way|explain again|another way)\b/.test(value)) return "different-explanation";
  if (/\b(worked example|show (me )?(all |every |the )?steps|solve it for me|full solution)\b/.test(value)) return "worked-example";
  if (/\b(i (don't|do not) understand|confused|lost|not sure|doesn't make sense|dont understand)\b/.test(value)) return "confusion";
  if (/^(?:-?\d+(?:\.\d+)?|x\s*=\s*-?\d+(?:\.\d+)?|y\s*=\s*-?\d+(?:\.\d+)?|[a-z]\s*=\s*-?\d+(?:\.\d+)?)\s*[.!?]?$/i.test(value) || /\b(my answer|i think|is it)\b/.test(value)) return "answer-attempt";
  return "new-problem";
}

export function plainMath(value: string) {
  return value
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2")
    .replace(/\\times|\\cdot/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\$\$/g, "")
    .replace(/\$/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function numberFromAttempt(message: string) {
  const match = message.replace(/\s/g, "").match(/(?:x|y)?=?(-?\d+(?:\.\d+)?)/i);
  return match ? Number(match[1]) : null;
}

function linearCoach(message: string): DeterministicCoach | null {
  const normalized = message.replace(/\s/g, "");
  const match = normalized.match(/^(-?\d*)x([+-]\d+)?=(-?\d+)$/i);
  if (!match) return null;
  const coefficient = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : Number(match[1]);
  const constant = Number(match[2] ?? 0);
  const right = Number(match[3]);
  const solution = (right - constant) / coefficient;
  return {
    explanation: `We can isolate x by undoing ${constant ? (constant > 0 ? `+ ${constant}` : `− ${Math.abs(constant)}`) : "the coefficient"} one step at a time. First, what remains after you move the constant to the other side?`,
    formula: plainMath(message),
    guidingQuestion: `What is ${right} ${constant > 0 ? "−" : "+"} ${Math.abs(constant)}?`,
    suggestedActions: ["I think it is " + (right - constant), "Show me a hint", "Go slower"],
    visual: "linear",
    ...(Number.isFinite(solution) ? {} : {}),
  };
}

export function localCoach(message: string, intent: LearnerIntent, priorQuestion = ""): DeterministicCoach {
  const linear = linearCoach(message);
  if (linear && intent === "new-problem") return linear;
  if (intent === "confusion" || intent === "slower") {
    return {
      explanation: "That is okay—let’s shrink this to one move. Look for the operation attached to the variable, and undo just that operation first.",
      formula: priorQuestion || "one small step",
      guidingQuestion: "What operation is attached to the variable right now?",
      suggestedActions: ["I see addition or subtraction", "I see multiplication or division", "Show me an example"],
    };
  }
  if (intent === "hint") {
    return {
      explanation: "Here is one hint: use the inverse operation. Addition is undone by subtraction; multiplication is undone by division.",
      formula: priorQuestion || "inverse operations",
      guidingQuestion: "Which inverse operation matches the step you see?",
      suggestedActions: ["I know it", "Explain differently", "Go slower"],
    };
  }
  if (intent === "worked-example") {
    return {
      explanation: "Worked example: 2x + 3 = 11. Subtract 3 from both sides to get 2x = 8, then divide both sides by 2, so x = 4.",
      formula: "2x + 3 = 11 → 2x = 8 → x = 4",
      guidingQuestion: "Which inverse operation was used first?",
      suggestedActions: ["Subtract 3", "Show a similar problem", "Return to my problem"],
    };
  }
  return {
    explanation: "I’m in local coaching mode, so I can guide one reliable next step without pretending to generate a new AI solution. Share the full equation, graph, or geometry fact and we’ll work from what is visible.",
    formula: plainMath(message) || "Your Math mission",
    guidingQuestion: "What is the exact problem or the next value you want to check?",
    suggestedActions: ["Share the full problem", "Show me a hint", "Go slower"],
  };
}

export function verifySimpleAnswer(message: string, priorQuestion: string): DeterministicCoach | null {
  const attempted = numberFromAttempt(message);
  if (attempted === null) return null;
  const expression = priorQuestion.replace(/[?=]/g, " ").match(/(-?\d+(?:\.\d+)?)\s*([+−-])\s*(-?\d+(?:\.\d+)?)/);
  if (!expression) return null;
  const left = Number(expression[1]);
  const right = Number(expression[3]);
  const expected = expression[2] === "+" ? left + right : left - right;
  const correct = Math.abs(attempted - expected) < 1e-9;
  return {
    explanation: correct
      ? `Yes—${attempted} is correct. Nice check of that operation.`
      : `Close—check the sign. ${left} ${expression[2]} ${right} equals ${expected}, not ${attempted}.`,
    formula: `${left} ${expression[2]} ${right} = ${expected}`,
    guidingQuestion: correct ? "What should we do with that result next?" : "Try that calculation once more: what do you get?",
    suggestedActions: correct ? ["Continue", "Show me a hint"] : [`I get ${expected}`, "Go slower"],
    correctness: correct ? "correct" : "needs-revision",
  };
}
