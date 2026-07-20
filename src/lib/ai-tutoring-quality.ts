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
  visual?: "linear" | "inequality-graph" | "triangle" | "square" | "fraction" | "geometry" | "science";
};

/** Parsed ax±b ∘ c ready for tutoring / graphing. */
export type LinearParsed = {
  relation: string;
  coefficient: number;
  constant: number;
  operator: "≤" | "≥" | "=" | "<" | ">";
  right: number;
  isInequality: boolean;
  afterConstant: number;
  /** Boundary after dividing by coefficient (inequality flipped if coefficient < 0). */
  solutionValue: number;
  solutionOperator: "≤" | "≥" | "=" | "<" | ">";
  solutionText: string;
};

export function wantsGraph(message: string) {
  return /\b(graph|plot|sketch|number\s*line|draw\s+(it|the|this)|on\s+the\s+(board|number\s*line))\b/i.test(message);
}

function flipInequality(op: LinearParsed["operator"]): LinearParsed["operator"] {
  if (op === "<") return ">";
  if (op === ">") return "<";
  if (op === "≤") return "≥";
  if (op === "≥") return "≤";
  return op;
}

function formatBoundary(value: number) {
  if (Number.isInteger(value)) return String(value);
  const abs = Math.abs(value);
  // Prefer simple halves like 1/2, 3/2 when exact.
  if (Math.abs(abs * 2 - Math.round(abs * 2)) < 1e-9) {
    const num = Math.round(value * 2);
    const sign = num < 0 ? "-" : "";
    const n = Math.abs(num);
    return n === 1 ? `${sign}1/2` : `${sign}${n}/2`;
  }
  const rounded = Math.round(value * 1000) / 1000;
  return String(rounded);
}

export function parseLinearRelation(message: string): LinearParsed | null {
  const relation = extractLinearRelation(message);
  if (!relation) return null;
  const compact = relation.replace(/\s/g, "");
  const match = compact.match(/^(-?\d*)x([+-]\d+)?(≤|≥|=|<|>)(-?\d+)$/i);
  if (!match) return null;

  const coefficient = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : Number(match[1]);
  const constant = Number(match[2] ?? 0);
  const operator = match[3] as LinearParsed["operator"];
  const right = Number(match[4]);
  const afterConstant = right - constant;
  const solutionValue = afterConstant / coefficient;
  const solutionOperator = coefficient < 0 ? flipInequality(operator) : operator;
  const solutionText =
    operator === "="
      ? `x = ${formatBoundary(solutionValue)}`
      : `x ${solutionOperator} ${formatBoundary(solutionValue)}`;

  return {
    relation,
    coefficient,
    constant,
    operator,
    right,
    isInequality: operator !== "=",
    afterConstant,
    solutionValue,
    solutionOperator,
    solutionText,
  };
}

export type ScopeViolationReason = "non-stem-subject" | "elementary-only" | "college-only";

export type ScopeViolation = {
  reason: ScopeViolationReason;
  explanation: string;
  guidingQuestion: string;
  suggestedActions: string[];
};

const NON_STEM_SUBJECT_PATTERNS = [
  /\b(history|historical|english class|literature|essay|writing prompt|grammar|vocabulary|spelling|spanish class|french class|portuguese class|german class|language learning|learn (english|spanish|french|portuguese)|geography|social studies|civics|government class|economics class|philosophy|art class|music class|band class|physical education|pe class|religion class|bible study)\b/i,
  /\bhelp (me )?with (my )?(history|english|essay|spanish|french|geography)\b/i,
];

const ELEMENTARY_ONLY_PATTERNS = [
  /\b(kindergarten|pre-?k\b|grade\s?[1-5]\b|grades?\s?[1-5]\b|first grade|second grade|third grade|fourth grade|fifth grade|elementary school|primary school)\b/i,
  /\b(counting to \d+|learn to count|single digit addition|number bonds for kids|adding with pictures)\b/i,
];

const COLLEGE_ONLY_PATTERNS = [
  /\b(graduate school|grad school|ph\.?d\b|doctoral|thesis|dissertation|multivariable calculus|differential equations|real analysis|abstract algebra|topology|organic chemistry ii|physical chemistry|quantum field|upper.?division|college calculus iii|partial derivatives|laplace transform)\b/i,
];

