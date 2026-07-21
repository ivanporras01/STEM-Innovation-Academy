/**
 * School electives batch B + language programs.
 * Run: node scripts/generate-program-lms-batch-b.mjs
 */
import fs from "fs";
import path from "path";

const OUT = path.resolve("src/data/program-lms");

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
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
      L(`Innovation Check: ${t.checkTitle}`, 4, "Signal check before the next module.", t.obj4, t.quizPrompt, "Self-score, then commit to your next artifact in one sentence.", { type: "QUIZ", duration: 12 }),
    ],
  };
}

const courses = [
  {
    file: "school-content-creation.ts",
    exportName: "digitalContentCreationCourse",
    meta: {
      title: "Digital Content Creation Mission Path",
      slug: "nova-school-digital-content-creation",
      description: "Storyboarding, short video, visual design, and portfolio storytelling for STEM creators.",
      pathway: "CODING_AI",
      level: "Explorer",
      capstoneTitle: "Capstone: Premiere Night Portfolio Piece",
      capstoneDescription: "Ship a 15–45s trailer or media piece with storyboard, edit notes, and mentor premiere reflection.",
    },
    modules: [
      stdModule("Story Beacon", "Hook, problem, hero, twist, win — map emotional arcs for short media.", 1, {
        briefTitle: "Story Is a System",
        discTitle: "Beats & Emotion",
        labTitle: "Storyboard Sprint",
        checkTitle: "Story Beacon",
        brief1: "NOVA media makers design emotion on purpose — not by accident.",
        obj1: ["Map hook → problem → hero → twist → win", "Write a one-sentence story promise", "Keep STEM truthfulness in creative stories"],
        teach1: `Short-form story spine:
1. Hook — curiosity in first 2 seconds
2. Problem — what is at stake?
3. Hero action — what does the Explorer do?
4. Twist — surprise that still makes sense
5. Win — clear resolution + takeaway

Creative ≠ false. Do not invent unsafe science.`,
        practice1: "Write a story spine for a 20-second STEM trailer. Circle the emotional peak frame.",
        explore: "Warm-up: [/experiences/story-beacon-reel](/experiences/story-beacon-reel) — Story Beacon Reel.",
        brief2: "Beats are timing decisions. Emotion needs space to land.",
        obj2: ["Assign seconds to each beat", "Plan music/energy changes", "Avoid text walls on screen"],
        teach2: "If every second is max intensity, nothing feels intense. Leave a breath beat before the win.",
        practice2: "Make a timing table: Beat | Seconds | On-screen text | Audio energy.",
        video: true,
        labBrief: "Draw or digital-storyboard 6–8 frames.",
        obj3: ["Deliver storyboard frames", "Label camera/shot ideas", "Note accessibility: captions plan"],
        labTeach: "Sticky notes or slides work. Big readable text. Captions planned from day one.",
        labPractice: "Submit storyboard + caption draft for the spoken/on-screen lines.",
        obj4: ["Apply story spine"],
        quizPrompt: `First 2 seconds of a trailer should usually:
- A) Show end credits
- B) Deliver a clear hook ✓
- C) Explain every STEM concept
- D) Ask for personal passwords`,
      }),
      stdModule("Reel Lab", "Capture, cut, and pace a 15–30 second trailer.", 2, {
        briefTitle: "Edit Is Writing",
        discTitle: "Pacing & Audio",
        labTitle: "Cut a Trailer",
        checkTitle: "Reel Lab",
        brief1: "Editing decides what the audience feels — cut with intention.",
        obj1: ["Select only frames that advance the spine", "Cut dead time", "Keep one clear takeaway"],
        teach1: "Kill your darlings: beautiful shots that do not serve the story go to B-roll archive.\nTarget length: 15–30s for youth trailers.",
        practice1: "List every planned shot. Mark Keep / Cut / Maybe. Justify each Keep in 5 words.",
        brief2: "Audio carries emotion when visuals move fast.",
        obj2: ["Plan voice or text-first delivery", "Avoid copyright traps", "Normalize loudness roughly"],
        teach2: "Prefer original voice, school-safe music libraries, or silent + captions. Loud ads fatigue viewers.",
        practice2: "Choose audio strategy and write a 3-line voiceover (or caption-only script).",
        labBrief: "Export a trailer draft.",
        obj3: ["Export mp4 or editor project", "Burn-in or sidecar captions", "Get one peer timing note"],
        labTeach: "Definition of done: story spine intact, captions readable, under 45s, no copyrighted music without license.",
        labPractice: "Submit draft + peer note + change you will make.",
        obj4: ["Defend edit choices"],
        quizPrompt: `A gorgeous 8-second shot does not advance the story. Best edit?
- A) Keep it because it is pretty
- B) Cut or shorten; archive for later ✓
- C) Loop it three times
- D) Add fake urgency text`,
      }),
      stdModule("Visual Polish", "Typography, color, and composition for thumb-stopping frames.", 3, {
        briefTitle: "Design for Thumbs",
        discTitle: "Type & Contrast",
        labTitle: "Title Card System",
        checkTitle: "Visual Polish",
        brief1: "Thumbnails and title cards are tiny billboards — clarity wins.",
        obj1: ["Apply contrast and hierarchy", "Limit fonts to 1–2 families", "Keep safe margins"],
        teach1: "Hierarchy: one focal word larger. Contrast: light on dark or dark on light — never grey on grey.\nAvoid stacking five fonts.",
        practice1: "Redesign one weak title card. Before/after screenshots.",
        brief2: "Composition guides the eye.",
        obj2: ["Use rule of thirds intentionally", "Remove clutter", "Check mobile crop"],
        teach2: "Design at vertical 9:16 if Reels/TikTok is the target. Check the center-safe area.",
        practice2: "Crop test: export a frame and view on a phone. Fix anything cut off.",
        labBrief: "Create a consistent title/lower-third system for your piece.",
        obj3: ["Ship 3 template frames", "Document colors/fonts", "Apply to trailer"],
        labTeach: "Template kit: Opening title · Section label · End card CTA.",
        labPractice: "Submit template kit + updated trailer stills.",
        obj4: ["Apply visual hierarchy"],
        quizPrompt: `Grey text on a grey nebula background fails because of:
- A) Too much hierarchy
- B) Poor contrast / readability ✓
- C) Excess captions
- D) Vertical video`,
      }),
      stdModule("Premiere Night", "Publish and present your media piece to mentors and peers.", 4, {
        briefTitle: "Celebrate & Reflect",
        discTitle: "Portfolio Packaging",
        labTitle: "Premiere + Reflection",
        checkTitle: "Premiere Night",
        brief1: "Premiere night is both celebration and critique — bring evidence of craft.",
        obj1: ["Prepare a 60-second maker talk", "Name one craft decision", "Invite specific feedback"],
        teach1: "Maker talk: Intent → Craft choice → What I would iterate.\nAsk for feedback on pacing or clarity — not just \"did you like it?\"",
        practice1: "Write maker talk script (90–120 words) + one feedback question.",
        brief2: "Portfolio packaging helps future you.",
        obj2: ["Write project README", "Credit tools and collaborators", "Store master files"],
        teach2: "README: title, one-sentence promise, tools, role, link, lessons learned.",
        practice2: "Create README and folder structure for masters + export.",
        labBrief: "Host premiere (class or mentor) and capture feedback.",
        obj3: ["Screen the piece", "Collect 3 feedback notes", "Plan v2 change"],
        labTeach: "After premiere: gratitude first, then triage feedback into Now / Later / Ignore (taste).",
        labPractice: "Submit final export + README + feedback triage + v2 note.",
        explore: "Optional: [/experiences/story-beacon-reel](/experiences/story-beacon-reel)",
        obj4: ["Run feedback triage"],
        quizPrompt: `Peer says \"I got lost at second 8.\" Best response?
- A) Argue they watched wrong
- B) Thank them; test a clearer beat/caption at 0:08 ✓
- C) Add 20 more effects
- D) Delete STEM content`,
      }),
    ],
  },
  {
    file: "school-cybersecurity.ts",
    exportName: "cybersecurityBasicsCourse",
    meta: {
      title: "Cybersecurity Basics for Teens Mission Path",
      slug: "nova-school-cybersecurity-basics",
      description: "Passwords, phishing, privacy, and ethical boundaries for teen digital defenders.",
      pathway: "CODING_AI",
      level: "Explorer",
      capstoneTitle: "Capstone: Personal Defense Playbook",
      capstoneDescription: "Submit a personal security playbook, phishing case study, and ethics reflection suitable for mentor review.",
    },
    modules: [
      stdModule("Shadow Ops Brief", "How attackers think — and how defenders stay calm under pressure.", 1, {
        briefTitle: "Think Like a Defender",
        discTitle: "CIA Triad & Threats",
        labTitle: "Home/School Attack Surface Map",
        checkTitle: "Shadow Ops",
        brief1: "NOVA defenders stay calm, curious, and ethical — never reckless.",
        obj1: ["Explain confidentiality, integrity, availability", "Name common teen threat scenarios", "Commit to ethical boundaries"],
        teach1: `CIA triad:
- Confidentiality — only the right people see data
- Integrity — data is not secretly changed
- Availability — systems are there when needed

Teen-relevant threats: phishing, account takeover, oversharing, malware from cracked games.`,
        practice1: "Write a CIA example for your school account. List two threats that break each property.",
        explore: "Warm-up: [/experiences/phish-shadow-ops](/experiences/phish-shadow-ops) — Inbox Under Siege.",
        brief2: "Attackers use psychology as much as technology.",
        obj2: ["Spot urgency, authority, scarcity lures", "Pause-verify-report habit", "Never test attacks on real systems without permission"],
        teach2: "If a message rushes you (\"account closes in 10 minutes\"), slow down. Verify via official site/app — not the message link.",
        practice2: "Collect 3 example lure patterns (screenshots of public demos or rewritten fakes you create). Label the tactic.",
        video: true,
        labBrief: "Map where your data lives and who can touch it.",
        obj3: ["Draw attack surface map", "Mark high-value accounts", "List first hardening steps"],
        labTeach: "Include: email, school LMS, gaming, social, cloud drives. Stars = high value.",
        labPractice: "Submit map + top 5 hardening actions ranked.",
        obj4: ["Apply CIA thinking"],
        quizPrompt: `A cracked game installer is risky mainly because it can break:
- A) Only color themes
- B) Confidentiality/integrity via malware ✓
- C) Mentor grading rubrics
- D) Classroom chairs`,
      }),
      stdModule("Phish Lab", "Spot lures: urgency, fake domains, and password traps.", 2, {
        briefTitle: "Inbox Under Analysis",
        discTitle: "URLs & Impersonation",
        labTitle: "Phish Dissection",
        checkTitle: "Phish Lab",
        brief1: "Phishing succeeds when haste beats habit.",
        obj1: ["Inspect sender and domains carefully", "Recognize lookalike URLs", "Practice pause-verify-report"],
        teach1: "nova-stem-hub.com vs nova-stem-hub.com.evil.example — always expand links carefully in training environments.\nNever enter passwords from an email CTA.",
        practice1: "Rewrite a phishing email into a safe training example. Highlight 5 red flags.",
        brief2: "Impersonation uses logos and tone — verify out-of-band.",
        obj2: ["Use official apps/bookmarks", "Enable MFA where available", "Report suspicious messages"],
        teach2: "Out-of-band verify: open the real app/site yourself. Call known numbers. Ask a mentor.",
        practice2: "Create a personal verify checklist (6 steps) for suspicious school/payment messages.",
        labBrief: "Dissect three phishing scenarios and propose user responses.",
        obj3: ["Complete dissection sheet", "Role-play report flow", "Teach one peer your checklist"],
        labTeach: "Dissection columns: Lure · Fake proof · Real risk · Safe action · Who to tell.",
        labPractice: "Submit three dissected cases + peer teach note.",
        explore: "Optional: [/experiences/phish-shadow-ops](/experiences/phish-shadow-ops)",
        obj4: ["Choose safe responses"],
        quizPrompt: `Best response to a \"reset password now\" email with a weird domain?
- A) Click and enter password
- B) Ignore forever with no report
- C) Navigate via official bookmark/app and report the message ✓
- D) Forward password to friends for fun`,
      }),
      stdModule("Vault Forge", "Build strong credentials and privacy habits that stick.", 3, {
        briefTitle: "Credentials Are Keys",
        discTitle: "Privacy Defaults",
        labTitle: "Personal Vault Plan",
        checkTitle: "Vault Forge",
        brief1: "Long unique passwords + MFA beat clever password tricks.",
        obj1: ["Explain why reuse is dangerous", "Prefer password managers when allowed", "Turn on MFA for top accounts"],
        teach1: "If one site leaks a reused password, attackers spray it elsewhere (credential stuffing).\nPassphrases: four random words beat \"P@ssw0rd1\".",
        practice1: "Audit: list accounts using reused passwords (do not write the passwords). Plan replacements order.",
        brief2: "Privacy is configuration, not vibes.",
        obj2: ["Harden social/privacy settings", "Limit public personal data", "Think before location tagging"],
        teach2: "Public birthday + school + pet names fuel security questions and social engineering.",
        practice2: "Complete a privacy settings checklist for one platform you use (or a simulated profile).",
        labBrief: "Build your Personal Defense Vault plan.",
        obj3: ["Document MFA coverage", "Password hygiene plan", "Device update habit"],
        labTeach: "Vault plan one-pager: High-value accounts · MFA status · Update cadence · Backup codes storage · Family/mentor help line.",
        labPractice: "Submit vault plan (no real passwords/backup codes in shared docs — use placeholders).",
        obj4: ["Explain credential stuffing risk"],
        quizPrompt: `Reusing one password across school + games is dangerous because:
- A) It is harder to remember
- B) A single breach can unlock many accounts ✓
- C) Mentors dislike fonts
- D) MFA becomes illegal`,
      }),
      stdModule("Ethics Council", "Debate boundaries: curiosity vs harm in digital exploration.", 4, {
        briefTitle: "Ethics Is a Control",
        discTitle: "Laws & Norms",
        labTitle: "Council Scenario Defense",
        checkTitle: "Ethics Council",
        brief1: "Unauthorized access is not a prank — it is harm and often illegal.",
        obj1: ["State permission rules", "Refuse unauthorized scanning/hacking", "Channel curiosity into legal labs"],
        teach1: "Permission required: systems you own, or explicit written authorization for class labs.\nCuriosity belongs in Capture-the-Flag platforms and sanctioned ranges — not classmates' accounts.",
        practice1: "Write your personal ethics oath (8–10 lines) for NOVA cyber exploration.",
        brief2: "Scenarios build judgment.",
        obj2: ["Analyze grey-area scenarios", "Choose escalation paths", "Protect targets and reporters"],
        teach2: "If you find a school system weakness: do not exploit. Document carefully and tell a responsible adult/IT path.",
        practice2: "Respond to three scenarios with: Immediate action · Who to tell · What not to do.",
        labBrief: "Present a scenario defense to the Ethics Council (class).",
        obj3: ["Present 3 minutes", "Defend ethical choice", "Finalize personal defense playbook"],
        labTeach: "Council rubric: Legality · Harm reduction · Honesty · Constructive alternative.",
        labPractice: "Submit presentation notes + final playbook + ethics oath.",
        obj4: ["Apply permission rule"],
        quizPrompt: `You discover a classmate's password written on a sticky note. Ethical action?
- A) Login to \"check\"
- B) Tell them privately to change it and notify mentor/policy path if needed ✓
- C) Post it in chat as a joke
- D) Sell it`,
      }),
    ],
  },
  {
    file: "school-creative-tech.ts",
    exportName: "creativeTechSocialImpactCourse",
    meta: {
      title: "Creative Tech & Social Impact Mission Path",
      slug: "nova-school-creative-tech-social-impact-teens",
      description: "Design thinking, creative coding, storytelling, and community-impact prototypes for teens.",
      pathway: "CODING_AI",
      level: "Explorer",
      capstoneTitle: "Capstone: Community Spark Showcase",
      capstoneDescription: "Present an empathy map, creative prototype, impact promise, and mentor showcase reflection.",
    },
    modules: [
      stdModule("Empathy Orbit", "Listen to a community need and map who is affected.", 1, {
        briefTitle: "People Before Prototypes",
        discTitle: "Stakeholders & Stories",
        labTitle: "Empathy Map",
        checkTitle: "Empathy Orbit",
        brief1: "NOVA creative technologists start with humans — not gadgets.",
        obj1: ["Identify a community need", "Map who is affected", "Separate symptoms from root friction"],
        teach1: "Ask: Who struggles? How often? What workarounds exist? What would dignity look like?\nAvoid savior narratives — partner with the community.",
        practice1: "Write a need statement with stakeholders listed. Remove any solution words.",
        explore: "Warm-up: [/experiences/community-spark-lab](/experiences/community-spark-lab) — Ignite a Community Spark.",
        brief2: "Stories reveal constraints numbers miss.",
        obj2: ["Collect two stakeholder stories", "Note emotions and barriers", "Check for inclusion gaps"],
        teach2: "Inclusion check: Whose voice is missing (age, language, ability, schedule)?",
        practice2: "Add an inclusion gap note to your need statement and one question to ask next.",
        video: true,
        labBrief: "Build an empathy map for your challenge.",
        obj3: ["Complete empathy map", "List constraints", "Draft impact promise"],
        labTeach: "Map quadrants: Says · Thinks · Does · Feels. Constraints: time, materials, safety, permissions.",
        labPractice: "Submit empathy map + impact promise (one sentence).",
        obj4: ["Center community voice"],
        quizPrompt: `Best first step for a community tech idea?
- A) Order expensive hardware
- B) Listen and map who is affected ✓
- C) Announce you will save everyone
- D) Skip permissions`,
      }),
      stdModule("Creative Toolbelt", "Scratch stories, media, or simple sensor ideas — pick with purpose.", 2, {
        briefTitle: "Tools Serve Purpose",
        discTitle: "Creative Coding Options",
        labTitle: "Tool Choice Memo",
        checkTitle: "Creative Toolbelt",
        brief1: "Pick the lightest tool that can prove your impact promise.",
        obj1: ["Compare Scratch/media/simple sensors", "Choose based on users not ego", "Define success signal"],
        teach1: "If your users need a story explainer, Scratch/media may beat wiring.\nIf they need a reminder light, a simple LED circuit might win.\nTool prestige ≠ impact.",
        practice1: "Score three tool options 1–5 on: speed, accessibility, user fit, safety.",
        brief2: "Creative coding patterns: sequence, events, loops, messages.",
        obj2: ["Map interaction flow", "Keep controls obvious", "Plan inclusive UX"],
        teach2: "Big buttons, clear text, multiple ways to succeed. Avoid timers that shame slow readers.",
        practice2: "Sketch UX flow with inclusive notes (language, motor, sensory).",
        labBrief: "Write a one-page tool choice memo and start prototype skeleton.",
        obj3: ["Justify tool", "Build skeleton", "Share with one stakeholder if possible"],
        labTeach: "Memo: Promise · Users · Tool · Why · Non-goals · Success signal.",
        labPractice: "Submit memo + skeleton screenshot/link.",
        obj4: ["Justify tool choice"],
        quizPrompt: `You love robotics but users need a bilingual explainer story. Best move?
- A) Force a robot anyway
- B) Choose Scratch/media that fits users; keep robotics for later ✓
- C) Cancel the project
- D) Ignore bilingual needs`,
      }),
      stdModule("Spark Prototype", "Assemble a tiny intervention with a clear impact promise.", 3, {
        briefTitle: "Tiny but Real",
        discTitle: "Feedback Loops",
        labTitle: "Impact Prototype",
        checkTitle: "Spark Prototype",
        brief1: "Ship a tiny intervention that a real person can try this week.",
        obj1: ["Define try-in-5-minutes test", "Instrument simple feedback", "Keep safety first"],
        teach1: "Success signal examples: student finds club room faster; elder reads flyer; peer completes checklist.\nSafety: no public personal data collection without guidance.",
        practice1: "Write try-in-5-minutes script + success signal + safety note.",
        brief2: "Feedback is a gift — design for it.",
        obj2: ["Ask two feedback questions", "Observe without defending", "Iterate once"],
        teach2: "Questions: What helped? What blocked you? What would make this kinder?",
        practice2: "Run one feedback session and capture quotes.",
        labBrief: "Build and test the spark prototype.",
        obj3: ["Deliver prototype", "Document feedback", "Ship one iteration"],
        labTeach: "Before/after evidence: photo, short clip, or completion count.",
        labPractice: "Submit prototype + feedback + iteration note.",
        explore: "Optional: [/experiences/community-spark-lab](/experiences/community-spark-lab)",
        obj4: ["Measure tiny impact"],
        quizPrompt: `Best evidence of impact for a tiny prototype?
- A) Only a logo
- B) A user completing the promised job with feedback notes ✓
- C) A long future roadmap
- D) Unrelated AI buzzwords`,
      }),
      stdModule("Impact Showcase", "Present to mentors, partners, and peers — celebrate purpose.", 4, {
        briefTitle: "Purpose on Stage",
        discTitle: "Story of Change",
        labTitle: "Showcase Night",
        checkTitle: "Impact Showcase",
        brief1: "Showcase the humans, the learning, and the next responsible step.",
        obj1: ["Tell a change story", "Credit community partners", "Propose a sustainable next step"],
        teach1: "Story: Context → Friction → Co-design → Prototype → Evidence → Next step.\nCredit people by name (with permission).",
        practice1: "Draft 2-minute showcase script with credits and next step.",
        brief2: "Sustainability beats one-day heroics.",
        obj2: ["Identify maintenance owner", "List permissions needed", "Avoid dependency on one hero"],
        teach2: "If only you can run it, it is fragile. Document so others can continue.",
        practice2: "Write a 1-page handoff note: how to run, who to ask, what to check.",
        labBrief: "Present and submit final package.",
        obj3: ["Present showcase", "Submit package", "Reflect on ethics/inclusion"],
        labTeach: "Package: empathy map, memo, prototype, evidence, handoff, reflection.",
        labPractice: "Submit final package after showcase.",
        obj4: ["Plan handoff"],
        quizPrompt: `A prototype works only when you are present. Risk?
- A) Too much documentation
- B) Fragile impact; needs handoff/sustainability plan ✓
- C) Too many credits
- D) Mentors celebrating`,
      }),
    ],
  },
];

