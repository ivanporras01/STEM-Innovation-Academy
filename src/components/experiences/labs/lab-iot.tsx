"use client";

import { useState } from "react";
import { LabMissionShell } from "./lab-mission-shell";

type Props = { onComplete: (msg: string) => void };

export function LabIot({ onComplete }: Props) {
  const [threshold, setThreshold] = useState(32);
  const [auto, setAuto] = useState(false);
  const [temp, setTemp] = useState(34);
  const [fan, setFan] = useState("STANDBY");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function test() {
    setAttempts((a) => a + 1);

    if (!auto) {
      setFan("ERROR — Arm automation before testing.");
      return;
    }
    if (threshold > 28) {
      setFan(`ERROR — Threshold ${threshold}°C exceeds safe max (28°C).`);
      return;
    }
    if (temp <= threshold) {
      setFan("ERROR — Trigger a heat spike first, then test cooling.");
      return;
    }

    setTemp(26);
    setFan("ACTIVE — Cooling + dashboard alert sent");
    setSuccess(true);
    onComplete("Automation protected the greenhouse.");
  }

  const tempStatus =
    temp > 30 ? "critical" : temp > 28 ? "warning" : "normal";

  return (
    <LabMissionShell
      labCode="NOVA LAB 003"
      title="Smart Greenhouse Control"
      objective="Configure the cooling system: set threshold ≤ 28°C, enable automation, simulate a heat spike, then run a live test."
      hint="Plants overheat above 28°C. Automation must be armed before testing."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ Mission complete — greenhouse protected by automation."
          : "Configure → arm automation → simulate heat → test system."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#06131a] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            Live sensor feed
          </p>
          <div
            className={`mt-2 text-5xl font-black ${
              tempStatus === "critical"
                ? "text-red-400"
                : tempStatus === "warning"
                  ? "text-amber-400"
                  : "text-emerald-400"
            }`}
          >
            {temp}°C
          </div>
          <p className="mt-1 text-xs text-white/50">Safe zone: ≤ 28°C</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
            {[
              ["Humidity", "62%"],
              ["Light", "840 lux"],
              ["CO₂", "412 ppm"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-white/10 bg-white/5 px-2 py-2">
                <span className="block text-white/40">{k}</span>
                <strong className="text-white/90">{v}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#06131a] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            Automation status
          </p>
          <p
            className={`mt-2 text-lg font-bold ${
              fan.startsWith("ACTIVE")
                ? "text-emerald-400"
                : fan.startsWith("ERROR")
                  ? "text-red-400"
                  : "text-white/70"
            }`}
          >
            {fan}
          </p>
          <label className="mt-6 block text-sm text-white/80">
            Cooling threshold: <strong className="text-white">{threshold}°C</strong>
          </label>
          <input
            type="range"
            min={24}
            max={36}
            value={threshold}
            onChange={(e) => setThreshold(+e.target.value)}
            className="mt-2 w-full accent-[var(--exp-accent)]"
          />
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={auto}
              onChange={(e) => setAuto(e.target.checked)}
              className="h-5 w-5 rounded accent-[var(--exp-accent)]"
            />
            <span>Arm automatic cooling + alerts</span>
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={test} className="experience-lab-btn experience-lab-btn-active">
          Run System Test
        </button>
        <button
          type="button"
          onClick={() => setTemp(34)}
          className="experience-lab-btn"
          disabled={success}
        >
          Simulate Heat Spike (+34°C)
        </button>
      </div>
    </LabMissionShell>
  );
}
