"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";

type Props = { onComplete: (msg: string) => void };

const SIZE = 5;
const START = "0,4";
const EXIT = "4,0";

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
    setStatus("▶ PLAYTEST LIVE — Explorer racing the neon path…");
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
      <div
        className={cn(
          "pixel-arena relative overflow-hidden rounded-3xl border p-4 sm:p-5",
          failFlash && "pixel-arena--fail",
          success && "pixel-arena--win",
        )}
      >
        <div className="pixel-arena-scan" aria-hidden />
        <div className="pixel-arena-stars" aria-hidden />

        {/* Telemetry strip */}
        <div className="relative z-[2] mb-4 grid gap-2 sm:grid-cols-3">
          <div className="pixel-meter">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
              <span className="text-cyan-300">Portal charge</span>
              <span className="text-white/80">{portalCharge}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 transition-all duration-300"
                style={{ width: `${portalCharge}%` }}
              />
            </div>
          </div>
          <div className="pixel-meter">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
              <span className="text-fuchsia-300">Glitch threat</span>
              <span className="text-white/80">{success ? 0 : glitchThreat}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/40">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  success ? "bg-emerald-400" : "bg-gradient-to-r from-fuchsia-600 to-rose-500",
                )}
                style={{ width: `${success ? 0 : glitchThreat}%` }}
              />
            </div>
          </div>
          <div className="pixel-meter flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-300">Combo</p>
              <p className="text-lg font-black text-white">{combo}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-wider text-white/45">Mode</p>
              <p className="text-xs font-bold text-emerald-300">
                {success ? "SHIPPED" : running ? "LIVE RUN" : "DESIGN"}
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="relative z-[2] mb-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wide">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-1 text-emerald-200">
            <span className="pixel-legend-dot bg-emerald-400" /> Start pad
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-2.5 py-1 text-cyan-200">
            <span className="pixel-legend-dot bg-cyan-400" /> Neon floor
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/15 px-2.5 py-1 text-fuchsia-200">
            <span className="pixel-legend-dot bg-fuchsia-400 animate-pulse" /> Glitch
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-2.5 py-1 text-amber-200">
            <span className="pixel-legend-dot bg-amber-400" /> Portal exit
          </span>
        </div>

        {/* Game grid */}
        <div
          className="pixel-grid relative z-[2] mx-auto grid w-full max-w-md gap-2 p-3"
          style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
        >
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
                  "pixel-tile group relative aspect-square overflow-hidden rounded-xl border transition duration-200",
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
                {isStart && (
                  <span className="relative z-[1] flex flex-col items-center justify-center gap-0.5">
                    <span className="text-lg leading-none sm:text-xl">🚀</span>
                    <span className="text-[8px] font-black tracking-wider text-emerald-100">START</span>
                  </span>
                )}
                {isExit && (
                  <span className="relative z-[1] flex flex-col items-center justify-center">
                    <span className={cn("pixel-portal-vortex", success && "pixel-portal-vortex--open")} aria-hidden />
                    <span className="relative text-[8px] font-black tracking-wider text-amber-100">EXIT</span>
                  </span>
                )}
                {isHazard && (
                  <span className="relative z-[1] flex flex-col items-center justify-center gap-0.5">
                    <span className="text-lg leading-none sm:text-xl">👾</span>
                    <span className="text-[8px] font-black tracking-wider text-fuchsia-100">GLITCH</span>
                  </span>
                )}
                {!isStart && !isExit && !isHazard && isPath && (
                  <span className="relative z-[1] text-cyan-100/90">
                    {isRunner ? "🧑‍🚀" : isTrail ? "✦" : "◈"}
                  </span>
                )}
                {!isStart && !isExit && !isHazard && !isPath && (
                  <span className="relative z-[1] text-[10px] text-white/15 group-hover:text-white/35">＋</span>
                )}
                {isRunner && !isStart && !isExit && (
                  <span className="absolute inset-0 z-[2] grid place-items-center text-xl drop-shadow-[0_0_12px_#67e8f9]">
                    🧑‍🚀
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="relative z-[2] mt-3 text-center text-xs text-white/55">
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
          className="experience-btn-primary mission-invite-cta relative z-[2] mt-4 w-full disabled:opacity-50 sm:w-auto"
        >
          {running ? "▶ Playtesting…" : success ? "✓ Portal Open" : "▶ Playtest Level"}
        </button>
      </div>
    </LabMissionShell>
  );
}
