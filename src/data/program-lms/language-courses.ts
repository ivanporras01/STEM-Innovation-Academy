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

function languageCourse(opts: {
  slug: "english" | "spanish" | "portuguese";
  title: string;
  description: string;
  target: string;
  samplePhrases: string[];
  cultureNote: string;
}): SeedCourse {
  const L = opts.target;
  const [p1, p2, p3, p4] = opts.samplePhrases;
  return {
    title: opts.title,
    slug: `nova-language-${opts.slug}`,
    description: opts.description,
    pathway: Pathway.CODING_AI,
    level: "Language · CEFR A1→B2",
    published: true,
    capstone: {
      title: `Capstone: ${L} Speaking Portfolio`,
      description: `Record a 3–4 minute speaking demo covering introduction, a daily routine, a short opinion, and a professional mini-dialogue in ${L}. Submit transcript + self-assessment.`,
    },
    modules: [
      mod(1, "Foundations & First Conversation", "Sounds, greetings, and survival phrases.", [
        missionLesson({
          title: `Mission Brief: First Contact in ${L}`,
          order: 1,
          brief: `NOVA Language Control needs Explorers who can open conversations with clarity and respect.`,
          objectives: [
            `Produce 8 greetings/introductions in ${L}`,
            "Record yourself and note 2 pronunciation targets",
          ],
          teach: `Start with high-frequency phrases:\n- ${p1}\n- ${p2}\n\nPractice shadowing: listen → repeat → record → compare. Focus on rhythm before speed.`,
          practice: `Create a phrase card set (digital or paper) and a 60-second intro recording.`,
        }),
        missionLesson({
          title: "Discovery: Sound System & Spelling Map",
          order: 2,
          brief: "If you can predict sounds, reading becomes less scary.",
          objectives: ["Map 10 letter-sound patterns", "Read a short paragraph aloud"],
          teach: `Build a personal sound chart for ${L}. Mark sounds that do not exist in your first language. Practice minimal pairs.`,
          practice: "Sound chart + reading recording (30–45s).",
        }),
        missionLesson({
          title: "LAB: Survival Dialogue",
          order: 3,
          type: LessonType.LAB,
          duration: 40,
          brief: "Order, ask, thank, clarify — the four survival moves.",
          objectives: ["Perform a 10-line dialogue with a partner or mirror", "Use a clarification phrase"],
          teach: `Include: greeting, request, clarification (“Can you repeat?”), and thanks. Example anchors: ${p3} / ${p4}.`,
          practice: "Dialogue script + performance notes.",
        }),
        missionLesson({
          title: "Quiz: Foundations Check",
          order: 4,
          type: LessonType.QUIZ,
          duration: 20,
          brief: "Prove the basics stick.",
          objectives: ["Translate 10 survival phrases both directions", "Write 5 original sentences"],
          teach: `No perfect grammar required yet — clear meaning first.`,
          practice: "Quiz sheet submission.",
        }),
      ]),
      mod(2, "Grammar in Context", "Patterns through real dialogues.", [
        missionLesson({
          title: "Discovery: Present Patterns That Pay Off",
          order: 1,
          brief: "Grammar is a toolkit for meaning, not a punishment.",
          objectives: ["Explain one present-tense pattern", "Write 8 true sentences about your life"],
          teach: `Learn patterns in chunks. Example: subject + verb + complement. Contrast with your first language to avoid transfer errors.`,
          practice: "Pattern notes + 8 sentences.",
        }),
        missionLesson({
          title: "LAB: Past & Future Story Frames",
          order: 2,
          type: LessonType.LAB,
          duration: 40,
          brief: "Tell yesterday and tomorrow.",
          objectives: ["Write a short past anecdote", "Write a short future plan"],
          teach: `Use time markers (yesterday, tomorrow, next week). Keep verbs consistent within each paragraph.`,
          practice: "Two paragraphs (past + future) + audio read-aloud.",
        }),
        missionLesson({
          title: "Discovery: Questions That Unlock Conversation",
          order: 3,
          brief: "Good questions make you a better partner than perfect monologues.",
          objectives: ["Build 12 question stems", "Practice follow-ups"],
          teach: `Who / what / where / when / why / how — plus polite softener forms. Follow up with “Why?” and “Can you give an example?”`,
          practice: "Question bank + 2-minute partner interview notes.",
        }),
        missionLesson({
          title: "LAB: Writing Workshop",
          order: 4,
          type: LessonType.LAB,
          duration: 35,
          brief: "Edit for clarity.",
          objectives: ["Draft 120–150 words", "Peer or self-edit with checklist"],
          teach: `Checklist: complete sentences, agreement, punctuation, vocabulary upgrade (replace 5 vague words).`,
          practice: "Draft + edited version.",
        }),
      ]),
      mod(3, "Listening & Pronunciation Lab", "Ears and mouth training.", [
        missionLesson({
          title: "Discovery: Active Listening Strategies",
          order: 1,
          brief: "You do not need 100% comprehension to respond well.",
          objectives: ["Practice gist listening", "Note key words"],
          teach: `First pass: gist. Second pass: details. Third pass: shadowing. Use authentic slow content appropriate for learners.`,
          practice: "Listening log for 2 clips (gist + 5 details).",
        }),
        missionLesson({
          title: "LAB: Shadowing Sprint",
          order: 2,
          type: LessonType.LAB,
          duration: 40,
          brief: "Match melody, not just words.",
          objectives: ["Shadow 60–90 seconds", "Mark stress and intonation"],
          teach: `${opts.cultureNote}`,
          practice: "Shadow recording + marked transcript.",
        }),
        missionLesson({
          title: "Discovery: Pronunciation Targets",
          order: 3,
          brief: "Pick two sounds that block intelligibility.",
          objectives: ["Choose 2 targets", "Drill 20 minimal-pair reps"],
          teach: `Intelligibility > accent erasure. Focus on sounds that cause misunderstandings.`,
          practice: "Target drill log + before/after clip.",
        }),
        missionLesson({
          title: "LAB: Listening Quiz Mission",
          order: 4,
          type: LessonType.QUIZ,
          duration: 25,
          brief: "Prove comprehension under gentle pressure.",
          objectives: ["Answer comprehension items", "Summarize in 4 sentences"],
          teach: `Summaries should capture who/what/why — not every word.`,
          practice: "Listening quiz + summary.",
        }),
      ]),
      mod(4, "Culture & Real-World Use", "Communicate with cultural intelligence.", [
        missionLesson({
          title: "Discovery: Politeness & Context",
          order: 1,
          brief: "The same sentence can be warm or rude depending on culture and tone.",
          objectives: ["Compare formal vs informal registers", "Write 2 versions of a request"],
          teach: `Learn when first names, titles, and soft language matter. Observe before you improvise.`,
          practice: "Register comparison sheet.",
        }),
        missionLesson({
          title: "LAB: Scenario Role Plays",
          order: 2,
          type: LessonType.LAB,
          duration: 45,
          brief: "Travel, school, and work micro-scenes.",
          objectives: ["Perform 3 scenarios", "Handle a misunderstanding"],
          teach: `Scenarios: introductions, asking for help, scheduling, polite disagreement. Repair phrases are gold.`,
          practice: "Role-play scripts + performance notes.",
        }),
        missionLesson({
          title: "Discovery: Media & Vocabulary Expansion",
          order: 3,
          brief: "Input floods build fluency.",
          objectives: [`Consume 20 minutes of ${L} media`, "Log 15 new chunks"],
          teach: `Prefer chunks (collocations) over isolated words. Review with spaced repetition.`,
          practice: "Vocabulary chunk log.",
        }),
        missionLesson({
          title: "LAB: Professional Basics",
          order: 4,
          type: LessonType.LAB,
          duration: 40,
          brief: "Email and meeting language that sounds capable.",
          objectives: ["Write a short professional email", "Practice a 60s self-intro for work/school"],
          teach: `Clear subject lines, polite openings/closings, and specific asks.`,
          practice: "Email draft + spoken intro.",
        }),
      ]),
      mod(5, "Capstone & Certificate", "Integrated assessment.", [
        missionLesson({
          title: "Discovery: Self-Assessment Against CEFR",
          order: 1,
          brief: "Honest reflection beats inflated claims.",
          objectives: ["Rate A1–B2 can-do statements", "Pick 3 growth targets"],
          teach: `Use can-do language: “I can describe…”, “I can ask…”, “I can understand…”`,
          practice: "CEFR self-assessment sheet.",
        }),
        missionLesson({
          title: "LAB: Integrated Skills Rehearsal",
          order: 2,
          type: LessonType.LAB,
          duration: 45,
          brief: "Read → listen → speak → write on one topic.",
          objectives: ["Complete a full skills cycle on one theme"],
          teach: `Theme ideas: community, STEM learning, travel, careers.`,
          practice: "Integrated rehearsal packet.",
        }),
        missionLesson({
          title: "PROJECT: Speaking Portfolio Demo",
          order: 3,
          type: LessonType.PROJECT,
          duration: 50,
          brief: "Your certificate-facing speaking artifact.",
          objectives: ["Record 3–4 minute demo", "Submit transcript"],
          teach: `Structure: intro, routine, opinion, professional mini-dialogue. Breathe. Smile with your voice.`,
          practice: "Portfolio recording + transcript.",
        }),
        missionLesson({
          title: "Mission Complete: Growth Plan",
          order: 4,
          type: LessonType.PROJECT,
          duration: 25,
          brief: "Fluency is a long mission — plan the next orbit.",
          objectives: ["Write a 30-day practice plan", "Schedule weekly speaking partners"],
          teach: `Little daily practice beats rare marathon cramming.`,
          practice: "30-day plan submission.",
        }),
      ]),
    ],
  };
}

