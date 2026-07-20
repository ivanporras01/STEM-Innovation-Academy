"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  className?: string;
};

const SIZE = { sm: "h-11 w-11", md: "h-28 w-28", hero: "h-44 w-44 sm:h-48 sm:w-48" } as const;

/** Option 2 — Small humanoid mech with joints and foot thrusters. */
export function OrbitoMiniMech({ size = "md", scanning = false, className }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div className={cn("orbit-robot-float absolute inset-0", scanning && "orbit-robot-scanning")}>
        <svg viewBox="0 0 160 180" className="h-full w-full" fill="none">
          {/* Head */}
          <circle cx="80" cy="36" r="22" fill={`url(#${uid}-head)`} stroke="rgba(0,180,216,0.45)" strokeWidth="1.5" />
          <rect x="58" y="28" width="44" height="14" rx="7" fill="#020617" />
          <rect x="62" y="30" width="36" height="10" rx="5" fill={`url(#${uid}-visor)`} />
          <circle cx="72" cy="35" r="3.5" className="orbit-eye fill-[#00b4d8]" />
          <circle cx="88" cy="35" r="3.5" className="orbit-eye fill-[#00b4d8]" />
          {scanning && <line x1="62" y1="35" x2="98" y2="35" stroke="#00b4d8" strokeWidth="1" className="orbit-scan-line" />}

          {/* Neck */}
          <rect x="74" y="56" width="12" height="8" rx="3" fill={`url(#${uid}-metal)`} />

          {/* Torso */}
          <path
            d="M54 64 H106 C112 64 116 70 116 78 V108 C116 116 110 122 80 122 C50 122 44 116 44 108 V78 C44 70 48 64 54 64 Z"
            fill={`url(#${uid}-body)`}
            stroke="rgba(0,180,216,0.4)"
            strokeWidth="1.5"
          />
          <circle cx="80" cy="92" r="14" fill="#030712" stroke="rgba(0,180,216,0.45)" />
          <circle cx="80" cy="92" r="8" className="orbit-core fill-[#00b4d8]" />

          {/* Shoulders */}
          <circle cx="42" cy="72" r="11" fill={`url(#${uid}-metal)`} stroke="rgba(0,180,216,0.35)" />
          <circle cx="118" cy="72" r="11" fill={`url(#${uid}-metal)`} stroke="rgba(0,180,216,0.35)" />

          {/* Arms */}
          <g className="orbit-arm-left" style={{ transformOrigin: "42px 78px" }}>
            <rect x="28" y="74" width="14" height="28" rx="7" fill={`url(#${uid}-metal)`} />
            <circle cx="35" cy="106" r="6" fill="#1a3050" stroke="rgba(0,180,216,0.4)" />
          </g>
          <g className="orbit-arm-right" style={{ transformOrigin: "118px 78px" }}>
            <rect x="118" y="74" width="14" height="28" rx="7" fill={`url(#${uid}-metal)`} />
            <circle cx="125" cy="106" r="6" fill="#1a3050" stroke="rgba(0,180,216,0.4)" />
          </g>

          {/* Hips + legs */}
          <rect x="62" y="120" width="36" height="10" rx="4" fill={`url(#${uid}-metal)`} />
          <rect x="58" y="130" width="16" height="28" rx="6" fill={`url(#${uid}-body)`} stroke="rgba(0,180,216,0.25)" className="orbit-arm-left" style={{ transformOrigin: "66px 130px" }} />
          <rect x="86" y="130" width="16" height="28" rx="6" fill={`url(#${uid}-body)`} stroke="rgba(0,180,216,0.25)" className="orbit-arm-right" style={{ transformOrigin: "94px 130px" }} />
          {/* Foot thrusters */}
          <ellipse cx="66" cy="164" rx="12" ry="4" fill="rgba(0,180,216,0.25)" className="orbit-core" />
          <ellipse cx="94" cy="164" rx="12" ry="4" fill="rgba(0,180,216,0.25)" className="orbit-core" />

          <defs>
            <linearGradient id={`${uid}-head`} x1="58" y1="14" x2="102" y2="58">
              <stop stopColor="#3d5f85" />
              <stop offset="1" stopColor="#152238" />
            </linearGradient>
            <linearGradient id={`${uid}-body`} x1="44" y1="64" x2="116" y2="122">
              <stop stopColor="#254060" />
              <stop offset="1" stopColor="#0c1828" />
            </linearGradient>
            <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#6a8aaa" />
              <stop offset="1" stopColor="#243850" />
            </linearGradient>
            <linearGradient id={`${uid}-visor`} x1="62" y1="30" x2="98" y2="40">
              <stop stopColor="rgba(0,200,230,0.2)" />
              <stop offset="1" stopColor="rgba(0,80,120,0.05)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
