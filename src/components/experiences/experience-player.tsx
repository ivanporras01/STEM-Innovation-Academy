"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BUDDIES,
  STAGE_LABELS,
  STAGE_ORDER,
  getBuddy,
  getBuddyDialogue,
  type BuddyId,
  type NovaExperience,
} from "@/lib/experiences/catalog";
import { LabCode } from "./labs/lab-code";
import { LabRobot } from "./labs/lab-robot";
import { LabIot } from "./labs/lab-iot";
import { cn } from "@/lib/utils";

type ProgressPayload = {
  buddyId?: BuddyId;
  currentStage: number;
  labComplete?: boolean;
  quizComplete?: boolean;
  reflection?: string;
  completed?: boolean;
};

type Props = {
  experience: NovaExperience;
  explorerName: string;
  initialProgress?: {
    buddyId: BuddyId | null;
    currentStage: number;
    labComplete: boolean;
    quizComplete: boolean;
    reflection: string | null;
    completedAt: Date | null;
  } | null;
  isLoggedIn: boolean;
};

export function ExperiencePlayer({
  experience,
  explorerName,
  initialProgress,
  isLoggedIn,
}: Props) {
  const [stageIndex, setStageIndex] = useState(initialProgress?.currentStage ?? 0);
  const [buddyId, setBuddyId] = useState<BuddyId>(initialProgress?.buddyId ?? "nova");
  const [displayName, setDisplayName] = useState(explorerName);
  const [labComplete, setLabComplete] = useState(initialProgress?.labComplete ?? false);
  const [quizComplete, setQuizComplete] = useState(initialProgress?.quizComplete ?? false);
  const [reflection, setReflection] = useState(initialProgress?.reflection ?? "");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const stage = STAGE_ORDER[stageIndex];
  const buddy = getBuddy(buddyId);
  const progressPct = ((stageIndex + 1) / STAGE_ORDER.length) * 100;

  const saveProgress = useCallback(
    async (payload: ProgressPayload) => {
      if (!isLoggedIn) return;
      await fetch(`/api/experiences/${experience.slug}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    [experience.slug, isLoggedIn]
  );

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(STAGE_ORDER.length - 1, index));
      setAnimating(true);
      setTimeout(() => {
        setStageIndex(next);
        setAnimating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 180);
      saveProgress({ buddyId, currentStage: next, labComplete, quizComplete, reflection });
    },
    [buddyId, labComplete, quizComplete, reflection, saveProgress]
  );

  useEffect(() => {
    if (stage === "achievement") {
      setShowConfetti(true);
      saveProgress({
        buddyId,
        currentStage: stageIndex,
        labComplete: true,
        quizComplete: true,
        reflection,
        completed: true,
      });
    }
  }, [stage, stageIndex, buddyId, reflection, saveProgress]);

  function handleBuddyConfirm() {
    if (displayName.trim().length < 2) return;
    saveProgress({ buddyId, currentStage: 2 });
    goTo(2);
  }

  function handleLabComplete() {
    setLabComplete(true);
    saveProgress({ buddyId, currentStage: stageIndex, labComplete: true });
  }

  function handleQuizSelect(index: number) {
    const option = experience.quizOptions[index];
    setSelectedQuiz(index);
    if (option.correct) {
      setQuizFeedback(experience.quizSuccess);
      setQuizComplete(true);
    } else {
      setQuizFeedback("Try again. Choose the answer that explains the system.");
    }
  }

  return (
    <div
      className="experience-shell min-h-screen text-white"
      style={
        {
          "--exp-accent": experience.accent,
          "--exp-accent-2": experience.accentSecondary,
        } as React.CSSProperties
      }
    >
      {showConfetti && <div className="experience-confetti" aria-hidden />}

      <div className="experience-stars" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-3 py-5 sm:px-4">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="experience-mark">{experience.emoji}</div>
            <div>
              <strong className="text-sm tracking-[0.14em]">NOVA</strong>
              <small className="block text-[0.65rem] uppercase tracking-wider text-white/70">
                {experience.labCode}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold">
              ● Experience Online
            </span>
            <Link
              href="/experiences"
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10"
            >
              Exit
            </Link>
          </div>
        </header>

        <div className="mb-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
          <div className="mb-2 flex justify-between text-xs">
            <strong>{STAGE_LABELS[stage]}</strong>
            <span className="font-bold text-[var(--exp-accent-2)]">
              {stageIndex + 1} of {STAGE_ORDER.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="experience-progress-fill h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <main
          className={cn(
            "experience-stage rounded-[28px] bg-white/[0.97] p-6 text-nova-deep-blue shadow-2xl sm:p-10 lg:p-14",
            animating && "experience-stage-exit"
          )}
        >
          {stage === "launch" && (
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                  {experience.labCode}
                </p>
                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  {experience.headline}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-nova-gray">
                  {experience.missionLead}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["Experience", "Interactive"],
                    ["Level", "Explorer"],
                    ["Outcome", "Build & Discover"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl border border-nova-light-gray bg-nova-off-white p-3"
                    >
                      <span className="block text-[0.65rem] font-black uppercase text-nova-gray">
                        {k}
                      </span>
                      <strong className="text-sm">{v}</strong>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm italic text-nova-gray">
                  You are not watching a lesson. You are entering a mission.
                </p>
                <button type="button" onClick={() => goTo(1)} className="experience-btn-primary mt-8">
                  Begin Experience →
                </button>
              </div>
              <aside className="experience-panel rounded-3xl p-8 text-white">
                <div className="experience-hero mb-6">{experience.emoji}</div>
                <h2 className="text-2xl font-bold">{experience.pathwayTitle}</h2>
                <p className="mt-3 text-white/80">
                  Project-based STEM. Choose your Buddy. Complete the mission. Earn your badge.
                </p>
              </aside>
            </div>
          )}

          {stage === "buddy" && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Choose Your Guide
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Select your NOVA Buddy</h2>
              <p className="mt-2 text-nova-gray">
                Your Buddy guides you through every stage of the mission.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {BUDDIES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBuddyId(b.id)}
                    className={cn(
                      "experience-buddy-card rounded-2xl border-2 p-3 text-center transition-all",
                      buddyId === b.id
                        ? "border-[var(--exp-accent)] bg-nova-off-white shadow-lg -translate-y-1"
                        : "border-nova-light-gray bg-white hover:border-[var(--exp-accent)]/50"
                    )}
                  >
                    <div className={cn("experience-buddy-avatar mx-auto mb-2 bg-gradient-to-br", b.color)}>
                      {b.emoji}
                    </div>
                    <strong className="block text-sm">{b.name}</strong>
                    <small className="text-[0.65rem] text-nova-gray">{b.role}</small>
                  </button>
                ))}
              </div>
              <div className="mt-8 max-w-md">
                <label className="nova-label">Explorer name</label>
                <input
                  className="nova-input mt-1"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={displayName.trim().length < 2}
                  onClick={handleBuddyConfirm}
                  className="experience-btn-primary disabled:opacity-40"
                >
                  Continue with {buddy.name} →
                </button>
                <button type="button" onClick={() => goTo(0)} className="experience-btn-secondary">
                  Back
                </button>
              </div>
            </div>
          )}

          {(stage === "briefing" || stage === "debrief") && (
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                  {stage === "briefing" ? "Mission 01" : "Mission Debrief"}
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  {stage === "briefing" ? "Mission Briefing" : "You built more than an answer."}
                </h2>
                <p className="mt-4 text-lg text-nova-gray">
                  {stage === "briefing" ? experience.missionLead : experience.debriefLead}
                </p>
                {stage === "briefing" && (
                  <div className="mt-6 rounded-2xl border border-nova-light-gray bg-gradient-to-br from-nova-off-white to-blue-50/50 p-6">
                    <strong className="block text-nova-deep-blue">Your objective</strong>
                    <p className="mt-2 text-nova-gray">{experience.missionObjective}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {experience.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-nova-light-gray bg-white px-3 py-1 text-xs font-bold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  {stage === "briefing" ? (
                    <>
                      <button type="button" onClick={() => goTo(3)} className="experience-btn-primary">
                        Enter the LAB →
                      </button>
                      <button type="button" onClick={() => goTo(1)} className="experience-btn-secondary">
                        Back
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => goTo(7)} className="experience-btn-primary">
                        Claim Achievement ✦
                      </button>
                      <button type="button" onClick={() => goTo(5)} className="experience-btn-secondary">
                        Back
                      </button>
                    </>
                  )}
                </div>
              </div>
              <aside className="experience-panel rounded-3xl p-8 text-white">
                <div className={cn("experience-buddy-avatar mb-4 bg-gradient-to-br", buddy.color)}>
                  {buddy.emoji}
                </div>
                <h2 className="text-2xl font-bold">{buddy.name}</h2>
                <p className="mt-1 text-sm text-white/70">{buddy.role}</p>
                <p className="mt-4 leading-relaxed text-white/90">
                  {getBuddyDialogue(buddyId, experience.slug, stage)}
                </p>
              </aside>
            </div>
          )}

          {stage === "lab" && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Interactive LAB
              </p>
              <h2 className="mt-2 text-3xl font-black">{experience.title}</h2>
              <p className="mt-2 text-nova-gray">{experience.missionObjective}</p>
              <div className="mt-4 rounded-xl border-l-4 border-[var(--exp-accent)] bg-blue-50/80 px-4 py-3 text-sm">
                <strong>{buddy.emoji} {buddy.name}:</strong>{" "}
                {getBuddyDialogue(buddyId, experience.slug, "lab")}
              </div>
              <div className="mt-6">
                {experience.labType === "code" && (
                  <LabCode onComplete={handleLabComplete} />
                )}
                {experience.labType === "robot" && (
                  <LabRobot onComplete={handleLabComplete} />
                )}
                {experience.labType === "iot" && (
                  <LabIot onComplete={handleLabComplete} />
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!labComplete}
                  onClick={() => goTo(4)}
                  className="experience-btn-primary disabled:opacity-40"
                >
                  Mission Complete — Continue →
                </button>
                <button type="button" onClick={() => goTo(2)} className="experience-btn-secondary">
                  Back
                </button>
              </div>
            </div>
          )}

          {stage === "quiz" && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Think Like an Innovator
              </p>
              <h2 className="mt-2 text-3xl font-black">{experience.quizQuestion}</h2>
              <div className="mt-8 space-y-3">
                {experience.quizOptions.map((opt, i) => (
                  <button
                    key={opt.text}
                    type="button"
                    onClick={() => handleQuizSelect(i)}
                    className={cn(
                      "block w-full rounded-xl border-2 px-4 py-4 text-left transition",
                      selectedQuiz === i && opt.correct
                        ? "border-nova-green bg-green-50"
                        : selectedQuiz === i
                          ? "border-red-300 bg-red-50"
                          : "border-nova-light-gray bg-white hover:border-[var(--exp-accent)]"
                    )}
                  >
                    {String.fromCharCode(65 + i)}. {opt.text}
                  </button>
                ))}
              </div>
              {quizFeedback && (
                <p
                  className={cn(
                    "mt-4 rounded-xl border-l-4 px-4 py-3 text-sm",
                    quizComplete
                      ? "border-nova-green bg-green-50 text-green-800"
                      : "border-[var(--exp-accent)] bg-blue-50"
                  )}
                >
                  {quizFeedback}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!quizComplete}
                  onClick={() => goTo(5)}
                  className="experience-btn-primary disabled:opacity-40"
                >
                  Continue →
                </button>
                <button type="button" onClick={() => goTo(3)} className="experience-btn-secondary">
                  Back
                </button>
              </div>
            </div>
          )}

          {stage === "reflection" && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Explorer Reflection
              </p>
              <h2 className="mt-2 text-3xl font-black">{experience.reflectionPrompt}</h2>
              <textarea
                className="nova-input mt-6 min-h-[160px] resize-y"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your idea here..."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={reflection.trim().length < 12}
                  onClick={() => {
                    saveProgress({
                      buddyId,
                      currentStage: 6,
                      labComplete: true,
                      quizComplete: true,
                      reflection,
                    });
                    goTo(6);
                  }}
                  className="experience-btn-primary disabled:opacity-40"
                >
                  Save Reflection →
                </button>
                <button type="button" onClick={() => goTo(4)} className="experience-btn-secondary">
                  Back
                </button>
              </div>
            </div>
          )}

          {stage === "achievement" && (
            <div className="py-6 text-center">
              <div className="experience-badge mx-auto">{experience.achievementEmoji}</div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Achievement Unlocked
              </p>
              <h2 className="mt-2 text-4xl font-black sm:text-5xl">{experience.achievementTitle}</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-nova-gray">
                Congratulations, <strong className="text-nova-deep-blue">{displayName}</strong>.
                You completed this mission with{" "}
                <strong className="text-nova-deep-blue">{buddy.name}</strong>.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href={`/courses/${experience.courseSlug}`} className="experience-btn-primary">
                  Explore Full Course →
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setStageIndex(0);
                    setLabComplete(false);
                    setQuizComplete(false);
                    setReflection("");
                    setSelectedQuiz(null);
                    setQuizFeedback("");
                    setShowConfetti(false);
                  }}
                  className="experience-btn-secondary"
                >
                  Explore Again
                </button>
                <Link href="/experiences" className="experience-btn-secondary">
                  All Experiences
                </Link>
              </div>
              {!isLoggedIn && (
                <p className="mt-6 text-sm text-nova-gray">
                  <Link href="/login" className="font-semibold text-[var(--exp-accent)] hover:underline">
                    Sign in
                  </Link>{" "}
                  to save your achievement to your dashboard.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