// Language programs — 5 modules × 4 lessons
function langModule(title, desc, order, lang, focus) {
  return stdModule(title, desc, order, {
    briefTitle: focus.briefTitle,
    discTitle: focus.discTitle,
    labTitle: focus.labTitle,
    checkTitle: focus.checkTitle,
    brief1: focus.brief1,
    obj1: focus.obj1,
    teach1: focus.teach1,
    practice1: focus.practice1,
    brief2: focus.brief2,
    obj2: focus.obj2,
    teach2: focus.teach2,
    practice2: focus.practice2,
    video: true,
    labBrief: focus.labBrief,
    obj3: focus.obj3,
    labTeach: focus.labTeach,
    labPractice: focus.labPractice,
    obj4: focus.obj4,
    quizPrompt: focus.quizPrompt,
  });
}

function languageCourse(slug, title, target, exportName, file) {
  const Lname = target;
  return {
    file,
    exportName,
    meta: {
      title: `${title} Mission Path`,
      slug: `nova-language-${slug}`,
      description: `CEFR-aligned ${Lname} program with speaking labs, grammar in context, and capstone portfolio.`,
      pathway: "CODING_AI",
      level: "Language",
      capstoneTitle: `Capstone: ${Lname} Speaking Portfolio`,
      capstoneDescription: `Submit a recorded speaking demo, writing sample, and self-assessment aligned to CEFR can-do statements.`,
    },
    modules: [
      langModule("Foundations & First Conversation", "Core sounds, greetings, and everyday phrases with guided speaking labs.", 1, Lname, {
        briefTitle: `First Signals in ${Lname}`,
        discTitle: "Sounds & Survival Phrases",
        labTitle: "Conversation Lab 1",
        checkTitle: "Foundations",
        brief1: `Mission Control needs Explorers who can open a conversation in ${Lname} with clarity and respect.`,
        obj1: [`Produce core greetings in ${Lname}`, "Introduce yourself with name/origin/purpose", "Use polite repair phrases (\"please repeat\")"],
        teach1: `Start with high-frequency chunks, not isolated word lists.\nPractice: greeting → name → where you are from → one learning goal.\nRepair phrases keep conversations alive when you do not understand.`,
        practice1: "Record a 30–45s self-introduction. Transcribe what you said. Fix two pronunciation targets.",
        brief2: "Listening comes before perfect accent — train your ear daily.",
        obj2: ["Identify greeting vs question intonation", "Shadow a short audio twice", "Log unknown chunks"],
        teach2: "Shadowing: play → speak along → repeat alone. Keep chunks whole (\"How are you?\" not only \"How\").",
        practice2: "Shadow one 20–40s clip. Add 5 chunks to your personal phrase bank with meanings.",
        labBrief: "Live or paired speaking lab with rubric.",
        obj3: ["Complete paired dialogue", "Use two repair phrases", "Give kind peer feedback"],
        labTeach: "Rubric: Intelligibility · Completeness · Politeness · Repair strategies.",
        labPractice: "Submit recording or mentor checklist + phrase bank update.",
        obj4: ["Use repair strategies"],
        quizPrompt: `You did not understand a question. Best move?
- A) Pretend and guess wildly
- B) Use a polite repair phrase and ask for slower repeat ✓
- C) Switch permanently to another language without trying
- D) End the friendship`,
      }),
      langModule("Grammar in Context", "Structured grammar through real dialogues, reading, and writing practice.", 2, Lname, {
        briefTitle: "Patterns That Travel",
        discTitle: "Form → Meaning → Use",
        labTitle: "Dialogue Rewrite",
        checkTitle: "Grammar Context",
        brief1: "Grammar is a toolkit for meaning — learned in sentences you will actually say.",
        obj1: ["Notice a target pattern in authentic sentences", "Produce 8 original sentences", "Correct two guided errors"],
        teach1: "NOVA cycle: Notice → Guided practice → Free use → Feedback.\nAvoid memorizing 40 isolated rules without output.",
        practice1: "Build an 8-sentence mini-story using this module's target patterns. Underline the targets.",
        brief2: "Reading supplies models; writing forces precision.",
        obj2: ["Annotate forms in a short text", "Transform sentences (tense/polarity/questions)", "Keep a common error log"],
        teach2: "Transformation drills build flexibility: affirmative → question → negative.",
        practice2: "Transform 6 sentences three ways. Add your top 3 personal error patterns to a log.",
        labBrief: "Rewrite a dialogue to be more natural and accurate.",
        obj3: ["Improve register/politeness", "Fix agreement/tense issues", "Perform the dialogue aloud"],
        labTeach: "Compare literal translation vs natural chunking. Prefer natural.",
        labPractice: "Submit before/after dialogue + 60s performance audio.",
        obj4: ["Apply form-meaning-use"],
        quizPrompt: `Best way to study a new grammar pattern?
- A) Only read the rule once
- B) Notice it in context, practice, then use it in your own speech/writing ✓
- C) Memorize 100 exceptions first
- D) Avoid speaking until perfect`,
      }),
      langModule("Listening & Pronunciation Lab", "Audio drills, shadowing, and feedback loops to build confident speech.", 3, Lname, {
        briefTitle: "Ear Training Ops",
        discTitle: "Pronunciation Targets",
        labTitle: " intelligibility Sprint",
        checkTitle: "Listening Lab",
        brief1: "Intelligibility beats accent perfection — be understood first.",
        obj1: ["Set 2 pronunciation targets", "Use minimal pairs or stress practice", "Record and compare"],
        teach1: "Pick targets that change meaning or clarity (vowels, word stress, final sounds).\nRecord → compare to model → adjust one feature at a time.",
        practice1: "Create a minimal-pair or stress list (10 items). Record both versions.",
        brief2: "Listening missions use prediction and keyword catching.",
        obj2: ["Predict content from title/context", "Catch keywords on first listen", "Answer detail questions on second listen"],
        teach2: "First listen = gist. Second = detail. Third = pronunciation shadow.",
        practice2: "Complete a 3-pass listening log for one clip (gist / details / shadow notes).",
        labBrief: "Intelligibility sprint with peer or mentor.",
        obj3: ["Deliver 60–90s talk", "Peer marks unclear words", "Re-record improved take"],
        labTeach: "Peer marks moments of confusion — not accent shaming. Goal: clearer second take.",
        labPractice: "Submit take 1, feedback notes, take 2.",
        obj4: ["Prioritize intelligibility"],
        quizPrompt: `After feedback that one vowel confuses listeners, you should:
- A) Ignore and speak faster
- B) Isolate that target, drill, re-record ✓
- C) Quit speaking
- D) Only write forever`,
      }),
      langModule("Culture & Real-World Use", "Cultural communication, professional basics, and scenario-based role play.", 4, Lname, {
        briefTitle: "Culture Is Protocol",
        discTitle: "Professional Basics",
        labTitle: "Scenario Role Play",
        checkTitle: "Culture Use",
        brief1: "Language without cultural awareness can be fluent and still fail the mission.",
        obj1: ["Adapt greetings to context", "Use polite requests", "Avoid stereotypes"],
        teach1: "Formality levels differ by culture and setting (school, shop, workplace).\nWhen unsure, start more polite, then mirror the other person.",
        practice1: "Write two versions of the same request: casual peer vs formal adult. Note differences.",
        brief2: "Professional basics: email/message structure and clarity.",
        obj2: ["Write a short professional message", "Include clear ask and thanks", "Check tone"],
        teach2: "Structure: Greeting · Context · Ask · Thanks · Sign-off. Keep one ask per message when possible.",
        practice2: "Draft a message requesting information about a program or meetup in the target language.",
        labBrief: "Role-play real scenarios (travel, school, work intro).",
        obj3: ["Complete 2 scenarios", "Use cultural politeness markers", "Reflect on one misunderstanding risk"],
        labTeach: "Scenarios: asking directions, introducing a project, clarifying a misunderstanding.",
        labPractice: "Submit role-play audio/notes + reflection (100 words).",
        obj4: ["Match register to context"],
        quizPrompt: `Unsure how formal to be with a new adult contact?
- A) Use slang immediately
- B) Start more polite and mirror their tone ✓
- C) Avoid greetings
- D) Write in all caps`,
      }),
      langModule("Capstone & Certificate", "Integrated assessment, portfolio speaking demo, and verifiable completion.", 5, Lname, {
        briefTitle: "Portfolio Proof",
        discTitle: "CEFR Can-Do Self Assessment",
        labTitle: "Speaking Portfolio Demo",
        checkTitle: "Capstone",
        brief1: "Your certificate should reflect evidence — speaking, writing, and reflection.",
        obj1: ["Assemble portfolio artifacts", "Map artifacts to can-do statements", "Identify next CEFR goals"],
        teach1: "Can-do examples: introduce yourself; describe a routine; handle a simple transaction; give a short opinion.\nEvidence > vibes.",
        practice1: "Checklist 8 can-do statements with links/timestamps to your evidence.",
        brief2: "Self-assessment is honest calibration.",
        obj2: ["Rate confidence per skill", "Name two strengths", "Name two next drills"],
        teach2: "Skills: Listening · Reading · Speaking · Writing. Rate 1–5 with evidence notes.",
        practice2: "Complete skill radar notes and a 4-week practice plan (3 actions/week).",
        labBrief: "Record final speaking demo and submit portfolio.",
        obj3: ["2–3 minute speaking demo", "Writing sample (120–180 words)", "Reflection"],
        labTeach: "Demo prompts: personal intro + describe a NOVA project + one opinion with reason.",
        labPractice: "Submit demo + writing + can-do checklist + practice plan.",
        obj4: ["Present evidence-based progress"],
        quizPrompt: `Strongest certificate portfolio includes:
- A) Only a score screenshot with no artifacts
- B) Speaking/writing evidence mapped to can-do statements ✓
- C) Random memes
- D) Copied essays without reflection`,
      }),
    ],
  };
}

courses.push(languageCourse("english", "Learn English", "English", "englishLanguageCourse", "language-english.ts"));
courses.push(languageCourse("spanish", "Learn Spanish", "Spanish", "spanishLanguageCourse", "language-spanish.ts"));
courses.push(languageCourse("portuguese", "Learn Portuguese", "Portuguese", "portugueseLanguageCourse", "language-portuguese.ts"));

for (const c of courses) writeCourse(c.file, c.exportName, c.meta, c.modules);
console.log("batch B complete:", courses.length);
