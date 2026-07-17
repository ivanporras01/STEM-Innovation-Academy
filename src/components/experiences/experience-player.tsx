"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BUDDIES,
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
            "experience-stage rounded-[28px] bg-white/[0.97] p-6 text-nova-deep-blue shadow-2xl sm:p-10 lg:p-14",
            animating && "experience-stage-exit"
          )}
        >
          {stage === "launch" && (
            <div className="relative overflow-hidden rounded-[28px]">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(ellipse at 20% 20%, ${experience.accent}55, transparent 50%), radial-gradient(ellipse at 80% 80%, ${experience.accentSecondary}44, transparent 55%)`,
                }}
              />
              <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--exp-accent)]/40 bg-[var(--exp-accent)]/10 px-4 py-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--exp-accent)]" />
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent-2)]">
                      Explore Now · {experience.labCode}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-nova-deep-blue sm:text-5xl lg:text-6xl">
                    {experience.headline}
                  </h1>
                  <p className="mt-4 text-lg leading-relaxed text-nova-gray">
                    {experience.missionLead}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-nova-light-gray bg-white px-3 py-1 text-xs font-bold text-nova-deep-blue shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["01", "Choose Buddy"],
                      ["02", "Briefing"],
                      ["03", "Interactive LAB"],
                      ["04", "Earn Badge"],
                    ].map(([num, label]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-nova-light-gray bg-gradient-to-br from-white to-nova-off-white p-3 text-center shadow-sm"
                      >
                        <span className="text-[0.65rem] font-black uppercase text-[var(--exp-accent)]">
                          {num}
                        </span>
                        <p className="mt-1 text-xs font-bold text-nova-deep-blue">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-nova-light-gray bg-gradient-to-br from-nova-off-white to-blue-50/60 p-5">
                    <p className="text-sm font-bold text-nova-deep-blue">
                      Your NOVA Buddy stays with you the whole way
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {BUDDIES.slice(0, 8).map((b) => (
                        <BuddyAvatar
                          key={b.id}
                          src={b.image}
                          alt={b.name}
                          size="sm"
                          className={cn("ring-2 ring-white shadow-md", b.color)}
                        />
                      ))}
                      <span className="text-xs font-bold text-nova-gray">+12 more</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="experience-btn-primary mt-8 w-full sm:w-auto"
                  >
                    Begin Your Quest →
                  </button>
                </div>

                <aside className="experience-panel relative overflow-hidden rounded-3xl p-8 text-white">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl"
                    style={{ background: experience.accent }}
                  />
                  <div className="experience-hero relative mb-6">
                    <PathwayIcon pathway={experience.pathway} variant="hero" />
                  </div>
                  <h2 className="relative text-2xl font-bold">{experience.pathwayTitle}</h2>
                  <p className="relative mt-3 text-white/85">
                    You are not watching a lesson. You are entering a live quest — build,
                    test, reflect, and unlock your achievement.
                  </p>
                  <div className="relative mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs font-black uppercase tracking-wider text-white/70">
                      Achievement waiting
                    </p>
                    <p className="mt-1 text-lg font-black text-[var(--exp-accent-2)]">
                      {experience.achievementTitle}
                    </p>
                  </div>
                  <div className="relative mt-6 grid grid-cols-3 gap-2 text-center text-xs">
                    {[
                      ["Experience", "Interactive"],
                      ["Level", "Explorer"],
                      ["Outcome", "Build & Discover"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-lg bg-white/10 px-2 py-2">
                        <span className="block text-[0.6rem] uppercase text-white/60">{k}</span>
                        <strong>{v}</strong>
                      </div>
                    ))}
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
              <BuddyCompanion
                buddyId={buddyId}
                buddyNickname={buddyNickname}
                message={getBuddyDialogue(buddyId, experience.slug, stage)}
              />
            </div>
          )}

          {stage === "lab" && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent)]">
                Interactive LAB
              </p>
              <h2 className="mt-2 text-3xl font-black">{experience.title}</h2>
              <p className="mt-2 text-nova-gray">{experience.missionObjective}</p>
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
              <BuddyCompanion
                buddyId={buddyId}
                buddyNickname={buddyNickname}
                message={getBuddyDialogue(buddyId, experience.slug, "reflection")}
                compact
              />
              <textarea
                className="nova-input mt-4 min-h-[160px] resize-y"
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
                Achievement Unlocked
              </p>
              <h2 className="mt-2 text-4xl font-black sm:text-5xl">{experience.achievementTitle}</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-nova-gray">
                Congratulations, <strong className="text-nova-deep-blue">{displayName}</strong>.
                You completed this mission with{" "}
                <strong className="text-nova-deep-blue">{buddyDisplayName}</strong>.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm italic text-nova-gray">
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
                  <p className="font-bold text-nova-deep-blue">{buddyDisplayName}</p>
                  <p className="text-xs text-nova-gray">{buddy.subtitle} · {buddy.trait}</p>
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
                  Launch Mission Again
                </button>
                <Link href={`/courses/${experience.courseSlug}`} className="experience-btn-secondary">
                  Back to Mission Path
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
