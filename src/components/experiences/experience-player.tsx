"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  STAGE_ORDER,
  getBuddy,
  getBuddyDialogue,
  getBuddyDisplayName,
  isValidBuddyId,
  type BuddyId,
  type NovaExperience,
} from "@/lib/experiences/catalog";
import {
  EXPERIENCE_STAGE_LABELS,
  EXPERIENCE_UI,
} from "@/lib/experiences/ui-copy";
import {
  isMissionSfxMuted,
  playLabClearChime,
  playMissionCompleteFanfare,
  setMissionSfxMuted,
} from "@/lib/experiences/mission-sfx";
import type { AppLocale } from "@/lib/locale";
import { StageBuddySelect } from "./stage-buddy-select";
import { BuddyCompanion } from "./buddy-companion";
import { BuddyAvatar } from "./buddy-avatar";
import { PathwayIcon } from "@/components/ui/pathway-icon";
import { LabCode } from "./labs/lab-code";
import { LabRobot } from "./labs/lab-robot";
import { LabIot } from "./labs/lab-iot";
import { LabQuest } from "./labs/lab-quest";
import { LabBuddyProvider } from "./labs/lab-buddy-context";
import { ExperienceExitNav } from "./experience-exit-nav";
import { MissionCinemaPanel } from "./mission-cinema";
import { NOVA_SCHOOL } from "@/lib/nova-brand";
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
  /** From Accept-Language so ES/PT users get native CTAs (avoids Chrome Translate breaking React). */
  locale?: AppLocale;
};

