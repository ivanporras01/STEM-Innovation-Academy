"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";
import { LabLevelForge } from "./lab-level-forge";
import { LabArena, LabChoiceCard } from "./lab-arena";

type Props = { experienceSlug: string; onComplete: (msg: string) => void };

/** Interactive Explore Now labs for creative NOVA School electives. */
export function LabQuest({ experienceSlug, onComplete }: Props) {
  switch (experienceSlug) {
    case "pixel-portal-escape":
      return <LabLevelForge onComplete={onComplete} />;
    case "viral-signal-brief":
      return <LabViralBrief onComplete={onComplete} />;
    case "founder-orbit-pitch":
      return <LabPitchPad onComplete={onComplete} />;
    case "story-beacon-reel":
      return <LabStoryReel onComplete={onComplete} />;
    case "phish-shadow-ops":
      return <LabPhishGuard onComplete={onComplete} />;
    case "community-spark-lab":
      return <LabImpactStudio onComplete={onComplete} />;
    default:
      return (
        <LabMissionShell
          labCode="NOVA LAB"
          title="Mission Lab"
          objective="Complete the interactive challenge to unlock the next stage."
          status="Mission Control is preparing this lab…"
          success={false}
        >
          <p className="text-sm text-white/70">Lab unavailable for this mission slug.</p>
        </LabMissionShell>
      );
  }
}

