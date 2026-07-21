/**
 * Generates remaining school elective + language LMS SeedCourse files.
 * Run: node scripts/generate-remaining-program-lms.mjs
 */
import fs from "fs";
import path from "path";

const OUT = path.resolve("src/data/program-lms");

function esc(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function missionBlock(l) {
  const objectives = l.objectives.map((o) => `      "${esc(o)}"`).join(",\n");
  const stretch = l.stretch ? `\n    stretch: \`${esc(l.stretch)}\`,` : "";
  const explore = l.exploreNote ? `\n    exploreNote: \`${esc(l.exploreNote)}\`,` : "";
  const type = l.type ? `\n    type: LessonType.${l.type},` : "";
  const duration = l.duration ? `\n    duration: ${l.duration},` : "";
  return `      missionLesson({
    title: "${esc(l.title)}",
    order: ${l.order},${type}${duration}
    brief: \`${esc(l.brief)}\`,
    objectives: [
${objectives}
    ],
    teach: \`${esc(l.teach)}\`,
    practice: \`${esc(l.practice)}\`,${stretch}${explore}
  })`;
}

function writeCourse(file, exportName, meta, modules) {
  const mods = modules
    .map((m) => {
      const lessons = m.lessons.map(missionBlock).join(",\n");
      return `    {
      title: "${esc(m.title)}",
      description: "${esc(m.description)}",
      order: ${m.order},
      lessons: [
${lessons}
      ],
    }`;
    })
    .join(",\n");

  const src = `import { LessonType, Pathway } from "@prisma/client";
import type { SeedCourse } from "@/data/pathways/types";
import { missionLesson } from "./mission-lesson";

/** ${meta.title} — NOVA STEM HUB LMS curriculum (post-payment unlock). */
export const ${exportName}: SeedCourse = {
  title: "${esc(meta.title)}",
  slug: "${meta.slug}",
  description: "${esc(meta.description)}",
  pathway: Pathway.${meta.pathway},
  level: "${meta.level}",
  published: true,
  capstone: {
    title: "${esc(meta.capstoneTitle)}",
    description: "${esc(meta.capstoneDescription)}",
  },
  modules: [
${mods}
  ],
};
`;
  fs.writeFileSync(path.join(OUT, file), src);
  const n = modules.reduce((a, m) => a + m.lessons.length, 0);
  console.log("wrote", file, `(${n} lessons)`);
}

function L(title, order, brief, objectives, teach, practice, extra = {}) {
  return { title, order, brief, objectives, teach, practice, ...extra };
}

function stdModule(title, desc, order, t) {
  return {
    title,
    description: desc,
    order,
    lessons: [
      L(`Mission Brief: ${t.briefTitle}`, 1, t.brief1, t.obj1, t.teach1, t.practice1, t.explore ? { exploreNote: t.explore } : {}),
      L(`Discovery: ${t.discTitle}`, 2, t.brief2, t.obj2, t.teach2, t.practice2, t.video ? { type: "VIDEO", duration: 18 } : {}),
      L(`LAB: ${t.labTitle}`, 3, t.labBrief, t.obj3, t.labTeach, t.labPractice, { type: "LAB", duration: 40 }),
      L(
        `Innovation Check: ${t.checkTitle}`,
        4,
        "Signal check before the next module.",
        t.obj4,
        t.quizPrompt,
        "Self-score. Revisit any weak objective, then write one sentence committing to your next artifact.",
        { type: "QUIZ", duration: 12 },
      ),
    ],
  };
}

const all = [];

all.push({
  file: "school-digital-marketing.ts",
  exportName: "digitalMarketingCourse",
  meta: {
    title: "Digital Marketing & Social Media Mission Path",
    slug: "nova-school-digital-marketing",
    description: "Brand, hooks, campaigns, and ethical digital citizenship for young creators.",
    pathway: "CODING_AI",
    level: "Explorer",
    capstoneTitle: "Capstone: Mini Campaign Showcase",
    capstoneDescription:
      "Ship a 5-post mini campaign with brand brief, ethics checklist, and Signal Strength metrics reflection.",
  },
  modules: [
    stdModule("Brand Spark", "Define audience, voice, and a promise you can keep online.", 1, {
      briefTitle: "Your Signal Identity",
      discTitle: "Audience & Promise",
      labTitle: "Brand One-Pager",
      checkTitle: "Brand Spark",
      brief1: "NOVA creators do not shout into the void — they build a clear promise for a real audience.",
      obj1: ["Define brand promise in one sentence", "Name a specific audience (not everyone)", "List three voice adjectives you will keep"],
      teach1: `A brand is a **promise + proof**. Promise: what people can expect. Proof: posts, projects, and behavior that keep the promise.

Audience example: "middle-school Explorers learning first coding missions" — not "anyone online".

Voice adjectives: curious, kind, bold, precise. Pick three and reject anything that breaks them (fear spam, fake urgency).`,
      practice1: "Write: (1) promise sentence, (2) audience sentence, (3) three voice adjectives, (4) one promise you will NEVER make because you cannot keep it.",
      explore: "Warm-up: [/experiences/viral-signal-brief](/experiences/viral-signal-brief) — Viral Signal Brief.",
      brief2: "Hooks earn attention. Ethics keep trust. Both are required.",
      obj2: ["Write curiosity hooks without fear tactics", "Spot unethical urgency patterns", "Draft three hook options for one post"],
      teach2: `Hook formulas that stay ethical:
- Curiosity: "What happens when a greenhouse sensor lies?"
- Specificity: "3 checklist items before you post"
- Story: "Our first campaign failed — here is the fix"

Avoid: fake countdown timers, body-shaming, "share or else", stolen images.`,
      practice2: "Draft three hooks for the same topic. Label which formula each uses. Strike any that rely on fear or shame.",
      video: true,
      labBrief: "Mission: package your brand so a mentor understands it in 60 seconds.",
      obj3: ["Ship a one-page brand brief", "Include do/do-not posting rules", "Add one visual mood reference (link or sketch)"],
      labTeach: "Brand one-pager sections: Promise · Audience · Voice · Visual mood · Do/Do-not · First campaign idea.\n\nKeep it printable. Mentors skim.",
      labPractice: "Submit PDF/photo of one-pager. Peer review: can they restate your promise accurately?",
      obj4: ["Defend ethical hook choices", "Restate promise clearly"],
      quizPrompt: `**Q:** A teammate wants a hook: "Post in 10 minutes or your account is dead."
Best NOVA response?
- A) Use it — urgency converts
- B) Reject fear spam; rewrite with curiosity/specificity ✓
- C) Only use it on weekends
- D) Add more exclamation marks`,
    }),
    stdModule("Hook Studio", "Craft curiosity-driven messages — no fear tactics, no spam.", 2, {
      briefTitle: "Signal Strength Content",
      discTitle: "Formats & Accessibility",
      labTitle: "Three-Post Sprint",
      checkTitle: "Hook Studio",
      brief1: "Content is a system: idea → draft → access → publish → learn.",
      obj1: ["Map a content idea through the system", "Add captions/alt-text as default", "Plan one CTA that is honest"],
      teach1: "Accessibility is not optional: captions, readable contrast, alt text. Inclusive creators reach more Explorers.\n\nCTA examples that stay honest: \"Save this checklist\", \"Try the Explore Now mission\". Avoid fake \"limited seats\" if seats are not limited.",
      practice1: "Rewrite one draft with captions plan + honest CTA + alt-text note.",
      brief2: "Different formats teach differently — carousel vs short video vs static.",
      obj2: ["Choose format for a learning goal", "Storyboard a 15–30s reel", "Keep claims evidence-based"],
      teach2: "If teaching a checklist, carousels shine. If showing a process, short video. If brand mood, static visual.\n\nStoryboard frames: Hook → Problem → Action → Proof → CTA.",
      practice2: "Storyboard 5 frames for one teaching post. Mark where captions carry the message if sound is off.",
      labBrief: "Ship three posts that keep the same promise and voice.",
      obj3: ["Publish or mock three posts", "Track intended metric (saves/comments/tries)", "Run ethics self-audit"],
      labTeach: "Batch create. Same template, varied hooks. Metrics for youth campaigns: clarity, saves, peer tries — not vanity alone.",
      labPractice: "Submit three posts + ethics audit (5 yes/no checks) + which metric you will watch.",
      obj4: ["Choose ethical CTAs", "Match format to goal"],
      quizPrompt: `Best metric for a how-to carousel aimed at learning?
- A) Only follower count
- B) Saves + peer attempts of the checklist ✓
- C) Buying fake likes
- D) Comments arguing in bad faith`,
    }),
    stdModule("Campaign Sprint", "Ship a mini campaign and track Signal Strength.", 3, {
      briefTitle: "Campaign as Mission",
      discTitle: "Calendars & Iteration",
      labTitle: "5-Post Campaign",
      checkTitle: "Campaign Sprint",
      brief1: "A campaign is a coordinated set of messages toward one goal — not random posts.",
      obj1: ["Write a SMART campaign goal", "Pick one primary channel", "Define success without vanity traps"],
      teach1: "SMART goal example: \"In 10 days, help 15 classmates attempt the Explore Now mission and collect 10 checklist saves.\"\n\nPrimary channel: pick one. Secondary can amplify, not distract.",
      practice1: "Write your SMART goal + primary channel + out-of-scope list (3 items you will not do).",
      brief2: "Calendars prevent last-minute chaos; iteration prevents ego.",
      obj2: ["Build a 7–10 day calendar", "Plan a mid-campaign review", "Document one change rule"],
      teach2: "Mid-campaign review questions: What confused people? Which hook earned saves? What claim needs clearer proof?",
      practice2: "Draft calendar table: Day | Format | Hook | CTA | Asset status.",
      labBrief: "Execute or fully mock the campaign package end-to-end.",
      obj3: ["Deliver 5-post package", "Include metrics reflection", "Attach brand promise reminder"],
      labTeach: "Package: calendar, posts, metrics sheet, ethics checklist, 150-word reflection.",
      labPractice: "Submit campaign package. Mentor rubric: clarity, ethics, consistency, learning.",
      explore: "Optional: [/experiences/viral-signal-brief](/experiences/viral-signal-brief)",
      obj4: ["Explain SMART goals", "Defend iteration"],
      quizPrompt: `Mid-campaign, posts get views but zero checklist saves. Best next step?
- A) Buy followers
- B) Improve clarity of CTA and teaching frames; test one change ✓
- C) Delete brand promise
- D) Post 40 times in one hour`,
    }),
    stdModule("Ethics Review", "Critique campaigns for integrity and present improvements.", 4, {
      briefTitle: "Trust Is the Product",
      discTitle: "Case Critique",
      labTitle: "Ethics Council Presentation",
      checkTitle: "Ethics Review",
      brief1: "NOVA STEM HUB creators protect trust — especially with youth audiences.",
      obj1: ["List five digital citizenship rules", "Identify dark patterns", "Propose repairs for a flawed campaign"],
      teach1: "Dark patterns: disguised ads, nagging consent, fake scarcity, manipulative emotional pressure.\n\nNOVA rules: credit sources, get permission for faces, no scraped private data, correct mistakes publicly.",
      practice1: "Find (or invent) a flawed youth campaign example. Mark three ethics issues and three repairs.",
      brief2: "Critique is a skill — be specific, kind, and actionable.",
      obj2: ["Use a critique rubric", "Separate taste from ethics", "Offer one improved hook"],
      teach2: "Rubric: Truthfulness · Consent · Accessibility · Respect · Clear CTA.\nTaste (\"I dislike purple\") is not ethics. Misleading claims are.",
      practice2: "Peer-critique one campaign using the rubric. Offer one improved hook that keeps the promise.",
      labBrief: "Present your campaign + ethics review to mentors.",
      obj3: ["Deliver 3-minute presentation", "Include metrics + ethics", "Name next iteration"],
      labTeach: "Presentation arc: Promise → Campaign → Evidence → Ethics → Next experiment.",
      labPractice: "Submit slides/script + final campaign kit.",
      obj4: ["Apply ethics rubric"],
      quizPrompt: `Which is an ethics issue (not mere taste)?
- A) Preferring flat design
- B) Claiming a false "only 2 spots left" for an unlimited workshop ✓
- C) Using brand colors
- D) Choosing carousel over reel`,
    }),
  ],
});

all.push({
  file: "school-startup.ts",
  exportName: "startupBusinessCourse",
  meta: {
    title: "Startup & Business Innovation Mission Path",
    slug: "nova-school-startup-business",
    description: "Idea to pitch — problem discovery, lean canvas, prototype, and demo day for young founders.",
    pathway: "CODING_AI",
    level: "Explorer",
    capstoneTitle: "Capstone: Demo Day Pitch Package",
    capstoneDescription:
      "Submit problem brief, lean canvas, prototype evidence, and a 3-minute pitch with peer feedback notes.",
  },
  modules: [
    stdModule("Problem Hunt", "Interview peers, spot friction, and frame a problem worth solving.", 1, {
      briefTitle: "Problems Before Pitches",
      discTitle: "Empathy Interviews",
      labTitle: "5 Insight Interviews",
      checkTitle: "Problem Hunt",
      brief1: "NOVA founders earn the right to build by listening first.",
      obj1: ["Separate ideas from validated problems", "Write a problem statement without a product inside it", "List who hurts and how often"],
      teach1: `Bad problem statement: "We need an app with AI stickers."
Good problem statement: "Students lose track of club deadlines and miss events twice a month."

Rules: name the person, the pain, the frequency, and the current workaround.`,
      practice1: "Write two problem statements. Cross out any that secretly describe your solution.",
      explore: "Warm-up: [/experiences/founder-orbit-pitch](/experiences/founder-orbit-pitch) — Demo Day Orbit Pitch.",
      brief2: "Interviews beat assumptions. Ask about the past, not hypothetical futures.",
      obj2: ["Use open questions", "Capture exact quotes", "Avoid pitching during interviews"],
      teach2: "Ask: Tell me about the last time X happened. What did you try? What was annoying?\n\nDo not ask: Would you use my app? (People are polite — and wrong.)",
      practice2: "Draft a 6-question interview script. Remove any question that pitches your idea.",
      video: true,
      labBrief: "Run five short empathy interviews and synthesize.",
      obj3: ["Complete 5 interviews", "Cluster pains into themes", "Rewrite problem statement with quotes"],
      labTeach: "Synthesis board: Quotes · Themes · Surprises · Non-goals. Pick the theme with strongest evidence.",
      labPractice: "Submit interview notes + themes + revised problem statement.",
      obj4: ["Defend evidence-based problems"],
      quizPrompt: `Best founder move after falling in love with an idea?
- A) Build for six months silently
- B) Interview people who feel the pain; revise the problem ✓
- C) Buy ads immediately
- D) Add more features before talking to anyone`,
    }),
    stdModule("Lean Orbit Canvas", "Map customer, value, and first experiment on a youth lean canvas.", 2, {
      briefTitle: "Canvas Over Vibes",
      discTitle: "Value & Experiments",
      labTitle: "Canvas + Elevator Pitch",
      checkTitle: "Lean Orbit Canvas",
      brief1: "A lean canvas forces clarity: customer, problem, UVP, channels, metrics, unfair advantage, costs/revenue.",
      obj1: ["Fill each canvas box with testable words", "Mark assumptions with '?' ", "Identify riskiest assumption"],
      teach1: "UVP (unique value proposition) answers: why you, why now, why this beats the workaround.\n\nRiskiest assumption is usually: \"people care enough to change behavior.\"",
      practice1: "Draft canvas v1. Highlight three assumptions with '?'. Circle the riskiest one.",
      brief2: "Experiments beat debates. Design the smallest test.",
      obj2: ["Design a fake-door or concierge test", "Define success metric before running", "Time-box the experiment"],
      teach2: "Concierge MVP: you manually deliver the service for 3 people.\nFake-door: landing page measures interest before building.\nSuccess metric example: 8/15 interviewees book a trial help session.",
      practice2: "Write experiment card: Hypothesis · Method · Metric · Time box · Kill/iterate rule.",
      labBrief: "Ship canvas + 200-word elevator pitch.",
      obj3: ["Complete canvas", "Write pitch", "List next experiment"],
      labTeach: "Pitch structure: Who · Pain · Promise · Proof so far · Ask.",
      labPractice: "Submit canvas image + pitch + experiment card.",
      obj4: ["Identify riskiest assumption"],
      quizPrompt: `You are arguing about logo colors but have never tested whether students want the service. Priority?
- A) Finalize logo
- B) Test the riskiest customer assumption first ✓
- C) Incorporate immediately
- D) Add crypto payments`,
    }),
    stdModule("Prototype Sprint", "Build a no-code or low-fi MVP and gather feedback fast.", 3, {
      briefTitle: "Prove the Verb",
      discTitle: "User Tests",
      labTitle: "MVP + 3 Tests",
      checkTitle: "Prototype Sprint",
      brief1: "MVP means minimum *viable* — enough to learn, not enough to impress forever.",
      obj1: ["Define MVP scope as one job-to-be-done", "Choose no-code/low-fi tools", "Write acceptance criteria"],
      teach1: "If your MVP needs accounts, payments, and AI, it is not minimum.\nStart with: form + checklist + human follow-up, or a Figma click-through.",
      practice1: "Write MVP acceptance criteria (5 bullets). Move extras to Later list.",
      brief2: "User testing is watching, not defending.",
      obj2: ["Run think-aloud tests", "Note friction without fixing mid-test", "Prioritize top 3 issues"],
      teach2: "Script: \"Try to complete X. Talk out loud. I will not help unless you are fully stuck.\"\nAfterward: What was confusing? What felt magical?",
      practice2: "Create a test script and results table: Tester | Friction | Quote | Severity.",
      labBrief: "Ship MVP evidence and three tests.",
      obj3: ["Share MVP link/photos", "Document 3 tests", "Ship one iteration"],
      labTeach: "Change one major thing based on evidence. Screenshot before/after.",
      labPractice: "Submit MVP + tests + iteration note.",
      explore: "Optional: [/experiences/founder-orbit-pitch](/experiences/founder-orbit-pitch)",
      obj4: ["Defend MVP scope"],
      quizPrompt: `During a user test the founder keeps explaining how it should work. Better approach?
- A) Keep explaining louder
- B) Stay quiet, observe, note friction ✓
- C) End the test early
- D) Ask them to like the brand`,
    }),
    stdModule("Demo Day Pitch", "Score your pitch and present to the Founders Circle.", 4, {
      briefTitle: "Pitch Under Pressure",
      discTitle: "Story & Q&A",
      labTitle: "Founders Circle Rehearsal",
      checkTitle: "Demo Day",
      brief1: "Demo day is evidence storytelling — not hype theater.",
      obj1: ["Structure a 3-minute pitch", "Include evidence and ask", "Prepare honest risks"],
      teach1: "Arc: Hook · Problem · Solution · Evidence · Business/impact basics · Ask.\nHonesty about risks builds mentor trust.",
      practice1: "Draft pitch script (350–450 words). Highlight evidence sentences.",
      brief2: "Q&A is where founders show thinking.",
      obj2: ["Anticipate hard questions", "Answer short then deep", "Never invent metrics"],
      teach2: "If you do not know: \"I do not have that number yet; here is how I will measure it.\"",
      practice2: "Write 5 likely questions + answer bullets.",
      labBrief: "Timed rehearsal with peer scoring.",
      obj3: ["Complete rehearsal", "Revise pitch v2", "Finalize capstone package"],
      labTeach: "Peer rubric: Clarity · Evidence · Feasibility · Ethics · Delivery.",
      labPractice: "Submit pitch video or live notes + canvas + MVP + Q&A sheet.",
      obj4: ["Apply pitch rubric"],
      quizPrompt: `A mentor asks for weekly active users and you have none yet. Best answer?
- A) Invent a big number
- B) Say you do not have it yet; share interview/test evidence and measurement plan ✓
- C) Change the subject to logo
- D) Blame the school Wi-Fi`,
    }),
  ],
});

for (const c of all) writeCourse(c.file, c.exportName, c.meta, c.modules);
console.log("batch A done");
