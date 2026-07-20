export type FinalExamQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** Correct option index (server-side only). */
  correctIndex: number;
};

export type PublicFinalExamQuestion = Omit<FinalExamQuestion, "correctIndex">;

/** General NOVA final assessment — applies to any approved course path. */
export const FINAL_EXAM_QUESTIONS: FinalExamQuestion[] = [
  {
    id: "q1",
    prompt: "What is the primary goal of completing a NOVA STEM HUB career track?",
    options: [
      "Memorize facts without application",
      "Build job-ready skills with hands-on projects",
      "Skip assessments and receive automatic credit",
      "Focus only on theory with no practice",
    ],
    correctIndex: 1,
  },
  {
    id: "q2",
    prompt: "Which score is required to pass the final assessment and earn your certificate?",
    options: ["50% or higher", "60% or higher", "80% or higher", "100% only"],
    correctIndex: 2,
  },
  {
    id: "q3",
    prompt: "How many attempts do you have for the final assessment?",
    options: ["1 attempt only", "2 attempts", "3 attempts", "Unlimited attempts"],
    correctIndex: 2,
  },
  {
    id: "q4",
    prompt: "Where can employers verify your NOVA certificate?",
    options: [
      "Only by email request to support",
      "On the public verify page with your certificate code",
      "Certificates cannot be verified",
      "Through a private social media post",
    ],
    correctIndex: 1,
  },
  {
    id: "q5",
    prompt: "What best describes ethical conduct during NOVA assessments?",
    options: [
      "Share answers with classmates during the exam",
      "Use unauthorized materials or impersonate others",
      "Complete work honestly and represent your own learning",
      "Retake the exam under a different account",
    ],
    correctIndex: 2,
  },
  {
    id: "q6",
    prompt: "Why does NOVA emphasize project-based learning in STEM tracks?",
    options: [
      "Projects replace all reading and theory",
      "Employers value demonstrated skills and portfolios",
      "Projects are optional and never graded",
      "Projects are only for advanced students",
    ],
    correctIndex: 1,
  },
  {
    id: "q7",
    prompt: "If you score below 80% on attempt 1, what happens next?",
    options: [
      "You are permanently blocked from certification",
      "You may retry up to 3 total attempts",
      "You automatically receive the certificate anyway",
      "You must pay again before any retry",
    ],
    correctIndex: 1,
  },
  {
    id: "q8",
    prompt: "What should you do before starting the final assessment?",
    options: [
      "Complete the course modules and review key outcomes",
      "Skip all lessons and guess on every question",
      "Wait 12 months after enrollment",
      "Submit a paper application by mail",
    ],
    correctIndex: 0,
  },
  {
    id: "q9",
    prompt: "A verifiable NOVA certificate includes which element?",
    options: [
      "A unique certificate code registered in NOVA STEM HUB",
      "A handwritten note from your mentor only",
      "A screenshot of your dashboard",
      "Your personal password",
    ],
    correctIndex: 0,
  },
  {
    id: "q10",
    prompt: "Which statement reflects NOVA's innovation mindset?",
    options: [
      "Avoid experimentation to prevent failure",
      "Learn, build, iterate, and apply STEM to real problems",
      "Focus on grades without practical outcomes",
      "Complete courses without engaging mentors or peers",
    ],
    correctIndex: 1,
  },
];

export function getPublicFinalExam(): PublicFinalExamQuestion[] {
  return FINAL_EXAM_QUESTIONS.map(({ id, prompt, options }) => ({ id, prompt, options }));
}

export function gradeFinalExam(answers: Record<string, number>): {
  scorePercent: number;
  correctCount: number;
  total: number;
} {
  const total = FINAL_EXAM_QUESTIONS.length;
  let correctCount = 0;

  for (const question of FINAL_EXAM_QUESTIONS) {
    const selected = answers[question.id];
    if (typeof selected === "number" && selected === question.correctIndex) {
      correctCount += 1;
    }
  }

  const scorePercent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  return { scorePercent, correctCount, total };
}
