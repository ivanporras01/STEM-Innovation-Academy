"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";
import { LabArena } from "./lab-arena";
import { LabBuddyToken } from "./lab-buddy-token";
import { useLabBuddy } from "./lab-buddy-context";
import { getBuddyDisplayName } from "@/lib/experiences/catalog";

type Dir = "N" | "E" | "S" | "W";
type Cell = "empty" | "rock" | "wreck" | "goal" | "launch";

const DELTA: Record<Dir, [number, number]> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const TURN_RIGHT: Record<Dir, Dir> = { N: "E", E: "S", S: "W", W: "N" };
const TURN_LEFT: Record<Dir, Dir> = { N: "W", W: "S", S: "E", E: "N" };
const ARROW: Record<Dir, string> = { N: "↑", E: "→", S: "↓", W: "←" };

type Terrain = "dust" | "crater" | "ridge" | "beacon" | "launch" | "debris" | "pod" | "wreck";

const SECTOR_META: Record<string, { title: string; terrain: Terrain }> = {
  "3-0": { title: "Launch Pad", terrain: "launch" },
  "3-1": { title: "Dust Flats", terrain: "dust" },
  "3-2": { title: "Dust Flats", terrain: "dust" },
  "3-3": { title: "South Ridge", terrain: "ridge" },
  "2-0": { title: "Ash Trail", terrain: "dust" },
  "2-1": { title: "Debris Field", terrain: "debris" },
  "2-2": { title: "Crater Rim", terrain: "crater" },
  "2-3": { title: "East Slope", terrain: "ridge" },
  "1-0": { title: "Beacon Lane", terrain: "beacon" },
  "1-1": { title: "Crater Floor", terrain: "crater" },
  "1-2": { title: "Ship Wreck", terrain: "wreck" },
  "1-3": { title: "Signal Spur", terrain: "beacon" },
  "0-0": { title: "Rescue Module", terrain: "pod" },
  "0-1": { title: "North Spur", terrain: "ridge" },
  "0-2": { title: "Ice Dust", terrain: "dust" },
  "0-3": { title: "Horizon", terrain: "ridge" },
};

/** Decorative props for empty sectors — richness without blocking the north rescue path. */
const SECTOR_PROPS: Record<string, { icons: string[]; label: string }> = {
  "3-1": { icons: ["🪨"], label: "Rocks" },
  "3-2": { icons: ["🌑", "✨"], label: "Crater" },
  "3-3": { icons: ["📡"], label: "Relay" },
  "2-0": { icons: ["☄️"], label: "Ash" },
  "2-2": { icons: ["🪨", "🌑"], label: "Rim" },
  "2-3": { icons: ["🧊"], label: "Ice" },
  "1-0": { icons: ["📶"], label: "Beacon" },
  "1-1": { icons: ["🌑", "🪨"], label: "Pit" },
  "1-3": { icons: ["🛰️"], label: "Sat" },
  "0-1": { icons: ["❄️"], label: "Frost" },
  "0-2": { icons: ["🧊", "✨"], label: "Ice" },
  "0-3": { icons: ["🌌"], label: "Horizon" },
};

type RoverState = { r: number; c: number; dir: Dir };

const ROWS = 4;
const COLS = 4;
const START: RoverState = { r: 3, c: 0, dir: "E" };
const GOAL = { r: 0, c: 0 };
const ROCK = { r: 2, c: 1 };
/** Blocked wreck — north lane (col 0) stays clear so the puzzle stays solvable. */
const WRECK = { r: 1, c: 2 };

function isBlocked(r: number, c: number) {
  return (r === ROCK.r && c === ROCK.c) || (r === WRECK.r && c === WRECK.c);
}

function cellAt(r: number, c: number): Cell {
  if (r === ROCK.r && c === ROCK.c) return "rock";
  if (r === WRECK.r && c === WRECK.c) return "wreck";
  if (r === GOAL.r && c === GOAL.c) return "goal";
  if (r === START.r && c === START.c) return "launch";
  return "empty";
}

type Props = { onComplete: (msg: string) => void };

