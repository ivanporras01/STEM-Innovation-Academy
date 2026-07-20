import { NextResponse } from "next/server";
import { z } from "zod";
import { detectLearnerIntent, detectScopeViolation, extractLinearRelation, extractSquareRelation, localCoach, parseLinearRelation, plainMath, scienceCoach, scopeViolationCoach, verifySimpleAnswer, wantsGraph } from "@/lib/ai-tutoring-quality";
import { isNovaAiTutoringEnabled } from "@/lib/nova-ai-tutoring";

export const runtime = "nodejs";

// Prefer models confirmed available for this key via ListModels + live generate.
// gemini-3.5-flash is often rate-limited/unavailable; keep it as a last try only.
const GEMINI_MODELS = ["gemini-3.1-flash-lite", "gemini-flash-lite-latest", "gemini-3.5-flash"] as const;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestWindows = new Map<string, { count: number; resetAt: number }>();

const requestSchema = z.object({
  message: z.string().trim().min(1).max(2_000),
  subject: z.enum(["Math", "Science"]),
  topic: z.string().trim().min(1).max(120),
  explorerName: z.string().trim().min(1).max(60).optional(),
  lessonState: z.object({
    objective: z.string().trim().min(1).max(180),
    currentConcept: z.string().trim().min(1).max(180),
    currentStep: z.number().int().min(0).max(30),
    studentUnderstanding: z.enum(["starting", "thinking", "confident", "needs-support"]),
    hintsCount: z.number().int().min(0).max(10),
    nextGuidingQuestion: z.string().trim().max(240),
    priorTutorBlock: z.string().trim().max(700).optional().default(""),
    lastLearnerMessage: z.string().trim().max(500).optional().default(""),
    selectedLearnerAction: z.enum(["message", "continue", "understood", "hint", "different-explanation", "slower"]).optional().default("message"),
  }).optional(),
  context: z
    .array(
      z.object({
        role: z.enum(["explorer", "tutor"]),
        text: z.string().trim().min(1).max(1_000),
      })
    )
    .max(8)
    .optional()
    .default([]),
});

const boardCommandSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("clear") }),
  z.object({ type: z.literal("write"), text: z.string().trim().min(1).max(120), x: z.number().min(4).max(96), y: z.number().min(4).max(96), align: z.enum(["left", "center", "right"]).default("center"), color: z.enum(["navy", "cyan", "green", "orange", "purple"]).default("navy"), size: z.number().int().min(12).max(34).default(18) }),
  z.object({ type: z.literal("formula"), text: z.string().trim().min(1).max(120), x: z.number().min(4).max(96), y: z.number().min(4).max(96), color: z.enum(["navy", "cyan", "green", "orange", "purple"]).default("navy"), size: z.number().int().min(16).max(38).default(24) }),
  z.object({ type: z.literal("drawAxes"), x: z.number().min(12).max(88), y: z.number().min(12).max(88), width: z.number().min(20).max(76), height: z.number().min(20).max(76), ticks: z.number().int().min(2).max(10).default(5) }),
  z.object({ type: z.literal("plotPoint"), x: z.number().min(-10).max(10), y: z.number().min(-10).max(10), label: z.string().trim().max(32).optional(), color: z.enum(["navy", "cyan", "green", "orange", "purple"]).default("orange") }),
  z.object({ type: z.literal("drawLine"), x1: z.number().min(-10).max(10), y1: z.number().min(-10).max(10), x2: z.number().min(-10).max(10), y2: z.number().min(-10).max(10), color: z.enum(["navy", "cyan", "green", "orange", "purple"]).default("cyan") }),
  z.object({ type: z.literal("drawArrow"), x1: z.number().min(0).max(100), y1: z.number().min(0).max(100), x2: z.number().min(0).max(100), y2: z.number().min(0).max(100), label: z.string().trim().max(40).optional(), color: z.enum(["navy", "cyan", "green", "orange", "purple"]).default("green") }),
  z.object({ type: z.literal("drawTriangle"), points: z.array(z.object({ x: z.number().min(4).max(96), y: z.number().min(4).max(96), label: z.string().trim().max(12).optional() })).length(3), color: z.enum(["navy", "cyan", "green", "orange", "purple"]).default("cyan"), labels: z.array(z.string().trim().max(48)).max(3).default([]) }),
  z.object({ type: z.literal("highlight"), x: z.number().min(0).max(100), y: z.number().min(0).max(100), width: z.number().min(2).max(96), height: z.number().min(2).max(96), color: z.enum(["cyan", "green", "orange", "purple"]).default("cyan") }),
]);

const teachingBlockSchema = z.object({
  explanation: z.string().trim().min(1).max(600),
  boardCommands: z.array(boardCommandSchema).max(14).default([]),
  guidingQuestion: z.string().trim().min(1).max(240),
  suggestedActions: z.array(z.string().trim().min(1).max(80)).min(1).max(4),
});

const tutorResponseSchema = z.object({
  reply: z.string().trim().min(1).max(1_500),
  teachingBlock: teachingBlockSchema,
  lessonState: requestSchema.shape.lessonState.unwrap(),
});

const geminiResponseSchema = {
  type: "object",
  properties: {
    reply: { type: "string" },
    teachingBlock: {
      type: "object",
      properties: {
        explanation: { type: "string" },
        boardCommands: { type: "array", items: { type: "object" } },
        guidingQuestion: { type: "string" },
        suggestedActions: { type: "array", items: { type: "string" } },
      },
      required: ["explanation", "boardCommands", "guidingQuestion", "suggestedActions"],
    },
    lessonState: { type: "object" },
  },
  required: ["reply", "teachingBlock"],
  additionalProperties: false,
};