function LabViralBrief({ onComplete }: { onComplete: (msg: string) => void }) {
  const audiences = [
    { id: "explorers", label: "NOVA Explorers (8–16)", score: 28, icon: "🧑‍🚀", sub: "Precision audience" },
    { id: "parents", label: "Parents & guardians", score: 18, icon: "👨‍👩‍👧", sub: "Good, but secondary" },
    { id: "random", label: "Everyone on Earth", score: 6, icon: "🌍", sub: "Too broad — weak signal" },
  ];
  const hooks = [
    { id: "mission", label: "“Your first STEM mission starts in 60 seconds”", score: 32, icon: "✨", sub: "Curiosity invite" },
    { id: "discount", label: "“Buy now before prices explode!!!!”", score: 8, icon: "💸", sub: "Fake urgency" },
    { id: "fear", label: "“If you don’t share this, you’ll fail forever”", score: 4, icon: "😱", sub: "Dark pattern" },
  ];
  const channels = [
    { id: "reels", label: "Short video / Reels", score: 30, icon: "🎬", sub: "High reach + ethical" },
    { id: "poster", label: "Static poster only", score: 12, icon: "🖼️", sub: "Low momentum" },
    { id: "spam", label: "Mass DM spam", score: 2, icon: "📵", sub: "Burns trust" },
  ];

  const [audience, setAudience] = useState(audiences[0]!.id);
  const [hook, setHook] = useState(hooks[0]!.id);
  const [channel, setChannel] = useState(channels[0]!.id);
  const [launched, setLaunched] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [failFlash, setFailFlash] = useState(false);

  const score = useMemo(() => {
    const a = audiences.find((x) => x.id === audience)?.score ?? 0;
    const h = hooks.find((x) => x.id === hook)?.score ?? 0;
    const c = channels.find((x) => x.id === channel)?.score ?? 0;
    return a + h + c;
  }, [audience, hook, channel]);

  useEffect(() => {
    if (!launched || success) return;
    const t = setInterval(() => setPulse((p) => (p + 7) % 100), 120);
    return () => clearInterval(t);
  }, [launched, success]);

  function launch() {
    setAttempts((n) => n + 1);
    setLaunched(true);
    if (score >= 80) {
      setSuccess(true);
      setFailFlash(false);
      onComplete("Campaign live. Ethical signal is climbing across NOVA Network.");
    } else {
      setFailFlash(true);
      setTimeout(() => setFailFlash(false), 600);
    }
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 005"
      title="Viral Signal · Campaign Brief"
      objective="Mission Control needs a launch campaign for NOVA School. Pick the right audience, hook, and channel — without dark-pattern spam. Reach 80+ Signal Strength."
      steps={[
        "Choose who the message is for (precision beats “everyone”).",
        "Pick a hook that invites curiosity — not fear or fake urgency.",
        "Select an ethical channel, then ▶ Launch Campaign.",
      ]}
      hint="Good marketing respects people. Spam tanks Signal Strength."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ CAMPAIGN LIVE — Signal Strength maxed. Mentors are sharing it."
          : launched
            ? `Signal Strength ${score}/100 — refine your brief and relaunch.`
            : `Live preview: Signal Strength ${score}/100`
      }
    >
      <LabArena
        theme="viral"
        mode={success ? "LIVE" : launched ? "RECALIBRATING" : "BRIEFING"}
        success={success}
        failFlash={failFlash}
        meters={[
          { label: "Signal strength", value: success ? 100 : score, tone: "amber" },
          { label: "Trust score", value: success ? 96 : Math.max(12, score - 10), tone: "emerald" },
          { label: "Network buzz", value: success ? 88 : launched ? 20 + pulse * 0.3 : 8, tone: "violet" },
        ]}
      >
        <div className="mb-4 overflow-hidden rounded-2xl border border-orange-400/25 bg-black/35 p-3">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-orange-200/80">
            <span>📡 NOVA Network feed</span>
            <span>{success ? "TRENDING" : "IDLE"}</span>
          </div>
          <div className="mt-2 flex h-10 items-end gap-1">
            {Array.from({ length: 24 }, (_, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-orange-500 to-amber-300 transition-all duration-300"
                style={{
                  height: `${success ? 40 + (i % 5) * 12 : Math.max(8, ((score + pulse) / 140) * (20 + (i % 7) * 8))}%`,
                  opacity: success ? 0.95 : 0.35 + score / 200,
                }}
              />
            ))}
          </div>
        </div>

        {(
          [
            ["Audience", audiences, audience, setAudience],
            ["Hook", hooks, hook, setHook],
            ["Channel", channels, channel, setChannel],
          ] as const
        ).map(([label, options, value, setter]) => (
          <fieldset key={label} className="mb-4">
            <legend className="mb-2 text-xs font-black uppercase tracking-wider text-orange-200/90">
              {label}
            </legend>
            <div className="grid gap-2">
              {options.map((opt) => (
                <LabChoiceCard
                  key={opt.id}
                  active={value === opt.id}
                  icon={opt.icon}
                  title={opt.label}
                  subtitle={opt.sub}
                  disabled={success}
                  onClick={() => {
                    setter(opt.id);
                    setLaunched(false);
                    setSuccess(false);
                  }}
                />
              ))}
            </div>
          </fieldset>
        ))}

        <button
          type="button"
          onClick={launch}
          disabled={success}
          className="experience-btn-primary mission-invite-cta mt-2 w-full disabled:opacity-50 sm:w-auto"
        >
          {success ? "✓ Campaign Live" : "▶ Launch Campaign"}
        </button>
      </LabArena>
    </LabMissionShell>
  );
}

