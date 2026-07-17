"use client";

import { getBuddy, TRAIT_COLORS, type BuddyId } from "@/lib/experiences/buddies";
import { getBuddyDisplayName } from "@/lib/experiences/dialogues";
import { cn } from "@/lib/utils";
import { BuddyAvatar } from "./buddy-avatar";

type Props = {
  buddyId: BuddyId;
  buddyNickname?: string | null;
  message: string;
  compact?: boolean;
};

export function BuddyCompanion({ buddyId, buddyNickname, message, compact }: Props) {
  const buddy = getBuddy(buddyId);
  const displayName = getBuddyDisplayName(buddyId, buddyNickname);

  if (compact) {
    return (
      <div className="flex items-start gap-3 rounded-xl border-l-4 border-[var(--exp-accent)] bg-gradient-to-r from-blue-50/90 to-white px-4 py-3">
        <BuddyAvatar
          src={buddy.image}
          alt={displayName}
          size="sm"
          className={cn("bg-gradient-to-br", buddy.color)}
        />
        <div>
          <p className="text-xs font-black text-nova-deep-blue">
            {displayName}{" "}
            <span
              className={cn(
                "ml-1 rounded-full border px-1.5 py-0.5 text-[8px] font-black",
                TRAIT_COLORS[buddy.trait]
              )}
            >
              {buddy.trait}
            </span>
          </p>
          <p className="mt-0.5 text-sm text-nova-dark-gray">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <aside className="experience-panel relative overflow-hidden rounded-3xl p-8 text-white">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <BuddyAvatar
        src={buddy.image}
        alt={displayName}
        size="xl"
        className={cn("experience-buddy-avatar mb-4 bg-gradient-to-br", buddy.color, buddy.glow)}
      />
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/60">
        {buddy.tierLabel}
      </p>
      <h2 className="text-2xl font-bold">{displayName}</h2>
      <p className="text-sm text-white/70">{buddy.subtitle}</p>
      <span
        className={cn(
          "mt-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-black",
          TRAIT_COLORS[buddy.trait]
        )}
      >
        {buddy.trait}
      </span>
      <p className="mt-5 leading-relaxed text-white/90">&ldquo;{message}&rdquo;</p>
    </aside>
  );
}
