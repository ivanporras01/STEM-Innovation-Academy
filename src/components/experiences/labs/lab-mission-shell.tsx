import { cn } from "@/lib/utils";
import { Target } from "lucide-react";

export function LabMissionShell({
  labCode,
  title,
  objective,
  hint,
  attempts,
  children,
  status,
  success,
}: {
  labCode: string;
  title: string;
  objective: string;
  hint?: string;
  attempts?: number;
  children: React.ReactNode;
  status: string;
  success: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0a1628] px-5 py-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--exp-accent-2)]">
            {labCode} · NOVA Interactive LAB
          </p>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        {typeof attempts === "number" && (
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
            Attempt {attempts}
          </span>
        )}
      </div>

      <div className="border-b border-white/10 bg-[#071225] px-5 py-4">
        <div className="flex gap-3">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-[var(--exp-accent)]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--exp-accent-2)]">
              Mission objective
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/90">{objective}</p>
            {hint && !success && (
              <p className="mt-2 text-xs text-white/55">
                <span className="font-semibold text-[var(--exp-accent-2)]">Buddy hint:</span> {hint}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="experience-lab p-5 sm:p-6">{children}</div>

      <div
        className={cn(
          "border-t px-5 py-4 text-sm font-medium",
          success
            ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
            : "border-[var(--exp-accent)]/30 bg-[#0a1628]/80 text-white/80"
        )}
      >
        {status}
      </div>
    </div>
  );
}