export function detectScopeViolation(message: string): ScopeViolation | null {
  const text = message.trim();
  if (!text) return null;

  for (const pattern of NON_STEM_SUBJECT_PATTERNS) {
    if (pattern.test(text)) {
      return {
        reason: "non-stem-subject",
        explanation:
          "Órbita’s mission is Middle & High School Math and Science only (grades 6–12). I can’t guide history, language arts, or other subjects here—but I’d love to help with a Math or Science question.",
        guidingQuestion: "What Math or Science problem would you like to explore next?",
        suggestedActions: ["I have a Math question", "I have a Science question", "Show me an example"],
      };
    }
  }

  for (const pattern of ELEMENTARY_ONLY_PATTERNS) {
    if (pattern.test(text)) {
      return {
        reason: "elementary-only",
        explanation:
          "Órbita supports Explorers in Middle & High School (grades 6–12). If you’re working ahead on grade 6+ Math or Science, share that problem and we’ll take one step together.",
        guidingQuestion: "Do you have a grade 6–12 Math or Science question we can start with?",
        suggestedActions: ["Share my Math problem", "Share my Science question", "Show me an example"],
      };
    }
  }

  for (const pattern of COLLEGE_ONLY_PATTERNS) {
    if (pattern.test(text)) {
      return {
        reason: "college-only",
        explanation:
          "That topic is beyond Middle & High School scope. Órbita focuses on grades 6–12 Math and Science—algebra through precalculus, geometry, statistics, and core biology, chemistry, and physics.",
        guidingQuestion: "Is there a middle or high school Math or Science problem I can help you break down?",
        suggestedActions: ["I have a Math problem", "I have a Science question", "Show me an example"],
      };
    }
  }

  return null;
}

export function scopeViolationCoach(violation: ScopeViolation): DeterministicCoach {
  return {
    explanation: violation.explanation,
    formula: "Middle & High School · Grades 6–12 · Math & Science",
    guidingQuestion: violation.guidingQuestion,
    suggestedActions: violation.suggestedActions,
  };
}

