"use client";

import { useEffect, useState } from "react";
import { LabMissionShell } from "./lab-mission-shell";

type Props = { onComplete: (msg: string) => void };

export function LabIot({ onComplete }: Props) {
  const [threshold, setThreshold] = useState(32);
  const [auto, setAuto] = useState(false);
  const [temp, setTemp] = useState(34);
  const [fan, setFan] = useState("STANDBY");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [viability, setViability] = useState(88);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    if (success || temp <= 28) return;
    const t = setInterval(() => {
      setViability((v) => Math.max(40, v - 2));
      setTemp((t) => Math.min(36, t + 0.3));
    }, 4000);
    return () => clearInterval(t);
  }, [success, temp]);

  function test() {
    setAttempts((a) => a + 1);

    if (!auto) {
      setFan("ERROR — Arm automation first.");
      return;
    }
    if (threshold > 28) {
      setFan(`ERROR — ${threshold}°C exceeds safe max (28°C).`);
      return;
    }
    if (temp <= threshold) {
      setFan("ERROR — Simulate heat spike, then test.");
      return;
    }

    setTemp(26);
    setFan("COOLING ACTIVE");
    setAlertSent(true);
    setViability(95);
    setSuccess(true);
    onComplete("Automation protected the greenhouse.");
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 003"
      title="Greenhouse Command Center"
      objective="Save 200 research crops: threshold ≤ 28°C, arm automation, simulate heat spike, run system test."
      hint="Plant viability drops while temperature stays high. Move fast — configure, arm, test."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ 200 student research projects protected. Automation verified."
          : `Crop viability ${Math.round(viability)}% — configure before it hits critical.`
      }
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div
          className={`rounded-xl border px-4 py-3 ${
            viability < 60
              ? "border-red-500/40 bg-red-950/40"
              : "border-emerald-500/30 bg-emerald-950/30"
          }`}
        >
          <p className="text-[10px] font-bold uppercase text-white/50">Crop viability</p>
          <p className="text-2xl font-black text-white">{Math.round(viability)}%</p>
          <p className="text-[10px] text-white/50">200 student projects</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase text-white/50">Temperature</p>
          <p className={`text-2xl font-black ${temp > 28 ? "text-red-400" : "text-emerald-400"}`}>
            {temp.toFixed(1)}°C
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase text-white/50">Dashboard</p>
          <p className={`text-sm font-bold ${alertSent ? "text-emerald-400" : "text-white/50"}`}>
            {alertSent ? "Alert sent ✓" : "No alert"}
          </p>
          <p className="text-[10px] text-white/50">{fan}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#06131a] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Sensor array</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[10px]">
            {[
              ["Humidity", "58%", "ok"],
              ["Soil moisture", "42%", "ok"],
              ["Light", "920 lux", "ok"],
              ["CO₂", "418 ppm", "ok"],
            ].map(([k, v, status]) => (
              <div key={k} className="rounded-lg border border-white/10 bg-white/5 px-2 py-2">
                <span className="block text-white/40">{k}</span>
                <strong className="text-white/90">{v}</strong>
                <span className="ml-1 text-emerald-400">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#06131a] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Automation rules</p>
          <label className="mt-4 block text-sm text-white/80">
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
            <span>Arm automatic cooling + dashboard alerts</span>
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={test} className="experience-lab-btn experience-lab-btn-active">
          Run Emergency Test
        </button>
        <button
          type="button"
          onClick={() => {
            setTemp(34);
            setViability((v) => Math.max(50, v - 5));
          }}
          className="experience-lab-btn"
          disabled={success}
        >
          Simulate Heat Spike
        </button>
      </div>
    </LabMissionShell>
  );
}
