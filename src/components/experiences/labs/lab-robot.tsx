"use client";

import { useState } from "react";

const TARGET = ["F", "F", "F", "R"] as const;
const GRID = ["🪨", "·", "·", "🛟"];
const OBSTACLE_AT = 2;

type Props = { onComplete: (msg: string) => void };

export function LabRobot({ onComplete }: Props) {
  const [cmds, setCmds] = useState<string[]>([]);
  const [roverPos, setRoverPos] = useState(0);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState("Plot a route: 3 Forward, then 1 Right — avoid the rock.");

  function add(cmd: string) {
    if (success) return;
    setCmds((c) => [...c, cmd]);
  }

  function launch() {
    const sequence = cmds.join(",");
    const target = TARGET.join(",");

    if (sequence === target) {
      setRoverPos(3);
      setSuccess(true);
      setFeedback("Route confirmed. The rover reached the rescue module.");
      onComplete("Route confirmed. The rover reached the rescue module.");
      return;
    }

    if (cmds.length < 4) {
      setFeedback("Route too short. You need exactly 4 commands.");
    } else if (cmds.filter((x) => x === "F").length < 3) {
      setFeedback("Not enough Forward moves — the module is straight ahead.");
    } else if (!cmds.includes("R")) {
      setFeedback("Add a Right turn at the end to align with the rescue dock.");
    } else if (cmds[OBSTACLE_AT] === "F" && cmds.length > OBSTACLE_AT) {
      setRoverPos(OBSTACLE_AT);
      setFeedback("Crash! Obstacle at tile 3 — try turning before you advance.");
    } else {
      setFeedback("Sequence incorrect. Hint: F → F → F → R in that exact order.");
    }
  }

  const displayGrid = GRID.map((cell, i) => {
    if (i === roverPos && success) return "🤖";
    if (i === roverPos && !success && cmds.length > 0) return "🤖";
    return cell;
  });

  return (
    <div className="experience-lab rounded-2xl p-5 sm:p-6">
      <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/75">
        <strong className="text-[var(--exp-accent-2)]">Mission grid</strong> — navigate to 🛟 without
        hitting 🪨. Required sequence: <code className="text-nova-cyan">F, F, F, R</code>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#06131a] p-6">
        <div className="grid grid-cols-4 gap-2 rounded-lg bg-black/20 p-4">
          {displayGrid.map((cell, i) => (
            <div
              key={i}
              className="flex h-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-2xl sm:h-16 sm:text-3xl"
            >
              {cell}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ["F", "↑ Forward"],
            ["R", "↻ Right"],
            ["L", "↺ Left"],
          ].map(([c, label]) => (
            <button key={c} type="button" onClick={() => add(c)} className="experience-lab-btn">
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setCmds([]);
              setRoverPos(0);
              setSuccess(false);
              setFeedback("Plot a route: 3 Forward, then 1 Right — avoid the rock.");
            }}
            className="experience-lab-btn"
          >
            Clear
          </button>
          <button type="button" onClick={launch} className="experience-lab-btn experience-lab-btn-active">
            Launch Route
          </button>
        </div>
        <p className="mt-4 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-white/80">
          Sequence: {cmds.length ? cmds.join(" → ") : "—"} ({cmds.length}/4)
        </p>
        <p className="mt-2 text-xs text-white/60">{feedback}</p>
      </div>
      <p
        className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-sm ${
          success
            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
            : "border-[var(--exp-accent)] bg-blue-50/90 text-nova-dark-gray"
        }`}
      >
        {success
          ? "Route confirmed. The rover reached the rescue module."
          : "Program the exact 4-step route to unlock the next stage."}
      </p>
    </div>
  );
}