function LabPitchPad({ onComplete }: { onComplete: (msg: string) => void }) {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [customer, setCustomer] = useState("");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [judges, setJudges] = useState([0, 0, 0]);
  const [failFlash, setFailFlash] = useState(false);
  const [scoring, setScoring] = useState(false);

  async function pitch() {
    if (scoring || success) return;
    setAttempts((a) => a + 1);
    setScoring(true);
    setFailFlash(false);

    const p = problem.trim().length;
    const s = solution.trim().length;
    const c = customer.trim().length;
    const next =
      Math.min(34, Math.floor(p / 2)) +
      Math.min(34, Math.floor(s / 2)) +
      Math.min(32, Math.floor(c / 2)) +
      (/(student|school|community|family|teen)/i.test(customer) ? 8 : 0) +
      (/(app|robot|sensor|platform|kit|game)/i.test(solution) ? 8 : 0);
    const capped = Math.min(100, next);

    // Animated judge reveal
    setJudges([0, 0, 0]);
    await new Promise((r) => setTimeout(r, 280));
    setJudges([Math.min(100, capped + 4), 0, 0]);
    await new Promise((r) => setTimeout(r, 280));
    setJudges([Math.min(100, capped + 4), Math.min(100, capped - 2), 0]);
    await new Promise((r) => setTimeout(r, 280));
    setJudges([Math.min(100, capped + 4), Math.min(100, capped - 2), Math.min(100, capped + 1)]);
    setScore(capped);
    setScoring(false);

    if (capped >= 72 && p >= 12 && s >= 12 && c >= 8) {
      setSuccess(true);
      onComplete("Demo Day unlocked. Mentors want your pitch next.");
    } else {
      setFailFlash(true);
      setTimeout(() => setFailFlash(false), 600);
    }
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 006"
      title="Founder Orbit · Pitch Pad"
      objective="You're pitching at NOVA Demo Day in 10 minutes. Write a sharp problem, solution, and customer — then score your pitch until Mentors say GO."
      steps={[
        "Describe a real problem young people face (be specific).",
        "Propose a STEM-powered solution in plain language.",
        "Name who benefits. Hit ▶ Score Pitch — need 72+ with solid answers.",
      ]}
      hint="Specific beats vague. “Students lose lunch money” > “life is hard”."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ DEMO DAY READY — Pitch score locked. Founders circle awaits."
          : score
            ? `Pitch score ${score}/100 — tighten specificity and relaunch.`
            : "Pitch Pad online. Mentors are listening…"
      }
    >
      <LabArena
        theme="pitch"
        mode={success ? "FUNDED PATH" : scoring ? "JUDGING" : "PITCHING"}
        success={success}
        failFlash={failFlash}
        meters={[
          { label: "Pitch power", value: score, tone: "rose" },
          { label: "Clarity", value: Math.min(100, problem.trim().length * 3), tone: "cyan" },
          { label: "STEM fit", value: Math.min(100, solution.trim().length * 3), tone: "violet" },
        ]}
      >
        <div className="mb-4 grid grid-cols-3 gap-2">
          {["Mentor Vega", "Founder Lex", "Buddy Nova"].map((name, i) => (
            <div
              key={name}
              className="rounded-2xl border border-rose-400/25 bg-black/35 p-3 text-center"
            >
              <p className="text-[10px] font-black uppercase tracking-wider text-rose-200/70">{name}</p>
              <p className="mt-1 text-2xl font-black text-white">{judges[i] || "—"}</p>
              <div className="mx-auto mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-300 transition-all duration-500"
                  style={{ width: `${judges[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {(
            [
              ["Problem", problem, setProblem, "e.g. After-school Explorers lose track of homework deadlines", "🔥"],
              ["Solution", solution, setSolution, "e.g. A buddy app that turns deadlines into micro-missions", "💡"],
              ["Customer", customer, setCustomer, "e.g. Middle-school students + busy families", "🎯"],
            ] as const
          ).map(([label, value, setter, placeholder, icon]) => (
            <label key={label} className="block">
              <span className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-200/90">
                <span>{icon}</span> {label}
              </span>
              <textarea
                value={value}
                onChange={(e) => {
                  setter(e.target.value);
                  setSuccess(false);
                  setScore(0);
                }}
                rows={2}
                disabled={success}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-rose-400/50 focus:outline-none"
              />
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={pitch}
          disabled={success || scoring}
          className="experience-btn-primary mission-invite-cta mt-4 w-full disabled:opacity-50 sm:w-auto"
        >
          {scoring ? "▶ Mentors scoring…" : success ? "✓ Demo Day Ready" : "▶ Score Pitch"}
        </button>
      </LabArena>
    </LabMissionShell>
  );
}

const STORY_BEATS = [
  { id: "hook", label: "Hook — stars flicker, signal dies", icon: "🌌", color: "from-indigo-500/40 to-cyan-500/20" },
  { id: "problem", label: "Problem — Explorers stranded offline", icon: "📡", color: "from-rose-500/40 to-orange-500/20" },
  { id: "hero", label: "Hero — YOU open the forge console", icon: "🧑‍🚀", color: "from-cyan-500/40 to-emerald-500/20" },
  { id: "twist", label: "Twist — glitch virus fights back", icon: "👾", color: "from-fuchsia-500/40 to-violet-500/20" },
  { id: "win", label: "Win — uplink restored, celebration", icon: "🏆", color: "from-amber-500/40 to-emerald-500/20" },
];

function LabStoryReel({ onComplete }: { onComplete: (msg: string) => void }) {
  const correct = STORY_BEATS.map((b) => b.id);
  const [order, setOrder] = useState(() => [...correct].reverse());
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Reorder the storyboard until the trailer hits.");
  const [previewing, setPreviewing] = useState(false);
  const [spotlight, setSpotlight] = useState(0);
  const [failFlash, setFailFlash] = useState(false);

  function move(index: number, dir: -1 | 1) {
    if (success || previewing) return;
    const next = [...order];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j]!, next[index]!];
    setOrder(next);
    setSuccess(false);
  }

  async function preview() {
    if (previewing || success) return;
    setAttempts((a) => a + 1);
    setPreviewing(true);
    setFailFlash(false);

    for (let i = 0; i < order.length; i++) {
      setSpotlight(i);
      await new Promise((r) => setTimeout(r, 380));
    }

    const ok = order.every((id, i) => id === correct[i]);
    setPreviewing(false);
    if (ok) {
      setSuccess(true);
      setStatus("✓ TRAILER LOCKED — Story Beacon reel is festival-ready.");
      onComplete("Story reel sequenced. Premiere unlocked.");
    } else {
      setFailFlash(true);
      setStatus("Sequence off. Great trailers: Hook → Problem → Hero → Twist → Win.");
      setTimeout(() => setFailFlash(false), 600);
    }
  }

  const arcScore = Math.round(
    (order.filter((id, i) => id === correct[i]).length / correct.length) * 100,
  );

  return (
    <LabMissionShell
      labCode="NOVA LAB 007"
      title="Story Beacon · Trailer Reel"
      objective="NOVA News needs a 15-second trailer. Reorder the five storyboard beats into a cinematic arc that makes Explorers lean in."
      steps={[
        "Use ▲ / ▼ to rearrange the five beats.",
        "Aim for classic story tension: hook, problem, hero, twist, win.",
        "Hit ▶ Preview Trailer when the arc feels right.",
      ]}
      hint="If the win comes first, nobody cares about the hero."
      attempts={attempts}
      success={success}
      status={status}
    >
      <LabArena
        theme="story"
        mode={success ? "PREMIERE" : previewing ? "PLAYING" : "EDITING"}
        success={success}
        failFlash={failFlash}
        meters={[
          { label: "Story arc", value: success ? 100 : arcScore, tone: "rose" },
          { label: "Tension", value: success ? 92 : 35 + arcScore * 0.4, tone: "violet" },
          { label: "Payoff", value: success ? 98 : order[4] === "win" ? 70 : 18, tone: "amber" },
        ]}
      >
        <div className="mb-4 overflow-hidden rounded-2xl border border-rose-400/30 bg-black/50 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-200/80">
            🎬 Live preview window
          </p>
          <div className="mt-3 flex min-h-[88px] items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-rose-950/50 to-indigo-950/40">
            {(() => {
              const beat = STORY_BEATS.find((b) => b.id === order[spotlight])!;
              return (
                <div className="text-center">
                  <div className="text-4xl">{beat.icon}</div>
                  <p className="mt-2 text-sm font-bold text-white">{beat.label}</p>
                </div>
              );
            })()}
          </div>
        </div>

        <ol className="space-y-2">
          {order.map((id, index) => {
            const beat = STORY_BEATS.find((b) => b.id === id)!;
            return (
              <li
                key={id}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border px-3 py-2.5 transition",
                  `bg-gradient-to-r ${beat.color}`,
                  previewing && spotlight === index
                    ? "border-rose-300/70 shadow-[0_0_24px_rgba(251,113,133,0.35)]"
                    : "border-white/10",
                )}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-xs font-black text-rose-100">
                  {index + 1}
                </span>
                <span className="text-xl">{beat.icon}</span>
                <span className="flex-1 text-sm font-semibold text-white">{beat.label}</span>
                <button
                  type="button"
                  aria-label="Move up"
                  disabled={success || previewing}
                  onClick={() => move(index, -1)}
                  className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-xs text-white/80 hover:bg-white/10 disabled:opacity-40"
                >
                  ▲
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  disabled={success || previewing}
                  onClick={() => move(index, 1)}
                  className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-xs text-white/80 hover:bg-white/10 disabled:opacity-40"
                >
                  ▼
                </button>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={preview}
          disabled={success || previewing}
          className="experience-btn-primary mission-invite-cta mt-4 w-full disabled:opacity-50 sm:w-auto"
        >
          {previewing ? "▶ Playing trailer…" : success ? "✓ Trailer Locked" : "▶ Preview Trailer"}
        </button>
      </LabArena>
    </LabMissionShell>
  );
}

const PHISH_ITEMS = [
  {
    id: "1",
    text: "From: mentor@nova-stem-hub.education — “Your mission badge is ready. Open the portal to claim it.”",
    phish: false,
    icon: "✅",
  },
  {
    id: "2",
    text: "From: secur1ty-alert@nova-stem-hub.ru — “URGENT: click here or your account deletes in 1 hour!!!”",
    phish: true,
    icon: "🚨",
  },
  {
    id: "3",
    text: "From: billing@paypa1-security.com — “Confirm your password now to keep Explorer access.”",
    phish: true,
    icon: "🎣",
  },
  {
    id: "4",
    text: "From: news@novastemhub.education — “Weekly NOVA News: three new Explore missions launched.”",
    phish: false,
    icon: "📰",
  },
];

function LabPhishGuard({ onComplete }: { onComplete: (msg: string) => void }) {
  const [marks, setMarks] = useState<Record<string, boolean | null>>({});
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Classify each message, then forge a strong vault password.");
  const [failFlash, setFailFlash] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  const strength = useMemo(() => {
    let s = 0;
    if (password.length >= 10) s += 30;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s += 20;
    if (/\d/.test(password)) s += 20;
    if (/[^A-Za-z0-9]/.test(password)) s += 20;
    if (!/password|nova123|123456/i.test(password)) s += 10;
    return Math.min(100, s);
  }, [password]);

  const classifiedCount = PHISH_ITEMS.filter((item) => marks[item.id] === item.phish).length;
  const defense = Math.round((classifiedCount / PHISH_ITEMS.length) * 55 + strength * 0.45);

  useEffect(() => {
    if (success) return;
    const t = setInterval(() => setScanLine((v) => (v + 1) % 100), 80);
    return () => clearInterval(t);
  }, [success]);

  function verify() {
    setAttempts((a) => a + 1);
    const classified = PHISH_ITEMS.every((item) => marks[item.id] === item.phish);
    if (!classified) {
      setStatus("Inbox still compromised. Flag every phishing lure (urgency, fake domains, password asks).");
      setSuccess(false);
      setFailFlash(true);
      setTimeout(() => setFailFlash(false), 600);
      return;
    }
    if (strength < 80) {
      setStatus("Inbox clear — but vault password needs 80+ strength (length + mix + symbol).");
      setSuccess(false);
      setFailFlash(true);
      setTimeout(() => setFailFlash(false), 600);
      return;
    }
    setSuccess(true);
    setStatus("✓ SHADOW OPS CLEAR — Inbox defended. Vault sealed.");
    onComplete("Phish Shadow Ops complete. You think like a defender.");
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 008"
      title="Phish Shadow Ops"
      objective="A social-engineering swarm hit Explorer inboxes. Classify each message as SAFE or PHISH, then seal a vault password strong enough for Mission Control."
      steps={[
        "Tap SAFE or PHISH for every message.",
        "Watch for urgency, weird domains, and password requests.",
        "Build a strong password (10+ chars, upper/lower, number, symbol).",
        "Hit ▶ Seal the Vault.",
      ]}
      hint="Real NOVA emails never beg for your password."
      attempts={attempts}
      success={success}
      status={status}
    >
      <LabArena
        theme="cyber"
        mode={success ? "SECURE" : "THREAT HUNT"}
        success={success}
        failFlash={failFlash}
        meters={[
          { label: "Defense rating", value: success ? 100 : defense, tone: "emerald" },
          { label: "Inbox clarity", value: (classifiedCount / PHISH_ITEMS.length) * 100, tone: "cyan" },
          { label: "Vault strength", value: strength, tone: "rose" },
        ]}
      >
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-teal-400/30 bg-black/45 p-3">
          <div
            className="pointer-events-none absolute left-0 right-0 h-0.5 bg-teal-300/70 shadow-[0_0_12px_#5eead4]"
            style={{ top: `${scanLine}%` }}
            aria-hidden
          />
          <p className="text-[10px] font-black uppercase tracking-wider text-teal-200/80">
            🛡 Threat radar · scanning inbox swarm
          </p>
          <p className="mt-1 text-xs text-white/60">
            {success ? "All lures neutralized." : `${4 - classifiedCount} threats still unmarked`}
          </p>
        </div>

        <ul className="space-y-3">
          {PHISH_ITEMS.map((item) => (
            <li
              key={item.id}
              className={cn(
                "rounded-2xl border p-3 transition",
                marks[item.id] == null
                  ? "border-white/10 bg-white/5"
                  : marks[item.id] === item.phish
                    ? "border-emerald-400/40 bg-emerald-500/10"
                    : "border-rose-400/40 bg-rose-500/10",
              )}
            >
              <div className="flex gap-2">
                <span className="text-xl">{item.icon}</span>
                <p className="flex-1 text-sm text-white/90">{item.text}</p>
              </div>
              <div className="mt-2 flex gap-2">
                {([false, true] as const).map((phish) => (
                  <button
                    key={String(phish)}
                    type="button"
                    disabled={success}
                    onClick={() => {
                      setMarks((m) => ({ ...m, [item.id]: phish }));
                      setSuccess(false);
                    }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition",
                      marks[item.id] === phish
                        ? phish
                          ? "bg-rose-500/35 text-rose-100 shadow-[0_0_14px_rgba(244,63,94,0.35)]"
                          : "bg-emerald-500/35 text-emerald-100 shadow-[0_0_14px_rgba(52,211,153,0.35)]"
                        : "bg-white/10 text-white/60 hover:bg-white/15",
                    )}
                  >
                    {phish ? "Phish" : "Safe"}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wider text-teal-200/90">
            🔐 Vault password
          </span>
          <input
            type="text"
            value={password}
            disabled={success}
            onChange={(e) => {
              setPassword(e.target.value);
              setSuccess(false);
            }}
            placeholder="Forge something unique…"
            className="w-full rounded-2xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-teal-400/50 focus:outline-none"
          />
        </label>

        <button
          type="button"
          onClick={verify}
          disabled={success}
          className="experience-btn-primary mission-invite-cta mt-4 w-full disabled:opacity-50 sm:w-auto"
        >
          {success ? "✓ Vault Sealed" : "▶ Seal the Vault"}
        </button>
      </LabArena>
    </LabMissionShell>
  );
}

function LabImpactStudio({ onComplete }: { onComplete: (msg: string) => void }) {
  const needs = [
    { id: "water", label: "Neighborhood flooding alerts", icon: "🌊", sub: "Safety + community" },
    { id: "food", label: "Food waste at school lunch", icon: "🥗", sub: "Sustainability" },
    { id: "lonely", label: "Isolated elders nearby", icon: "💛", sub: "Human connection" },
  ];
  const tools = [
    { id: "scratch", label: "Scratch story + interactive quiz", icon: "🎨", sub: "Creative coding" },
    { id: "sensor", label: "Simple sensor + alert idea", icon: "📟", sub: "IoT thinking" },
    { id: "campaign", label: "Youth media campaign", icon: "📣", sub: "Story + reach" },
  ];
  const [need, setNeed] = useState(needs[0]!.id);
  const [tool, setTool] = useState(tools[0]!.id);
  const [promise, setPromise] = useState("");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [failFlash, setFailFlash] = useState(false);
  const [assembling, setAssembling] = useState(false);

  const spark = Math.min(100, Math.round(promise.trim().length * 3.2 + (need && tool ? 20 : 0)));

  async function assemble() {
    if (assembling || success) return;
    setAttempts((a) => a + 1);
    if (promise.trim().length < 20) {
      setFailFlash(true);
      setTimeout(() => setFailFlash(false), 600);
      return;
    }
    setAssembling(true);
    await new Promise((r) => setTimeout(r, 700));
    setAssembling(false);
    setSuccess(true);
    onComplete("Community Spark prototype locked. Impact circle wants your demo.");
  }

  const needMeta = needs.find((n) => n.id === need)!;
  const toolMeta = tools.find((t) => t.id === tool)!;

  return (
    <LabMissionShell
      labCode="NOVA LAB 009"
      title="Community Spark · Impact Studio"
      objective="Design a tiny STEAM intervention that helps real people. Pair a community need with a creative tech tool, then write your impact promise."
      steps={[
        "Pick a community need that matters to you.",
        "Choose a creative tech approach (story, sensor idea, or campaign).",
        "Write a one-sentence impact promise (20+ characters).",
        "Hit ▶ Assemble Prototype.",
      ]}
      hint="Purpose + creativity > fancy tech for its own sake."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ SPARK IGNITED — Prototype card ready for mentor showcase."
          : promise.trim().length
            ? "Draft looks promising — assemble when your promise is clear."
            : "Impact Studio standing by…"
      }
    >
      <LabArena
        theme="impact"
        mode={success ? "SHOWCASE" : assembling ? "BUILDING" : "DESIGN"}
        success={success}
        failFlash={failFlash}
        meters={[
          { label: "Impact spark", value: success ? 100 : spark, tone: "emerald" },
          { label: "Empathy", value: need ? 78 : 20, tone: "amber" },
          { label: "Build ready", value: success ? 100 : Math.min(90, promise.trim().length * 4), tone: "cyan" },
        ]}
      >
        <div
          className={cn(
            "mb-4 rounded-2xl border p-4 transition",
            success
              ? "border-lime-400/50 bg-lime-500/10 shadow-[0_0_30px_rgba(163,230,53,0.25)]"
              : "border-lime-400/25 bg-black/35",
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-lime-200/80">
            ⚡ Prototype card preview
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-3xl">
            <span>{needMeta.icon}</span>
            <span className="text-lg text-white/40">+</span>
            <span>{toolMeta.icon}</span>
            <span className="text-lg text-white/40">→</span>
            <span>{success ? "🌟" : "🧩"}</span>
          </div>
          <p className="mt-3 text-center text-sm text-white/80">
            {promise.trim() || "Your impact promise will appear here…"}
          </p>
        </div>

        <fieldset className="mb-4">
          <legend className="mb-2 text-xs font-black uppercase tracking-wider text-lime-200/90">
            Community need
          </legend>
          <div className="grid gap-2">
            {needs.map((n) => (
              <LabChoiceCard
                key={n.id}
                active={need === n.id}
                icon={n.icon}
                title={n.label}
                subtitle={n.sub}
                disabled={success}
                onClick={() => {
                  setNeed(n.id);
                  setSuccess(false);
                }}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="mb-2 text-xs font-black uppercase tracking-wider text-lime-200/90">
            Creative tech tool
          </legend>
          <div className="grid gap-2">
            {tools.map((t) => (
              <LabChoiceCard
                key={t.id}
                active={tool === t.id}
                icon={t.icon}
                title={t.label}
                subtitle={t.sub}
                disabled={success}
                onClick={() => {
                  setTool(t.id);
                  setSuccess(false);
                }}
              />
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wider text-lime-200/90">
            Impact promise
          </span>
          <textarea
            value={promise}
            disabled={success}
            onChange={(e) => {
              setPromise(e.target.value);
              setSuccess(false);
            }}
            rows={2}
            placeholder="In 30 days, our prototype will help…"
            className="w-full rounded-2xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-lime-400/50 focus:outline-none"
          />
        </label>

        <button
          type="button"
          onClick={assemble}
          disabled={success || assembling}
          className="experience-btn-primary mission-invite-cta mt-4 w-full disabled:opacity-50 sm:w-auto"
        >
          {assembling ? "▶ Assembling…" : success ? "✓ Spark Ignited" : "▶ Assemble Prototype"}
        </button>
      </LabArena>
    </LabMissionShell>
  );
}