export function LabRobot({ onComplete }: Props) {
  const labBuddy = useLabBuddy();
  const buddyName = labBuddy
    ? getBuddyDisplayName(labBuddy.buddyId, labBuddy.buddyNickname)
    : "ARIA-7";

  const [cmds, setCmds] = useState<string[]>([]);
  const [rover, setRover] = useState<RoverState>(START);
  const [trail, setTrail] = useState<{ r: number; c: number }[]>([{ r: START.r, c: START.c }]);
  const [success, setSuccess] = useState(false);
  const [running, setRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const [commsLog, setCommsLog] = useState<string[]>([
    `Mission Control: ${buddyName} online. Dr. Vega pod at Rescue Module. Awaiting route.`,
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
    log(`Route cleared. Reprogram ${buddyName}.`);
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
        const sectorTitle = SECTOR_META[`${nr}-${nc}`]?.title ?? "Unknown";

        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) {
          setCrashed(true);
          log(`CMD ${i + 1}: ABORT — boundary breach.`);
          setRunning(false);
          return;
        }

        if (isBlocked(nr, nc)) {
          state = { r: nr, c: nc, dir: state.dir };
          path.push({ r: nr, c: nc });
          setRover({ ...state });
          setTrail([...path]);
          setCrashed(true);
          log(`CMD ${i + 1}: COLLISION at ${sectorTitle}`);
          setRunning(false);
          return;
        }

        state = { r: nr, c: nc, dir: state.dir };
        path.push({ r: nr, c: nc });
        log(`CMD ${i + 1}: Forward → ${sectorTitle}`);
      }

      setRover({ ...state });
      setTrail([...path]);
    }

    setRunning(false);

    if (state.r === GOAL.r && state.c === GOAL.c) {
      setSuccess(true);
      log(`${buddyName} at Rescue Module. Dr. Vega: 'Thank you, Explorer!'`);
      onComplete("Route confirmed. Dr. Vega is safe.");
    } else {
      const endTitle = SECTOR_META[`${state.r}-${state.c}`]?.title ?? "open sector";
      log(`Route ended at ${endTitle} — not the Rescue Module.`);
    }
  }

  function renderCell(r: number, c: number) {
    const isRover = rover.r === r && rover.c === c;
    const onTrail = trail.some((t) => t.r === r && t.c === c);
    const type = cellAt(r, c);
    const meta = SECTOR_META[`${r}-${c}`]!;
    const prop = SECTOR_PROPS[`${r}-${c}`];
    const blocked = type === "rock" || type === "wreck";

    return (
      <div
        key={`${r}-${c}`}
        className={cn(
          "lab-sector-cell",
          `lab-sector-cell--${meta.terrain}`,
          onTrail && !blocked && "lab-sector-cell--trail",
          isRover && crashed && "lab-sector-cell--crash",
          isRover && success && "lab-sector-cell--win",
          running && isRover && "lab-sector-cell--live",
        )}
      >
        <span className="lab-sector-cell-glow" aria-hidden />
        <span className="lab-sector-cell-texture" aria-hidden />

        {type === "rock" && !isRover && (
          <span className="lab-sector-prop">
            <span className="lab-sector-prop-stack" aria-hidden>
              <span>🪨</span>
              <span>🪨</span>
              <span>☄️</span>
            </span>
            <span className="lab-sector-title">Debris</span>
          </span>
        )}
        {type === "wreck" && !isRover && (
          <span className="lab-sector-prop">
            <span className="lab-sector-icon" aria-hidden>
              🚀
            </span>
            <span className="lab-sector-title text-rose-200">Wreck</span>
          </span>
        )}
        {type === "goal" && !isRover && (
          <span className="lab-sector-marker">
            <span className="lab-sector-icon lab-sector-icon--pulse">🛟</span>
            <span className="lab-sector-title text-emerald-200">Vega</span>
          </span>
        )}
        {type === "launch" && !isRover && (
          <span className="lab-sector-marker">
            <span className="lab-sector-icon">🛸</span>
            <span className="lab-sector-title">Pad</span>
          </span>
        )}
        {!isRover && type === "empty" && prop && (
          <span className="lab-sector-prop lab-sector-marker--subtle">
            <span className="lab-sector-prop-stack" aria-hidden>
              {prop.icons.map((icon, i) => (
                <span key={`${icon}-${i}`}>{icon}</span>
              ))}
            </span>
            <span className="lab-sector-title">{prop.label}</span>
          </span>
        )}
        {!isRover && type === "empty" && !prop && (
          <span className="lab-sector-marker lab-sector-marker--subtle">
            <span className="lab-sector-title">{meta.title}</span>
          </span>
        )}
        {isRover && (
          <span className="lab-sector-rover">
            <LabBuddyToken facing={ARROW[rover.dir]} pulse={running} />
            <span className="lab-sector-rover-name">{buddyName}</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 002"
      title={`${buddyName} · Rescue Navigation`}
      objective={`Guide ${buddyName} from the Launch Pad (bottom-left) to Dr. Vega’s Rescue Module (top-left). Steer around debris and the ship wreck — never through them.`}
      steps={[
        `Read the sector map: ${buddyName} starts at Launch Pad · 🛟 is Dr. Vega · 🪨 debris and 🚀 wreck are blocked.`,
        "Add commands with the buttons: Forward = move one cell · Left/Right = turn in place (no move).",
        "Build a safe route around obstacles — use Clear Route to start over anytime.",
        `Press Launch and watch ${buddyName} follow your queue. Reach 🛟 to rescue Dr. Vega.`,
      ]}
      hint={`The arrow on ${buddyName} shows which way they are facing before each Forward move.`}
      attempts={attempts}
      success={success}
      status={
        success
          ? `✓ Dr. Vega rescued — ${buddyName} mission complete.`
          : `Pod life-support: ${podLife}% · Program and launch your route.`
      }
    >
      <LabArena
        theme="robot"
        mode={success ? "RESCUED" : running ? "NAVIGATING" : crashed ? "CRASHED" : "PROGRAM"}
        success={success}
        failFlash={crashed}
        meters={[
          { label: "Pod life-support", value: success ? 100 : podLife, tone: "amber" },
          { label: "Route progress", value: success ? 100 : Math.min(90, trail.length * 18), tone: "cyan" },
          { label: "Command queue", value: Math.min(100, cmds.length * 12), tone: "violet" },
        ]}
      >
        <div className="mb-4 lab-telemetry-panel">
          <p className="text-[10px] font-bold uppercase text-white/50">Comms · Mission Control</p>
          <ul className="mt-2 max-h-24 space-y-1 overflow-y-auto">
            {commsLog.map((line, i) => (
              <li
                key={`${line}-${i}`}
                className={cn(
                  "lab-console-line font-mono text-[10px] leading-snug text-white/70",
                  i === commsLog.length - 1 && "lab-console-line--new",
                )}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="lab-sector-map">
          <div className="lab-sector-legend lab-mission-legend">
            <span className="lab-sector-legend-item lab-mission-legend-item">
              <LabBuddyToken className="scale-75" />
              <span>{buddyName}</span>
            </span>
            <span className="lab-sector-legend-item lab-mission-legend-item">
              <span>🛟</span>
              <span>Rescue</span>
            </span>
            <span className="lab-sector-legend-item lab-mission-legend-item">
              <span>🪨</span>
              <span>Debris</span>
            </span>
            <span className="lab-sector-legend-item lab-mission-legend-item">
              <span>🚀</span>
              <span>Wreck</span>
            </span>
            <span className="lab-sector-legend-item lab-mission-legend-item">
              <span className="text-[var(--exp-accent-2)]">↑→↓←</span>
              <span>Facing</span>
            </span>
          </div>

          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--exp-accent-2)]">
              Sector Map · Lunar rescue theater
            </p>
            <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold text-white/55">
              Live ops
            </span>
          </div>

          <div className="lab-sector-board" style={{ ["--lab-cols" as string]: COLS }}>
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
              {running ? `${buddyName} moving…` : `Launch ${buddyName}`}
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-white/12 bg-black/40 px-3 py-2.5 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Command queue</p>
            <p className="mt-1 font-mono text-sm text-[var(--exp-accent-2)]">
              {cmds.length ? cmds.join(" → ") : "— awaiting commands —"}
            </p>
          </div>
        </div>
      </LabArena>
    </LabMissionShell>
  );
}
