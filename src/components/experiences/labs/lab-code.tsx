"use client";

import { useState } from "react";

const STARTER = `# Mission: restore the beacon signal
message = "NOVA STANDBY"

if "READY" in message:
    print("Signal restored!")
else:
    print("Keep searching...")`;

type Props = { onComplete: (msg: string) => void };

export function LabCode({ onComplete }: Props) {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState("Buddy: Console ready. Edit the message and run.");
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function run() {
    setAttempts((a) => a + 1);
    const hasReady = code.includes("NOVA READY");
    const hasPrint = code.includes("print") && /Signal restored/i.test(code);

    if (hasReady && hasPrint) {
      setOutput(
        "Signal restored!\nNOVA connection: ONLINE\nChecksum: OK\n\n✓ Beacon handshake complete."
      );
      setSuccess(true);
      onComplete("Mission complete. You decoded and restored the NOVA signal.");
    } else if (!hasReady) {
      setOutput("Keep searching...\nHint: set message to exactly \"NOVA READY\".");
    } else {
      setOutput("Logic detected, but output wrong.\nHint: print must confirm \"Signal restored!\"");
    }
  }

  return (
    <div className="experience-lab rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs">
        <span className="font-bold uppercase tracking-wider text-[var(--exp-accent-2)]">
          Challenge: Edit → Run → Verify
        </span>
        <span className="text-white/60">Attempts: {attempts}</span>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#06131a] p-4">
        <textarea
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[240px] w-full resize-y border-0 bg-transparent font-mono text-sm leading-relaxed text-cyan-100 outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={run} className="experience-lab-btn experience-lab-btn-active">
            ▶ Run Mission
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(STARTER);
              setSuccess(false);
              setAttempts(0);
              setOutput("Buddy: Console ready. Edit the message and run.");
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
      <p
        className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-sm ${
          success
            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
            : "border-[var(--exp-accent)] bg-blue-50/90 text-nova-dark-gray"
        }`}
      >
        {success
          ? "Mission complete. You decoded and restored the NOVA signal."
          : "Set message to \"NOVA READY\" and print \"Signal restored!\" to unlock the next stage."}
      </p>
    </div>
  );
}
