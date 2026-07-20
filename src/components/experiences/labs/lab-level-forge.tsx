"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";
import { LabArena } from "./lab-arena";
import { LabBuddyToken } from "./lab-buddy-token";
import { useLabBuddy } from "./lab-buddy-context";
import { getBuddyDisplayName } from "@/lib/experiences/catalog";

type Props = { onComplete: (msg: string) => void };

const SIZE = 5;
const START = "0,4";
const EXIT = "4,0";
const VOID_PROPS = ["🪨", "☄️", "🛸", "✦", "🌑", "🛰️", "💫", "👾"] as const;

function neighbors(cell: string) {
  const [x, y] = cell.split(",").map(Number);
  return [`${x + 1},${y}`, `${x - 1},${y}`, `${x},${y + 1}`, `${x},${y - 1}`].filter((c) => {
    const [cx, cy] = c.split(",").map(Number);
    return cx >= 0 && cy >= 0 && cx < SIZE && cy < SIZE;
  });
}

function findPath(walkable: Set<string>): string[] | null {
  const prev = new Map<string, string | null>();
  const queue = [START];
  prev.set(START, null);
  while (queue.length) {
    const cur = queue.shift()!;
    if (cur === EXIT) {
      const route: string[] = [];
      let node: string | null = EXIT;
      while (node) {
        route.unshift(node);
        node = prev.get(node) ?? null;
      }
      return route;
    }
    for (const n of neighbors(cur)) {
      if (!prev.has(n) && walkable.has(n)) {
        prev.set(n, cur);
        queue.push(n);
      }
    }
  }
  return null;
}

