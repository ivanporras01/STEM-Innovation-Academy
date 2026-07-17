"use client";

import { useCallback, useState } from "react";
import { LabMissionShell } from "./lab-mission-shell";

type Dir = "N" | "E" | "S" | "W";
type Cell = "empty" | "rock" | "goal";

const ROWS = 4;
const COLS = 4;

const START = { r: 3, c: 0, dir: "E" as Dir };
const GOAL = { r: 0, c: 0 };
const ROCK = { r: 2, c: 1 };

const DELTA: Record<Dir, [number, number]> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const TURN_RIGHT: Record<Dir, Dir> = { N: "E", E: "S", S: "W", W: "N" };
const TURN_LEFT: Record<Dir, Dir> = { N: "W", W: "S", S: "E", E: "N" };
const ARROW: Record<Dir, string> = { N: "↑", E: "→", S: "↓", W: "←" };

function cellAt(r: number, c: number): Cell {
  if (r === ROCK.r && c === ROCK.c) return "rock";
  if (r === GOAL.r && c === GOAL.c) return "goal";
  return "empty";
}

type RoverState = { r: number; c: number; dir: Dir };

type Props = { onComplete: (msg: string) => void };

export function LabRobot({ onComplete }: Props) {
  const [cmds, setCmds] = useState<string[]>([]);
  const [rover, setRover] = useState<RoverState>(START);
  const [trail, setTrail] = useState<{ r: number; c: number }[]>([{ r: START.r, c: START.c }]);
  const [success, setSuccess] = useState(false);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState(
    "Build your command queue, then launch to simulate the rescue route."
  );
  const [attempts, setAttempts] = useState(0);
  const [crashed, setCrashed] = useState(false);

  const resetSim = useCallback(() => {
    setRover(START);
    setTrail([{ r: START.r, c: START.c }]);
    setCrashed(false);
  }, []);

  function add(cmd: string) {
    if (success || running) return;
    setCmds((c) => [...c, cmd]);
  }

  function clearAll() {
    if (running) return;
    setCmds([]);
    resetSim();
    setSuccess(false);
    setFeedback("Build your command queue, then launch to simulate the rescue route.");
  }

  async function launch() {
    if (running || cmds.length === 0) return;
    setAttempts((a) => a + 1);
    setRunning(true);
    setSuccess(false);
    setCrashed(false);

    let state: RoverState = { ...START };
    const path: { r: number; c: number }[] = [{ r: START.r, c: START.c }];
    setRover(state);
    setTrail(path);
    setFeedback("Running simulation…");

    for (let i = 0; i < cmds.length; i++) {
      await new Promise((r) => setTimeout(r, 450));
      const cmd = cmds[i];

      if (cmd === "L") {
        state = { ...state, dir: TURN_LEFT[state.dir] };
      } else if (cmd === "R") {
        state = { ...state, dir: TURN_RIGHT[state.dir] };
      } else if (cmd === "F") {
        const [dr, dc] = DELTA[state.dir];
        const nr = state.r + dr;
        const nc = state.c + dc;

        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) {
          setCrashed(true);
          setFeedback(`Command ${i + 1}: Forward would leave the mission zone — route failed.`);
          setRunning(false);
          return;
        }

        if (nr === ROCK.r && nc === ROCK.c) {
          state = { r: nr, c: nc, dir: state.dir };
          path.push({ r: nr, c: nc });
          setRover({ ...state });
          setTrail([...path]);
          setCrashed(true);
          setFeedback(`Command ${i + 1}: Collision with debris field at sector [${nr + 1}, ${nc + 1}].`);
          setRunning(false);
          return;
        }

        state = { r: nr, c: nc, dir: state.dir };
        path.push({ r: nr, c: nc });
      }

      setRover({ ...state });
      setTrail([...path]);
    }

    setRunning(false);

    if (state.r === GOAL.r && state.c === GOAL.c) {
      setSuccess(true);
      setFeedback("Rescue module reached. Route logged for NOVA Mission Control.");
      onComplete("Route confirmed. The rover reached the rescue module.");
    } else {
      setFeedback(
        `Simulation ended at sector [${state.r + 1}, ${state.c + 1}] — the rescue module is at [1, 1]. Adjust your route.`
      );
    }
  }

  function renderCell(r: number, c: number) {
    const isRover = rover.r === r && rover.c === c;
    const onTrail = trail.some((t) => t.r === r && t.c === c);
    const type = cellAt(r, c);

    return (
      <div
        key={`${r}-${c}`}
        className={[
          "relative flex aspect-square items-center justify-center rounded-lg border text-lg font-bold transition-all duration-300 sm:text-xl",
          type === "rock"
            ? "border-red-500/40 bg-red-950/50"
            : type === "goal"
              ? "border-emerald-400/50 bg-emerald-950/40"
              : onTrail
                ? "border-[var(--exp-accent)]/30 bg-[var(--exp-accent)]/10"
                : "border-white/10 bg-white/[0.03]",
          isRover && crashed && "ring-2 ring-red-500",
          isRover && success && "ring-2 ring-emerald-400",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {type === "rock" && !isRover && (
          <span className="text-2xl" title="Debris field">
            🪨
          </span>
        )}
        {type === "goal" && !isRover && (
          <span className="text-2xl" title="Rescue module">
            🛟
          </span>
        )}
        {isRover && (
          <span className="flex flex-col items-center gap-0.5">
            <span className="text-2xl">🤖</span>
            <span className="text-[10px] font-black text-[var(--exp-accent-2)]">
              {ARROW[rover.dir]}
            </span>
          </span>
        )}
        {!isRover && type === "empty" && (
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
      title="Rescue Rover Navigation"
      objective="Program the rover from the launch pad to the rescue module (top-left). Avoid the debris field. Turns change facing direction before moving forward."
      hint="Try routing along the bottom row, turning toward the goal, and approaching from the west — don't cut through the debris."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ Mission complete — rescue module secured."
          : feedback
      }
    >
      <div className="mb-4 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-wider text-white/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-base">🤖</span> Rover + heading
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-base">🪨</span> Debris (avoid)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-base">🛟</span> Rescue module
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#06131a] p-4 sm:p-5">
        <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
          <span>North ↑</span>
          <span>Mission grid 4×4</span>
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

        <div className="mt-6 flex flex-wrap gap-2">
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
          <button
            type="button"
            onClick={clearAll}
            disabled={running}
            className="experience-lab-btn disabled:opacity-40"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={launch}
            disabled={running || cmds.length === 0 || success}
            className="experience-lab-btn experience-lab-btn-active disabled:opacity-40"
          >
            {running ? "Simulating…" : "Launch Route"}
          </button>
        </div>

        <p className="mt-4 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-white/80">
          Command queue: {cmds.length ? cmds.join(" → ") : "—"} ({cmds.length} commands)
        </p>
      </div>
    </LabMissionShell>
  );
}
