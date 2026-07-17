"use client";

import { useState } from "react";
import { LabMissionShell } from "./lab-mission-shell";

const STARTER = `# Relay Theta-9 · Decoder Patch
message = "NOVA STANDBY"

if "READY" in message:
    print("Signal restored!")
else:
    print("Keep searching...")

# Step 2: activate uplink after signal is restored
# uplink_active = True
# print("Uplink: ONLINE")`;

type Props = { onComplete: (msg: string) => void };

export function LabCode({ onComplete }: Props) {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState("▸ Mission Control standing by…");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [signalStrength, setSignalStrength] = useState(8);
  const [phase, setPhase] = useState<1 | 2>(1);

  function run() {
    setAttempts((a) => a + 1);
    const hasReady = code.includes("NOVA READY");
    const hasRestorePrint = code.includes("print") && /Signal restored/i.test(code);
    const hasUplink =
      (code.includes("Uplink: ONLINE") || code.includes('"Uplink: ONLINE"')) &&
      code.includes("print");
    const uplinkVar =
      /uplink_active\s*=\s*True/.test(code) || /uplink\s*=\s*True/.test(code);

    if (hasReady && hasRestorePrint && (hasUplink || uplinkVar)) {
      setSignalStrength(100);
      setPhase(2);
      setOutput(
        "▸ Phase 1: Pattern match NOVA READY ✓\n▸ Phase 2: Uplink handshake ✓\n▸ Relay Theta-9: ONLINE\n▸ 2,400 Explorers reconnected\n\n✓ MISSION SUCCESS — Signal Coder"
      );
      setSuccess(true);
      onComplete("Mission complete. Relay Theta-9 is online.");
    } else if (hasReady && hasRestorePrint) {
      setSignalStrength(72);
      setPhase(2);
      setOutput(
        "▸ Phase 1 complete — signal restored!\n▸ Phase 2 pending: uncomment uplink lines OR add print(\"Uplink: ONLINE\")"
      );
    } else if (!hasReady) {
      setSignalStrength(Math.min(35, signalStrength + 6));
      setOutput('▸ No READY token.\n▸ Fix: message = "NOVA READY"');
    } else {
      setSignalStrength(Math.min(55, signalStrength + 8));
      setOutput("▸ Signal logic incomplete.\n▸ Need print confirming Signal restored!");
    }
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 001"
      title="Relay Theta-9 · Signal Decoder"
      objective='Two-phase repair: (1) set message to "NOVA READY" + restore print, (2) activate uplink with print("Uplink: ONLINE").'
      hint="Uncomment the uplink lines at the bottom — or write your own print for Uplink: ONLINE."
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ Relay Theta-9 ONLINE — 2,400 Explorers reconnected."
          : phase === 2
            ? "Phase 1 done! Complete Phase 2 — activate the uplink."
            : "Patch the decoder and bring signal strength to 100%."
      }
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
          <p className="text-[10px] font-bold uppercase text-white/50">Signal</p>
          <p className="text-xl font-black text-[var(--exp-accent-2)]">{signalStrength}%</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
          <p className="text-[10px] font-bold uppercase text-white/50">Phase</p>
          <p className="text-xl font-black text-white">{phase}/2</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
          <p className="text-[10px] font-bold uppercase text-white/50">Relay</p>
          <p className={`text-sm font-bold ${success ? "text-emerald-400" : "text-red-400"}`}>
            {success ? "ONLINE" : "OFFLINE"}
          </p>
        </div>
      </div>

      <div className="mb-4 flex h-12 items-end gap-0.5 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-[var(--exp-accent)] transition-all duration-300"
            style={{
              height: `${success ? 80 + Math.sin(i * 0.8) * 20 : 12 + (signalStrength / 100) * 40 * Math.abs(Math.sin(i * 0.5))}%`,
              opacity: success ? 0.9 : 0.3 + (signalStrength / 100) * 0.5,
            }}
          />
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#06131a] p-4">
        <textarea
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[260px] w-full resize-y border-0 bg-transparent font-mono text-sm leading-relaxed text-cyan-100 outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={run} className="experience-lab-btn experience-lab-btn-active">
            ▶ Transmit Patch
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(STARTER);
              setSuccess(false);
              setSignalStrength(8);
              setPhase(1);
              setAttempts(0);
              setOutput("▸ Mission Control standing by…");
            }}
            className="experience-lab-btn"
          >
            Reset
          </button>
        </div>
        <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-black/30 p-3 font-mono text-xs text-emerald-300">
          {output}
        </pre>
      </div>
    </LabMissionShell>
  );
}
