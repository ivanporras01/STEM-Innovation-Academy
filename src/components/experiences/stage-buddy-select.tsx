"use client";

import { useState } from "react";
import {
  FRIENDLY_BUDDIES,
  PRO_BUDDIES,
  traitColor,
  getBuddy,
  type BuddyId,
} from "@/lib/experiences/buddies";
import { cn } from "@/lib/utils";
import { BuddyAvatar } from "./buddy-avatar";

type Props = {
  buddyId: BuddyId;
  buddyNickname: string;
  explorerName: string;
  onSelectBuddy: (id: BuddyId) => void;
  onNicknameChange: (name: string) => void;
  onExplorerNameChange: (name: string) => void;
  onConfirm: () => void;
  onBack: () => void;
};

function BuddyCard({
  id,
  selected,
  onSelect,
}: {
  id: BuddyId;
  selected: boolean;
  onSelect: () => void;
}) {
  const b = getBuddy(id);
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all duration-300",
        selected
          ? "border-[var(--exp-accent)] -translate-y-1 scale-[1.02] bg-[#0d1b3d]/90 ring-4 ring-[var(--exp-accent)]/25"
          : "border-white/15 bg-[#0a1628]/70 hover:border-[var(--exp-accent)]/40 hover:bg-[#0d1b3d]/80"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]",
          selected && b.glow
        )}
      >
        <BuddyAvatar
          src={b.image}
          alt={`${b.name}, ${b.subtitle}`}
          size="card"
          className={cn("bg-gradient-to-br", b.color)}
        />
        {selected && (
          <span className="absolute bottom-2 right-2 z-10 rounded-full bg-[var(--exp-accent)] px-2 py-0.5 text-[10px] font-black uppercase text-white">
            Selected
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <strong className="text-sm text-white">{b.name}</strong>
        <span className="text-[11px] text-white/60">{b.subtitle}</span>
        <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[var(--exp-accent-2)]">
          {b.tierLabel}
        </span>
        <span
          className={cn(
            "mt-2 inline-block self-start rounded-full border px-2 py-0.5 text-[9px] font-black tracking-wide",
            traitColor(b.trait, b.tier)
          )}
        >
          {b.trait}
        </span>
      </div>
    </button>
  );
}

export function StageBuddySelect({
  buddyId,
  buddyNickname,
  explorerName,
  onSelectBuddy,
  onNicknameChange,
  onExplorerNameChange,
  onConfirm,
  onBack,
}: Props) {
  const [tierFilter, setTierFilter] = useState<"all" | "friendly" | "pro">("all");
  const buddy = getBuddy(buddyId);
  const canContinue = explorerName.trim().length >= 2;

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--exp-accent-2)]">
          Choose Your NOVA Buddy
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Find the companion who matches your learning style
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75 lg:mx-0">
          These 20 NOVA Buddies accompany Explorers across every mission — listening,
          encouraging, and guiding you through challenges, discoveries, and breakthroughs.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
        {(["all", "friendly", "pro"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTierFilter(t)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition",
              tierFilter === t
                ? "bg-[var(--exp-accent)] text-white shadow-[0_0_16px_color-mix(in_srgb,var(--exp-accent)_40%,transparent)]"
                : "border border-white/20 bg-white/5 text-white/70 hover:border-[var(--exp-accent)]/50 hover:text-white"
            )}
          >
            {t === "all" ? "All 20 Buddies" : t === "friendly" ? "Friendly · Middle School" : "Pro · High School"}
          </button>
        ))}
      </div>

      {(tierFilter === "all" || tierFilter === "friendly") && (
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
            <span className="h-2 w-2 rounded-full bg-nova-cyan" />
            Friendly Explorers — Middle School
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {FRIENDLY_BUDDIES.map((b) => (
              <BuddyCard
                key={b.id}
                id={b.id}
                selected={buddyId === b.id}
                onSelect={() => onSelectBuddy(b.id)}
              />
            ))}
          </div>
        </section>
      )}

      {(tierFilter === "all" || tierFilter === "pro") && (
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
            <span className="h-2 w-2 rounded-full bg-nova-green" />
            Pro Explorers — High School
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {PRO_BUDDIES.map((b) => (
              <BuddyCard
                key={b.id}
                id={b.id}
                selected={buddyId === b.id}
                onSelect={() => onSelectBuddy(b.id)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="rounded-2xl border border-white/15 bg-[#0a1628]/80 p-6 backdrop-blur-md">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <BuddyAvatar
            src={buddy.image}
            alt={`${buddy.name}, ${buddy.subtitle}`}
            size="lg"
            className={cn("mx-auto bg-gradient-to-br lg:mx-0", buddy.color, buddy.glow)}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--exp-accent-2)]">
              Your Buddy · {buddy.tierLabel}
            </p>
            <p className="mt-1 text-lg font-bold text-white">
              {buddy.name} — {buddy.subtitle}
            </p>
            <p className="mt-2 text-sm italic text-white/70">&ldquo;{buddy.intro}&rdquo;</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="nova-label">Your Explorer name</label>
            <input
              className="nova-input mt-1"
              value={explorerName}
              onChange={(e) => onExplorerNameChange(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="nova-label">Personalize your Buddy&apos;s name</label>
            <input
              className="nova-input mt-1"
              value={buddyNickname}
              onChange={(e) => onNicknameChange(e.target.value)}
              placeholder={buddy.name}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        <button
          type="button"
          disabled={!canContinue}
          onClick={onConfirm}
          className="experience-btn-primary min-w-[220px] disabled:opacity-40"
        >
          Continue with My Buddy →
        </button>
        <button type="button" onClick={onBack} className="experience-btn-secondary">
          Back
        </button>
      </div>
    </div>
  );
}
