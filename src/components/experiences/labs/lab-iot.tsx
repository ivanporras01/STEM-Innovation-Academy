"use client";

import { useState } from "react";

type Props = { onComplete: (msg: string) => void };

export function LabIot({ onComplete }: Props) {
  const [threshold, setThreshold] = useState(32);
  const [auto, setAuto] = useState(false);
  const [temp, setTemp] = useState(34);
  const [fan, setFan] = useState("🌀 OFFLINE");
  const [success, setSuccess] = useState(false);

  function test() {
    if (auto && threshold < 30) {
      setTemp(27);
      setFan("🌀 ACTIVE — Cooling engaged");
      setSuccess(true);
      onComplete("Automation protected the greenhouse.");
    } else {
      setFan("Set threshold below 30°C and activate automation.");
    }
  }

  return (
    <div className="experience-lab rounded-2xl p-5 sm:p-6">
      <div className="rounded-xl border border-white/10 bg-[#06131a] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <small className="text-xs uppercase tracking-wider text-white/50">Live Temperature</small>
            <div className="text-5xl font-black sm:text-6xl">{temp}°C</div>
          </div>
          <div className="text-xl font-bold sm:text-2xl">{fan}</div>
        </div>
        <label className="mt-8 block text-sm">
          Cooling threshold: <strong>{threshold}°C</strong>
        </label>
        <input
          type="range"
          min={24}
          max={36}
          value={threshold}
          onChange={(e) => setThreshold(+e.target.value)}
          className="mt-2 w-full accent-[var(--exp-accent)]"
        />
        <label className="mt-6 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={auto}
            onChange={(e) => setAuto(e.target.checked)}
            className="h-5 w-5 rounded accent-[var(--exp-accent)]"
          />
          <span>Activate automatic cooling</span>
        </label>
        <div className="mt-6">
          <button type="button" onClick={test} className="experience-lab-btn experience-lab-btn-active">
            Test Smart System
          </button>
        </div>
      </div>
      <p
        className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-sm ${
          success
            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
            : "border-[var(--exp-accent)] bg-blue-50/90 text-nova-dark-gray"
        }`}
      >
        {success
          ? "Automation protected the greenhouse."
          : "Complete the mission to unlock the next stage."}
      </p>
    </div>
  );
}
