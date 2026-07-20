import { cn } from "@/lib/utils";
import { ListChecks, Radio, Target } from "lucide-react";

const PARTICLE_SEEDS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 7.5) % 84)}%`,
  top: `${12 + ((i * 11) % 70)}%`,
  dx: `${(i % 2 === 0 ? 1 : -1) * (20 + ((i * 7) % 40))}px`,
  dy: `${-30 - ((i * 13) % 50)}px`,
  color: i % 3 === 0 ? "#00b4d8" : i % 3 === 1 ? "#34d399" : "#fbbf24",
  delay: `${i * 0.08}s`,
}));

export function LabMissionShell({
  labCode,
  title,
  objective,
  steps,
  hint,
  attempts,
  children,
  status,
  success,
}: {
  labCode: string;
  title: string;
  objective: string;
  steps?: string[];
  hint?: string;
  attempts?: number;
  children: React.ReactNode;
  status: string;
  success: boolean;
}) {
  return (
    <div className={cn("lab-hud-shell", success && "lab-hud-shell--win")}>
      <div className="lab-hud-aurora" aria-hidden />
      <div className="lab-hud-scanline" aria-hidden />
      <div className="lab-hud-corner lab-hud-corner--tl" aria-hidden />
      <div className="lab-hud-corner lab-hud-corner--tr" aria-hidden />
      <div className="lab-hud-corner lab-hud-corner--bl" aria-hidden />
      <div className="lab-hud-corner lab-hud-corner--br" aria-hidden />

      {success && (
        <div className="lab-success-particles" aria-hidden>
          {PARTICLE_SEEDS.map((p) => (
            <span
              key={p.id}
              style={{
                left: p.left,
                top: p.top,
                background: p.color,
                animationDelay: p.delay,
                ["--dx" as string]: p.dx,
                ["--dy" as string]: p.dy,
              }}
            />
          ))}
        </div>
      )}

      <div className="lab-hud-header flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex flex-col items-center gap-1">
            <span
              className={cn(
                "lab-hud-status-led",
                success ? "lab-hud-status-led--success" : "lab-hud-status-led--live",
              )}
            />
            <Radio className="h-3 w-3 text-white/30" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--exp-accent-2)]">
              {labCode} · Mission Control HUD
            </p>
            <h3 className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">{title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider",
              success
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                : "border-white/15 bg-black/35 text-white/55",
            )}
          >
            {success ? "STATUS: COMPLETE" : "STATUS: ACTIVE"}
          </span>
          {typeof attempts === "number" && (
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
              Attempt {attempts}
            </span>
          )}
        </div>
      </div>

      <div className="lab-hud-objective relative z-[3] px-5 py-4">
        <div className="flex gap-3">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-[var(--exp-accent)] drop-shadow-[0_0_8px_color-mix(in_srgb,var(--exp-accent)_55%,transparent)]" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--exp-accent-2)]">
              Mission objective
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/90">{objective}</p>
            {hint && !success && (
              <p className="mt-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/60">
                <span className="font-semibold text-[var(--exp-accent-2)]">Buddy hint:</span> {hint}
              </p>
            )}
          </div>
        </div>
      </div>

      {steps && steps.length > 0 && !success && (
        <div className="lab-hud-steps relative z-[3] px-5 py-4">
          <div className="flex gap-3">
            <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400/90">
                Your mission — follow these steps
              </p>
              <ol className="mt-3 space-y-2.5">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm leading-snug text-white/85">
                    <span className="lab-step-index flex h-6 w-6 shrink-0 items-center justify-center text-xs font-black text-[var(--exp-accent-2)]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      <div className="experience-lab relative z-[3] p-5 sm:p-6">{children}</div>

      <div
        className={cn(
          "lab-hud-status relative z-[3] px-5 py-4 text-sm font-medium",
          success ? "lab-hud-status--win" : "lab-hud-status--live",
        )}
      >
        {status}
      </div>
    </div>
  );
}
