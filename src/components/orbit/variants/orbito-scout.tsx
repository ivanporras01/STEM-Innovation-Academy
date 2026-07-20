"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  className?: string;
};

const SIZE = { sm: "h-11 w-11", md: "h-28 w-28", hero: "h-44 w-44 sm:h-48 sm:w-48" } as const;

/** Option 4 — STEM explorer scout with sensor head and backpack. */
export function OrbitoScout({ size = "md", scanning = false, className }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div className={cn("orbit-robot-float absolute inset-0", scanning && "orbit-robot-scanning")}>
        <svg viewBox="0 0 160 180" className="h-full w-full" fill="none">
          {/* Backpack / sensor pack */}
          <rect x="98" y="52" width="28" height="40" rx="6" fill={`url(#${uid}-pack)`} stroke="rgba(255,122,0,0.35)" />
          <rect x="102" y="58" width="20" height="8" rx="2" fill="rgba(255,122,0,0.2)" />
          <line x1="124" y1="48" x2="124" y2="38" stroke="#888" strokeWidth="2" />
          <circle cx="124" cy="34" r="4" className="orbit-antenna-pulse fill-[#ff7a00]" />

          {/* Head / camera dome */}
          <rect x="40" y="32" width="56" height="44" rx="12" fill={`url(#${uid}-head)`} stroke="rgba(0,180,216,0.4)" strokeWidth="1.5" />
          {/* Main lens */}
          <circle cx="68" cy="54" r="16" fill="#020617" stroke="rgba(0,180,216,0.5)" strokeWidth="2" />
          <circle cx="68" cy="54" r="10" fill={`url(#${uid}-lens)`} />
          <circle cx="68" cy="54" r="5" className={cn("orbit-core fill-[#00b4d8]", scanning && "orbit-eye")} />
          {scanning && (
            <circle cx="68" cy="54" r="14" stroke="#00b4d8" strokeWidth="1" fill="none" className="orbit-scout-ping" opacity="0.6" />
          )}
          {/* Side sensor */}
          <rect x="44" y="48" width="8" height="6" rx="2" fill="rgba(0,180,216,0.3)" />

          {/* Body */}
          <path
            d="M36 78 H88 C94 78 98 84 98 92 V118 C98 128 90 134 62 134 C34 134 26 128 26 118 V92 C26 84 30 78 36 78 Z"
            fill={`url(#${uid}-body)`}
            stroke="rgba(0,180,216,0.35)"
          />

          {/* Treads / wheels */}
          <rect x="28" y="132" width="72" height="22" rx="11" fill="#0a1420" stroke="rgba(0,180,216,0.3)" />
          <circle cx="44" cy="143" r="8" fill={`url(#${uid}-wheel)`} stroke="rgba(0,180,216,0.4)" className="orbit-scout-wheel" />
          <circle cx="68" cy="143" r="8" fill={`url(#${uid}-wheel)`} stroke="rgba(0,180,216,0.4)" className="orbit-scout-wheel" style={{ animationDelay: "0.15s" }} />
          <circle cx="92" cy="143" r="8" fill={`url(#${uid}-wheel)`} stroke="rgba(0,180,216,0.4)" className="orbit-scout-wheel" style={{ animationDelay: "0.3s" }} />

          {/* Arm sensor */}
          <path d="M26 88 L14 102 L20 106 L30 94 Z" fill={`url(#${uid}-metal)`} className="orbit-arm-left" />

          <defs>
            <linearGradient id={`${uid}-head`} x1="40" y1="32" x2="96" y2="76">
              <stop stopColor="#3a5878" />
              <stop offset="1" stopColor="#152030" />
            </linearGradient>
            <linearGradient id={`${uid}-body`} x1="26" y1="78" x2="98" y2="134">
              <stop stopColor="#2a4560" />
              <stop offset="1" stopColor="#0c1520" />
            </linearGradient>
            <linearGradient id={`${uid}-pack`} x1="98" y1="52" x2="126" y2="92">
              <stop stopColor="#3a3530" />
              <stop offset="1" stopColor="#1a1815" />
            </linearGradient>
            <radialGradient id={`${uid}-lens`}>
              <stop stopColor="rgba(0,180,216,0.4)" />
              <stop offset="1" stopColor="#020617" />
            </radialGradient>
            <linearGradient id={`${uid}-wheel`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#4a6078" />
              <stop offset="1" stopColor="#1a2838" />
            </linearGradient>
            <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#5a7088" />
              <stop offset="1" stopColor="#243040" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
