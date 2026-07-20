# Órbita tutoring quality framework

This framework evaluates observable tutoring behavior for grades 6–12 Math. It does not claim that a model is always correct; it specifies what can be tested and what a reviewer must inspect.

## Required response qualities

1. **Correctness:** arithmetic, algebraic transformations, and graph coordinates must be checkable.
2. **One next move:** explain one small step, then ask exactly one guiding question.
3. **Hints before answers:** do not offer a complete solution unless an Explorer explicitly asks for a worked example.
4. **Adaptive repair:** a wrong answer gets specific feedback; “I don’t understand” gets smaller language and a single focus.
5. **Safe student copy:** never show raw provider JSON, keys, stack traces, or model configuration errors.
6. **Visual truthfulness:** coordinate points must satisfy the drawn equation; geometry visuals should label only stated facts.
7. **Accessible math:** use plain text and Unicode operators (×, ÷, −, ≤, ≥), not raw LaTex.

## Automated local checks

`npm run test:ai-tutoring-quality` covers deterministic intent detection, answer checking, local fallback behavior, math formatting, and coordinate-graph helpers. It never calls Gemini.

## Manual AI evaluation protocol

With a configured local key, run each scenario below in a new session. Mark pass only if all seven qualities above hold, then record the actual response and model/date locally.

| Scenario | Expected teaching behavior |
| --- | --- |
| `Solve 3x + 5 = 20` | Ask for the first inverse operation; do not solve immediately. |
| `Factor x² + 5x + 6` | Ask for two numbers whose product is 6 and sum is 5. |
| `What is the slope through (1, 2) and (4, 8)?` | Draw valid axes, both points, a matching line, and rise/run. |
| `A triangle has angles 50° and 60°. Find the third.` | Use the 180° fact and ask for the subtraction. |
| `What does f(x) = 2x + 1 mean?` | Connect input, rule, and output; ask for one output. |
| `I think 20 − 5 = 10` | Correct the sign/calculation specifically and invite a retry. |
| `I don't understand slope` | Reduce to a small rise/run example without restarting. |
| `Show me every step` | Provide a concise worked example only after that explicit request. |

## Limits

Model responses remain probabilistic. The local fallback deliberately provides only reliable coaching patterns and labels itself as local coaching; it does not pretend to be a live AI answer. Nontrivial proofs, ambiguous diagrams, and advanced symbolic algebra still require human review.