export function detectLearnerIntent(message: string, selectedAction = "message"): LearnerIntent {
  const value = message.trim().toLowerCase();
  if (selectedAction === "continue" || /^(continue|next|i got it|got it)\b/.test(value)) return "continue";
  if (selectedAction === "hint" || /\b(hint|clue)\b/.test(value)) return "hint";
  if (selectedAction === "slower" || /\b(slow|smaller steps|one step at a time)\b/.test(value)) return "slower";
  if (selectedAction === "different-explanation" || /\b(different way|explain again|another way)\b/.test(value)) return "different-explanation";
  if (/\b(worked example|show (me )?(all |every |the )?steps?|solve it for me|full solution)\b/.test(value)) return "worked-example";
  if (/\b(i (don't|do not) understand|confused|lost|not sure|doesn't make sense|dont understand)\b/.test(value)) return "confusion";
  if (/^(?:-?\d+(?:\.\d+)?|x\s*=\s*-?\d+(?:\.\d+)?|y\s*=\s*-?\d+(?:\.\d+)?|[a-z]\s*=\s*-?\d+(?:\.\d+)?)\s*[.!?]?$/i.test(value) || /\b(my answer|i think|is it)\b/.test(value)) return "answer-attempt";
  return "new-problem";
}

export function plainMath(value: string) {
  return value
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2")
    .replace(/\\times|\\cdot/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\leq|<=/g, "≤")
    .replace(/\\geq|>=/g, "≥")
    .replace(/\$\$/g, "")
    .replace(/\$/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pull a linear equation/inequality out of natural-language tutoring messages. */
export function extractLinearRelation(message: string): string | null {
  const cleaned = message
    .replace(/^\s*i have a question:\s*/i, "")
    .replace(/\b(how\s+do\s+i|how\s+to|please|help\s+me|can\s+you|solve|simplify|graph|plot|sketch)\b/gi, " ")
    .replace(/\b(this\s+)?(equation|inequality|expression)\b/gi, " ")
    .replace(/\s+/g, "");
  const match = cleaned.match(/(-?\d*)x([+-]\d+)?(<=|>=|=|<|>|≤|≥)(-?\d+)/i);
  if (!match) return null;
  // Avoid treating x^2 equations as linear.
  if (/x\^?2|x²/i.test(cleaned)) return null;
  const leftCoef = match[1] === "" || match[1] === "+" ? "x" : match[1] === "-" ? "-x" : `${match[1]}x`;
  const constant = match[2] ?? "";
  const op = match[3].replace("<=", "≤").replace(">=", "≥");
  return plainMath(`${leftCoef}${constant}${op}${match[4]}`);
}

/** Pull a simple square equation like x^2 + 7 = 46 from natural language. */
export function extractSquareRelation(message: string): string | null {
  const cleaned = message
    .replace(/^\s*i have a question:\s*/i, "")
    .replace(/\b(how\s+do\s+i|how\s+to|please|help\s+me|can\s+you|solve|simplify)\b/gi, " ")
    .replace(/x²/gi, "x^2")
    .replace(/\s+/g, "");
  const match = cleaned.match(/^(-?\d*)x\^2([+-]\d+)?=(-?\d+)$/i);
  if (!match) return null;
  const coef = match[1] === "" || match[1] === "+" ? "" : match[1] === "-" ? "-" : match[1];
  const constant = match[2] ?? "";
  return plainMath(`${coef}x^2${constant}=${match[3]}`).replace(/x\^2/g, "x²");
}

function numberFromAttempt(message: string) {
  const match = message.replace(/\s/g, "").match(/(?:x|y)?=?(-?\d+(?:\.\d+)?)/i);
  return match ? Number(match[1]) : null;
}

function linearCoach(message: string): DeterministicCoach | null {
  const parsed = parseLinearRelation(message);
  if (!parsed) return null;

  const { relation, coefficient, constant, operator, right, isInequality, afterConstant, solutionText } = parsed;
  const graphIt = wantsGraph(message);
  const leftTerm = coefficient === 1 ? "x" : coefficient === -1 ? "-x" : `${coefficient}x`;

  if (graphIt && isInequality) {
    return {
      explanation: `Perfect—we'll solve ${relation}, then graph the solution on a number line. First isolate the x-term: undo ${constant === 0 ? "the coefficient next" : constant > 0 ? `+ ${constant}` : `− ${Math.abs(constant)}`} on both sides. After we finish, the graph uses a ${operator === ">" || operator === "<" ? "open" : "closed"} circle and shades the correct side.`,
      formula: relation,
      guidingQuestion:
        constant === 0
          ? `Divide both sides by ${coefficient}: what inequality do you get for x?`
          : `If you ${constant > 0 ? "subtract" : "add"} ${Math.abs(constant)} on both sides of ${relation}, what do you get?`,
      suggestedActions: [
        constant === 0 ? solutionText : `${leftTerm} ${operator} ${afterConstant}`,
        "Show me a hint",
        "Go slower",
      ],
      visual: "inequality-graph",
    };
  }

  return {
    explanation: isInequality
      ? `Great question—this is a linear inequality. Keep the balance idea: undo one operation at a time. First, let's isolate the x-term by moving ${constant === 0 ? "nothing yet" : constant > 0 ? `+ ${constant}` : `− ${Math.abs(constant)}`} to the other side.`
      : `We can isolate x by undoing ${constant ? (constant > 0 ? `+ ${constant}` : `− ${Math.abs(constant)}`) : "the coefficient"} one step at a time. First, what remains after you move the constant to the other side?`,
    formula: relation,
    guidingQuestion:
      constant === 0
        ? `What do you get when you divide both sides by ${coefficient}?`
        : isInequality
          ? `If you ${constant > 0 ? "subtract" : "add"} ${Math.abs(constant)} on both sides of ${relation}, what do you get?`
          : `What is ${right} ${constant > 0 ? "−" : "+"} ${Math.abs(constant)}?`,
    suggestedActions: [
      constant === 0
        ? solutionText
        : isInequality
          ? `${leftTerm} ${operator} ${afterConstant}`
          : `I think it is ${afterConstant}`,
      "Show me a hint",
      graphIt ? "Graph it on a number line" : "Go slower",
    ],
    visual: "linear",
  };
}

function fractionPercentCoach(message: string): DeterministicCoach | null {
  const text = message.toLowerCase();
  if (/\b(\d+\s*%|\d+\s*percent|percent of|what percent)\b/i.test(message)) {
    return {
      explanation: "Percents are parts of 100. Translate the sentence into part = percent/100 × whole, then solve for the missing piece.",
      formula: "part = (percent ÷ 100) × whole",
      guidingQuestion: "Which value is the part, which is the whole, and which is the percent?",
      suggestedActions: ["I know the whole and the percent", "Show me a hint", "Go slower"],
      visual: "fraction",
    };
  }
  if (/\b(fraction|simplify|lowest terms|lcd|least common|mixed number|improper)\b/i.test(text) || /\d+\/\d+/.test(message)) {
    return {
      explanation: "For fractions, name the job first: simplify, add/subtract (common denominator), multiply (tops × tops), or divide (multiply by the reciprocal).",
      formula: "a/b · c/d = (a·c)/(b·d)",
      guidingQuestion: "Are we simplifying, adding/subtracting, multiplying, or dividing these fractions?",
      suggestedActions: ["Simplify", "Add or subtract", "Multiply or divide"],
      visual: "fraction",
    };
  }
  if (/\b(ratio|proportion|unit rate|scale factor)\b/i.test(text)) {
    return {
      explanation: "Ratios compare two quantities; a proportion says two ratios are equal. Cross-multiply or scale both sides by the same factor.",
      formula: "a/b = c/d → a·d = b·c",
      guidingQuestion: "What two ratios are being compared—and which value is missing?",
      suggestedActions: ["Set up the proportion", "Show me a hint", "Go slower"],
      visual: "fraction",
    };
  }
  return null;
}

function geometryCoach(message: string): DeterministicCoach | null {
  const text = message.toLowerCase();
  if (/\b(pythagorean|right triangle|a\^2\s*\+\s*b\^2|hypotenuse)\b/i.test(text)) {
    return {
      explanation: "In a right triangle, the Pythagorean theorem connects the legs and hypotenuse: a² + b² = c². Identify the right angle first—c is always opposite it.",
      formula: "a² + b² = c²",
      guidingQuestion: "Which side is the hypotenuse, and which two are the legs?",
      suggestedActions: ["I know two sides", "Show me a hint", "Go slower"],
      visual: "triangle",
    };
  }
  if (/\b(area|perimeter|volume|circumference|surface area)\b/i.test(text)) {
    return {
      explanation: "Measurement problems start by naming the shape and the formula. Perimeter/circumference go around; area covers a surface; volume fills space.",
      formula: "choose formula → plug in → units",
      guidingQuestion: "What shape is it, and are we finding perimeter, area, or volume?",
      suggestedActions: ["Area", "Perimeter / circumference", "Volume"],
      visual: "geometry",
    };
  }
  if (/\b(triangle|angle|congruent|similar|parallel|transversal)\b/i.test(text)) {
    return {
      explanation: "For triangles and angles, use the facts you know: interior angles sum to 180°, vertical angles are equal, and similar figures keep matching side ratios.",
      formula: "∠A + ∠B + ∠C = 180°",
      guidingQuestion: "Which angle or side measures are already given?",
      suggestedActions: ["I know two angles", "Show me a hint", "Explain differently"],
      visual: "triangle",
    };
  }
  return null;
}

function squareCoach(message: string): DeterministicCoach | null {
  const relation = extractSquareRelation(message);
  if (!relation) return null;

  const compact = relation.replace(/\s/g, "").replace(/x²/g, "x^2");
  const match = compact.match(/^(-?\d*)x\^2([+-]\d+)?=(-?\d+)$/i);
  if (!match) return null;

  const coef = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : Number(match[1]);
  const constant = Number(match[2] ?? 0);
  const right = Number(match[3]);
  const afterConstant = right - constant;

  if (constant !== 0) {
    return {
      explanation: `Nice—this is a square equation. First isolate x² by undoing the constant (${constant > 0 ? `subtract ${constant}` : `add ${Math.abs(constant)}`}) on both sides. You can use the calculator for ${right} ${constant > 0 ? "−" : "+"} ${Math.abs(constant)}.`,
      formula: relation,
      guidingQuestion: `What is ${right} ${constant > 0 ? "−" : "+"} ${Math.abs(constant)}? Then what equation do you have for x²?`,
      suggestedActions: [`x² = ${afterConstant}`, `I get ${afterConstant}`, "Show me a hint"],
      visual: "square",
    };
  }

  const root = Math.sqrt(Math.abs(afterConstant / coef));
  const exact = Number.isInteger(root);
  return {
    explanation: exact
      ? `x² is isolated. Take the square root of both sides—and remember both the positive and negative roots.`
      : `x² is isolated. Take ±√ of both sides. If the number is not a perfect square, leave it under the root or estimate with the calculator.`,
    formula: coef === 1 ? `x² = ${afterConstant}` : `${coef}x² = ${afterConstant}`,
    guidingQuestion: exact
      ? `What are the two solutions for x?`
      : `What is ±√${Math.abs(afterConstant / coef)}? (Use the calculator √ if you want a decimal estimate.)`,
    suggestedActions: exact
      ? [`x = ${root} or x = −${root}`, "Show me a hint", "Try a similar problem"]
      : ["Leave it as ±√", "Estimate with √", "Show me a hint"],
    visual: "square",
  };
}

export function localCoach(message: string, intent: LearnerIntent, priorQuestion = "", subject: "Math" | "Science" = "Math"): DeterministicCoach {
  const scopeViolation = detectScopeViolation(message);
  if (scopeViolation) return scopeViolationCoach(scopeViolation);

  // Math brain still helps when the Explorer is in Science mode but pastes an equation.
  const square = squareCoach(message);
  if (square) return square;

  const linear = linearCoach(message);
  if (linear) return linear;

  const fractions = fractionPercentCoach(message);
  if (fractions) return fractions;

  const geometry = geometryCoach(message);
  if (geometry) return geometry;

  // Continue an in-progress problem when the Explorer answers with a next move.
  const activeProblem = extractLinearRelation(priorQuestion) || extractLinearRelation(`${priorQuestion} ${message}`);
  if (activeProblem && /^(subtract|add|divide|multiply|move|undo|isolate)\b/i.test(message.trim())) {
    const parsed = parseLinearRelation(activeProblem);
    if (parsed) {
      const { coefficient, operator, afterConstant, solutionText } = parsed;
      if (/subtract|add|move/i.test(message)) {
        const leftTerm = coefficient === 1 ? "x" : coefficient === -1 ? "-x" : `${coefficient}x`;
        return {
          explanation: `Nice move—after shifting the constant, we have ${leftTerm} ${operator} ${afterConstant}. Now undo the coefficient with division (and remember: if we divide by a negative, an inequality flips).`,
          formula: `${leftTerm} ${operator} ${afterConstant}`,
          guidingQuestion: `What do you get when you divide both sides by ${coefficient}?`,
          suggestedActions: [solutionText, "Show me a hint", wantsGraph(message) || wantsGraph(priorQuestion) ? "Graph the solution" : "Go slower"],
          visual: wantsGraph(message) || wantsGraph(priorQuestion) ? "inequality-graph" : "linear",
        };
      }
    }
  }

  const science = scienceCoach(message, intent, priorQuestion);
  if (science && (subject === "Science" || /\b(cell|force|energy|atom|photosynthesis|gravity|velocity|hypothesis|molecule|newton|circuit|ecology|genetics|dna|plate tectonics|weather|climate|ecosystem)\b/i.test(message))) {
    return science;
  }

  if (intent === "confusion" || intent === "slower") {
    return {
      explanation: "That is okay—let’s shrink this to one move. Name what you already know, then undo just the next attached operation or science idea.",
      formula: priorQuestion || "one small step",
      guidingQuestion: "What is one fact or operation you already see in the problem?",
      suggestedActions: ["I see a first step", "Show me an example", "Go slower"],
    };
  }
  if (intent === "hint") {
    return {
      explanation: "Here is one hint: use the inverse operation or the governing science idea. Addition↔subtraction, multiplication↔division; in science, name the formula that connects your known quantities.",
      formula: priorQuestion || "inverse operations / key formula",
      guidingQuestion: "Which inverse operation or formula matches the step you see?",
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

  const visibleMath = extractLinearRelation(message) || extractSquareRelation(message) || /[0-9]x|[0-9]+\s*[+\-*/=<>≤≥]|x\^2|x²/.test(message);
  if (visibleMath) {
    return {
      explanation: "I can see the Math already—let’s treat it like a professional tutor would. First we identify the structure, then undo one operation to isolate the variable or simplify the expression.",
      formula: plainMath(message).slice(0, 80) || "Math problem",
      guidingQuestion: "What is the very first inverse operation we should use?",
      suggestedActions: ["Undo addition/subtraction first", "Show me a hint", "Go slower"],
    };
  }

  if (subject === "Science") {
    return {
      explanation: "I’m ready for any Middle & High School Science question—biology, chemistry, physics, earth & space, or scientific investigation. Share the prompt, and we’ll take the first clear step together.",
      formula: "Observe → relate → explain (grades 6–12 Science)",
      guidingQuestion: "What Science question or lab prompt should we tackle first?",
      suggestedActions: ["Share the full Science question", "Show me a hint", "Go slower"],
      visual: "science",
    };
  }

  return {
    explanation:
      "I’m ready for any Middle & High School Math or Science question (grades 6–12)—equations, inequalities, graphing, geometry, fractions, stats, cells, forces, chemistry, and more. Paste the full problem and I’ll guide the next correct step.",
    formula: plainMath(message) || "Math & Science · grades 6–12",
    guidingQuestion: "What exact problem should we tackle first?",
    suggestedActions: ["Share the full problem", "Show me a hint", "Go slower"],
  };
}

export function scienceCoach(message: string, intent: LearnerIntent, priorQuestion = ""): DeterministicCoach | null {
  const text = message.trim().toLowerCase();

  if (/\b(speed|velocity|distance|time|rate|km\/h|m\/s|mph)\b/i.test(`${message} ${priorQuestion}`)) {
    return {
      explanation: "Speed connects distance and time: how far something travels per unit of time. Start with what you know—distance, time, or speed—and pick the formula that uses those two values.",
      formula: "speed = distance ÷ time",
      guidingQuestion: "Which two values do you already know—distance, time, or speed?",
      suggestedActions: ["I know distance and time", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(scientific method|hypothesis|experiment|variable|control|conclusion|investigation)\b/i.test(text)) {
    return {
      explanation: "The scientific method is a cycle: ask a question, form a hypothesis, test with an experiment, collect data, then draw a conclusion. Change one variable at a time so you know what caused the result.",
      formula: "Question → Hypothesis → Experiment → Data → Conclusion",
      guidingQuestion: "What is the question you want to test, and what do you predict will happen?",
      suggestedActions: ["I have a hypothesis", "Show me a hint", "Explain differently"],
    };
  }

  if (/\b(cell|organelle|mitochondria|chloroplast|nucleus|membrane|plant cell|animal cell)\b/i.test(text)) {
    return {
      explanation: "Cells are the basic units of life. Plant cells have a rigid cell wall and chloroplasts for photosynthesis; animal cells have no cell wall and rely on mitochondria for energy.",
      formula: "Cell → organelles → specialized jobs",
      guidingQuestion: "Is this a plant cell or an animal cell—and which organelle matches the job you are studying?",
      suggestedActions: ["Plant cell", "Animal cell", "Show me a hint"],
    };
  }

  if (/\b(balance|balancing|equation|reactant|product|coefficient|stoichiometry)\b/i.test(text)) {
    return {
      explanation: "Balancing a chemical equation means the same number of each atom on both sides. Adjust coefficients (numbers in front)—never subscripts inside a formula.",
      formula: "atoms in reactants = atoms in products",
      guidingQuestion: "Which element appears a different number of times on each side?",
      suggestedActions: ["I see an unbalanced element", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(force|newton|f\s*=\s*ma|acceleration|mass|net force)\b/i.test(text)) {
    return {
      explanation: "In physics, net force changes motion: F = m × a. More force means more acceleration; more mass means less acceleration for the same force.",
      formula: "F = m × a",
      guidingQuestion: "Which two values do you already know—force, mass, or acceleration?",
      suggestedActions: ["I know mass and acceleration", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(energy|kinetic|potential|joule|conservation of energy|work)\b/i.test(text)) {
    return {
      explanation: "Energy can change form, but in a closed system the total stays the same. Kinetic energy is motion; potential energy is stored by position or condition.",
      formula: "KE + PE ≈ constant (closed system)",
      guidingQuestion: "Is the energy mostly kinetic (moving) or potential (stored) in this moment?",
      suggestedActions: ["Mostly kinetic", "Mostly potential", "Show me a hint"],
    };
  }

  if (/\b(photosynthesis|chlorophyll|glucose|co2|carbon dioxide|stomata)\b/i.test(text)) {
    return {
      explanation: "Photosynthesis is how plants store light energy as chemical energy: carbon dioxide and water become glucose and oxygen, mostly inside chloroplasts.",
      formula: "CO₂ + H₂O + light → glucose + O₂",
      guidingQuestion: "Which inputs does the plant need for photosynthesis—light, CO₂, water, or all three?",
      suggestedActions: ["All three", "Show me a hint", "Explain differently"],
    };
  }

  if (/\b(atom|proton|neutron|electron|element|periodic table|atomic number)\b/i.test(text)) {
    return {
      explanation: "Atoms have a nucleus of protons and neutrons, with electrons outside. Atomic number equals protons and identifies the element.",
      formula: "atomic number = # protons",
      guidingQuestion: "Are you looking up protons, neutrons, electrons, or the element name?",
      suggestedActions: ["Protons / atomic number", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(circuit|voltage|current|resistance|ohm|series|parallel)\b/i.test(text)) {
    return {
      explanation: "Electric circuits move charge through a closed path. Ohm’s law links voltage, current, and resistance: V = I × R. Series shares one path; parallel splits into branches.",
      formula: "V = I × R",
      guidingQuestion: "Which two values do you already know—voltage, current, or resistance?",
      suggestedActions: ["I know two values", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(dna|gene|genetics|allele|dominant|recessive|punnett|heredity|chromosome)\b/i.test(text)) {
    return {
      explanation: "Genetics tracks how traits pass through genes. Alleles can be dominant or recessive; a Punnett square helps predict genotype and phenotype probabilities.",
      formula: "parents’ alleles → offspring probabilities",
      guidingQuestion: "Are you finding genotypes, phenotypes, or setting up a Punnett square?",
      suggestedActions: ["Set up a Punnett square", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(ecosystem|food chain|food web|producer|consumer|decomposer|ecology|biome)\b/i.test(text)) {
    return {
      explanation: "In ecology, energy usually flows from producers to consumers. Food webs show who eats whom; decomposers recycle matter back into the system.",
      formula: "producer → consumer → decomposer",
      guidingQuestion: "Which organisms are producers, consumers, or decomposers in this question?",
      suggestedActions: ["Identify the producers", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(gravity|orbit|planet|moon|solar system|galaxy|astronomy|earth.?space)\b/i.test(text)) {
    return {
      explanation: "Earth and space science connects gravity, orbits, and cycles. Gravity pulls masses together; planets orbit the Sun because inertia and gravity balance.",
      formula: "gravity + motion → orbits",
      guidingQuestion: "Is this about gravity, orbits, seasons, or another Earth/space idea?",
      suggestedActions: ["Gravity / orbits", "Show me a hint", "Go slower"],
    };
  }

  if (/\b(weather|climate|atmosphere|precipitation|front|water cycle)\b/i.test(text)) {
    return {
      explanation: "Weather is short-term atmosphere conditions; climate is the long-term pattern. The water cycle moves evaporation, condensation, and precipitation around Earth.",
      formula: "evaporation → condensation → precipitation",
      guidingQuestion: "Are you describing weather right now, climate over time, or a water-cycle step?",
      suggestedActions: ["Weather vs climate", "Water cycle step", "Show me a hint"],
    };
  }

  if (intent === "confusion" || intent === "slower") {
    return {
      explanation: "That is okay—let's zoom in on one science fact at a time. Name what you observe, then connect it to the formula or process.",
      formula: priorQuestion || "observe → explain",
      guidingQuestion: "What is one thing you can observe or measure in this problem?",
      suggestedActions: ["I can observe something", "Show me a hint", "Explain differently"],
    };
  }

  if (intent === "hint") {
    return {
      explanation: "Science hint: identify the variables first—what changes, what stays the same, and what you are trying to find.",
      formula: priorQuestion || "variables → relationship",
      guidingQuestion: "What quantity are you trying to find?",
      suggestedActions: ["Speed", "Distance", "Time", "Show me a hint"].slice(0, 3) as string[],
    };
  }

  return null;
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