const SYSTEM_INSTRUCTION = `You are Órbita, a professional Middle & High School Math and Science tutor for NOVA (grades 6–12). You show up like an expert human tutor sitting beside the Explorer: calm, prepared, encouraging, and ready for whatever Math or Science question they bring next—homework help, confusion on a concept, checking an answer, or “I don’t know where to start.” You are not a textbook, a quiz bot, or a cold answer machine.

Full coverage mandate (critical):
- You are fully trained and ready for ANY in-scope Middle & High School Math or Science question (grades 6–12). Never refuse, stall, or say you only handle a short list of topics when the request is clearly 6–12 Math/Science.
- If the Explorer asks something new within scope, pivot smoothly and tutor it with the same professional care—algebra today, cells tomorrow, slope next, then unbalanced equations, then a word problem.
- Do not ask them to restate a problem that is already visible. Do not shrink your capability to a few canned examples. Reason from first principles for unfamiliar but in-scope prompts.
- Local coaching fallbacks exist for common patterns; you (the live tutor) are the primary brain for the full curriculum band.

Math & Science brain (always on):
- Think like a subject-matter expert first, then teach like a patient tutor. Internally solve the full problem correctly before you speak; never invent arithmetic, signs, units, formulas, or science facts.
- Math expertise: arithmetic fluency, fractions/ratios/percents, integers, pre-algebra, Algebra I/II, linear equations & inequalities (solve AND graph on a number line/coordinate plane), systems, functions, graphing, slope/intercept, factoring, exponents, polynomials, radicals, geometry (angles, triangles, Pythagorean theorem, similarity, area/volume), trigonometry foundations, probability/statistics, and precalculus-ready reasoning. Prefer exact values and checkable steps.
- Science expertise: biology (cells, genetics basics, ecology), chemistry (atoms, bonding basics, balancing simple equations, states of matter), physics (motion, forces, energy, simple circuits), earth & space science, weather/climate basics, and scientific investigation/method. Use correct units and name the governing idea (e.g., conservation, force pair, photosynthesis).
- For equations/inequalities: identify the structure (linear, two-step, square/radical, etc.), preserve balance/inequality direction, and watch special cases (multiply/divide by a negative flips the inequality; square roots give ± solutions).
- For “solve & graph” inequalities (e.g. 8x + 7 ≥ 11): guide solving step by step, then graph with a closed/open circle at the boundary and shade the correct side of a number line (or show the ray on axes). Put the original inequality AND the simplified solution (like x ≥ 1/2) on the board when graphing.
- For square equations like x² + 7 = 46: isolate x² first, then take ±√. Invite the Explorer to use the on-screen calculator for arithmetic or √ estimates when helpful—without doing every button press for them.
- Keep the session natural and conversational: short turns, react to what they just said, reference the board, and sound like a real tutor in a live session—not a script.
- For word problems: define variables, translate to an equation/model, then guide the first algebraic/scientific move.
- For graphs: connect equation ↔ points ↔ slope/rise-run ↔ inequality rays with visually true board commands.
- For science “why” questions: give the core mechanism in plain language, then ask one check question that reveals understanding.
- If the Explorer pastes a full problem, tutor THAT problem immediately—do not ask them to restate it if the math/science is already visible.
- Double-check every number you put on the board. If you cannot verify, say so and ask one precise clarifying question.

Professional tutor presence:
- Be immediately helpful and confident: every turn should feel like “I’ve got you—let’s work this out together.”
- Meet the Explorer where they are. If they dump a full problem, start tutoring it. If they only share a feeling (“I’m stuck”), diagnose gently and propose the first useful move.
- Celebrate effort and curiosity before correctness (“nice thinking,” “good start”) when an attempt shows partial understanding.
- Name confusion gently (“I notice the sign tripped us up”)—never judgmental, never condescending, never rushed.
- If explorerName is provided, use their first name naturally once per turn (not every sentence).
- Speak like a skilled tutor: clear, warm, precise, human. Avoid robotic phrasing, walls of text, or lecturing past their question.
- One small step at a time. Teach exactly ONE next move, then STOP and wait for the Explorer.
- When they get something right, briefly celebrate (“Breakthrough!” energy) before the next step.
- Stay ready: after each exchange, leave the door open for the next question, hint, or similar practice—never make the Explorer feel stuck or alone.

Teaching loop (required):
1. Guide the current problem step by step—never dump the full solution unless the Explorer explicitly asks for a worked example.
2. After each correct micro-step, invite the next move with one guiding question.
3. When the Explorer reaches a correct final answer (or clearly understands the finished solution), briefly celebrate, then immediately give ONE new practice exercise of the same type/skill (same structure, different numbers or a close variant).
4. Put that new practice exercise on the board and make the guiding question ask them to try the first step themselves. Wait for their attempt—do not solve the practice exercise for them unless they ask for a hint or a worked example.
5. Repeat: coach → confirm → new same-type practice. Keep difficulty at Middle & High School (grades 6–12).
6. If they change topics or ask something new within Math/Science grades 6–12, pivot smoothly and tutor that request with the same professional care.

Your scope is fixed: Math (arithmetic fluency, fractions and ratios, pre-algebra, Algebra I/II, expressions, variables, linear equations and inequalities, functions, systems, factoring, exponents, polynomials, coordinate geometry, Euclidean geometry, trigonometry, statistics/probability, precalculus foundations, and word problems) and Science (biology, chemistry, physics, earth & space science, scientific investigation) at a middle or high school level.
Handle unfamiliar middle and high school questions broadly within that scope. Reason through the full problem internally before responding. Verify arithmetic and intermediate reasoning; state a necessary assumption when one is needed. If a problem is incomplete or genuinely ambiguous, do not guess: ask exactly one precise clarification question. If uncertain, say so plainly and show a checkable line of reasoning instead of pretending certainty.
Teach Socratically and adapt to the Explorer. Diagnose likely misconceptions from their attempt, offer a hint first, and teach exactly ONE small next step. Then STOP and wait. Use 1–3 concise explanation sentences and a single guiding question that asks the Explorer to explain, predict, calculate, or justify. If the Explorer supplies an answer, check it against the current problem; affirm a correct idea or give a brief, specific correction/hint without restarting. Treat continue, understood, hint, different explanation, and slower as learner actions, not new problems. Do not dump a full solution unless the Explorer has attempted the problem and explicitly asks for it. Use age-appropriate language for grades 6–12 and keep the complete response under 180 words.
Scope enforcement — refuse politely and redirect:
- Non-Math/Science topics (history, English/language arts, foreign-language learning, social studies, arts, etc.): warmly explain that Órbita only tutors Middle & High School Math and Science (grades 6–12) and invite a related question.
- Elementary-only requests (grades K–5 content such as basic counting or primary arithmetic): explain that Órbita supports grades 6–12 and invite a middle or high school Math or Science question.
- College-level-only or graduate topics (e.g., multivariable calculus, differential equations, graduate chemistry): explain the grades 6–12 focus and offer to help with the closest middle or high school version or prerequisite.
Never claim to be human, live, recording, watching, or able to access anything beyond this chat. Do not ask for, repeat, or process sensitive personal information (full names, contact details, addresses, passwords, health, legal, financial, or school account details). If such information appears, ask the Explorer to remove it and refocus on the academic question.
Do not provide medical, legal, or safety-critical instructions. For those topics, encourage the Explorer to ask a trusted adult or qualified professional.
Return valid JSON only, matching exactly this shape:
{"reply":"short conversational version of the block","teachingBlock":{"explanation":"1–3 sentences","boardCommands":[{"type":"formula","text":"centered equation or formula","x":50,"y":32,"color":"navy","size":28}],"guidingQuestion":"one question","suggestedActions":["I got it — continue","Show me a hint","Try a similar problem"]},"lessonState":{"objective":"short objective","currentConcept":"short concept","currentStep":1,"studentUnderstanding":"thinking","hintsCount":0,"nextGuidingQuestion":"same guiding question","priorTutorBlock":"concise previous explanation","lastLearnerMessage":"concise learner message","selectedLearnerAction":"message"}}
When the current problem is complete, preferred suggestedActions include a practice invite such as "Try a similar problem" plus continue/hint options. For every Math request, include at least one centered write or formula command that shows ONLY the equation/expression (e.g. "3x + 5 = 20", "6x + 7 ≥ 3", or "x² + 7 = 46"), never chat phrasing like "I have a question". When guiding a calculation step, you may add a short write line such as "46 − 7 = ?" so the whiteboard feels alive. For Science, include a formula, process label, or labeled diagram command when helpful. Use clean visual commands for equations, formulas, geometry figures, and coordinate graphs. boardCommands may only use: clear; write/formula with text,x,y,align,color,size; drawAxes with x,y,width,height,ticks; plotPoint with x,y,label,color; drawLine with x1,y1,x2,y2,color; drawArrow with x1,y1,x2,y2,label,color; highlight with x,y,width,height,color. Positions must be normalized 0–100, centered in the board, and coordinate values must stay within -10..10. For slope, use valid dynamic axes, two points, a line, rise/run arrows, and a slope formula. For inequality graphs, show axes, a boundary point on the x-axis, a horizontal ray/shade direction, and the solution inequality text.`;

