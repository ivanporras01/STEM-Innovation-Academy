import { detectLearnerIntent, localCoach, plainMath, verifySimpleAnswer } from "../src/lib/ai-tutoring-quality";

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
const confusion = localCoach("I don't understand", "confusion");
expect(confusion.explanation.includes("one move"), "confusion receives smaller step");
const example = localCoach("Show me every step", "worked-example");
expect(example.formula.includes("x = 4"), "worked example is concise and checkable");

expect(plainMath("\\frac{3}{4} \\times x \\leq 6") === "3/4 × x ≤ 6", "LaTex is converted to readable math");
console.info(`AI tutoring quality assertions passed (${cases.length + 7} checks).`);
