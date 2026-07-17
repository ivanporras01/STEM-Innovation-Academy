"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LabMissionShell } from "./lab-mission-shell";

type Props = { onComplete: (msg: string) => void };

const PLANTS = ["🌱", "🌿", "🪴", "🌱", "🌿", "🪴", "🌱", "🌿", "🪴", "🌱"];

function TempGauge({ temp, threshold }: { temp: number; threshold: number }) {
  const pct = Math.min(100, Math.max(0, ((temp - 20) / 20) * 100));
  const danger = temp > 28;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference * 0.75;

  return (
    <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={danger ? "#ef4444" : "#10b981"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="lab-gauge-arc transition-all duration-500"
          style={{ transformOrigin: "50px 50px", transform: "rotate(135deg)" }}
        />
        <text x="50" y="48" textAnchor="middle" className="fill-white text-[14px] font-black">
          {temp.toFixed(1)}°
        </text>
        <text x="50" y="62" textAnchor="middle" className="fill-white/40 text-[8px]">
          limit {threshold}°C
        </text>
      </svg>
      {danger && (
        <span className="absolute -top-1 right-0 h-2 w-2 animate-ping rounded-full bg-red-500" />
      )}
    </div>
  );
}

export function LabIot({ onComplete }: Props) {
  const [threshold, setThreshold] = useState(32);
  const [auto, setAuto] = useState(false);
  const [temp, setTemp] = useState(34);
  const [fan, setFan] = useState("STANDBY");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [viability, setViability] = useState(88);
  const [alertSent, setAlertSent] = useState(false);
  const [heatAlert, setHeatAlert] = useState(false);

  useEffect(() => {
    if (success || temp <= 28) return;
    const t = setInterval(() => {
      setViability((v) => Math.max(40, v - 2));
      setTemp((t) => Math.min(36, t + 0.3));
    }, 4000);
    return () => clearInterval(t);
  }, [success, temp]);

  useEffect(() => {
    setHeatAlert(temp > 30 && !success);
  }, [temp, success]);

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
    setHeatAlert(false);
    onComplete("Automation protected the greenhouse.");
  }

  function simulateHeat() {
    setTemp(34);
    setViability((v) => Math.max(50, v - 5));
    setHeatAlert(true);
  }

  const dangerZone = threshold > 28;

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
      {heatAlert && !success && (
        <div className="lab-alert-banner lab-alert-banner--danger mb-4">
          ⚠ HEAT SPIKE DETECTED — Crops at risk! Configure automation now.
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div
          className={cn(
            "lab-telemetry-panel",
            viability < 60 && "border-red-500/40"
          )}
        >
          <p className="text-[10px] font-bold uppercase text-white/50">Crop viability</p>
          <p className="mt-1 text-2xl font-black text-white">{Math.round(viability)}%</p>
          <div className="lab-telemetry-bar mt-2">
            <div
              className={cn(
                "lab-telemetry-bar-fill",
                viability < 60 ? "lab-telemetry-bar-fill--danger" : "lab-telemetry-bar-fill--success"
              )}
              style={{ width: `${viability}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-white/50">200 student projects</p>
        </div>
        <div className="lab-telemetry-panel flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold uppercase text-white/50">Temperature</p>
          <TempGauge temp={temp} threshold={threshold} />
        </div>
        <div className="lab-telemetry-panel">
          <p className="text-[10px] font-bold uppercase text-white/50">System status</p>
          <p className={`mt-1 text-lg font-black ${alertSent ? "text-emerald-400" : auto ? "text-amber-400" : "text-white/50"}`}>
            {success ? "PROTECTED" : auto ? "ARMED" : "DISARMED"}
          </p>
          <p className="mt-1 text-[10px] text-white/50">{fan}</p>
          {alertSent && (
            <p className="mt-1 text-[10px] font-bold text-emerald-400">Dashboard alert sent ✓</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">
          Greenhouse bay · Live view
        </p>
        <div className="lab-greenhouse-grid">
          {PLANTS.map((plant, i) => (
            <div
              key={i}
              className={cn(
                "lab-greenhouse-plant aspect-square",
                success || viability > 75
                  ? "lab-greenhouse-plant--healthy"
                  : viability < 60
                    ? "lab-greenhouse-plant--wilting"
                    : ""
              )}
            >
              {plant}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="lab-telemetry-panel p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Sensor array</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[10px]">
            {[
              ["Humidity", "58%", true],
              ["Soil moisture", "42%", true],
              ["Light", "920 lux", true],
              ["CO₂", "418 ppm", true],
            ].map(([k, v, ok]) => (
              <div key={k as string} className="rounded-lg border border-white/10 bg-white/5 px-2 py-2">
                <span className="block text-white/40">{k}</span>
                <strong className="text-white/90">{v}</strong>
                <span className={`ml-1 ${ok ? "text-emerald-400" : "text-red-400"}`}>
                  {ok ? "●" : "○"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lab-telemetry-panel p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Automation rules</p>

          <label className="mt-4 block text-sm text-white/80">
            Cooling threshold:{" "}
            <strong className={dangerZone ? "text-red-400" : "text-emerald-400"}>
              {threshold}°C
            </strong>
          </label>
          <div className="relative mt-2">
            <div
              className="pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 rounded bg-red-500/30"
              style={{ left: `${((28 - 24) / (36 - 24)) * 100}%`, width: `${((36 - 28) / (36 - 24)) * 100}%` }}
            />
            <input
              type="range"
              min={24}
              max={36}
              value={threshold}
              onChange={(e) => setThreshold(+e.target.value)}
              className="relative z-[1] w-full accent-[var(--exp-accent)]"
            />
          </div>
          <p className="mt-1 text-[10px] text-white/40">
            Safe zone: ≤ 28°C · Red zone = danger
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-white/80">Automatic cooling + alerts</span>
            <button
              type="button"
              role="switch"
              aria-checked={auto}
              onClick={() => setAuto(!auto)}
              className={cn("lab-arm-toggle", auto ? "lab-arm-toggle--on" : "lab-arm-toggle--off")}
            >
              <span
                className="lab-arm-knob"
                style={{ left: auto ? "calc(100% - 26px)" : "2px" }}
              />
            </button>
          </div>
          <p className={cn("mt-1 text-[10px] font-bold uppercase", auto ? "text-emerald-400" : "text-red-400")}>
            {auto ? "● Systems armed" : "○ Disarmed — arm before testing"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={test} className="experience-lab-btn experience-lab-btn-active">
          Run Emergency Test
        </button>
        <button
          type="button"
          onClick={simulateHeat}
          className="experience-lab-btn"
          disabled={success}
        >
          Simulate Heat Spike
        </button>
      </div>
    </LabMissionShell>
  );
}
