import { LessonType, Pathway } from "@prisma/client";
import type { SeedCourse, SeedModule } from "@/data/pathways/types";
import { missionLesson } from "./mission-lesson";

function mod(
  order: number,
  title: string,
  description: string,
  lessons: SeedModule["lessons"],
): SeedModule {
  return { order, title, description, lessons };
}

/** Gaming & Game Design — youth elective LMS path */
export const gamingGameDesignLms: SeedCourse = {
  title: "Gaming & Game Design",
  slug: "nova-school-gaming-game-design",
  description:
    "From player to creator — design levels, characters, and playable worlds with game loops, playtesting, and portfolio demos.",
  pathway: Pathway.CODING_AI,
  level: "Explorer",
  published: true,
  capstone: {
    title: "Capstone: Arcade Showcase Demo",
    description:
      "Ship a playable mini-game or level with a short design document: core loop, win/lose conditions, playtest notes, and a 2-minute demo walkthrough.",
  },
  modules: [
    mod(1, "Player Mindset", "Break down what makes games fun and fair.", [
      missionLesson({
        title: "Mission Brief: From Player to Designer",
        order: 1,
        brief: "Mission Control needs Explorers who can reverse-engineer fun — not just play it.",
        objectives: [
          "Explain rules, feedback, and challenge in a favorite game",
          "Identify one fairness issue in a level you know",
          "Write a one-sentence design goal for your own mini-game",
        ],
        teach: `Great games balance **challenge** and **feedback**. Players need clear goals, readable rules, and a reason to try again after failure.

Study a game you love:
1. What is the core loop (action → feedback → progress)?
2. How does the game teach without long tutorials?
3. Where does it get unfair or confusing?

Write notes like a designer, not a fan.`,
        practice:
          "Create a one-page Game Tear-Down: screenshots or sketches + 5 bullets on rules, feedback, challenge, and one improvement you would ship.",
        stretch: "Compare two games in the same genre — what does each teach better?",
        exploreNote: "Try Explore Now: Pixel Portal Escape when available.",
      }),
      missionLesson({
        title: "Discovery: Core Loops & Juicy Feedback",
        order: 2,
        type: LessonType.READING,
        brief: "If players cannot feel progress, they quit — even when the idea is cool.",
        objectives: [
          "Define a core loop for a simple game",
          "List three feedback signals (visual, audio, or score)",
          "Sketch a fail state that teaches, not punishes randomly",
        ],
        teach: `A **core loop** is the repeating action that creates fun. Examples: jump → land → collect; aim → shoot → reload; place block → test → iterate.

**Juicy feedback** makes actions feel satisfying: particles, screen shake, score pops, sound cues. Overdo it and the screen becomes noise; underdo it and the game feels broken.

Design rule: every major action should answer “Did that work?” within one second.`,
        practice:
          "Design a core loop card for your mini-game: verb, feedback, progress currency (coins, stars, distance), and fail state.",
      }),
      missionLesson({
        title: "LAB: Paper Prototype Playtest",
        order: 3,
        type: LessonType.LAB,
        duration: 40,
        brief: "Paper is faster than code when you are still hunting for fun.",
        objectives: [
          "Prototype a level on paper or cardboard",
          "Run a 5-minute playtest with a peer",
          "Capture one change you will make next",
        ],
        teach: `Paper prototypes force clarity. Draw rooms, hazards, spawn points, and win conditions. Let a peer “play” while you act as the computer.

Ask only: Where did they get stuck? What felt unfair? What made them smile?`,
        practice:
          "Submit photos of your paper prototype + 5 playtest notes + the next iteration you will build digitally.",
        stretch: "Time how long a new player takes to understand the goal without your help.",
      }),
      missionLesson({
        title: "Quiz: Fair Challenge Check",
        order: 4,
        type: LessonType.QUIZ,
        duration: 15,
        brief: "Prove you can spot unfair design before players rage-quit.",
        objectives: [
          "Distinguish hard-but-fair from random-punishing design",
          "Propose a fix for one unfair pattern",
        ],
        teach: `Answer in your mission log:
1. Name one unfair pattern (hidden spikes, unclear goals, forced memorization without telegraphing).
2. Rewrite it to be hard but readable.
3. Explain how feedback would change.`,
        practice: "Submit quiz answers (paragraph form). Mentor reviews for clarity.",
      }),
    ]),
    mod(2, "Level Forge Lab", "Maps, hazards, and playable fairness.", [
      missionLesson({
        title: "Discovery: Level Flow & Pacing",
        order: 1,
        brief: "Levels are stories told with space and risk.",
        objectives: [
          "Sketch a level with tutorial → challenge → climax",
          "Place one teaching hazard before a deadly version",
          "Mark safe spaces for breathing room",
        ],
        teach: `Good levels teach then test. Show a hazard in a safe context, then reuse it under pressure. Use **pacing**: quiet moments between spikes of intensity.

Draw flow arrows. If players can miss the goal entirely, your signposting failed.`,
        practice: "Submit a labeled level map (digital or photo) with flow arrows and hazard legend.",
      }),
      missionLesson({
        title: "LAB: Build a Playable Draft",
        order: 2,
        type: LessonType.LAB,
        duration: 45,
        brief: "Ship a draft in Scratch or a simple engine — ugly is allowed, unfinished fun is not.",
        objectives: [
          "Implement movement and one win condition",
          "Add at least one hazard with clear telegraphing",
          "Export or share a playable link/file",
        ],
        teach: `Start with verbs: move, jump, interact. Only then decorate. Use Scratch blocks, Construct, Godot, or Unity — pick what you can finish.

Definition of done for this lab: a stranger can play for 60 seconds and understand the goal.`,
        practice: "Share playable build + short note on known bugs.",
        exploreNote: "Pixel Portal Escape practices spatial puzzles under time pressure.",
      }),
      missionLesson({
        title: "Discovery: Characters & Motivation",
        order: 3,
        brief: "Players need a reason to care about the avatar.",
        objectives: [
          "Define character goal, weakness, and visual silhouette",
          "Write a 3-line character bio that drives gameplay",
        ],
        teach: `Characters are more than sprites. A clear **motivation** shapes level goals. Silhouette readability matters on small screens.

Avoid copying protected IP. Original heroes welcome.`,
        practice: "Submit character sheet: silhouette sketch, motivation, and one special move idea.",
      }),
      missionLesson({
        title: "LAB: Second Playtest Sprint",
        order: 4,
        type: LessonType.LAB,
        duration: 35,
        brief: "Iterate like a studio — change one variable at a time.",
        objectives: [
          "Run a second playtest",
          "Change one major friction point",
          "Document before/after",
        ],
        teach: `Studios ship iterations. Change difficulty, feedback, or tutorial — not everything at once — so you know what worked.`,
        practice: "Before/after notes + updated build.",
      }),
    ]),
    mod(3, "Mechanics Sprint", "Script interactions and polish the loop.", [
      missionLesson({
        title: "Discovery: Scripts That Behave",
        order: 1,
        brief: "Code is just rules the computer enforces perfectly — including your mistakes.",
        objectives: [
          "Describe events and conditionals in your tool",
          "Implement one interactive mechanic beyond movement",
        ],
        teach: `Whether Scratch or C#, games react to **events**: collisions, key presses, timers. Conditionals decide outcomes. Keep variables named clearly (\`playerHealth\`, not \`x1\`).`,
        practice: "Add one interactive mechanic (collectible, door, power-up) and explain the event flow in 5 bullets.",
      }),
      missionLesson({
        title: "LAB: Juice Pass",
        order: 2,
        type: LessonType.LAB,
        duration: 40,
        brief: "Make actions feel alive without drowning the player in effects.",
        objectives: [
          "Add two juice effects tied to player actions",
          "Keep UI readable",
        ],
        teach: `Juice should confirm success/failure. Prefer subtle scale pops and short sounds over endless particles.`,
        practice: "List juice additions + 10-second clip or screenshots.",
      }),
      missionLesson({
        title: "Discovery: Accessibility & Inclusion",
        order: 3,
        brief: "More players finishing is a design win.",
        objectives: [
          "List two accessibility improvements for your game",
          "Avoid color-only signals",
        ],
        teach: `Use shape + color, scalable UI text, remappable controls when possible, and difficulty options. Inclusion is craft, not optional polish.`,
        practice: "Accessibility checklist filled for your build (min 6 items).",
      }),
      missionLesson({
        title: "Quiz: Mechanics Readiness",
        order: 4,
        type: LessonType.QUIZ,
        duration: 15,
        brief: "Confirm your mechanic is teachable.",
        objectives: ["Explain your mechanic without opening the project"],
        teach: `In writing: What is the verb? When does it fail? How does the player learn it in the first 30 seconds?`,
        practice: "Submit written explanation for mentor review.",
      }),
    ]),
    mod(4, "Arcade Showcase", "Ship and present like a studio.", [
      missionLesson({
        title: "Discovery: Design Docs That Fit on One Page",
        order: 1,
        brief: "If you cannot explain the game briefly, players will not either.",
        objectives: [
          "Write a one-page design doc",
          "List known bugs honestly",
        ],
        teach: `Include: premise, core loop, controls, win/lose, target player, and stretch features marked as future.`,
        practice: "Submit one-page GDD.",
      }),
      missionLesson({
        title: "LAB: Showcase Build Freeze",
        order: 2,
        type: LessonType.LAB,
        duration: 45,
        brief: "Freeze features. Fix blockers. Ship the demo.",
        objectives: [
          "Create a showcase build",
          "Write a 90-second demo script",
        ],
        teach: `Feature freeze means no new systems — only bug fixes and clarity. Practice your demo path so nothing random breaks mid-show.`,
        practice: "Showcase build + demo script.",
      }),
      missionLesson({
        title: "LAB: Mentor Demo Day",
        order: 3,
        type: LessonType.PROJECT,
        duration: 40,
        brief: "Present decisions, not just pixels.",
        objectives: [
          "Present to peers/mentors",
          "Answer one critique with a planned change",
        ],
        teach: `Open with the problem you solved for the player. Show the loop. Share one playtest insight. Invite critique.`,
        practice: "Record or attend demo; submit reflection (what you will change next).",
      }),
      missionLesson({
        title: "Mission Complete: Portfolio Upload",
        order: 4,
        type: LessonType.PROJECT,
        duration: 25,
        brief: "Archive your work so future-you can show it proudly.",
        objectives: ["Package playable + GDD + reflection"],
        teach: `Portfolio folders beat forgotten USB sticks. Include README with controls and credits.`,
        practice: "Upload portfolio package to your NOVA assignment drop.",
      }),
    ]),
  ],
};