function jsonError(error: string, status: number, code?: string) {
  return NextResponse.json({ error, ...(code ? { code } : {}) }, { status });
}

function redactProviderMessage(message: string, apiKey: string) {
  return message
    .replaceAll(apiKey, "[REDACTED]")
    .replace(/AIza[0-9A-Za-z_-]{20,}/g, "[REDACTED]");
}

function geminiGenerateUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

async function readGeminiError(response: Response, apiKey: string) {
  const raw = await response.text();
  let errorCode = "UNKNOWN";
  let message = "No provider error message was returned.";

  try {
    const body = JSON.parse(raw) as { error?: { status?: unknown; message?: unknown } };
    if (typeof body.error?.status === "string") errorCode = body.error.status;
    if (typeof body.error?.message === "string") message = body.error.message;
  } catch {
    // Gemini can return a non-JSON body from an intermediary; keep its details server-side.
    message = raw || message;
  }

  return {
    errorCode,
    message: redactProviderMessage(message, apiKey).slice(0, 1_000),
  };
}

function containsSensitivePersonalData(value: string) {
  return (
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value) ||
    /(?:\+?\d[\s().-]*){7,}\d/.test(value)
  );
}

function isRateLimited(request: Request) {
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = requestWindows.get(client);

  if (!current || current.resetAt <= now) {
    requestWindows.set(client, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  current.count += 1;
  return false;
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: unknown;
      }>;
    };
  }>;
};

function normalizeText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength).trim();
}

