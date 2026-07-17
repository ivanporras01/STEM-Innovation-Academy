"use client";

import { useState } from "react";

const STARTER = `message = "NOVA READY"

if "READY" in message:
    print("Signal restored!")
else:
    print("Keep searching...")`;

type Props = { onComplete: (msg: string) => void };

export function LabCode({ onComplete }: Props) {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState("Buddy: Console ready. Press Run Mission.");
  const [success, setSuccess] = useState(false);

  function run() {
    if (code.includes("READY") && code.includes("print")) {
      setOutput("Signal restored!\nNOVA connection: ONLINE\n\n✓ Mission objective achieved.");
      setSuccess(true);
      onComplete("Mission complete. Your condition restored the signal.");
    } else {
      setOutput("Keep searching...\nHint: include READY and print.");
    }
  }

  return (
    <div className="experience-lab rounded-2xl p-5 sm:p-6">
      <div className="rounded-xl border border-white/10 bg-[#06131a] p-4">
        <textarea
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[220px] w-full resize-y border-0 bg-transparent font-mono text-sm leading-relaxed text-cyan-100 outline-none"
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
              setOutput("Buddy: Console ready. Press Run Mission.");
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
          ? "Mission complete. Your condition restored the signal."
          : "Complete the mission to unlock the next stage."}
      </p>
    </div>
  );
}