/** Digital Marketing elective */
export const digitalMarketingSchoolLms: SeedCourse = {
  title: "Digital Marketing & Social Media",
  slug: "nova-school-digital-marketing",
  description:
    "Personal brand, ethical campaigns, visual storytelling, and metrics for young creators.",
  pathway: Pathway.CODING_AI,
  level: "Explorer",
  published: true,
  capstone: {
    title: "Capstone: Mini Campaign Showcase",
    description:
      "Ship a mini campaign: persona, 5 posts, one metric plan, and ethics review. Present to mentors.",
  },
  modules: [
    mod(1, "Brand Spark", "Audience, voice, and promises you can keep.", [
      missionLesson({
        title: "Mission Brief: Signal Strength Starts With Trust",
        order: 1,
        brief: "NOVA needs creators who grow audiences without dark patterns.",
        objectives: [
          "Define audience and promise",
          "Write three voice attributes with examples",
        ],
        teach: `A brand is a **promise** plus proof. For youth creators, that means honesty about sponsorships, respectful comments, and content that helps someone.`,
        practice: "Brand spark sheet: audience, promise, voice do/don't.",
        exploreNote: "Explore Now: Viral Signal Brief.",
      }),
      missionLesson({
        title: "Discovery: Personas Without Stereotypes",
        order: 2,
        brief: "Real audiences are people — research beats assumptions.",
        objectives: ["Draft one evidence-based persona", "List channels they actually use"],
        teach: `Interview classmates or family about content they trust. Note goals, fears, and scroll habits. Avoid stereotypes.`,
        practice: "Persona card + 3 content ideas matched to their goals.",
      }),
      missionLesson({
        title: "LAB: Bio & Banner That Clarify",
        order: 3,
        type: LessonType.LAB,
        duration: 35,
        brief: "Your profile is a landing page.",
        objectives: ["Write a clear bio", "Design a simple banner concept"],
        teach: `Bio formula: who you help + what you make + proof/CTA. Keep claims true.`,
        practice: "Bio variants (2) + banner sketch.",
      }),
      missionLesson({
        title: "Quiz: Ethical Brand Check",
        order: 4,
        type: LessonType.QUIZ,
        duration: 15,
        brief: "Spot manipulative tactics.",
        objectives: ["Identify two unethical tactics and replacements"],
        teach: `Fear spam, fake urgency, and hidden ads erode trust. Replace with clear value and disclosure.`,
        practice: "Written quiz responses.",
      }),
    ]),
    mod(2, "Hook Studio", "Curiosity without clickbait abuse.", [
      missionLesson({
        title: "Discovery: Hooks That Respect Attention",
        order: 1,
        brief: "Earn the click — then deliver.",
        objectives: ["Write 5 honest hooks", "Pair each with the payoff"],
        teach: `Hooks open loops; content closes them. Clickbait that lies destroys Signal Strength.`,
        practice: "Hook sheet with payoffs.",
      }),
      missionLesson({
        title: "LAB: Visual Story Frames",
        order: 2,
        type: LessonType.LAB,
        duration: 40,
        brief: "Design posts people can read on a phone.",
        objectives: ["Create 3 on-brand graphics", "Check contrast and hierarchy"],
        teach: `One idea per post. Large text. High contrast. Alt-text plan.`,
        practice: "3 graphics + accessibility notes.",
      }),
      missionLesson({
        title: "Discovery: Captions & CTAs",
        order: 3,
        brief: "Tell people the next helpful step.",
        objectives: ["Write captions with one CTA each"],
        teach: `CTA examples: save this, try the checklist, ask a question. One CTA beats three.`,
        practice: "3 caption+CTA pairs.",
      }),
      missionLesson({
        title: "LAB: Mini Content Batch",
        order: 4,
        type: LessonType.LAB,
        duration: 40,
        brief: "Batch creation beats last-minute posting.",
        objectives: ["Produce 5 post drafts in one session"],
        teach: `Theme the batch. Reuse templates. Leave room for real-time replies.`,
        practice: "5-post batch folder.",
      }),
    ]),
    mod(3, "Campaign Sprint", "Ship a mini campaign and track Signal Strength.", [
      missionLesson({
        title: "Discovery: Goals & Metrics",
        order: 1,
        brief: "If you cannot measure it, you cannot improve it.",
        objectives: ["Pick one primary metric", "Define success for 7 days"],
        teach: `Vanity metrics mislead. Prefer saves, meaningful comments, or link clicks tied to your promise.`,
        practice: "Campaign goal sheet.",
      }),
      missionLesson({
        title: "LAB: 7-Day Campaign",
        order: 2,
        type: LessonType.LAB,
        duration: 45,
        brief: "Launch with a calendar and posting plan.",
        objectives: ["Publish or schedule campaign posts", "Log results daily"],
        teach: `Even a private class channel counts if you treat it like a real campaign with timing and reflection.`,
        practice: "Calendar + results log.",
        exploreNote: "Viral Signal Brief mirrors campaign pressure.",
      }),
      missionLesson({
        title: "Discovery: Community Care",
        order: 3,
        brief: "Engagement is a conversation, not a broadcast.",
        objectives: ["Write reply guidelines", "Plan escalation for harassment"],
        teach: `Respond kindly. Do not feed trolls. Protect peers. Document when to get a mentor.`,
        practice: "Community care one-pager.",
      }),
      missionLesson({
        title: "LAB: Insights Retro",
        order: 4,
        type: LessonType.LAB,
        duration: 30,
        brief: "Turn numbers into one smart change.",
        objectives: ["Analyze results", "Propose one experiment"],
        teach: `Ask: What worked? What flopped? What will we try next week?`,
        practice: "Retro report (1 page).",
      }),
    ]),
    mod(4, "Ethics Review", "Integrity as a growth strategy.", [
      missionLesson({
        title: "Discovery: Disclosures & Digital Citizenship",
        order: 1,
        brief: "Hidden ads are not clever — they are unfair.",
        objectives: ["Practice disclosure language", "List platform rules that matter"],
        teach: `If gifted or paid, say so. Respect copyright. Credit creators.`,
        practice: "Disclosure examples + citation practice.",
      }),
      missionLesson({
        title: "LAB: Campaign Critique Circle",
        order: 2,
        type: LessonType.LAB,
        duration: 35,
        brief: "Critique work, not people.",
        objectives: ["Give structured feedback", "Receive one improvement"],
        teach: `Use: I notice / I wonder / I suggest.`,
        practice: "Feedback notes from critique.",
      }),
      missionLesson({
        title: "PROJECT: Portfolio Case Study",
        order: 3,
        type: LessonType.PROJECT,
        duration: 40,
        brief: "Package the campaign as proof.",
        objectives: ["Write case study: goal → work → result → learning"],
        teach: `Include creatives and honest metrics — even if small.`,
        practice: "Case study PDF or doc.",
      }),
      missionLesson({
        title: "Mission Complete: Mentor Showcase",
        order: 4,
        type: LessonType.PROJECT,
        duration: 25,
        brief: "Present with clarity and humility.",
        objectives: ["Present 3 minutes", "Share next experiment"],
        teach: `Lead with audience benefit, not ego.`,
        practice: "Presentation reflection.",
      }),
    ]),
  ],
};
