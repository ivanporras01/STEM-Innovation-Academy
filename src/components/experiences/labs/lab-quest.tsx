"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";

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

function LabLevelForge({ onComplete }: { onComplete: (msg: string) => void }) {
  const SIZE = 5;
  const [path, setPath] = useState<Set<string>>(() => new Set(["0,4", "1,4"]));
  const [hazard, setHazard] = useState("2,2");
  const [playtested, setPlaytested] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Paint a safe path from START → EXIT. Avoid the glitch tile.");

  const start = "0,4";
  const exit = "4,0";

  function toggle(cell: string) {
    if (cell === start || cell === exit || cell === hazard) return;
    setPath((prev) => {
      const next = new Set(prev);
      if (next.has(cell)) next.delete(cell);
      else next.add(cell);
      return next;
    });
    setPlaytested(false);
  }

  function neighbors(cell: string) {
    const [x, y] = cell.split(",").map(Number);
    return [
      `${x + 1},${y}`,
      `${x - 1},${y}`,
      `${x},${y + 1}`,
      `${x},${y - 1}`,
    ].filter((c) => {
      const [cx, cy] = c.split(",").map(Number);
      return cx >= 0 && cy >= 0 && cx < SIZE && cy < SIZE;
    });
  }

  function playtest() {
    setAttempts((a) => a + 1);
    const walkable = new Set(path);
    walkable.add(start);
    walkable.add(exit);
    walkable.delete(hazard);

    const seen = new Set<string>();
    const queue = [start];
    seen.add(start);
    while (queue.length) {
      const cur = queue.shift()!;
      if (cur === exit) {
        setPlaytested(true);
        setSuccess(true);
        setStatus("✓ PLAYTEST PASSED — Pixel Portal unlocked. Level ships!");
        onComplete("Level Forge complete. Your portal escape is playable.");
        return;
      }
      for (const n of neighbors(cur)) {
        if (!seen.has(n) && walkable.has(n)) {
          seen.add(n);
          queue.push(n);
        }
      }
    }
    setPlaytested(true);
    setSuccess(false);
    setStatus("Path blocked. Connect START to EXIT with floor tiles — never step on the glitch.");
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 004"
      title="Pixel Portal · Level Forge"
      objective="Design an escape route through a corrupted game world. Paint floor tiles, dodge the glitch hazard, and playtest until the portal opens."
      steps={[
        "Tap empty tiles to paint a connected path from START (bottom-left) to EXIT (top-right).",
        "Never paint over the purple glitch tile — it deletes Explorers.",
        "Hit ▶ Playtest Level. If the path reaches EXIT, you ship the mission.",
      ]}
      hint="Paths must be adjacent (no diagonal jumps). Think like a game designer."
      attempts={attempts}
      success={success}
      status={status}
    >
      <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/60">
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-emerald-300">START</span>
        <span className="rounded-full bg-cyan-500/20 px-2.5 py-1 text-cyan-300">FLOOR</span>
        <span className="rounded-full bg-fuchsia-500/20 px-2.5 py-1 text-fuchsia-300">GLITCH</span>
        <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-amber-300">EXIT</span>
      </div>
      <div
        className="mx-auto grid w-full max-w-sm gap-1.5 rounded-2xl border border-fuchsia-400/20 bg-gradient-to-b from-fuchsia-950/30 via-black/40 to-cyan-950/30 p-3 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: SIZE * SIZE }, (_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          const cell = `${x},${y}`;
          const isStart = cell === start;
          const isExit = cell === exit;
          const isHazard = cell === hazard;
          const isPath = path.has(cell) || isStart || isExit;
          return (
            <button
              key={cell}
              type="button"
              onClick={() => {
                if (isHazard) {
                  // move hazard to a free interior cell
                  const candidates = Array.from({ length: SIZE * SIZE }, (_, j) => {
                    const cx = j % SIZE;
                    const cy = Math.floor(j / SIZE);
                    return `${cx},${cy}`;
                  }).filter((c) => c !== start && c !== exit && c !== cell && !path.has(c));
                  if (candidates.length) setHazard(candidates[attempts % candidates.length]!);
                  setPlaytested(false);
                  return;
                }
                toggle(cell);
              }}
              className={cn(
                "aspect-square rounded-lg border text-[10px] font-black transition",
                isStart && "border-emerald-400/70 bg-emerald-500/35 text-emerald-100 shadow-[0_0_14px_rgba(52,211,153,0.45)]",
                isExit && "border-amber-400/70 bg-amber-500/35 text-amber-100 shadow-[0_0_14px_rgba(251,191,36,0.45)]",
                isHazard && "border-fuchsia-400/80 bg-fuchsia-600/45 text-fuchsia-100 animate-pulse shadow-[0_0_16px_rgba(217,70,239,0.5)]",
                !isStart && !isExit && !isHazard && isPath && "border-cyan-400/60 bg-cyan-500/30 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.35)]",
                !isStart && !isExit && !isHazard && !isPath && "border-white/10 bg-white/5 text-white/30 hover:bg-white/10 hover:border-white/25",
              )}
            >
              {isStart ? "S" : isExit ? "E" : isHazard ? "⚠" : isPath ? "·" : ""}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-white/50">
        Tip: tap the glitch tile to relocate it. Playtested: {playtested ? "yes" : "not yet"}
      </p>
      <button type="button" onClick={playtest} className="experience-btn-primary mt-4 w-full sm:w-auto">
        ▶ Playtest Level
      </button>
    </LabMissionShell>
  );
}

function LabViralBrief({ onComplete }: { onComplete: (msg: string) => void }) {
  const audiences = [
    { id: "explorers", label: "NOVA Explorers (8–16)", score: 28 },
    { id: "parents", label: "Parents & guardians", score: 18 },
    { id: "random", label: "Everyone on Earth", score: 6 },
  ];
  const hooks = [
    { id: "mission", label: "“Your first STEM mission starts in 60 seconds”", score: 32 },
    { id: "discount", label: "“Buy now before prices explode!!!!”", score: 8 },
    { id: "fear", label: "“If you don’t share this, you’ll fail forever”", score: 4 },
  ];
  const channels = [
    { id: "reels", label: "Short video / Reels", score: 30 },
    { id: "poster", label: "Static poster only", score: 12 },
    { id: "spam", label: "Mass DM spam", score: 2 },
  ];

  const [audience, setAudience] = useState(audiences[0]!.id);
  const [hook, setHook] = useState(hooks[0]!.id);
  const [channel, setChannel] = useState(channels[0]!.id);
  const [launched, setLaunched] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const score = useMemo(() => {
    const a = audiences.find((x) => x.id === audience)?.score ?? 0;
    const h = hooks.find((x) => x.id === hook)?.score ?? 0;
    const c = channels.find((x) => x.id === channel)?.score ?? 0;
    return a + h + c;
  }, [audience, hook, channel]);

  function launch() {
    setAttempts((n) => n + 1);
    setLaunched(true);
    if (score >= 80) {
      setSuccess(true);
      onComplete("Campaign live. Ethical signal is climbing across NOVA Network.");
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
      <div className="space-y-4">
        {(
          [
            ["Audience", audiences, audience, setAudience],
            ["Hook", hooks, hook, setHook],
            ["Channel", channels, channel, setChannel],
          ] as const
        ).map(([label, options, value, setter]) => (
          <fieldset key={label}>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-nova-cyan">{label}</legend>
            <div className="grid gap-2">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setter(opt.id);
                    setLaunched(false);
                    setSuccess(false);
                  }}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-left text-sm transition",
                    value === opt.id
                      ? "border-nova-cyan/50 bg-nova-cyan/15 text-white"
                      : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-nova-cyan to-emerald-400 transition-all duration-500"
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
      <button type="button" onClick={launch} className="experience-btn-primary mt-4 w-full sm:w-auto">
        ▶ Launch Campaign
      </button>
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

  function pitch() {
    setAttempts((a) => a + 1);
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
    setScore(capped);
    if (capped >= 72 && p >= 12 && s >= 12 && c >= 8) {
      setSuccess(true);
      onComplete("Demo Day unlocked. Mentors want your pitch next.");
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
      <div className="space-y-3">
        {(
          [
            ["Problem", problem, setProblem, "e.g. After-school Explorers lose track of homework deadlines"],
            ["Solution", solution, setSolution, "e.g. A buddy app that turns deadlines into micro-missions"],
            ["Customer", customer, setCustomer, "e.g. Middle-school students + busy families"],
          ] as const
        ).map(([label, value, setter, placeholder]) => (
          <label key={label} className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-nova-cyan">
              {label}
            </span>
            <textarea
              value={value}
              onChange={(e) => {
                setter(e.target.value);
                setSuccess(false);
              }}
              rows={2}
              placeholder={placeholder}
              className="w-full rounded-xl border border-white/15 bg-[#071225] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-nova-cyan/50 focus:outline-none"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-nova-cyan transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <button type="button" onClick={pitch} className="experience-btn-primary mt-4 w-full sm:w-auto">
        ▶ Score Pitch
      </button>
    </LabMissionShell>
  );
}

const STORY_BEATS = [
  { id: "hook", label: "Hook — stars flicker, signal dies" },
  { id: "problem", label: "Problem — Explorers stranded offline" },
  { id: "hero", label: "Hero — YOU open the forge console" },
  { id: "twist", label: "Twist — glitch virus fights back" },
  { id: "win", label: "Win — uplink restored, celebration" },
];

function LabStoryReel({ onComplete }: { onComplete: (msg: string) => void }) {
  const correct = STORY_BEATS.map((b) => b.id);
  const [order, setOrder] = useState(() => [...correct].reverse());
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Drag the story order with ▲ / ▼ until the trailer hits.");

  function move(index: number, dir: -1 | 1) {
    const next = [...order];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j]!, next[index]!];
    setOrder(next);
    setSuccess(false);
  }

  function preview() {
    setAttempts((a) => a + 1);
    const ok = order.every((id, i) => id === correct[i]);
    if (ok) {
      setSuccess(true);
      setStatus("✓ TRAILER LOCKED — Story Beacon reel is festival-ready.");
      onComplete("Story reel sequenced. Premiere unlocked.");
    } else {
      setStatus("Sequence off. Great trailers: Hook → Problem → Hero → Twist → Win.");
    }
  }

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
      <ol className="space-y-2">
        {order.map((id, index) => {
          const beat = STORY_BEATS.find((b) => b.id === id)!;
          return (
            <li
              key={id}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <span className="w-6 text-xs font-black text-nova-cyan">{index + 1}</span>
              <span className="flex-1 text-sm text-white">{beat.label}</span>
              <button
                type="button"
                aria-label="Move up"
                onClick={() => move(index, -1)}
                className="rounded-lg border border-white/15 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                ▲
              </button>
              <button
                type="button"
                aria-label="Move down"
                onClick={() => move(index, 1)}
                className="rounded-lg border border-white/15 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                ▼
              </button>
            </li>
          );
        })}
      </ol>
      <button type="button" onClick={preview} className="experience-btn-primary mt-4 w-full sm:w-auto">
        ▶ Preview Trailer
      </button>
    </LabMissionShell>
  );
}

const PHISH_ITEMS = [
  {
    id: "1",
    text: "From: mentor@nova-stem-hub.education — “Your mission badge is ready. Open the portal to claim it.”",
    phish: false,
  },
  {
    id: "2",
    text: "From: secur1ty-alert@nova-stem-hub.ru — “URGENT: click here or your account deletes in 1 hour!!!”",
    phish: true,
  },
  {
    id: "3",
    text: "From: billing@paypa1-security.com — “Confirm your password now to keep Explorer access.”",
    phish: true,
  },
  {
    id: "4",
    text: "From: news@novastemhub.education — “Weekly NOVA News: three new Explore missions launched.”",
    phish: false,
  },
];

function LabPhishGuard({ onComplete }: { onComplete: (msg: string) => void }) {
  const [marks, setMarks] = useState<Record<string, boolean | null>>({});
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Classify each message, then forge a strong vault password.");

  const strength = useMemo(() => {
    let s = 0;
    if (password.length >= 10) s += 30;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s += 20;
    if (/\d/.test(password)) s += 20;
    if (/[^A-Za-z0-9]/.test(password)) s += 20;
    if (!/password|nova123|123456/i.test(password)) s += 10;
    return Math.min(100, s);
  }, [password]);

  function verify() {
    setAttempts((a) => a + 1);
    const classified = PHISH_ITEMS.every((item) => marks[item.id] === item.phish);
    if (!classified) {
      setStatus("Inbox still compromised. Flag every phishing lure (urgency, fake domains, password asks).");
      setSuccess(false);
      return;
    }
    if (strength < 80) {
      setStatus("Inbox clear — but vault password needs 80+ strength (length + mix + symbol).");
      setSuccess(false);
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
      <ul className="space-y-3">
        {PHISH_ITEMS.map((item) => (
          <li key={item.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-white/85">{item.text}</p>
            <div className="mt-2 flex gap-2">
              {([false, true] as const).map((phish) => (
                <button
                  key={String(phish)}
                  type="button"
                  onClick={() => {
                    setMarks((m) => ({ ...m, [item.id]: phish }));
                    setSuccess(false);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
                    marks[item.id] === phish
                      ? phish
                        ? "bg-rose-500/30 text-rose-200"
                        : "bg-emerald-500/30 text-emerald-200"
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
        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-nova-cyan">
          Vault password
        </span>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setSuccess(false);
          }}
          placeholder="Forge something unique…"
          className="w-full rounded-xl border border-white/15 bg-[#071225] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-nova-cyan/50 focus:outline-none"
        />
      </label>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 transition-all"
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-white/50">Strength {strength}/100</p>
      <button type="button" onClick={verify} className="experience-btn-primary mt-4 w-full sm:w-auto">
        ▶ Seal the Vault
      </button>
    </LabMissionShell>
  );
}

function LabImpactStudio({ onComplete }: { onComplete: (msg: string) => void }) {
  const needs = [
    { id: "water", label: "Neighborhood flooding alerts" },
    { id: "food", label: "Food waste at school lunch" },
    { id: "lonely", label: "Isolated elders nearby" },
  ];
  const tools = [
    { id: "scratch", label: "Scratch story + interactive quiz" },
    { id: "sensor", label: "Simple sensor + alert idea" },
    { id: "campaign", label: "Youth media campaign" },
  ];
  const [need, setNeed] = useState(needs[0]!.id);
  const [tool, setTool] = useState(tools[0]!.id);
  const [promise, setPromise] = useState("");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function assemble() {
    setAttempts((a) => a + 1);
    if (promise.trim().length < 20) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
    onComplete("Community Spark prototype locked. Impact circle wants your demo.");
  }

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
      <div className="space-y-4">
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-nova-cyan">
            Community need
          </legend>
          <div className="grid gap-2">
            {needs.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => {
                  setNeed(n.id);
                  setSuccess(false);
                }}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-sm",
                  need === n.id
                    ? "border-nova-cyan/50 bg-nova-cyan/15 text-white"
                    : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10",
                )}
              >
                {n.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-nova-cyan">
            Creative tech tool
          </legend>
          <div className="grid gap-2">
            {tools.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTool(t.id);
                  setSuccess(false);
                }}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-sm",
                  tool === t.id
                    ? "border-nova-orange/50 bg-nova-orange/15 text-white"
                    : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-nova-cyan">
            Impact promise
          </span>
          <textarea
            value={promise}
            onChange={(e) => {
              setPromise(e.target.value);
              setSuccess(false);
            }}
            rows={2}
            placeholder="In 30 days, our prototype will help…"
            className="w-full rounded-xl border border-white/15 bg-[#071225] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-nova-cyan/50 focus:outline-none"
          />
        </label>
      </div>
      <button type="button" onClick={assemble} className="experience-btn-primary mt-4 w-full sm:w-auto">
        ▶ Assemble Prototype
      </button>
    </LabMissionShell>
  );
}