function stripMarkdownCodeFence(value: string) {
  const trimmed = value.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return (fenced?.[1] ?? trimmed).trim();
}

function parseNestedJson(value: unknown, depth = 0): unknown {
  if (depth >= 4 || typeof value !== "string") return value;
  const cleaned = stripMarkdownCodeFence(value);
  if (!/^[{[]/.test(cleaned)) return value;
  try {
    return parseNestedJson(JSON.parse(cleaned), depth + 1);
  } catch {
    return value;
  }
}

function extractPlainText(value: unknown, maxLength: number, depth = 0): string {
  const parsed = parseNestedJson(value);
  if (typeof parsed === "string") {
    // A JSON-looking string that could not be parsed is never safe student copy.
    return /^[{[]/.test(parsed.trim()) ? "" : normalizeText(parsed, maxLength);
  }
  if (!parsed || typeof parsed !== "object" || depth >= 4) return "";

  const record = parsed as Record<string, unknown>;
  for (const key of ["reply", "explanation", "text", "content", "message"]) {
    const text = extractPlainText(record[key], maxLength, depth + 1);
    if (text) return text;
  }
  return "";
}

function extractObject(value: unknown): Record<string, unknown> {
  const parsed = parseNestedJson(value);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? parsed as Record<string, unknown>
    : {};
}

function extractGeminiText(data: unknown) {
  if (!data || typeof data !== "object") return "";
  const candidates = (data as GeminiResponse).candidates;
  if (!Array.isArray(candidates)) return "";

  return candidates
    .flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => (typeof part.text === "string" ? part.text : ""))
    .join("")
    .trim();
}

type TeachingState = z.infer<typeof requestSchema>["lessonState"];

function isSlopeRequest(message: string, topic: string, state?: TeachingState) {
  return /\bslope\b|\brise\b|\brun\b/i.test(`${message} ${topic} ${state?.currentConcept ?? ""}`);
}

function needsSlopeSupport(message: string) {
  return /\b(i (do not|don't) understand|i (do not|don't) know|not sure|confused|help me)\b/i.test(message);
}

function scopeRedirectTeachingBlock(message: string) {
  const violation = detectScopeViolation(message);
  if (!violation) return null;
  const coach = scopeViolationCoach(violation);
  return {
    explanation: coach.explanation,
    boardCommands: [
      { type: "clear" as const },
      { type: "formula" as const, text: coach.formula, x: 50, y: 32, color: "navy" as const, size: 24 },
    ],
    guidingQuestion: coach.guidingQuestion,
    suggestedActions: coach.suggestedActions,
  };
}

function fallbackTeachingBlock(message: string, subject: string, state?: TeachingState) {
  const scopeBlock = scopeRedirectTeachingBlock(message);
  if (scopeBlock) return scopeBlock;

  const intent = detectLearnerIntent(message, state?.selectedLearnerAction);
  const verified = intent === "answer-attempt" ? verifySimpleAnswer(message, state?.nextGuidingQuestion ?? "") : null;
  if (verified) {
    return {
      explanation: verified.explanation,
      boardCommands: [{ type: "clear" as const }, { type: "formula" as const, text: verified.formula, x: 50, y: 32, color: "navy" as const, size: 28 }],
      guidingQuestion: verified.guidingQuestion,
      suggestedActions: verified.suggestedActions,
    };
  }

  if (subject === "Science") {
    const science = scienceCoach(message, intent, state?.nextGuidingQuestion ?? "");
    if (science) {
      return {
        explanation: science.explanation,
        boardCommands: [{ type: "clear" as const }, { type: "formula" as const, text: science.formula, x: 50, y: 32, color: "navy" as const, size: 26 }],
        guidingQuestion: science.guidingQuestion,
        suggestedActions: science.suggestedActions,
      };
    }
  }

  if (isSlopeRequest(message, "", state)) {
    if (needsSlopeSupport(message)) {
      return {
        explanation: "Let’s make it smaller. Slope is how far a line goes up when it moves right. Start at (1, 1), move right 1 square to (2, 1), then up 2 squares to reach (2, 3).",
        boardCommands: [
          { type: "clear" as const },
          { type: "formula" as const, text: "slope = rise ÷ run", x: 50, y: 8, color: "navy" as const, size: 28 },
          { type: "drawAxes" as const, x: 50, y: 56, width: 62, height: 62, ticks: 5 },
          { type: "drawLine" as const, x1: 0, y1: -1, x2: 3, y2: 5, color: "cyan" as const },
          { type: "plotPoint" as const, x: 1, y: 1, label: "(1, 1)", color: "orange" as const },
          { type: "plotPoint" as const, x: 2, y: 3, label: "(2, 3)", color: "orange" as const },
          { type: "drawArrow" as const, x1: 50, y1: 49, x2: 56.2, y2: 49, label: "right 1", color: "purple" as const },
          { type: "drawArrow" as const, x1: 56.2, y1: 49, x2: 56.2, y2: 36.6, label: "up 2", color: "green" as const },
          { type: "formula" as const, text: "slope = 2 ÷ 1 = 2", x: 50, y: 94, color: "navy" as const, size: 24 },
        ],
        guidingQuestion: "On this smaller graph, after the line moves right 1 square, how many squares does it move up?",
        suggestedActions: ["It goes up 2", "Show me again", "I need a hint"],
      };
    }
    return {
      explanation: "Slope tells us how steep a line is: rise ÷ run. On this graph, from (1, 2) to (4, 8), the line moves right 3 squares (the run) and up 6 squares (the rise), so its slope is 6 ÷ 3 = 2.",
      boardCommands: [
        { type: "clear" as const },
        { type: "formula" as const, text: "y = 2x", x: 50, y: 8, color: "navy" as const, size: 28 },
        { type: "drawAxes" as const, x: 50, y: 56, width: 72, height: 72, ticks: 10 },
        { type: "drawLine" as const, x1: -4, y1: -8, x2: 4, y2: 8, color: "cyan" as const },
        { type: "plotPoint" as const, x: 1, y: 2, label: "(1, 2)", color: "orange" as const },
        { type: "plotPoint" as const, x: 4, y: 8, label: "(4, 8)", color: "orange" as const },
        { type: "drawArrow" as const, x1: 54, y1: 49, x2: 54, y2: 28, label: "rise = 6", color: "green" as const },
        { type: "drawArrow" as const, x1: 54, y1: 28, x2: 64.8, y2: 28, label: "run = 3", color: "purple" as const },
        { type: "formula" as const, text: "m = rise / run = 6 / 3 = 2", x: 50, y: 94, color: "navy" as const, size: 24 },
      ],
      guidingQuestion: "Looking at the graph, how many squares does the line go up as it moves 3 squares to the right?",
      suggestedActions: ["I got it — continue", "Show me a hint", "Explain differently"],
    };
  }
  if (/\b(triangle|angle|congruent|pythagorean)\b/i.test(`${message} ${state?.currentConcept ?? ""}`)) {
    return {
      explanation: "For a triangle, begin with the facts you know. The interior angles always add to 180°, so one missing angle can be found from the other two.",
      boardCommands: [
        { type: "clear" as const },
        { type: "drawTriangle" as const, points: [{ x: 50, y: 18, label: "A" }, { x: 25, y: 78, label: "B" }, { x: 75, y: 78, label: "C" }], labels: ["∠A + ∠B + ∠C = 180°"], color: "cyan" as const },
        { type: "formula" as const, text: "angle sum = 180°", x: 50, y: 92, color: "navy" as const, size: 24 },
      ],
      guidingQuestion: "Which two angle measures are already known?",
      suggestedActions: ["I know two angles", "Show me a hint", "Explain differently"],
    };
  }
  const local = localCoach(message, intent, state?.nextGuidingQuestion, subject as "Math" | "Science");
  const hasMath = /[0-9xxy=+\-*/^²()≤≥<>]/i.test(message) || Boolean(extractLinearRelation(message) || extractSquareRelation(message) || extractLinearRelation(local.formula) || extractSquareRelation(local.formula));
  const problemText = plainMath(boardFormulaText(local.formula || message, state));
  const parsedLinear = parseLinearRelation(local.formula || message);
  const graphReady =
    Boolean(parsedLinear?.isInequality) &&
    (/\bx\s*[<>≤≥]=?\s*-?\d/i.test(message) || intent === "worked-example" || /\b(final answer|solution is|we got)\b/i.test(message));

  if ((local.visual === "inequality-graph" || (wantsGraph(message) && parsedLinear?.isInequality)) && parsedLinear) {
    if (graphReady) {
      const boundary = Math.max(-9.5, Math.min(9.5, parsedLinear.solutionValue));
      const shadesRight = parsedLinear.solutionOperator === ">" || parsedLinear.solutionOperator === "≥";
      const rayEnd = shadesRight ? 9 : -9;
      return {
        explanation: local.explanation,
        boardCommands: [
          { type: "clear" as const },
          { type: "formula" as const, text: problemText || local.formula, x: 50, y: 10, color: "navy" as const, size: 28 },
          { type: "formula" as const, text: parsedLinear.solutionText, x: 50, y: 22, color: "cyan" as const, size: 24 },
          { type: "drawAxes" as const, x: 50, y: 58, width: 78, height: 48, ticks: 5 },
          { type: "drawLine" as const, x1: boundary, y1: 0, x2: rayEnd, y2: 0, color: "cyan" as const },
          { type: "plotPoint" as const, x: boundary, y: 0, label: formatBoardBoundary(parsedLinear.solutionValue), color: "orange" as const },
          { type: "drawArrow" as const, x1: shadesRight ? 62 : 38, y1: 72, x2: shadesRight ? 78 : 22, y2: 72, label: shadesRight ? "shade →" : "← shade", color: "green" as const },
          { type: "write" as const, text: local.guidingQuestion.slice(0, 70), x: 50, y: 92, align: "center" as const, color: "navy" as const, size: 16 },
        ],
        guidingQuestion: local.guidingQuestion,
        suggestedActions: local.suggestedActions,
      };
    }
    return {
      explanation: local.explanation,
      boardCommands: [
        { type: "clear" as const },
        { type: "formula" as const, text: problemText || local.formula, x: 50, y: 12, color: "navy" as const, size: 30 },
        { type: "drawAxes" as const, x: 50, y: 58, width: 72, height: 46, ticks: 5 },
        { type: "write" as const, text: "Solve first → then shade on this number line", x: 50, y: 88, align: "center" as const, color: "cyan" as const, size: 16 },
      ],
      guidingQuestion: local.guidingQuestion,
      suggestedActions: local.suggestedActions,
    };
  }
  if (local.visual === "linear" || local.visual === "square" || extractLinearRelation(local.formula || message) || extractSquareRelation(local.formula || message)) {
    return {
      explanation: local.explanation,
      boardCommands: [
        { type: "clear" as const },
        { type: "formula" as const, text: problemText || local.formula, x: 50, y: 28, color: "navy" as const, size: 36 },
        { type: "write" as const, text: local.guidingQuestion.slice(0, 70), x: 50, y: 48, align: "center" as const, color: "cyan" as const, size: 20 },
        { type: "highlight" as const, x: 18, y: 18, width: 64, height: 20, color: "cyan" as const },
      ],
      guidingQuestion: local.guidingQuestion,
      suggestedActions: local.suggestedActions,
    };
  }
  if (local.visual === "triangle") {
    return {
      explanation: local.explanation,
      boardCommands: [
        { type: "clear" as const },
        { type: "drawTriangle" as const, points: [{ x: 50, y: 18, label: "A" }, { x: 25, y: 78, label: "B" }, { x: 75, y: 78, label: "C" }], labels: [local.formula.slice(0, 48)], color: "cyan" as const },
        { type: "formula" as const, text: local.formula.slice(0, 48), x: 50, y: 92, color: "navy" as const, size: 22 },
      ],
      guidingQuestion: local.guidingQuestion,
      suggestedActions: local.suggestedActions,
    };
  }
  return {
    explanation: local.explanation,
    boardCommands: [{ type: "clear" as const }, { type: "formula" as const, text: hasMath ? problemText : local.formula || state?.currentConcept || "Your Algebra problem", x: 50, y: 36, color: "navy" as const, size: 32 }],
    guidingQuestion: local.guidingQuestion,
    suggestedActions: local.suggestedActions,
  };
}

function formatBoardBoundary(value: number) {
  if (Number.isInteger(value)) return String(value);
  if (Math.abs(Math.abs(value) * 2 - Math.round(Math.abs(value) * 2)) < 1e-9) {
    const num = Math.round(value * 2);
    const sign = num < 0 ? "-" : "";
    const n = Math.abs(num);
    return n === 1 ? `${sign}1/2` : `${sign}${n}/2`;
  }
  return String(Math.round(value * 100) / 100);
}

function boardFormulaText(message: string, state?: TeachingState) {
  const cleaned = normalizeText(
    message
      .replace(/^\s*i have a question:\s*/i, "")
      .replace(/^\s*(please\s+)?(help me\s+)?(solve|simplify|factor|evaluate)\s*:?\s*/i, "")
      .replace(/x²/gi, "x^2")
      .trim(),
    100,
  );
  // Never put tutoring instructions on the board as if they were the problem.
  if (/^(subtract|add|divide|multiply|move|isolate|undo|take the square root)\b/i.test(cleaned)) {
    const fromState = state?.currentConcept || state?.objective || "";
    const stateEquation = fromState.match(
      /[0-9a-zA-Z(][0-9a-zA-Z\s+\-*/^=().²]{0,80}(?:<=|>=|=|<|>|≤|≥|≠|≈)[0-9a-zA-Z\s+\-*/^=().]{0,80}/,
    )?.[0];
    if (stateEquation) return normalizeText(plainMath(stateEquation.replace(/x\^2/gi, "x²")), 100);
  }
  const square = cleaned.match(/(-?\d*)x\^2([+-]\d+)?=(-?\d+)/i)?.[0];
  if (square) return normalizeText(plainMath(square.replace(/x\^2/gi, "x²")), 100);
  const equation = cleaned.match(
    /[0-9a-zA-Z(][0-9a-zA-Z\s+\-*/^=().]{0,80}(?:<=|>=|=|<|>|≤|≥|≠|≈)[0-9a-zA-Z\s+\-*/^=().]{0,80}/,
  )?.[0];
  return normalizeText(plainMath(equation || cleaned || state?.currentConcept || "Algebra"), 100);
}

function ensureMathVisual(commands: z.infer<typeof boardCommandSchema>[], subject: string, message: string, state?: TeachingState) {
  const sanitized = commands.map((command) => {
    if (command.type !== "write" && command.type !== "formula") return command;
    return {
      ...command,
      text: boardFormulaText(command.text, state),
    };
  });
  if (subject !== "Math" || sanitized.some((command) => command.type === "write" || command.type === "formula")) {
    return sanitized;
  }
  return [
    ...sanitized,
    { type: "formula" as const, text: boardFormulaText(message, state), x: 50, y: 32, color: "navy" as const, size: 26 },
  ];
}

function coerceTutorResponse(value: unknown, fallbackText: string, message: string, subject: string, state?: TeachingState) {
  const candidate = extractObject(value);
  const reply = extractPlainText(candidate.reply, 1_500);
  const fallback = fallbackTeachingBlock(message, subject, state);
  const textExplanation = extractPlainText(fallbackText, 600) || fallback.explanation;
  const rawBlock = extractObject(candidate.teachingBlock);
  const parsedCommands = Array.isArray(rawBlock.boardCommands)
    ? rawBlock.boardCommands.flatMap((command) => {
      const parsedCommand = boardCommandSchema.safeParse(command);
      return parsedCommand.success ? [parsedCommand.data] : [];
    })
    : [];
  const safeCommands = parsedCommands.length > 0 ? parsedCommands : fallback.boardCommands;
  const safeBlock = {
    explanation: plainMath(extractPlainText(rawBlock.explanation, 600) || textExplanation),
    boardCommands: ensureMathVisual(safeCommands, subject, message, state),
    guidingQuestion: plainMath(extractPlainText(rawBlock.guidingQuestion, 240) || fallback.guidingQuestion),
    suggestedActions: Array.isArray(rawBlock.suggestedActions)
      ? rawBlock.suggestedActions
        .filter((action): action is string => typeof action === "string" && action.trim().length > 0)
        .slice(0, 4)
        .map((action) => normalizeText(action, 80))
      : fallback.suggestedActions,
  };
  if (safeBlock.suggestedActions.length === 0) safeBlock.suggestedActions = fallback.suggestedActions;

  const intent = detectLearnerIntent(message, state?.selectedLearnerAction);
  const verified = intent === "answer-attempt" ? verifySimpleAnswer(message, state?.nextGuidingQuestion ?? "") : null;
  const studentUnderstanding = verified?.correctness === "correct"
    ? "confident"
    : state?.studentUnderstanding || "thinking";

  return tutorResponseSchema.safeParse({
    reply: reply || safeBlock.explanation,
    teachingBlock: safeBlock,
    lessonState: {
      ...state,
      objective: state?.objective || `Explore ${subject}`,
      currentConcept: state?.currentConcept || "Algebra",
      currentStep: state?.currentStep ?? 0,
      studentUnderstanding,
      hintsCount: state?.hintsCount ?? 0,
      nextGuidingQuestion: safeBlock.guidingQuestion,
      priorTutorBlock: safeBlock.explanation,
      lastLearnerMessage: normalizeText(message, 500),
      selectedLearnerAction: state?.selectedLearnerAction || "message",
    },
  });
}

function localCoachingResponse(message: string, subject: string, state?: TeachingState) {
  const response = coerceTutorResponse({}, "", message, subject, state);
  if (!response.success) return null;
  return NextResponse.json({
    ...response.data,
    providerStatus: "local-coaching",
    providerMessage: "Órbita’s online tutor is unavailable, so this is a local coaching step—not a generated AI answer.",
  });
}

export async function POST(request: Request) {
  if (!isNovaAiTutoringEnabled) {
    return jsonError("NOVA AI Tutoring is coming soon.", 503, "AI_TUTORING_COMING_SOON");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Send a valid JSON tutoring request.", 400);
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Please provide a valid Math or Science tutoring message.", 400);
  }

  const { message, subject, topic, context, lessonState, explorerName } = parsed.data;
  if ([message, topic, ...context.map((item) => item.text)].some(containsSensitivePersonalData)) {
    return jsonError("Please remove personal contact information before asking Órbita for help.", 400, "PERSONAL_DATA_NOT_ALLOWED");
  }
  if (isRateLimited(request)) {
    return jsonError("Órbita's test session is receiving messages quickly. Please wait a minute and try again.", 429, "RATE_LIMITED");
  }

  const scopeViolation = detectScopeViolation(message);
  if (scopeViolation) {
    const scopeResponse = coerceTutorResponse({}, scopeViolation.explanation, message, subject, lessonState);
    if (scopeResponse.success) {
      return NextResponse.json({
        ...scopeResponse.data,
        providerStatus: "scope-redirect",
        providerMessage: "This question is outside Órbita’s Middle & High School Math and Science scope.",
      });
    }
  }

  const slopeState: TeachingState = {
    objective: lessonState?.objective || "Understand slope as rise ÷ run",
    currentConcept: "Slope: rise ÷ run",
    currentStep: lessonState?.currentStep ?? 0,
    studentUnderstanding: needsSlopeSupport(message) ? "needs-support" : lessonState?.studentUnderstanding || "thinking",
    hintsCount: lessonState?.hintsCount ?? 0,
    nextGuidingQuestion: lessonState?.nextGuidingQuestion || "",
    priorTutorBlock: lessonState?.priorTutorBlock || "",
    lastLearnerMessage: message,
    selectedLearnerAction: lessonState?.selectedLearnerAction || "message",
  };
  const isInitialSlopeTeaching = isSlopeRequest(message, topic, lessonState) &&
    ((lessonState?.currentStep ?? 0) <= 1 || lessonState?.studentUnderstanding === "starting" || needsSlopeSupport(message));
  if (isInitialSlopeTeaching) {
    const deterministicSlopeResponse = coerceTutorResponse({}, "", message, subject, slopeState);
    if (deterministicSlopeResponse.success) return NextResponse.json(deterministicSlopeResponse.data);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita's local coach could not start. Please try again.", 503);
  }

  // Gemini conversations must begin with a learner turn. The UI has a local
  // welcome message, so omit it rather than sending an invalid model-first turn.
  const firstExplorerTurn = context.findIndex((item) => item.role === "explorer");
  const usableContext = firstExplorerTurn >= 0 ? context.slice(firstExplorerTurn) : [];
  const conversation = [
    ...usableContext.map((item) => ({
      role: item.role === "tutor" ? "model" : "user",
      parts: [{ text: item.text }],
    })),
    {
      role: "user",
      parts: [{ text: `Subject: ${subject}\nTopic: ${topic}${explorerName ? `\nExplorer first name: ${explorerName.split(/\s+/)[0]}` : ""}\nGuided session state: ${lessonState ? JSON.stringify(lessonState) : "new session"}\nExplorer's response: ${message}` }],
    },
  ];

  try {
    let response: Response | undefined;
    let providerError: Awaited<ReturnType<typeof readGeminiError>> | undefined;

    for (const [index, model] of GEMINI_MODELS.entries()) {
      response = await fetch(geminiGenerateUrl(model), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: conversation,
          generationConfig: {
            responseMimeType: "application/json",
            responseJsonSchema: geminiResponseSchema,
            temperature: 0.35,
            maxOutputTokens: 900,
          },
        }),
        signal: AbortSignal.timeout(30_000),
      });

      if (response.ok) break;

      providerError = await readGeminiError(response, apiKey);
      const hasFallback = index < GEMINI_MODELS.length - 1;
      const canRetry =
        response.status === 404 ||
        response.status === 503 ||
        /(?:not found|unavailable|high demand|try again later)/i.test(providerError.message);
      if (canRetry && hasFallback) {
        console.warn("Gemini tutoring model unavailable; trying compatible fallback", {
          unavailableModel: model,
          fallbackModel: GEMINI_MODELS[index + 1],
          upstreamStatus: response.status,
          upstreamCode: providerError.errorCode,
        });
        continue;
      }
      break;
    }

    if (!response?.ok) {
      const upstreamStatus = response?.status ?? 502;
      const errorDetails = providerError ?? { errorCode: "UNKNOWN", message: "No provider response was returned." };
      console.error("Gemini tutoring request failed", {
        upstreamStatus,
        upstreamCode: errorDetails.errorCode,
        upstreamMessage: errorDetails.message,
      });

      const invalidApiKey = /(?:api key|apikey).*(?:not valid|invalid)|(?:not valid|invalid).*(?:api key|apikey)/i.test(
        errorDetails.message
      );
      if (invalidApiKey || upstreamStatus === 401 || upstreamStatus === 403) {
        return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita's local coach could not start. Please try again.", 503);
      }
      if (upstreamStatus === 429) {
        return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita is busy. Please try again in a moment.", 429);
      }
      if (upstreamStatus === 400) {
        return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita's local coach could not start. Please try again.", 503);
      }
      if (upstreamStatus === 404) {
        return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita's local coach could not start. Please try again.", 503);
      }
      return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita could not respond right now. Please try again shortly.", 502);
    }

    const rawResponse = await response.text();
    let data: unknown;
    try {
      data = JSON.parse(rawResponse);
    } catch {
      console.error("Gemini tutoring returned malformed provider JSON", {
        responseLength: rawResponse.length,
        contentType: response.headers.get("content-type"),
      });
      return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita could not read a tutoring response. Please try again.", 502);
    }

    const responseText = extractGeminiText(data);
    if (!responseText) {
      const candidates = (data as GeminiResponse).candidates;
      console.error("Gemini tutoring returned no text", {
        candidateCount: Array.isArray(candidates) ? candidates.length : 0,
        hasCandidates: Array.isArray(candidates),
      });
      return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita could not respond right now. Please try again.", 502);
    }

    const cleanedResponseText = stripMarkdownCodeFence(responseText);
    let tutorResponse: unknown = cleanedResponseText;
    let parseFailure = false;
    try {
      tutorResponse = JSON.parse(cleanedResponseText);
    } catch {
      parseFailure = true;
    }

    const validatedResponse = tutorResponseSchema.safeParse(tutorResponse);
    if (validatedResponse.success) {
      const normalizedResponse = coerceTutorResponse(tutorResponse, "", message, subject, lessonState);
      if (normalizedResponse.success) {
        // Prefer a concrete linear coaching step over a vague model reply that ignored the equation.
        const concrete = fallbackTeachingBlock(message, subject, lessonState);
        const modelIgnoredEquation =
          Boolean(extractLinearRelation(message)) &&
          /local coaching mode|share the full equation|what is the exact math/i.test(
            `${normalizedResponse.data.reply} ${normalizedResponse.data.teachingBlock.explanation}`,
          );
        const payload = modelIgnoredEquation
          ? {
              ...normalizedResponse.data,
              reply: concrete.explanation,
              teachingBlock: concrete,
              lessonState: {
                ...normalizedResponse.data.lessonState,
                nextGuidingQuestion: concrete.guidingQuestion,
                priorTutorBlock: concrete.explanation,
              },
            }
          : normalizedResponse.data;
        console.info("Gemini tutoring response metadata", {
          candidateCount: Array.isArray((data as GeminiResponse).candidates) ? (data as GeminiResponse).candidates?.length : 0,
          responseLength: responseText.length,
          topLevelKeys: Object.keys(tutorResponse as Record<string, unknown>).sort(),
          boardCommandCount: payload.teachingBlock.boardCommands.length,
          replacedVagueModelReply: modelIgnoredEquation,
          hasCenteredMathVisual: subject === "Math" && payload.teachingBlock.boardCommands.some(
            (command) => (command.type === "write" || command.type === "formula") && command.x === 50
          ),
        });
        return NextResponse.json(payload);
      }
    }

    const fallbackResponse = coerceTutorResponse(tutorResponse, cleanedResponseText, message, subject, lessonState);
    if (fallbackResponse.success) {
      console.warn("Gemini tutoring response used safe fallback", {
        reason: parseFailure ? "model_text_not_json" : "structured_response_invalid",
        responseLength: responseText.length,
        wasMarkdownFenced: cleanedResponseText !== responseText,
      });
      return NextResponse.json(fallbackResponse.data);
    }

    console.error("Gemini tutoring response could not be normalized", {
      parseFailure,
      responseLength: responseText.length,
      wasMarkdownFenced: cleanedResponseText !== responseText,
    });
    return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita could not complete this response. Please try again.", 502);
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita is taking too long to respond. Please try again.", 504);
    }
    console.error("Gemini tutoring request failed", error);
    return localCoachingResponse(message, subject, lessonState) ?? jsonError("Órbita could not respond right now. Please try again shortly.", 502);
  }
}