export const englishLanguageLms = languageCourse({
  slug: "english",
  title: "Learn English",
  description:
    "CEFR A1→B2 English with speaking labs, grammar in context, and professional communication practice.",
  target: "English",
  samplePhrases: [
    "Hello, my name is… Nice to meet you.",
    "Could you please repeat that more slowly?",
    "I would like to… / Can you help me with…?",
    "Thank you for your time. Have a great day.",
  ],
  cultureNote:
    "English stress-timed rhythm matters: content words are longer/stronger; function words often reduce. Practice thought groups.",
});

export const spanishLanguageLms = languageCourse({
  slug: "spanish",
  title: "Learn Spanish",
  description:
    "Practical Spanish for travel, work, and everyday life — conversation-first with grammar in context.",
  target: "Spanish",
  samplePhrases: [
    "Hola, me llamo… Mucho gusto.",
    "¿Puede repetir más despacio, por favor?",
    "Quisiera… / ¿Me puede ayudar con…?",
    "Gracias por su tiempo. Que tenga un buen día.",
  ],
  cultureNote:
    "Spanish is syllable-timed: keep vowels clear. Watch for b/v, r/rr, and vowel purity. Formal usted vs tú matters by context.",
});

export const portugueseLanguageLms = languageCourse({
  slug: "portuguese",
  title: "Learn Portuguese",
  description:
    "Brazilian and European foundations — pronunciation, conversation, and professional basics.",
  target: "Portuguese",
  samplePhrases: [
    "Olá, meu nome é… Prazer em conhecer você.",
    "Pode repetir mais devagar, por favor?",
    "Eu gostaria de… / Pode me ajudar com…?",
    "Obrigado(a) pelo seu tempo. Tenha um ótimo dia.",
  ],
  cultureNote:
    "Portuguese nasal vowels and open/closed vowels change meaning. Note Brazilian vs European differences without freezing — pick a primary variety and stay consistent early.",
});

export const languageSeedCourses: SeedCourse[] = [
  englishLanguageLms,
  spanishLanguageLms,
  portugueseLanguageLms,
];
