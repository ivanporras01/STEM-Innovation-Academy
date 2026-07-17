"use client";

import { useState } from "react";
import { LabMissionShell } from "./lab-mission-shell";

const STARTER = `# NOVA Signal Decoder — edit below
message = "NOVA STANDBY"

if "READY" in message:
    print("Signal restored!")
else:
    print("Keep searching...")`;

type Props = { onComplete: (msg: string) => void };

export function LabCode({ onComplete }: Props) {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState("▸ Console armed. Waiting for Explorer input…");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [signalStrength, setSignalStrength] = useState(12);

  function run() {
    setAttempts((a) => a + 1);
    const hasReady = code.includes("NOVA READY");
    const hasPrint = code.includes("print") && /Signal restored/i.test(code);

    if (hasReady && hasPrint) {
      setSignalStrength(100);
      setOutput(
        "▸ Running decoder…\n▸ Pattern match: NOVA READY\n▸ Signal restored!\n▸ NOVA uplink: ONLINE\n▸ Checksum: VALID\n\n✓ Beacon handshake complete."
      );
      setSuccess(true);
      onComplete("Mission complete. You decoded and restored the NOVA signal.");
    } else if (!hasReady) {
      setSignalStrength(Math.min(40, signalStrength + 8));
      setOutput("▸ Scanning… no READY token found.\n▸ Hint: set message = \"NOVA READY\"");
    } else {
      setSignalStrength(Math.min(65, signalStrength + 10));
      setOutput("▸ READY token found.\n▸ Output mismatch — print must confirm restoration.");
    }
  }

  return (
    <LabMissionShell
      labCode="NOVA LAB 001"
      title="Signal Decoder Console"
      objective='Fix the beacon script: set message to "NOVA READY" and print "Signal restored!" when the pattern matches.'
      hint='Look at the if-condition — what string must live inside message?'
      attempts={attempts}
      success={success}
      status={
        success
          ? "✓ Mission complete — NOVA signal restored."
          : 'Edit the code, run the decoder, and reach 100% signal strength.'
      }
    >
      <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Signal strength</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--exp-accent)] to-emerald-400 transition-all duration-500"
              style={{ width: `${signalStrength}%` }}
            />
          </div>
        </div>
        <span className="text-2xl font-black text-[var(--exp-accent-2)]">{signalStrength}%</span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#06131a] p-4">
        <textarea
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[220px] w-full resize-y border-0 bg-transparent font-mono text-sm leading-relaxed text-cyan-100 outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={run} className="experience-lab-btn experience-lab-btn-active">
            ▶ Run Decoder
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(STARTER);
              setSuccess(false);
              setSignalStrength(12);
              setAttempts(0);
              setOutput("▸ Console armed. Waiting for Explorer input…");
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
