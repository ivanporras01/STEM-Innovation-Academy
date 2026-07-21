/**
 * Generates high-quality NOVA STEM HUB SeedCourse curricula for school electives + language.
 * Run: node scripts/generate-program-lms-curricula.mjs
 */
import fs from "fs";
import path from "path";

const OUT = path.resolve("src/data/program-lms");

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
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
  console.log("wrote", file);
}

// ─── Shared teaching patterns (unique bodies still per lesson) ───

const electives = [
  {
    file: "school-gaming.ts",
    exportName: "gamingGameDesignCourse",
    meta: {
      title: "Gaming & Game Design Mission Path",
      slug: "nova-school-gaming-game-design",
      description:
        "From player to creator — design game loops, levels, and playable prototypes with Scratch and intro engine thinking.",
      pathway: "CODING_AI",
      level: "Explorer",
      capstoneTitle: "Capstone: Arcade Showcase Demo",
      capstoneDescription:
        "Ship a playable mini-game or level demo with a one-page design brief (rules, feedback loops, challenge curve) and a 90-second mentor pitch.",
    },
    modules: [
      {
        title: "Player Mindset",
        description: "Break down games like a designer — rules, feedback, and fair challenge.",
        order: 1,
        lessons: [
          {
            title: "Mission Brief: From Player to Designer",
            order: 1,
            brief:
              "NOVA Mission Control needs Explorers who can explain *why* a game feels fun — not just play it. Your first signal: learn the language of game design.",
            objectives: [
              "Define rules, goals, feedback, and challenge in plain language",
              "Separate 'theme/skin' from core mechanics",
              "Log one favorite game using a designer checklist",
            ],
            teach: `Games are **systems**. A designer cares about:
1. **Goal** — what does the player try to achieve?
2. **Rules** — what is allowed / forbidden?
3. **Feedback** — how does the game respond to actions (sound, score, fail state)?
4. **Challenge curve** — too easy = boredom; too hard = quit.

Theme (space pirates, candy worlds) is the *skin*. Mechanics (jump, collect, dodge) are the *engine*.

**NOVA designer notebook template**
| Element | Example from your game |
| Goal | Reach the portal before time ends |
| Core verb | Jump / dodge / build |
| Feedback | Coins chime; hearts drop on hit |
| Fairness check | Can a new player learn in 60 seconds? |`,
            practice: `Pick a game you love. Fill the designer notebook table for it. Then write 5 sentences answering: *What would you change to make the first 60 seconds clearer for a new player?*`,
            stretch: `Compare two games with the same theme but different mechanics (e.g., two platformers). List three mechanic differences.`,
            exploreNote: `Optional warm-up mission: [/experiences/pixel-portal-escape](/experiences/pixel-portal-escape) — Pixel Portal Escape.`,
          },
          {
            title: "Discovery: Feedback Loops & Juice",
            order: 2,
            type: "VIDEO",
            duration: 18,
            brief:
              "Great games teach without a lecture. Feedback loops and 'juice' (satisfying responses) keep Explorers in flow.",
            objectives: [
              "Identify positive vs negative feedback loops",
              "Spot juice: animation, sound, camera, particles",
              "Propose one juice upgrade for a bland prototype",
            ],
            teach: `**Feedback loop:** player acts → world responds → player decides again.

- **Positive loop:** success unlocks more ability (combo meter, power-ups) — use carefully or games snowball.
- **Negative loop:** failure slows you (respawn, cooldown) — teaches risk.

**Juice** is the *feel*: screen shake on land, coin sparkles, whoosh on dash. Juice does not replace fair rules — it makes fair rules *readable*.

Designer question: *If I muted all sound and removed particles, could a player still understand success vs failure?* If yes, your core loop is solid.`,
            practice: `Watch a 60-second clip of any game (or play 2 minutes). List: (1) three feedback signals, (2) one positive loop, (3) one juice moment. Sketch a juice upgrade for a plain "collect 5 stars" prototype.`,
          },
          {
            title: "LAB: Deconstruct a Favorite Level",
            order: 3,
            type: "LAB",
            duration: 40,
            brief:
              "Mission: reverse-engineer a level like an engineer reading a blueprint.",
            objectives: [
              "Map spaces: safe zones, challenge zones, reward moments",
              "Identify teaching moments (first jump, first enemy)",
              "Redraw a simplified level flow on paper or digital whiteboard",
            ],
            teach: `Level design often follows **teach → test → twist**:
1. **Teach** — safe space to learn a mechanic
2. **Test** — apply the mechanic under light pressure
3. **Twist** — combine with a new constraint

Sketch zones as boxes with arrows. Label *safe*, *risk*, and *reward*. Good levels rarely dump three new rules at once.`,
            practice: `Deliverable: a one-page level map (photo of paper OK) with labeled teach/test/twist zones + 4 bullet notes on fairness. Submit to your mission log.`,
            stretch: `Propose a twist that reuses the same mechanic without adding new controls.`,
          },
          {
            title: "Innovation Check: Player Mindset",
            order: 4,
            type: "QUIZ",
            duration: 15,
            brief: "Signal check before Level Forge Lab.",
            objectives: [
              "Distinguish mechanics from theme",
              "Explain teach → test → twist",
              "Name feedback vs juice",
            ],
            teach: `Answer in your mission log, then self-check.

**1.** Theme vs mechanic — which is a mechanic?
- A) Neon cyber city art
- B) Double-jump ✓
- C) Pirate soundtrack
- D) Character costume

**2.** Teach → test → twist primarily helps with:
- A) Marketing trailers
- B) Learning curve fairness ✓
- C) Monetization
- D) Voice acting

**3.** Juice mainly improves:
- A) Random unfair deaths
- B) Readability and feel of feedback ✓
- C) Save-file size
- D) Server latency`,
            practice: `Score yourself. Missed any? Revisit Feedback Loops & Juice. Write one sentence: *My next prototype will teach X before testing X.*`,
          },
        ],
      },
      {
        title: "Level Forge Lab",
        description: "Sketch maps, place hazards, and playtest fairness with peers.",
        order: 2,
        lessons: [
          {
            title: "Mission Brief: Fair Challenge",
            order: 1,
            brief:
              "A hard level is fine. An *unfair* level breaks trust. Mission Control demands fairness audits.",
            objectives: [
              "Define fair vs cheap difficulty",
              "List three fairness failure modes",
              "Write a playtest script for a peer",
            ],
            teach: `**Fair difficulty:** player can learn the pattern with observation and skill.
**Cheap difficulty:** hidden one-shots, unclear hitboxes, mandatory frame-perfect inputs with no telegraph.

Common fairness failures:
1. **Telegraph missing** — attack with no warning
2. **Readability fail** — hazard blends into background
3. **Checkpoint starvation** — long sections with no recovery

Playtest script (ask a peer):
1. What were you trying to do?
2. Where did you feel confused?
3. When did you feel proud?`,
            practice: `Write a fairness checklist (8 items) for your upcoming prototype. Include at least one item about color contrast / readability.`,
          },
          {
            title: "Discovery: Pacing, Risk & Reward",
            order: 2,
            brief:
              "Pacing is the heartbeat of a level — tension and release.",
            objectives: [
              "Place calm beats after intense segments",
              "Balance risk and reward placement",
              "Avoid constant max intensity (player fatigue)",
            ],
            teach: `Think in **beats**: build → peak → breathe → build.

Rewards (coins, shortcuts, lore) should sometimes sit near risk so choices feel meaningful. If every reward is free and safe, collection becomes chores. If every reward requires unfair risk, players stop exploring.

**NOVA pacing sketch:** 30s teach → 45s test → 15s breathe (view / soft reward) → 60s twist.`,
            practice: `On your level map, mark three beats with timestamps. Adjust one segment that stays intense too long.`,
          },
          {
            title: "LAB: Sketch & Peer Playtest",
            order: 3,
            type: "LAB",
            duration: 45,
            brief: "Ship a paper or digital prototype and run one peer playtest.",
            objectives: [
              "Produce a navigable level sketch or blockout",
              "Run a 5-minute playtest with notes",
              "Change one thing based on evidence (not ego)",
            ],
            teach: `Prototype fidelity can be low: graph paper, sticky notes, or Scratch grey-box platforms. **Evidence > opinions.** Quote your playtester.

Iteration rule: change *one* major thing per cycle so you know what fixed the confusion.`,
            practice: `Submit: (1) prototype photo/link, (2) playtest notes (3 quotes), (3) one change you made and why.`,
            exploreNote: `Creative electives can also warm up in [/experiences/pixel-portal-escape](/experiences/pixel-portal-escape).`,
          },
          {
            title: "Innovation Check: Level Forge",
            order: 4,
            type: "QUIZ",
            duration: 12,
            brief: "Confirm fairness and pacing vocabulary.",
            objectives: ["Apply fairness language", "Choose a pacing fix"],
            teach: `**Scenario:** Players keep falling into a pit they cannot see until the last frame.
Best first fix?
- A) Add more pits
- B) Improve telegraph / contrast / camera ✓
- C) Remove all checkpoints
- D) Raise jump height randomly`,
            practice: `Write a 4-sentence mentor note explaining your fix using the words telegraph and readability.`,
          },
        ],
      },
      {
        title: "Mechanics Sprint",
        description: "Prototype interactions in Scratch or a simple engine — iterate fast.",
        order: 3,
        lessons: [
          {
            title: "Mission Brief: Core Verb First",
            order: 1,
            brief:
              "If your game has twelve verbs, it has zero verbs. Pick one core action and make it excellent.",
            objectives: [
              "Choose a single core verb (jump, shoot, build, sneak…)",
              "List supporting verbs (max 2) that serve the core",
              "Write acceptance criteria for 'the verb feels good'",
            ],
            teach: `**Core verb examples**
- Platformer: jump
- Stealth: sneak / hide
- Builder: place / connect

Acceptance criteria ideas: response time, forgiveness windows, clear fail state, readable success.

Scope killer phrase: "Also we could add…" — park ideas in a **Later list**.`,
            practice: `Declare your core verb + 2 supporting verbs + 3 acceptance criteria. Freeze scope for this sprint.`,
          },
          {
            title: "Discovery: Events, Variables & State",
            order: 2,
            brief:
              "Under the art, games are events changing state — just like code missions.",
            objectives: [
              "Map player input → event → state change → feedback",
              "Use variables for score, lives, flags",
              "Avoid spaghetti: name variables clearly",
            ],
            teach: `Example flow:
\`input: space\` → \`event: jump_pressed\` → \`state: isJumping=true\` → \`feedback: play jump sound + animate\`

In Scratch: broadcasts/events + variables. In engines: input actions + state machines.

Name variables like \`portalUnlocked\` not \`x3\`. Future you is a teammate.`,
            practice: `Draw an event→state→feedback diagram for your core verb. Implement the thinnest version that proves the verb.`,
          },
          {
            title: "LAB: Playable Slice in Scratch (or Engine)",
            order: 3,
            type: "LAB",
            duration: 50,
            brief:
              "Build a 60–90 second playable slice proving your core verb — not a full game.",
            objectives: [
              "Ship a runnable prototype link or file",
              "Include win + fail states",
              "Add minimal juice so feedback is obvious",
            ],
            teach: `Definition of done for this LAB:
1. Player can start without instructions longer than one sentence on screen
2. Win condition is reachable
3. Fail condition is recoverable or clearly restarts
4. One juice moment exists on success`,
            practice: `Submit playable link/file + 5-bullet README: controls, win, fail, known bugs, next iterate.`,
          },
          {
            title: "Innovation Check: Mechanics Sprint",
            order: 4,
            type: "QUIZ",
            duration: 12,
            brief: "Scope discipline check.",
            objectives: ["Defend core-verb scope"],
            teach: `A teammate wants to add inventory, crafting, and multiplayer before the jump feels good.
Best NOVA response?
- A) Add all three tonight
- B) Park them on Later list; finish jump feel first ✓
- C) Delete the jump
- D) Rewrite the theme instead`,
            practice: `Move one out-of-scope idea to your Later list and tell a peer why.`,
          },
        ],
      },
      {
        title: "Arcade Showcase",
        description: "Ship a playable demo and present design decisions to mentors.",
        order: 4,
        lessons: [
          {
            title: "Mission Brief: Design Decision Story",
            order: 1,
            brief:
              "Mentors care *why* you made choices. Showcase is storytelling + demo.",
            objectives: [
              "Write a 90-second pitch structure",
              "Name two decisions backed by playtest evidence",
              "Prepare a known-bugs slide (honesty builds trust)",
            ],
            teach: `Pitch arc:
1. **Hook** — who is the player and what do they want?
2. **Core verb** — what do they do?
3. **Evidence** — what playtest changed?
4. **Ask** — what feedback do you want next?

Never hide bugs. Label them. Professionals triage.`,
            practice: `Draft your 90-second script (120–160 words). Highlight two evidence-backed decisions.`,
          },
          {
            title: "Discovery: Portfolio Packaging",
            order: 2,
            brief: "A playable demo without a brief is hard to celebrate — package it.",
            objectives: [
              "Create a one-page design brief",
              "Export a clean build or Scratch link",
              "Capture a 15–30s silent GIF/video of gameplay",
            ],
            teach: `Portfolio kit:
- Title + one-sentence promise
- Controls
- Design goals
- Screenshot/GIF
- Link
- Credits (tools, teammates, music)`,
            practice: `Assemble the portfolio kit folder. Check links open in a private/incognito window.`,
          },
          {
            title: "LAB: Arcade Showcase Rehearsal",
            order: 3,
            type: "LAB",
            duration: 40,
            brief: "Rehearse demo + pitch with a timer. Iterate once.",
            objectives: [
              "Complete one timed rehearsal",
              "Cut filler words; keep evidence",
              "Finalize capstone submission package",
            ],
            teach: `Rehearsal protocol: phone timer 90s. Peer holds checklist: hook, verb, evidence, ask. Only revise the weakest section.`,
            practice: `Submit final package: brief + playable + pitch script + rehearsal notes.`,
          },
          {
            title: "Innovation Check: Showcase Ready",
            order: 4,
            type: "QUIZ",
            duration: 10,
            brief: "Final signal check before mentor celebration.",
            objectives: ["Confirm showcase checklist"],
            teach: `Which showcase is strongest?
- A) 12 unfinished systems, no playtest notes
- B) One solid verb, playtest evidence, honest bugs, clean pitch ✓
- C) Beautiful art only, no win state
- D) Multiplayer plan document with no demo`,
            practice: `Self-score your kit 1–5 on clarity, fairness, evidence, packaging. Fix the lowest score item.`,
          },
        ],
      },
    ],
  },
];

// Write gaming first; additional electives appended below in same file run
for (const c of electives) {
  writeCourse(c.file, c.exportName, c.meta, c.modules);
}

console.log("base gaming written — extending script with remaining electives...");
