"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
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

  const phase1Done = phase === 2 || success;

  return (
    <LabMissionShell
      labCode="NOVA LAB 001"
      title="Relay Theta-9 · Signal Decoder"
      objective='Restore NOVA’s deep-space relay by fixing two things in the code: the message must say "NOVA READY", then the uplink must confirm "Uplink: ONLINE".'
      steps={[
        'In the editor, change message = "NOVA STANDBY" to message = "NOVA READY".',
        'Click ▶ Transmit Patch — the console should confirm Phase 1 (signal restored).',
        'Uncomment the two uplink lines at the bottom — or add print("Uplink: ONLINE") yourself.',
        "Transmit again until Signal strength hits 100% and Relay Theta-9 shows ONLINE.",
      ]}
      hint="Watch the Signal strength bar — it climbs as you fix each phase."
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
      <div className="mb-4 flex flex-wrap gap-2">
        <div className={phase1Done ? "lab-phase-step lab-phase-step--done" : "lab-phase-step lab-phase-step--active"}>
          <span>{phase1Done ? "✓" : "1"}</span> Decode Signal
        </div>
        <div className={success ? "lab-phase-step lab-phase-step--done" : phase === 2 ? "lab-phase-step lab-phase-step--active" : "lab-phase-step lab-phase-step--pending"}>
          <span>{success ? "✓" : "2"}</span> Activate Uplink
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="lab-telemetry-panel">
          <p className="text-[10px] font-bold uppercase text-white/50">Signal strength</p>
          <p className="mt-1 text-2xl font-black text-[var(--exp-accent-2)]">{signalStrength}%</p>
          <div className="lab-telemetry-bar mt-2">
            <div
              className={cn(
                "lab-telemetry-bar-fill",
                success && "lab-telemetry-bar-fill--success"
              )}
              style={{ width: `${signalStrength}%` }}
            />
          </div>
        </div>
        <div className="lab-telemetry-panel text-center">
          <p className="text-[10px] font-bold uppercase text-white/50">Phase</p>
          <p className="mt-1 text-2xl font-black text-white">{phase}/2</p>
        </div>
        <div className="lab-telemetry-panel text-center">
          <p className="text-[10px] font-bold uppercase text-white/50">Relay Theta-9</p>
          <p className={`mt-1 text-lg font-black ${success ? "text-emerald-400" : "text-red-400"}`}>
            {success ? "ONLINE" : "OFFLINE"}
          </p>
          <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${success ? "bg-emerald-400" : "bg-red-500 animate-pulse"}`} />
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">Live waveform</p>
        <div className="lab-waveform">
          {Array.from({ length: 32 }, (_, i) => (
            <div
              key={i}
              className="lab-waveform-bar"
              style={{
                height: `${success ? 70 + Math.sin(i * 0.6 + Date.now() / 500) * 25 : 8 + (signalStrength / 100) * 50 * Math.abs(Math.sin(i * 0.45))}%`,
                opacity: success ? 0.95 : 0.25 + (signalStrength / 100) * 0.6,
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="lab-editor-pane">
          <div className="lab-editor-header">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2">decoder_patch.py</span>
          </div>
          <textarea
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[280px] w-full resize-y border-0 bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-cyan-100 outline-none"
          />
          <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
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
        </div>

        <div className="lab-console p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
            ▸ Mission Control Console
          </p>
          <pre className="whitespace-pre-wrap text-emerald-300/90">{output}</pre>
          {success && (
            <p className="mt-4 animate-pulse text-center text-xs font-bold uppercase tracking-widest text-emerald-400">
              Signal lock achieved
            </p>
          )}
        </div>
      </div>
    </LabMissionShell>
  );
}
