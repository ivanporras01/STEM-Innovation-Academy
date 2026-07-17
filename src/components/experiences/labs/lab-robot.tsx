"use client";

import { useState } from "react";

type Props = { onComplete: (msg: string) => void };

export function LabRobot({ onComplete }: Props) {
  const [cmds, setCmds] = useState<string[]>([]);
  const [roverDisplay, setRoverDisplay] = useState("🤖 · · · 🛟");
  const [success, setSuccess] = useState(false);

  function add(cmd: string) {
    setCmds((c) => [...c, cmd]);
  }

  function launch() {
    const forwards = cmds.filter((x) => x === "F").length;
    if (forwards >= 3 && cmds.includes("R")) {
      setRoverDisplay("🤖 ➜ ➜ ➜ 🛟");
      setSuccess(true);
      onComplete("Route confirmed. The rover reached the rescue module.");
    } else {
      setRoverDisplay("Route incomplete. Try 3 Forward + 1 Right.");
    }
  }

  return (
    <div className="experience-lab rounded-2xl p-5 sm:p-6">
      <div className="rounded-xl border border-white/10 bg-[#06131a] p-6">
        <div className="min-h-[120px] text-center text-4xl transition-all duration-700 sm:text-5xl">
          {roverDisplay}
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
          <button type="button" onClick={() => setCmds([])} className="experience-lab-btn">
            Clear
          </button>
          <button type="button" onClick={launch} className="experience-lab-btn experience-lab-btn-active">
            Launch
          </button>
        </div>
        <p className="mt-4 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-white/80">
          Sequence: {cmds.length ? cmds.join(" → ") : "—"}
        </p>
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
          : "Complete the mission to unlock the next stage."}
      </p>
    </div>
  );
}
