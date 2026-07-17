"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";

type Dir = "N" | "E" | "S" | "W";
type Cell = "empty" | "rock" | "goal";

const DELTA: Record<Dir, [number, number]> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const TURN_RIGHT: Record<Dir, Dir> = { N: "E", E: "S", S: "W", W: "N" };
const TURN_LEFT: Record<Dir, Dir> = { N: "W", W: "S", S: "E", E: "N" };
const ARROW: Record<Dir, string> = { N: "↑", E: "→", S: "↓", W: "←" };

const SECTOR_LABELS: Record<string, string> = {
  "3-0": "Launch Pad",
  "2-1": "Debris Field",
  "0-0": "Rescue Module",
};

type RoverState = { r: number; c: number; dir: Dir };

const ROWS = 4;
const COLS = 4;
const START: RoverState = { r: 3, c: 0, dir: "E" };
const GOAL = { r: 0, c: 0 };
const ROCK = { r: 2, c: 1 };

function cellAt(r: number, c: number): Cell {
  if (r === ROCK.r && c === ROCK.c) return "rock";
  if (r === GOAL.r && c === GOAL.c) return "goal";
  return "empty";
}

type Props = { onComplete: (msg: string) => void };

export function LabRobot({ onComplete }: Props) {
  const [cmds, setCmds] = useState<string[]>([]);
  const [rover, setRover] = useState<RoverState>(START);
  const [trail, setTrail] = useState<{ r: number; c: number }[]>([{ r: START.r, c: START.c }]);
  const [success, setSuccess] = useState(false);
  const [running, setRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const [commsLog, setCommsLog] = useState<string[]>([
    "Mission Control: ARIA-7 online. Dr. Vega pod at Sector [1,1]. Awaiting route.",
  ]);
  const [podLife, setPodLife] = useState(78);

  useEffect(() => {
    if (success) return;
    const t = setInterval(() => {
      setPodLife((p) => Math.max(60, p - 1));
    }, 8000);
    return () => clearInterval(t);
  }, [success]);

  const log = useCallback((msg: string) => {
    setCommsLog((prev) => [...prev.slice(-5), msg]);
  }, []);

  function add(cmd: string) {
    if (success || running) return;
    setCmds((c) => [...c, cmd]);
  }

  function clearAll() {
    if (running) return;
    setCmds([]);
    setRover(START);
    setTrail([{ r: START.r, c: START.c }]);
    setSuccess(false);
    setCrashed(false);
    log("Route cleared. Reprogram ARIA-7.");
  }

  async function launch() {
    if (running || cmds.length === 0) return;
    setAttempts((a) => a + 1);
    setRunning(true);
    setSuccess(false);
    setCrashed(false);
    log(`Launching ${cmds.length}-command sequence…`);

    let state: RoverState = { ...START };
    const path: { r: number; c: number }[] = [{ r: START.r, c: START.c }];
    setRover(state);
    setTrail(path);

    for (let i = 0; i < cmds.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const cmd = cmds[i];

      if (cmd === "L") {
        state = { ...state, dir: TURN_LEFT[state.dir] };
        log(`CMD ${i + 1}: Turn Left → facing ${state.dir}`);
      } else if (cmd === "R") {
        state = { ...state, dir: TURN_RIGHT[state.dir] };
        log(`CMD ${i + 1}: Turn Right → facing ${state.dir}`);
      } else if (cmd === "F") {
        const [dr, dc] = DELTA[state.dir];
        const nr = state.r + dr;
        const nc = state.c + dc;

        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) {
          setCrashed(true);
          log(`CMD ${i + 1}: ABORT — boundary breach.`);
          setRunning(false);
          return;
        }

        if (nr === ROCK.r && nc === ROCK.c) {
          state = { r: nr, c: nc, dir: state.dir };
          path.push({ r: nr, c: nc });
          setRover({ ...state });
          setTrail([...path]);
          setCrashed(true);
          log(`CMD ${i + 1}: COLLISION at Debris Field [${nr + 1},${nc + 1}]`);
          setRunning(false);
          return;
        }

        state = { r: nr, c: nc, dir: state.dir };
        path.push({ r: nr, c: nc });
        log(`CMD ${i + 1}: Forward → Sector [${nr + 1},${nc + 1}]`);
      }

      setRover({ ...state });
      setTrail([...path]);
    }

    setRunning(false);

    if (state.r === GOAL.r && state.c === GOAL.c) {
      setSuccess(true);
      log("ARIA-7 at Rescue Module. Dr. Vega: 'Thank you, Explorer!'");
      onComplete("Route confirmed. Dr. Vega is safe.");
    } else {
      log(`Route ended at [${state.r + 1},${state.c + 1}] — not the Rescue Module.`);
    }
  }

  function renderCell(r: number, c: number) {
    const isRover = rover.r === r && rover.c === c;
    const onTrail = trail.some((t) => t.r === r && t.c === c);
    const type = cellAt(r, c);
    const label = SECTOR_LABELS[`${r}-${c}`];

    return (
      <div
        key={`${r}-${c}`}
        className={cn(
          "lab-sector-cell",
          type === "rock" && "border-red-500/50 bg-red-950/60",
          type === "goal" && "border-emerald-400/50 bg-emerald-950/50",
          type === "empty" && onTrail && "border-[var(--exp-accent)]/40 bg-[var(--exp-accent)]/15",
          type === "empty" && !onTrail && "border-white/10 bg-white/[0.03]",
          isRover && crashed && "ring-2 ring-red-500 animate-pulse",
          isRover && success && "ring-2 ring-emerald-400",
          running && isRover && "shadow-[0_0_20px_var(--exp-accent)]"
        )}
      >
        {type === "rock" && !isRover && <span className="text-2xl drop-shadow-lg">🪨</span>}
        {type === "goal" && !isRover && (
          <>
            <span className="text-2xl">🛟</span>
            <span className="mt-0.5 text-[8px] font-bold uppercase text-emerald-400/80">Dr. Vega</span>
          </>
        )}
        {isRover && (
          <>
            <span className="text-2xl">🤖</span>
            <span className="text-sm font-black text-[var(--exp-accent-2)]">{ARROW[rover.dir]}</span>
          </>
        )}
        {label && !isRover && type !== "goal" && type !== "rock" && (
          <span className="text-[8px] font-bold uppercase tracking-wide text-white/50">{label}</span>
        )}
        {!isRover && !label && type === "empty" && (
          <span className="text-[9px] font-mono text-white/20">
            {r + 1},{c + 1}
          </span>
        )}
      </div>
    );
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 002"
      title="ARIA-7 · Rescue Navigation"
      objective="Guide rover ARIA-7 from the Launch Pad (bottom-left) to Dr. Vega’s Rescue Module (top-left). You must go around the Debris Field — never through it."
      steps={[
        "Read the sector map: 🤖 starts at Launch Pad · 🛟 is Dr. Vega · 🪨 is debris (do not enter).",
        "Add commands with the buttons: Forward = move one cell · Left/Right = turn in place (no move).",
        "Build a safe route around the debris — use Clear Route to start over anytime.",
        "Press Launch ARIA-7 and watch the rover follow your queue. Reach 🛟 to rescue Dr. Vega.",
      ]}
      hint="The arrow on 🤖 shows which way ARIA-7 is facing before each Forward move."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ Dr. Vega rescued — ARIA-7 mission complete."
          : `Pod life-support: ${podLife}% · Program and launch your route.`
      }
    >
      <div className="mb-4 grid gap-3 lg:grid-cols-2">
        <div className="lab-telemetry-panel">
          <p className="text-[10px] font-bold uppercase text-amber-400/80">Dr. Vega · Pod life-support</p>
          <p className="mt-1 text-2xl font-black text-amber-300">{podLife}%</p>
          <div className="lab-telemetry-bar mt-2">
            <div
              className={cn(
                "lab-telemetry-bar-fill",
                podLife < 70 && "lab-telemetry-bar-fill--danger"
              )}
              style={{ width: `${podLife}%` }}
            />
          </div>
          {podLife < 70 && (
            <p className="mt-1 text-[10px] font-bold uppercase text-red-400 animate-pulse">
              Critical — route ARIA-7 now
            </p>
          )}
        </div>
        <div className="lab-telemetry-panel">
          <p className="text-[10px] font-bold uppercase text-white/50">Comms · Mission Control</p>
          <ul className="mt-2 max-h-24 space-y-1 overflow-y-auto">
            {commsLog.map((line, i) => (
              <li
                key={`${line}-${i}`}
                className={cn(
                  "lab-console-line font-mono text-[10px] leading-snug text-white/70",
                  i === commsLog.length - 1 && "lab-console-line--new"
                )}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lab-sector-map">
        <div className="mb-3 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-[10px] text-white/70">
          <span><strong className="text-white/90">Legend:</strong></span>
          <span>🤖 ARIA-7</span>
          <span>🛟 Rescue Module</span>
          <span>🪨 Debris — blocked</span>
          <span>↑→↓← facing</span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--exp-accent-2)]">
            Sector Map · Top-down view
          </p>
          <span className="font-mono text-[10px] text-white/30">4×4 grid</span>
        </div>
        <div
          className="grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            return renderCell(r, c);
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(
            [
              ["F", "↑ Forward"],
              ["R", "↻ Turn Right"],
              ["L", "↺ Turn Left"],
            ] as const
          ).map(([c, label]) => (
            <button
              key={c}
              type="button"
              onClick={() => add(c)}
              disabled={running || success}
              className="experience-lab-btn disabled:opacity-40"
            >
              {label}
            </button>
          ))}
          <button type="button" onClick={clearAll} disabled={running} className="experience-lab-btn">
            Clear Route
          </button>
          <button
            type="button"
            onClick={launch}
            disabled={running || cmds.length === 0 || success}
            className="experience-lab-btn experience-lab-btn-active disabled:opacity-40"
          >
            {running ? "ARIA-7 moving…" : "Launch ARIA-7"}
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-white/10 bg-black/40 px-3 py-2">
          <p className="text-[10px] font-bold uppercase text-white/40">Command queue</p>
          <p className="mt-1 font-mono text-sm text-[var(--exp-accent-2)]">
            {cmds.length ? cmds.join(" → ") : "— awaiting commands —"}
          </p>
        </div>
      </div>
    </LabMissionShell>
  );
}
