"use client";

import { useState } from "react";

type Props = { onComplete: (msg: string) => void };

export function LabIot({ onComplete }: Props) {
  const [threshold, setThreshold] = useState(32);
  const [auto, setAuto] = useState(false);
  const [temp, setTemp] = useState(34);
  const [fan, setFan] = useState("🌀 STANDBY");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function test() {
    setAttempts((a) => a + 1);

    if (!auto) {
      setFan("⚠ Enable automatic cooling first.");
      return;
    }
    if (threshold > 28) {
      setFan(`⚠ Threshold ${threshold}°C is too high — plants overheat above 28°C.`);
      return;
    }
    if (temp <= threshold) {
      setFan("⚠ Already cool — raise live temp or lower threshold to trigger automation.");
      return;
    }

    setTemp(26);
    setFan("🌀 ACTIVE — Cooling engaged · Alert sent to dashboard");
    setSuccess(true);
    onComplete("Automation protected the greenhouse.");
  }

  return (
    <div className="experience-lab rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs">
        <span className="font-bold uppercase tracking-wider text-[var(--exp-accent-2)]">
          Challenge: Configure → Arm → Test
        </span>
        <span className="text-white/60">Tests: {attempts}</span>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#06131a] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <small className="text-xs uppercase tracking-wider text-white/50">Live Temperature</small>
            <div
              className={`text-5xl font-black sm:text-6xl ${temp > 28 ? "text-red-400" : "text-emerald-400"}`}
            >
              {temp}°C
            </div>
            <p className="mt-1 text-xs text-white/50">Safe zone: ≤ 28°C</p>
          </div>
          <div className="max-w-[200px] text-right text-sm font-bold sm:text-base">{fan}</div>
        </div>
        <label className="mt-8 block text-sm">
          Cooling threshold: <strong>{threshold}°C</strong>
          {threshold > 28 && (
            <span className="ml-2 text-xs text-red-400">(too high — lower it)</span>
          )}
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
          <span>Activate automatic cooling + dashboard alert</span>
        </label>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={test} className="experience-lab-btn experience-lab-btn-active">
            Test Smart System
          </button>
          <button
            type="button"
            onClick={() => setTemp(34)}
            className="experience-lab-btn"
            disabled={success}
          >
            Simulate heat spike
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
          : "Set threshold ≤ 28°C, enable automation, then test while temperature is above threshold."}
      </p>
    </div>
  );
}
