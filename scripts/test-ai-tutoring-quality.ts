import { detectLearnerIntent, detectScopeViolation, localCoach, parseLinearRelation, plainMath, verifySimpleAnswer, wantsGraph } from "../src/lib/ai-tutoring-quality";

const expect = (condition: unknown, label: string) => {
  if (!condition) throw new Error(`Quality check failed: ${label}`);
};

const cases: Array<[string, ReturnType<typeof detectLearnerIntent>]> = [
  ["Solve 3x + 5 = 20", "new-problem"],
  ["x = 5", "answer-attempt"],
  ["I don't understand", "confusion"],
  ["Continue to the next step", "continue"],
  ["Show me a hint", "hint"],
  ["Please slow down", "slower"],
  ["Show me every step", "worked-example"],
];
for (const [message, expected] of cases) expect(detectLearnerIntent(message) === expected, `${message} intent`);

const correct = verifySimpleAnswer("15", "What is 20 − 5?");
expect(correct?.correctness === "correct", "correct answer receives affirmation");
const wrong = verifySimpleAnswer("10", "What is 20 − 5?");
expect(wrong?.correctness === "needs-revision" && wrong.explanation.includes("15"), "wrong answer receives specific correction");

const linear = localCoach("3x + 5 = 20", "new-problem");
expect(linear.guidingQuestion.includes("20 − 5"), "linear equation asks the next operation");
const inequality = localCoach("I have a question: how to solve 6x+7>=3", "new-problem");
expect(inequality.formula.includes("6x+7≥3") || inequality.formula.includes("6x + 7 ≥ 3") || /6x\+7≥3/.test(inequality.formula.replace(/\s/g, "")), "inequality is extracted from natural language");
expect(/subtract 7|6x\s*≥\s*-?4|isolate/i.test(`${inequality.explanation} ${inequality.guidingQuestion}`), "inequality gets a concrete first tutoring step");
const graphInequality = localCoach("please help me with this solve & graph this equation 8x+7>=11", "new-problem");
expect(/8x\+7≥11/.test(graphInequality.formula.replace(/\s/g, "")), "solve & graph inequality is extracted");
expect(graphInequality.visual === "inequality-graph", "graph request uses inequality-graph visual");
expect(/subtract 7|8x\s*≥\s*4|number line|graph/i.test(`${graphInequality.explanation} ${graphInequality.guidingQuestion}`), "graph inequality starts with solve-then-graph coaching");
const parsed = parseLinearRelation("8x+7>=11");
expect(parsed?.solutionText.replace(/\s/g, "") === "x≥1/2" || parsed?.solutionValue === 0.5, "8x+7>=11 solves to x ≥ 1/2");
expect(wantsGraph("solve & graph 8x+7>=11"), "wantsGraph detects graph intent");
const square = localCoach("how to solve x^2 + 7 = 46", "new-problem");
expect(/x²\s*\+\s*7\s*=\s*46|x\^2\+7=46/.test(square.formula.replace(/\s/g, "")) || square.formula.includes("x² + 7 = 46"), "square equation is extracted");
expect(/46|subtract|isolat/i.test(`${square.explanation} ${square.guidingQuestion}`), "square equation starts by isolating x²");
const percent = localCoach("What is 20% of 80?", "new-problem");
expect(/percent|part|whole/i.test(`${percent.explanation} ${percent.formula}`), "percent problems get percent coaching");
const pythag = localCoach("Use the Pythagorean theorem for a right triangle", "new-problem");
expect(/a² \+ b² = c²|pythagorean/i.test(`${pythag.formula} ${pythag.explanation}`), "geometry Pythagorean coaching");
const science = localCoach("How does photosynthesis work?", "new-problem", "", "Science");
expect(/photosynthesis|CO₂|glucose/i.test(`${science.explanation} ${science.formula}`), "science photosynthesis coaching");
const confusion = localCoach("I don't understand", "confusion");
expect(/one move|one fact|one small/i.test(confusion.explanation), "confusion receives smaller step");
const example = localCoach("Show me every step", "worked-example");
expect(example.formula.includes("x = 4"), "worked example is concise and checkable");

expect(plainMath("\\frac{3}{4} \\times x \\leq 6") === "3/4 × x ≤ 6", "LaTex is converted to readable math");

const historyScope = detectScopeViolation("Help me with my history homework about World War II");
expect(historyScope?.reason === "non-stem-subject", "history requests are out of scope");
const elementaryScope = detectScopeViolation("I'm in third grade learning to count to 20");
expect(elementaryScope?.reason === "elementary-only", "elementary-only requests are out of scope");
const collegeScope = detectScopeViolation("Explain multivariable calculus partial derivatives");
expect(collegeScope?.reason === "college-only", "college-only requests are out of scope");
const inScope = detectScopeViolation("Solve 3x + 5 = 20");
expect(inScope === null, "middle school algebra stays in scope");
const scopedCoach = localCoach("Help me write my English essay", "new-problem");
expect(scopedCoach.formula.includes("Grades 6–12"), "out-of-scope local coach states grade band");
const readyCoach = localCoach("hi", "new-problem", "", "Math");
expect(/grades 6–12|Middle & High School/i.test(readyCoach.explanation), "default coach states full MS/HS readiness");

console.info(`AI tutoring quality assertions passed (${cases.length + 20} checks).`);