/** High-energy Pixel Portal level forge — animated playtest + game-world HUD. */
export function LabLevelForge({ onComplete }: Props) {
  const labBuddy = useLabBuddy();
  const buddyName = labBuddy
    ? getBuddyDisplayName(labBuddy.buddyId, labBuddy.buddyNickname)
    : "Explorer";

  const [path, setPath] = useState<Set<string>>(() => new Set(["0,4", "1,4"]));
  const [hazard, setHazard] = useState("2,2");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Forge a neon highway through the Arcade Nebula. Avoid the glitch.");
  const [running, setRunning] = useState(false);
  const [runner, setRunner] = useState<string | null>(null);
  const [trail, setTrail] = useState<Set<string>>(new Set());
  const [portalCharge, setPortalCharge] = useState(12);
  const [failFlash, setFailFlash] = useState(false);
  const [combo, setCombo] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const toggle = useCallback(
    (cell: string) => {
      if (running || success) return;
      if (cell === START || cell === EXIT || cell === hazard) return;
      setPath((prev) => {
        const next = new Set(prev);
        if (next.has(cell)) next.delete(cell);
        else next.add(cell);
        return next;
      });
      setTrail(new Set());
      setRunner(null);
      setPortalCharge(12);
      setCombo(0);
    },
    [hazard, running, success],
  );

  function playtest() {
    if (running || success) return;
    clearTimers();
    setAttempts((a) => a + 1);
    setFailFlash(false);
    setTrail(new Set());
    setRunner(START);

    const walkable = new Set(path);
    walkable.add(START);
    walkable.add(EXIT);
    walkable.delete(hazard);

    const route = findPath(walkable);
    if (!route) {
      setRunning(false);
      setRunner(null);
      setFailFlash(true);
      setStatus("⚠ PATH COLLAPSED — the glitch wins. Rebuild a continuous neon floor to the portal.");
      setPortalCharge(8);
      const t = window.setTimeout(() => setFailFlash(false), 700);
      timers.current.push(t);
      return;
    }

    setRunning(true);
    setStatus(`▶ PLAYTEST LIVE — ${buddyName} racing the neon path…`);
    setPortalCharge(28);

    route.forEach((cell, i) => {
      const t = window.setTimeout(() => {
        setRunner(cell);
        setTrail((prev) => new Set([...prev, cell]));
        setPortalCharge(Math.min(96, 28 + Math.round(((i + 1) / route.length) * 68)));
        setCombo(i + 1);

        if (i === route.length - 1) {
          const done = window.setTimeout(() => {
            setRunning(false);
            setSuccess(true);
            setPortalCharge(100);
            setStatus("✓ PORTAL UNLOCKED — Arcade Nebula escape route shipped!");
            onComplete("Level Forge complete. Your portal escape is playable.");
          }, 280);
          timers.current.push(done);
        }
      }, i * 320);
      timers.current.push(t);
    });
  }

  const floorCount = [...path].filter((c) => c !== START && c !== EXIT).length;
  const glitchThreat = Math.max(18, 92 - floorCount * 12);

  return (
    <LabMissionShell
      labCode="NOVA LAB 004"
      title="Pixel Portal · Level Forge"
      objective="Design an escape route through a corrupted game world. Paint neon floor tiles, dodge the glitch hazard, and playtest until the portal opens."
      steps={[
        "Tap empty tiles to paint a connected neon path from START → EXIT.",
        "Never paint over the purple glitch — it deletes Explorers.",
        "Hit ▶ Playtest Level and watch your Explorer race the route live.",
      ]}
      hint="Paths must be adjacent (no diagonal jumps). Playtest animates the run — design like a game creator."
      attempts={attempts}
      success={success}
      status={status}
    >
      <LabArena
        theme="pixel"
        mode={success ? "SHIPPED" : running ? "LIVE RUN" : "DESIGN"}
        success={success}
        failFlash={failFlash}
        meters={[
          { label: "Portal charge", value: portalCharge, tone: "violet" },
          { label: "Glitch threat", value: success ? 0 : glitchThreat, tone: "rose" },
          { label: "Combo", value: Math.min(100, combo * 18), tone: "cyan" },
        ]}
      >
        {/* Legend */}
        <div className="lab-mission-legend mb-4 text-[9px] font-bold uppercase tracking-wide">
          <span className="lab-mission-legend-item border-emerald-400/40 bg-emerald-500/15 text-emerald-200">
            <span className="pixel-legend-dot bg-emerald-400" /> Start
          </span>
          <span className="lab-mission-legend-item border-cyan-400/40 bg-cyan-500/15 text-cyan-200">
            <span className="pixel-legend-dot bg-cyan-400" /> Floor
          </span>
          <span className="lab-mission-legend-item border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-200">
            <span className="pixel-legend-dot bg-fuchsia-400 animate-pulse" /> Glitch
          </span>
          <span className="lab-mission-legend-item border-amber-400/40 bg-amber-500/15 text-amber-200">
            <span className="pixel-legend-dot bg-amber-400" /> Exit
          </span>
          <span className="lab-mission-legend-item">
            <LabBuddyToken className="scale-[0.55]" />
            {buddyName}
          </span>
        </div>

        {/* Game grid — shared --lab-cell system */}
        <div className="pixel-grid relative z-[2]" style={{ ["--lab-cols" as string]: SIZE }}>
          {Array.from({ length: SIZE * SIZE }, (_, i) => {
            const x = i % SIZE;
            const y = Math.floor(i / SIZE);
            const cell = `${x},${y}`;
            const isStart = cell === START;
            const isExit = cell === EXIT;
            const isHazard = cell === hazard;
            const isPath = path.has(cell) || isStart || isExit;
            const isTrail = trail.has(cell);
            const isRunner = runner === cell;
            const voidProp = !isStart && !isExit && !isHazard && !isPath ? VOID_PROPS[i % VOID_PROPS.length] : null;

            return (
              <button
                key={cell}
                type="button"
                disabled={running || success}
                onClick={() => {
                  if (isHazard) {
                    const candidates = Array.from({ length: SIZE * SIZE }, (_, j) => {
                      const cx = j % SIZE;
                      const cy = Math.floor(j / SIZE);
                      return `${cx},${cy}`;
                    }).filter((c) => c !== START && c !== EXIT && c !== cell && !path.has(c));
                    if (candidates.length) setHazard(candidates[attempts % candidates.length]!);
                    setTrail(new Set());
                    setRunner(null);
                    setPortalCharge(12);
                    return;
                  }
                  toggle(cell);
                }}
                className={cn(
                  "pixel-tile group relative aspect-square overflow-hidden border transition duration-200",
                  isStart && "pixel-tile--start",
                  isExit && "pixel-tile--exit",
                  isHazard && "pixel-tile--glitch",
                  !isStart && !isExit && !isHazard && isPath && "pixel-tile--floor",
                  !isStart && !isExit && !isHazard && !isPath && "pixel-tile--void",
                  isTrail && !isRunner && "pixel-tile--trail",
                  isRunner && "pixel-tile--runner",
                )}
              >
                <span className="pixel-tile-glow" aria-hidden />
                <span className="pixel-tile-sheen" aria-hidden />
                {isStart && !isRunner && (
                  <span className="relative z-[1] flex flex-col items-center justify-center gap-0.5">
                    <span className="text-base leading-none sm:text-lg">🚀</span>
                    <span className="text-[7px] font-black tracking-wider text-emerald-100 sm:text-[8px]">
                      START
                    </span>
                  </span>
                )}
                {isExit && !isRunner && (
                  <span className="relative z-[1] flex flex-col items-center justify-center">
                    <span className={cn("pixel-portal-vortex", success && "pixel-portal-vortex--open")} aria-hidden />
                    <span className="relative text-[7px] font-black tracking-wider text-amber-100 sm:text-[8px]">
                      EXIT
                    </span>
                  </span>
                )}
                {isHazard && (
                  <span className="relative z-[1] flex flex-col items-center justify-center gap-0.5">
                    <span className="text-base leading-none sm:text-lg">👾</span>
                    <span className="text-[7px] font-black tracking-wider text-fuchsia-100 sm:text-[8px]">
                      GLITCH
                    </span>
                  </span>
                )}
                {!isStart && !isExit && !isHazard && isPath && !isRunner && (
                  <span className="relative z-[1] text-sm text-cyan-100/90 sm:text-base">
                    {isTrail ? "✦" : "◈"}
                  </span>
                )}
                {!isStart && !isExit && !isHazard && !isPath && (
                  <span className="relative z-[1] flex flex-col items-center justify-center gap-0.5 opacity-55 transition group-hover:opacity-90 group-hover:scale-105">
                    <span className="text-sm leading-none" aria-hidden>
                      {voidProp}
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-wide text-white/35">void</span>
                  </span>
                )}
                {isRunner && (
                  <span className="absolute inset-0 z-[2] grid place-items-center">
                    <LabBuddyToken pulse />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-white/55">
          {running
            ? "Hold tight — playtest in motion…"
            : success
              ? "Level shipped. Portal stable."
              : "Tip: tap the glitch to relocate it · paint floors · then playtest"}
        </p>

        <button
          type="button"
          disabled={running || success}
          onClick={playtest}
          className="experience-btn-primary mission-invite-cta mt-4 w-full disabled:opacity-50 sm:w-auto"
        >
          {running ? "▶ Playtesting…" : success ? "✓ Portal Open" : "▶ Playtest Level"}
        </button>
      </LabArena>
    </LabMissionShell>
  );
}
