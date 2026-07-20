"use client";

import { getBuddy, getBuddyDisplayName } from "@/lib/experiences/catalog";
import { BuddyAvatar } from "../buddy-avatar";
import { useLabBuddy } from "./lab-buddy-context";
import { cn } from "@/lib/utils";

/** Compact Buddy portrait token for arena grids (rover / runner / explorer). */
export function LabBuddyToken({
  className,
  facing,
  pulse,
}: {
  className?: string;
  facing?: string;
  pulse?: boolean;
}) {
  const ctx = useLabBuddy();
  const buddy = ctx ? getBuddy(ctx.buddyId) : null;
  const name = ctx && buddy ? getBuddyDisplayName(ctx.buddyId, ctx.buddyNickname) : "Explorer";

  if (!buddy) {
    return (
      <span className={cn("lab-buddy-token lab-buddy-token--fallback", pulse && "lab-buddy-token--pulse", className)}>
        <span className="text-2xl leading-none drop-shadow-[0_0_12px_rgba(103,232,249,0.7)]">🧑‍🚀</span>
        {facing && <span className="lab-buddy-facing">{facing}</span>}
      </span>
    );
  }

  return (
    <span className={cn("lab-buddy-token", pulse && "lab-buddy-token--pulse", className)} title={name}>
      <BuddyAvatar
        src={buddy.image}
        alt={name}
        size="tile"
        className="lab-buddy-token-portrait ring-2 ring-[var(--exp-accent)]/70 shadow-[0_0_18px_color-mix(in_srgb,var(--exp-accent)_45%,transparent)]"
      />
      {facing && <span className="lab-buddy-facing">{facing}</span>}
    </span>
  );
}
