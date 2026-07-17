"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  STAGE_LABELS,
  STAGE_ORDER,
  getBuddy,
  getBuddyDialogue,
  getBuddyDisplayName,
  isValidBuddyId,
  type BuddyId,
  type NovaExperience,
} from "@/lib/experiences/catalog";
import { StageBuddySelect } from "./stage-buddy-select";
import { BuddyCompanion } from "./buddy-companion";
import { BuddyAvatar } from "./buddy-avatar";
import { PathwayIcon } from "@/components/ui/pathway-icon";
import { LabCode } from "./labs/lab-code";
import { LabRobot } from "./labs/lab-robot";
import { LabIot } from "./labs/lab-iot";
import { cn } from "@/lib/utils";

type ProgressPayload = {
  buddyId?: BuddyId;
  buddyNickname?: string;
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
    buddyNickname: string | null;
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
  const defaultBuddy: BuddyId =
    initialProgress?.buddyId && isValidBuddyId(initialProgress.buddyId)
      ? initialProgress.buddyId
      : "navito";

  const [stageIndex, setStageIndex] = useState(initialProgress?.currentStage ?? 0);
  const [buddyId, setBuddyId] = useState<BuddyId>(defaultBuddy);
  const [buddyNickname, setBuddyNickname] = useState(
    initialProgress?.buddyNickname ?? ""
  );
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
      saveProgress({ buddyId, buddyNickname, currentStage: next, labComplete, quizComplete, reflection });
    },
    [buddyId, buddyNickname, labComplete, quizComplete, reflection, saveProgress]
  );

  useEffect(() => {
    if (stage === "achievement") {
      setShowConfetti(true);
      saveProgress({
        buddyId,
        buddyNickname,
        currentStage: stageIndex,
        labComplete: true,
        quizComplete: true,
        reflection,
        completed: true,
      });
    }
  }, [stage, stageIndex, buddyId, buddyNickname, reflection, saveProgress]);

  function handleBuddyConfirm() {
    if (displayName.trim().length < 2) return;
    saveProgress({ buddyId, buddyNickname, currentStage: 2 });
    goTo(2);
  }

  function handleLabComplete() {
    setLabComplete(true);
    saveProgress({ buddyId, buddyNickname, currentStage: stageIndex, labComplete: true });
  }

  const buddyDisplayName = getBuddyDisplayName(buddyId, buddyNickname);

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

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-3 py-5 sm:px-4">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="experience-mark">
              <PathwayIcon pathway={experience.pathway} variant="mark" />
            </div>
            <div>
              <strong className="text-sm tracking-[0.14em]">NOVA</strong>
              <small className="block text-[0.65rem] uppercase tracking-wider text-white/70">
                {experience.labCode}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold">
              ● Mission Live
            </span>
            <Link
              href={`/courses/${experience.courseSlug}`}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10"
            >
              ← Mission Path
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
            "experience-stage overflow-hidden rounded-[28px] border border-white/10 shadow-2xl",
            stage === "lab" ? "bg-transparent p-0" : "bg-[#0a1628]/95 p-6 text-white sm:p-10 lg:p-14",
            animating && "experience-stage-exit"
          )}
        >
          {stage === "launch" && (
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background: `radial-gradient(ellipse at 15% 0%, ${experience.accent}44, transparent 55%), radial-gradient(ellipse at 90% 100%, ${experience.accentSecondary}33, transparent 50%)`,
                }}
              />
              <div className="relative grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--exp-accent-2)]">
                    {experience.launchTagline}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--exp-accent)]/40 bg-[var(--exp-accent)]/10 px-4 py-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--exp-accent)]" />
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent-2)]">
                      Explore Now · {experience.labCode}
                    </span>
                  </div>
                  <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    {experience.headline}
                  </h1>
                  <p className="mt-2 text-xl font-semibold text-[var(--exp-accent-2)]">{experience.title}</p>
                  <p className="mt-5 text-lg leading-relaxed text-white/85">{experience.storyHook}</p>

                  <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/25 px-4 py-3 text-sm font-medium text-amber-200/90">
                    {experience.stakes}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {STAGE_ORDER.slice(0, 4).map((sid, i) => (
                      <div
                        key={sid}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                      >
                        <span className="text-[0.65rem] font-black uppercase text-[var(--exp-accent)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-1 text-xs font-bold text-white/90">{STAGE_LABELS[sid]}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="experience-btn-primary mt-8 w-full sm:w-auto"
                  >
                    Accept Mission →
                  </button>
                </div>

                <aside className="experience-panel relative overflow-hidden rounded-3xl p-8">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl"
                    style={{ background: experience.accent }}
                  />
                  <PathwayIcon pathway={experience.pathway} variant="hero" className="relative mx-auto mb-6" />
                  <h2 className="relative text-center text-xl font-bold">{experience.pathwayTitle}</h2>
                  <p className="relative mt-3 text-center text-sm text-white/80">
                    {experience.questTeaser}
                  </p>
                  <div className="relative mt-6 rounded-2xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs font-black uppercase tracking-wider text-white/60">Badge waiting</p>
                    <p className="mt-1 text-lg font-black text-[var(--exp-accent-2)]">
                      {experience.achievementTitle}
                    </p>
                  </div>
                  <div className="relative mt-4 flex justify-center gap-1">
                    {Array.from({ length: experience.difficulty }, (_, i) => (
                      <span key={i} className="text-[var(--exp-accent-2)]">
                        ⚡
                      </span>
                    ))}
                    <span className="ml-2 text-xs text-white/50">~{experience.durationMinutes} min</span>
                  </div>
                </aside>
              </div>
            </div>
          )}

          {stage === "buddy" && (
            <StageBuddySelect
              buddyId={buddyId}
              buddyNickname={buddyNickname}
              explorerName={displayName}
              onSelectBuddy={(id) => {
                setBuddyId(id);
                if (!buddyNickname) setBuddyNickname(getBuddy(id).name);
              }}
              onNicknameChange={setBuddyNickname}
              onExplorerNameChange={setDisplayName}
              onConfirm={handleBuddyConfirm}
              onBack={() => goTo(0)}
            />
          )}

          {(stage === "briefing" || stage === "debrief") && (
            <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                  {stage === "briefing" ? "Mission Briefing" : "Mission Debrief"}
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  {stage === "briefing" ? experience.title : "You changed the outcome."}
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  {stage === "briefing" ? experience.missionLead : experience.debriefLead}
                </p>
                {stage === "briefing" && (
                  <>
                    <div className="mt-6 space-y-3">
                      {experience.briefingBeats.map((beat, i) => (
                        <div
                          key={beat.label}
                          className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--exp-accent)]/20 text-xs font-black text-[var(--exp-accent-2)]">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-[var(--exp-accent)]">
                              {beat.label}
                            </p>
                            <p className="mt-1 text-sm text-white/85">{beat.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-2xl border border-[var(--exp-accent)]/30 bg-[var(--exp-accent)]/10 p-5">
                      <strong className="block text-[var(--exp-accent-2)]">LAB objective</strong>
                      <p className="mt-2 text-white/90">{experience.missionObjective}</p>
                    </div>
                  </>
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
              <BuddyCompanion
                buddyId={buddyId}
                buddyNickname={buddyNickname}
                message={getBuddyDialogue(buddyId, experience.slug, stage)}
              />
            </div>
          )}

          {stage === "lab" && (
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a1628]/95 shadow-2xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-10">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                  Interactive LAB · Live Mission
                </p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{experience.title}</h2>
              </div>
              <div className="px-4 py-6 sm:px-8 sm:py-8">
                <BuddyCompanion
                  buddyId={buddyId}
                  buddyNickname={buddyNickname}
                  message={getBuddyDialogue(buddyId, experience.slug, "lab")}
                  compact
                />
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
              </div>
              <div className="flex flex-wrap gap-3 border-t border-white/10 bg-[#071225] px-6 py-5 sm:px-10">
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
                Innovation Check
              </p>
              <h2 className="mt-2 text-3xl font-black">{experience.quizQuestion}</h2>
              <BuddyCompanion
                buddyId={buddyId}
                buddyNickname={buddyNickname}
                message={getBuddyDialogue(buddyId, experience.slug, "quiz")}
                compact
              />
              <div className="mt-6 space-y-3">
                {experience.quizOptions.map((opt, i) => (
                  <button
                    key={opt.text}
                    type="button"
                    onClick={() => handleQuizSelect(i)}
                    className={cn(
                      "experience-quiz-option block w-full rounded-xl border-2 px-4 py-4 text-left transition",
                      selectedQuiz === i && opt.correct
                        ? "border-emerald-400 bg-emerald-950/50 text-emerald-200"
                        : selectedQuiz === i
                          ? "border-red-400/60 bg-red-950/40 text-red-200"
                          : "border-white/15 bg-white/5 text-white hover:border-[var(--exp-accent)]"
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
                      ? "border-emerald-400 bg-emerald-950/40 text-emerald-200"
                      : "border-[var(--exp-accent)] bg-white/5 text-white/85"
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
              <BuddyCompanion
                buddyId={buddyId}
                buddyNickname={buddyNickname}
                message={getBuddyDialogue(buddyId, experience.slug, "reflection")}
                compact
              />
              <textarea
                className="mt-4 min-h-[160px] w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--exp-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--exp-accent)]/30"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Your innovation idea belongs here — no wrong answers, only honest thinking…"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={reflection.trim().length < 12}
                  onClick={() => {
                    saveProgress({
                      buddyId,
                      buddyNickname,
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
              <div className="experience-badge mx-auto">
                <PathwayIcon pathway={experience.pathway} variant="badge" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Achievement Unlocked ✦
              </p>
              <h2 className="mt-2 text-4xl font-black sm:text-5xl">{experience.achievementTitle}</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-white/85">
                {experience.achievementMessage}
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
                Explorer <strong className="text-[var(--exp-accent-2)]">{displayName}</strong> ·
                with <strong className="text-[var(--exp-accent-2)]">{buddyDisplayName}</strong>
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm italic text-white/60">
                &ldquo;{getBuddyDialogue(buddyId, experience.slug, "achievement")}&rdquo;
              </p>
              <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                <BuddyAvatar
                  src={buddy.image}
                  alt={buddyDisplayName}
                  size="sm"
                  className={cn("h-16 w-16 rounded-2xl bg-gradient-to-br", buddy.color)}
                />
                <div className="text-left">
                  <p className="font-bold text-white">{buddyDisplayName}</p>
                  <p className="text-xs text-white/60">{buddy.subtitle} · {buddy.trait}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href={`/courses/${experience.courseSlug}`} className="experience-btn-primary">
                  Continue Mission Path →
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
                  Replay Mission
                </button>
              </div>
              {!isLoggedIn && (
                <p className="mt-6 text-sm text-white/60">
                  <Link href="/login" className="font-semibold text-[var(--exp-accent)] hover:underline">
                    Sign in
                  </Link>{" "}
                  to save your badge to the NOVA Portal.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
