"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type OrbitRobotProps = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  className?: string;
};

const SIZE = {
  sm: "h-11 w-11",
  md: "h-28 w-28",
  hero: "h-44 w-44 sm:h-48 sm:w-48",
} as const;

/** ORBITA — ultra-modern mini navigation robot (SVG, no photo). */
export function OrbitRobot({ size = "md", scanning = false, className }: OrbitRobotProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div
        className={cn(
          "orbit-robot-float orbit-robot-tilt absolute inset-0 flex items-center justify-center",
          scanning && "orbit-robot-scanning",
        )}
      >
        {/* Hover platform glow */}
        <div className="orbit-hover-plume pointer-events-none absolute bottom-[8%] left-1/2 h-[18%] w-[55%] -translate-x-1/2 rounded-[100%] bg-nova-cyan/25 blur-md" />

        <svg
          viewBox="0 0 160 200"
          className="relative h-full w-full drop-shadow-[0_12px_40px_rgba(0,180,216,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${uid}-shell`} x1="20" y1="20" x2="140" y2="180">
              <stop stopColor="#5a8fb8" />
              <stop offset="0.35" stopColor="#2d4f72" />
              <stop offset="0.7" stopColor="#162840" />
              <stop offset="1" stopColor="#0a1525" />
            </linearGradient>
            <linearGradient id={`${uid}-shell-hi`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="rgba(255,255,255,0.35)" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id={`${uid}-visor`} x1="40" y1="36" x2="120" y2="72">
              <stop stopColor="#001018" />
              <stop offset="0.45" stopColor="#0a2840" />
              <stop offset="1" stopColor="#001820" />
            </linearGradient>
            <linearGradient id={`${uid}-visor-shine`} x1="50" y1="38" x2="90" y2="70">
              <stop stopColor="rgba(0,220,255,0.55)" />
              <stop offset="1" stopColor="rgba(0,220,255,0)" />
            </linearGradient>
            <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
              <stop stopColor="#7ef9ff" />
              <stop offset="0.45" stopColor="#00b4d8" />
              <stop offset="1" stopColor="#005f7a" />
            </radialGradient>
            <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left arm group */}
          <g className="orbit-arm-left" style={{ transformOrigin: "34px 108px" }}>
            <path
              d="M34 98c-8 2-14 10-16 20-1 5 0 10 2 14"
              stroke={`url(#${uid}-shell)`}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="22" cy="136" r="9" fill={`url(#${uid}-shell)`} stroke="rgba(0,200,255,0.35)" strokeWidth="1" />
            <path d="M18 140h8M20 136v8" stroke="rgba(0,220,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Right arm group */}
          <g className="orbit-arm-right" style={{ transformOrigin: "126px 108px" }}>
            <path
              d="M126 98c8 2 14 10 16 20 1 5 0 10-2 14"
              stroke={`url(#${uid}-shell)`}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="138" cy="136" r="9" fill={`url(#${uid}-shell)`} stroke="rgba(0,200,255,0.35)" strokeWidth="1" />
            <path d="M134 140h8M136 136v8" stroke="rgba(0,220,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Legs + feet */}
          <g className="orbit-legs">
            <path d="M62 158 L58 178 Q58 184 64 184 L68 184 Q74 184 74 178 L70 158" fill={`url(#${uid}-shell)`} stroke="rgba(0,200,255,0.25)" strokeWidth="1" />
            <path d="M98 158 L94 178 Q94 184 100 184 L104 184 Q110 184 110 178 L106 158" fill={`url(#${uid}-shell)`} stroke="rgba(0,200,255,0.25)" strokeWidth="1" />
            <ellipse cx="66" cy="186" rx="12" ry="5" fill="#0a1525" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
            <ellipse cx="94" cy="186" rx="12" ry="5" fill="#0a1525" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
          </g>

          {/* Torso */}
          <path
            d="M48 88 h64 a16 16 0 0 1 16 16 v42 a12 12 0 0 1-12 12 H44 a12 12 0 0 1-12-12 V104 a16 16 0 0 1 16-16z"
            fill={`url(#${uid}-shell)`}
            stroke="rgba(0,210,255,0.45)"
            strokeWidth="1.5"
          />
          <path
            d="M52 92 h56 a12 12 0 0 1 12 12 v8 H40 v-8 a12 12 0 0 1 12-12z"
            fill={`url(#${uid}-shell-hi)`}
            opacity="0.6"
          />
          {/* Chest panel lines */}
          <path d="M52 118 h56M52 128 h56" stroke="rgba(0,200,255,0.15)" strokeWidth="1" />
          {/* Hex reactor */}
          <path
            d="M80 112 l14 8 v16 l-14 8-14-8v-16z"
            fill="#030712"
            stroke="rgba(0,220,255,0.55)"
            strokeWidth="1.2"
          />
          <circle cx="80" cy="128" r="9" fill={`url(#${uid}-core)`} className="orbit-core" filter={`url(#${uid}-glow)`} />
          <path d="M80 121v14M73 128h14" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Neck */}
          <rect x="72" y="78" width="16" height="12" rx="4" fill="#1a3350" stroke="rgba(0,200,255,0.35)" strokeWidth="1" />

          {/* Head — dome */}
          <ellipse cx="80" cy="52" rx="38" ry="34" fill={`url(#${uid}-shell)`} stroke="rgba(0,210,255,0.5)" strokeWidth="1.5" />
          <ellipse cx="80" cy="44" rx="28" ry="12" fill={`url(#${uid}-shell-hi)`} opacity="0.45" />
          {/* Visor band */}
          <path
            d="M44 48 Q80 62 116 48 Q112 72 80 76 Q48 72 44 48 Z"
            fill={`url(#${uid}-visor)`}
            stroke="rgba(0,230,255,0.5)"
            strokeWidth="1.2"
          />
          <path
            d="M52 50 Q80 58 108 50"
            stroke={`url(#${uid}-visor-shine)`}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Eyes */}
          <ellipse cx="66" cy="58" rx="8" ry="6" className="orbit-eye fill-[#00e5ff]" filter={`url(#${uid}-glow)`} />
          <ellipse cx="94" cy="58" rx="8" ry="6" className="orbit-eye fill-[#00e5ff]" filter={`url(#${uid}-glow)`} />
          <ellipse cx="64" cy="56" rx="2.5" ry="2" fill="white" opacity="0.85" />
          <ellipse cx="92" cy="56" rx="2.5" ry="2" fill="white" opacity="0.85" />
          {scanning && (
            <rect x="48" y="52" width="64" height="2" rx="1" fill="rgba(0,240,255,0.85)" className="orbit-scan-line" />
          )}
          {/* Face detail */}
          <path d="M72 68 Q80 72 88 68" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Antenna */}
          <line x1="80" y1="18" x2="80" y2="28" stroke="#6a9cc4" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="18" x2="80" y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <circle cx="80" cy="14" r="5" className="orbit-antenna-pulse fill-nova-orange" filter={`url(#${uid}-glow)`} />
          <circle cx="80" cy="14" r="2" fill="#fff8e7" opacity="0.9" />

          {/* Ear modules */}
          <rect x="38" y="46" width="8" height="16" rx="3" fill="#1e3a55" stroke="rgba(0,200,255,0.3)" strokeWidth="1" />
          <rect x="114" y="46" width="8" height="16" rx="3" fill="#1e3a55" stroke="rgba(0,200,255,0.3)" strokeWidth="1" />

          {/* Shoulder caps */}
          <circle cx="46" cy="96" r="11" fill={`url(#${uid}-shell)`} stroke="rgba(0,200,255,0.35)" strokeWidth="1" />
          <circle cx="114" cy="96" r="11" fill={`url(#${uid}-shell)`} stroke="rgba(0,200,255,0.35)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

export const ORBIT_IDENTITY = {
  name: "Orbita",
  fullName: {
    en: "Orbital Robotic Interactive Tour Guide",
    es: "Operadora robótica interactiva de tours orbitales",
    pt: "Operadora robótica interativa de tours orbitais",
  },
} as const;

/** @deprecated Use ORBIT_IDENTITY */
export const ORBITO_IDENTITY = ORBIT_IDENTITY;