export function ExperiencePlayer({
  experience,
  explorerName,
  initialProgress,
  isLoggedIn,
  locale = "en",
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
  const [showLabVictory, setShowLabVictory] = useState(
    () => Boolean(initialProgress?.labComplete && (initialProgress?.currentStage ?? 0) === 3)
  );
  const [showMissionCongrats, setShowMissionCongrats] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(false);
  const labContinueRef = useRef<HTMLButtonElement | null>(null);
  const celebratedAchievementRef = useRef(false);
  // Keep flags in a ref so delayed goTo / saveProgress never overwrite labComplete=true with a stale false.
  const progressFlagsRef = useRef({
    labComplete: initialProgress?.labComplete ?? false,
    quizComplete: initialProgress?.quizComplete ?? false,
    reflection: initialProgress?.reflection ?? "",
  });

  const ui = EXPERIENCE_UI[locale];
  const stageLabels = EXPERIENCE_STAGE_LABELS[locale];
  const stage = STAGE_ORDER[stageIndex];
  const buddy = getBuddy(buddyId);
  const progressPct = ((stageIndex + 1) / STAGE_ORDER.length) * 100;

  useEffect(() => {
    setSfxMuted(isMissionSfxMuted());
  }, []);

  useEffect(() => {
    progressFlagsRef.current = { labComplete, quizComplete, reflection };
  }, [labComplete, quizComplete, reflection]);

  const saveProgress = useCallback(
    async (payload: ProgressPayload) => {
      if (!isLoggedIn) return;
      try {
        await fetch(`/api/experiences/${experience.slug}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        // Progress sync is best-effort — never block stage navigation.
      }
    },
    [experience.slug, isLoggedIn]
  );

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(STAGE_ORDER.length - 1, index));
      const flags = progressFlagsRef.current;
      // Advance stage immediately so CTA clicks never depend on a delayed timeout
      // (remounts / translate DOM mutations could otherwise leave the user stuck).
      setStageIndex(next);
      setAnimating(true);
      window.setTimeout(() => setAnimating(false), 180);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (next !== 3) setShowLabVictory(false);
      void saveProgress({
        buddyId,
        buddyNickname,
        currentStage: next,
        labComplete: flags.labComplete,
        quizComplete: flags.quizComplete,
        reflection: flags.reflection,
      });
    },
    [buddyId, buddyNickname, saveProgress]
  );

  useEffect(() => {
    if (stage !== "achievement") return;
    setShowConfetti(true);
    setShowMissionCongrats(true);
    progressFlagsRef.current.labComplete = true;
    progressFlagsRef.current.quizComplete = true;
    setLabComplete(true);
    setQuizComplete(true);
    void saveProgress({
      buddyId,
      buddyNickname,
      currentStage: stageIndex,
      labComplete: true,
      quizComplete: true,
      reflection: progressFlagsRef.current.reflection,
      completed: true,
    });
    if (!celebratedAchievementRef.current) {
      celebratedAchievementRef.current = true;
      void playMissionCompleteFanfare();
    }
  }, [stage, stageIndex, buddyId, buddyNickname, saveProgress]);

  function handleBuddyConfirm() {
    if (displayName.trim().length < 2) return;
    saveProgress({ buddyId, buddyNickname, currentStage: 2 });
    goTo(2);
  }

  function handleLabComplete() {
    progressFlagsRef.current.labComplete = true;
    setLabComplete(true);
    setShowLabVictory(true);
    void saveProgress({
      buddyId,
      buddyNickname,
      currentStage: stageIndex,
      labComplete: true,
    });
    void playLabClearChime();
    window.requestAnimationFrame(() => {
      labContinueRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function toggleSfxMute() {
    const next = !sfxMuted;
    setSfxMuted(next);
    setMissionSfxMuted(next);
  }

  const buddyDisplayName = getBuddyDisplayName(buddyId, buddyNickname);

  function handleQuizSelect(index: number) {
    const option = experience.quizOptions[index];
    setSelectedQuiz(index);
    if (option.correct) {
      setQuizFeedback(experience.quizSuccess);
      progressFlagsRef.current.quizComplete = true;
      setQuizComplete(true);
    } else {
      setQuizFeedback("Try again. Choose the answer that explains the system.");
    }
  }

  return (
    <div
      className="experience-shell min-h-screen text-white"
      // Prevent browser auto-translate from rewriting CTA text nodes (breaks React onClick).
      translate="no"
      lang={locale === "es" ? "es" : locale === "pt" ? "pt" : "en"}
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
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleSfxMute}
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 hover:bg-white/15"
              aria-pressed={sfxMuted}
              title={sfxMuted ? ui.unmuteSound : ui.muteSound}
            >
              {sfxMuted ? "🔇" : "🔊"}
            </button>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold">
              {ui.missionLive}
            </span>
            <ExperienceExitNav
              homeHref={experience.homeHref}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </header>

        <div className="mb-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
          <div className="mb-2 flex justify-between text-xs">
            <strong>{stageLabels[stage]}</strong>
            <span className="font-bold text-[var(--exp-accent-2)]">
              {stageIndex + 1} {ui.of} {STAGE_ORDER.length}
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
            "experience-stage overflow-hidden rounded-3xl border border-white/10 shadow-2xl",
            stage === "lab" ? "bg-transparent p-0" : "bg-nova-surface/95 p-6 text-white sm:p-10 lg:p-14",
            animating && "experience-stage-exit"
          )}
        >
          {stage === "launch" && (
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(ellipse at 10% -5%, ${experience.accent}55, transparent 50%), radial-gradient(ellipse at 95% 110%, ${experience.accentSecondary}40, transparent 48%)`,
                }}
              />
              <div className="relative grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--exp-accent-2)]">
                    {experience.launchTagline}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--exp-accent)]/50 bg-[var(--exp-accent)]/15 px-4 py-1.5 shadow-[0_0_24px_color-mix(in_srgb,var(--exp-accent)_25%,transparent)]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--exp-accent)] shadow-[0_0_10px_var(--exp-accent)]" />
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--exp-accent-2)]">
                      Explore Now · {experience.labCode}
                    </span>
                  </div>
                  <h1 className="mission-launch-headline mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    {experience.headline}
                  </h1>
                  <p className="mt-2 text-xl font-semibold text-[var(--exp-accent-2)]">{experience.title}</p>
                  <p className="mt-5 text-lg leading-relaxed text-white/90">{experience.storyHook}</p>

                  <div className="mission-stakes-ticker mt-6">{experience.stakes}</div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span key={skill} className="mission-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {STAGE_ORDER.slice(0, 4).map((sid, i) => (
                      <div
                        key={sid}
                        className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      >
                        <span className="text-[0.65rem] font-black uppercase text-[var(--exp-accent)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-1 text-xs font-bold text-white/90">{stageLabels[sid]}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="experience-btn-primary mission-invite-cta relative z-20 mt-8 w-full sm:w-auto"
                    data-mission-cta="accept"
                  >
                    {ui.acceptMission}
                  </button>
                </div>

                <MissionCinemaPanel
                  pathway={experience.pathway}
                  pathwayTitle={experience.pathwayTitle}
                  badgeTitle={experience.achievementTitle}
                  labCode={experience.labCode}
                  difficulty={experience.difficulty}
                  durationMinutes={experience.durationMinutes}
                  questTeaser={experience.questTeaser}
                />
              </div>
            </div>
          )}

          {stage === "buddy" && (
            <StageBuddySelect
              buddyId={buddyId}
              buddyNickname={buddyNickname}
              explorerName={displayName}
              locale={locale}
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
                        {ui.enterLab}
                      </button>
                      <button type="button" onClick={() => goTo(1)} className="experience-btn-secondary">
                        {ui.back}
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => goTo(7)} className="experience-btn-primary">
                        {ui.claimAchievement}
                      </button>
                      <button type="button" onClick={() => goTo(5)} className="experience-btn-secondary">
                        {ui.back}
                      </button>
                    </>
                  )}
                </div>
                {stage === "debrief" && (
                  <ExperienceExitNav
                    homeHref={experience.homeHref}
                    isLoggedIn={isLoggedIn}
                    variant="footer"
                  />
                )}
              </div>
              <BuddyCompanion
                buddyId={buddyId}
                buddyNickname={buddyNickname}
                message={getBuddyDialogue(buddyId, experience.slug, stage)}
              />
            </div>
          )}

          {stage === "lab" && (
            <div className={cn("lab-stage-chrome", labComplete && showLabVictory && "pb-28 sm:pb-24")}>
              <div className="lab-stage-chrome-aurora" aria-hidden />
              <div className="lab-stage-chrome-header px-6 py-5 sm:px-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--exp-accent-2)]">
                  Interactive LAB · Live Mission
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {experience.title}
                </h2>
              </div>
              <div className="relative z-[1] px-4 py-6 sm:px-8 sm:py-8">
                <BuddyCompanion
                  buddyId={buddyId}
                  buddyNickname={buddyNickname}
                  message={getBuddyDialogue(buddyId, experience.slug, "lab")}
                  compact
                />
                <div className="mt-6">
                  <LabBuddyProvider buddyId={buddyId} buddyNickname={buddyNickname}>
                    {experience.labType === "code" && (
                      <LabCode onComplete={handleLabComplete} />
                    )}
                    {experience.labType === "robot" && (
                      <LabRobot onComplete={handleLabComplete} />
                    )}
                    {experience.labType === "iot" && (
                      <LabIot onComplete={handleLabComplete} />
                    )}
                    {experience.labType === "quest" && (
                      <LabQuest
                        experienceSlug={experience.slug}
                        onComplete={handleLabComplete}
                      />
                    )}
                  </LabBuddyProvider>
                </div>
              </div>
              <div className="lab-stage-chrome-footer flex flex-wrap gap-3 px-6 py-5 sm:px-10">
                {labComplete && (
                  <div
                    className="mission-lab-victory mb-1 w-full rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3"
                    role="status"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                      {ui.labClearedTitle}
                    </p>
                    <p className="mt-1 text-sm text-emerald-50/90">{ui.labClearedBody}</p>
                  </div>
                )}
                <button
                  ref={labContinueRef}
                  type="button"
                  disabled={!labComplete}
                  onClick={() => goTo(4)}
                  className="experience-btn-primary disabled:opacity-40"
                  data-mission-cta="lab-complete"
                >
                  {ui.missionCompleteContinue}
                </button>
                <button type="button" onClick={() => goTo(2)} className="experience-btn-secondary">
                  {ui.back}
                </button>
              </div>
            </div>
          )}

          {stage === "lab" && labComplete && showLabVictory && (
            <div className="mission-lab-sticky-dock" role="dialog" aria-label={ui.labClearedTitle}>
              <div className="mission-lab-sticky-dock-inner">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
                    {ui.labClearedTitle}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{ui.labClearedBody}</p>
                </div>
                <button
                  type="button"
                  onClick={() => goTo(4)}
                  className="experience-btn-primary shrink-0"
                  data-mission-cta="lab-complete-sticky"
                >
                  {ui.missionCompleteContinue}
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
                onChange={(e) => {
                  const next = e.target.value;
                  progressFlagsRef.current.reflection = next;
                  setReflection(next);
                }}
                placeholder="Your innovation idea belongs here — no wrong answers, only honest thinking…"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={reflection.trim().length < 12}
                  onClick={() => {
                    progressFlagsRef.current.labComplete = true;
                    progressFlagsRef.current.quizComplete = true;
                    progressFlagsRef.current.reflection = reflection;
                    setLabComplete(true);
                    setQuizComplete(true);
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
            <div className="relative overflow-hidden py-8 text-center">
              <div className="mission-invite-aurora opacity-40" aria-hidden />
              {showMissionCongrats && (
                <div className="mission-congrats-banner" role="status" aria-live="polite">
                  <p className="mission-congrats-eyebrow">{ui.congratulations}</p>
                  <p className="mission-congrats-greeting">{ui.missionCompleteGreeting}</p>
                </div>
              )}
              <div className="relative experience-badge mx-auto">
                <PathwayIcon pathway={experience.pathway} variant="badge" />
              </div>
              <p className="relative mt-8 text-xs font-black uppercase tracking-[0.18em] text-[var(--exp-accent)]">
                Achievement Unlocked ✦
              </p>
              <h2 className="mission-launch-headline relative mt-2 text-4xl font-black sm:text-5xl">
                {experience.achievementTitle}
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-lg text-white/90">
                {experience.achievementMessage}
              </p>
              <p className="relative mx-auto mt-4 max-w-md text-sm text-white/70">
                Explorer <strong className="text-[var(--exp-accent-2)]">{displayName}</strong> ·
                with <strong className="text-[var(--exp-accent-2)]">{buddyDisplayName}</strong>
              </p>
              <p className="relative mx-auto mt-3 max-w-md text-sm italic text-white/60">
                &ldquo;{getBuddyDialogue(buddyId, experience.slug, "achievement")}&rdquo;
              </p>
              <div className="relative mx-auto mt-6 flex items-center justify-center gap-3">
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
              <div className="relative mt-10 flex flex-wrap justify-center gap-3">
                <Link href={experience.homeHref} className="experience-btn-primary">
                  Continue Mission Path →
                </Link>
                <Link href="/courses" className="experience-btn-secondary">
                  All Mission Paths
                </Link>
                <Link href={isLoggedIn ? "/dashboard" : "/"} className="experience-btn-secondary">
                  {isLoggedIn ? NOVA_SCHOOL.portalName : NOVA_SCHOOL.homeLabel}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    progressFlagsRef.current = {
                      labComplete: false,
                      quizComplete: false,
                      reflection: "",
                    };
                    setStageIndex(0);
                    setLabComplete(false);
                    setQuizComplete(false);
                    setReflection("");
                    setSelectedQuiz(null);
                    setQuizFeedback("");
                    setShowConfetti(false);
                    setShowLabVictory(false);
                    setShowMissionCongrats(false);
                    celebratedAchievementRef.current = false;
                  }}
                  className="experience-btn-secondary"
                >
                  Replay Mission
                </button>
              </div>
              <ExperienceExitNav
                homeHref={experience.homeHref}
                isLoggedIn={isLoggedIn}
                variant="footer"
              />
              {!isLoggedIn && (
                <p className="relative mt-6 text-sm text-white/60">
                  <Link href="/login" className="font-semibold text-[var(--exp-accent)] hover:underline">
                    Sign in
                  </Link>{" "}
                  to save your badge to the {NOVA_SCHOOL.portalName}.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
