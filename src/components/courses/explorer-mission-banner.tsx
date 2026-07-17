import { NOVA_EXPLORER_KIT, getKitLabel, type KitTier } from "@/lib/nova-kit";
import type { MentorMissionMeta } from "@/lib/pathways/mentor-missions";
import { Sparkles, Wrench, Users } from "lucide-react";

const ENCOURAGEMENT = [
  "Every breakthrough starts with a curious Explorer — that's you.",
  "No perfect answers required — only honest trying and growing.",
  "Your Innovation Mentor is cheering for you, not grading you.",
  "Mistakes are data. You're doing science.",
  "Build messy, learn fast, shine bright.",
] as const;

function pickEncouragement(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash + seed.charCodeAt(i)) | 0;
  return ENCOURAGEMENT[Math.abs(hash) % ENCOURAGEMENT.length];
}

export function ExplorerMissionBanner({
  lessonTitle,
  lessonType,
  meta,
  courseSlug,
}: {
  lessonTitle: string;
  lessonType: string;
  meta?: MentorMissionMeta;
  courseSlug: string;
}) {
  const isLab = lessonType === "LAB" || lessonType === "PROJECT";
  if (!isLab) return null;

  const encouragement = meta?.explorerNote ?? pickEncouragement(`${courseSlug}-${lessonTitle}`);
  const kitTier: KitTier = meta?.kitTier ?? "base";
  const mentorLed = meta?.mentorLed ?? false;

  return (
    <div className="nova-glass-card mb-8 border-nova-cyan/25 bg-[#0a1628]/80">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-nova-cyan/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-nova-cyan-light">
          <Sparkles className="h-3.5 w-3.5" />
          Explorer Mission
        </span>
        {mentorLed && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nova-green/40 bg-nova-green/10 px-3 py-1 text-xs font-semibold text-nova-green">
            <Users className="h-3.5 w-3.5" />
            Innovation Mentor session
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-nova-cyan-light/90">
          <Wrench className="h-3.5 w-3.5" />
          {getKitLabel(kitTier)}
        </span>
      </div>

      <p className="text-base font-medium leading-relaxed text-white">{encouragement}</p>

      {meta?.checkpoints && meta.checkpoints.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-nova-cyan">
            Your checkpoints (celebrate each one)
          </p>
          <ul className="flex flex-wrap gap-2">
            {meta.checkpoints.map((cp) => (
              <li
                key={cp}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-nova-cyan-light/85"
              >
                ✦ {cp}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-nova-cyan-light/65">
        No kit yet? Use{" "}
        <a
          href={NOVA_EXPLORER_KIT.simulationFallback}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-nova-cyan hover:underline"
        >
          Wokwi simulator
        </a>{" "}
        — you&apos;re still a full NOVA Explorer.
      </p>
    </div>
  );
}
