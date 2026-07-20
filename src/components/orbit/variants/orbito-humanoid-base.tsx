"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type OrbitoHumanoidProps = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  greeting?: boolean;
  className?: string;
};

export type HumanoidTheme = {
  greetStyle: "wave" | "double" | "salute" | "open" | "bounce";
  head: [string, string, string];
  torso: [string, string, string];
  arm: [string, string];
  leg: [string, string];
  metal: [string, string];
  joint: [string, string];
  dark: [string, string];
  foot: [string, string];
  visor: [string, string, string];
  accent: string;
  headWide?: boolean;
  slim?: boolean;
};

const SIZE = {
  sm: "h-14 w-14",
  md: "h-36 w-36",
  hero: "h-64 w-64 sm:h-72 sm:w-72",
} as const;

export function OrbitoHumanoid({
  theme,
  size = "md",
  scanning = false,
  greeting = false,
  className,
}: OrbitoHumanoidProps & { theme: HumanoidTheme }) {
  const uid = useId().replace(/:/g, "");
  const isGreeting = greeting && !scanning;
  const modeClass = isGreeting
    ? `orbit-greet-${theme.greetStyle}`
    : scanning
      ? "orbit-nexus-scan"
      : "orbit-nexus-idle";

  const shoulder = theme.slim ? 10 : 12;
  const headRx = theme.headWide ? 32 : 28;
  const headRy = theme.headWide ? 28 : 30;

  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div className={cn("orbit-nexus-stage absolute inset-0", modeClass)}>
        <svg viewBox="0 0 220 320" className="h-full w-full overflow-visible" fill="none">
          <ellipse cx="110" cy="302" rx="52" ry="9" fill={theme.accent} opacity="0.22" className="orbit-nexus-foot-glow" />

          {isGreeting && (
            <g className="orbit-nexus-hud">
              <ellipse cx="110" cy="52" rx="46" ry="12" stroke="rgba(0,180,216,0.4)" strokeWidth="1" className="orbit-nexus-holo-ring" />
              <ellipse cx="110" cy="50" rx="56" ry="16" stroke="rgba(255,122,0,0.22)" strokeWidth="0.8" className="orbit-nexus-holo-ring-reverse" />
              <text x="110" y="38" textAnchor="middle" fill="rgba(0,229,255,0.85)" fontSize="11" fontWeight="bold" className="orbit-nexus-holo-text">
                HI ✦
              </text>
            </g>
          )}

          <g className="orbit-nexus-legs">
            <g className="orbit-nexus-leg-l" style={{ transformOrigin: "88px 210px" }}>
              <path d="M88 208 L78 268 C76 278 80 288 88 290 L96 290 C102 288 104 278 102 268 L98 208 Z" fill={`url(#${uid}-leg)`} stroke="rgba(140,160,180,0.45)" strokeWidth="1" />
              <rect x="80" y="248" width="16" height="14" rx="5" fill={`url(#${uid}-joint)`} />
              <ellipse cx="90" cy="296" rx="14" ry="5" fill={`url(#${uid}-foot)`} stroke="rgba(0,180,216,0.35)" />
              <ellipse cx="90" cy="294" rx="8" ry="2" fill={theme.accent} opacity="0.45" className="orbit-core" />
            </g>
            <g className="orbit-nexus-leg-r" style={{ transformOrigin: "132px 210px" }}>
              <path d="M132 208 L142 268 C144 278 140 288 132 290 L124 290 C118 288 116 278 118 268 L122 208 Z" fill={`url(#${uid}-leg)`} stroke="rgba(140,160,180,0.45)" strokeWidth="1" />
              <rect x="124" y="248" width="16" height="14" rx="5" fill={`url(#${uid}-joint)`} />
              <ellipse cx="130" cy="296" rx="14" ry="5" fill={`url(#${uid}-foot)`} stroke="rgba(0,180,216,0.35)" />
              <ellipse cx="130" cy="294" rx="8" ry="2" fill={theme.accent} opacity="0.45" className="orbit-core" />
            </g>
          </g>

          <g className="orbit-nexus-torso" style={{ transformOrigin: "110px 200px" }}>
            <path d="M78 188 Q110 198 142 188 L138 210 Q110 218 82 210 Z" fill={`url(#${uid}-dark)`} stroke="rgba(100,120,140,0.35)" />
            <path
              d="M72 108 C72 98 82 92 110 92 C138 92 148 98 148 108 V188 C148 198 138 206 110 206 C82 206 72 198 72 108 Z"
              fill={`url(#${uid}-torso)`}
              stroke="rgba(180,200,220,0.5)"
              strokeWidth="1.2"
            />
            <path d="M74 112 L68 178 L76 192 L80 118 Z" fill="rgba(15,22,35,0.9)" stroke="rgba(0,180,216,0.12)" />
            <path d="M146 112 L152 178 L144 192 L140 118 Z" fill="rgba(15,22,35,0.9)" stroke="rgba(0,180,216,0.12)" />
            <path d="M92 148 L128 148 L124 172 L96 172 Z" fill="rgba(20,28,42,0.75)" stroke="rgba(80,100,120,0.3)" />
            <ellipse cx="110" cy="138" rx="16" ry="20" fill="rgba(2,6,18,0.8)" stroke="rgba(0,180,216,0.45)" strokeWidth="1.5" />
            <ellipse cx="110" cy="138" rx="9" ry="11" className="orbit-core" fill={theme.visor[1]} opacity="0.55" />
            <rect x="100" y="86" width="20" height="12" rx="5" fill={`url(#${uid}-joint)`} stroke="rgba(160,180,200,0.35)" />

            <g className="orbit-nexus-head" style={{ transformOrigin: "110px 86px" }}>
              <ellipse cx="110" cy="62" rx={headRx} ry={headRy} fill={`url(#${uid}-head)`} stroke="rgba(190,210,230,0.5)" strokeWidth="1.2" />
              <path d="M82 58 Q110 48 138 58 L136 72 Q110 66 84 72 Z" fill="#080e18" stroke="rgba(0,180,216,0.2)" />
              <rect x="84" y="60" width="52" height="6" rx="3" fill={`url(#${uid}-visor)`} className="orbit-nexus-visor" />
              {scanning && <rect x="84" y="60" width="52" height="6" rx="3" fill="none" stroke="#00e5ff" strokeWidth="1" className="orbit-scan-line" />}
              <path d="M92 42 Q110 36 128 44" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Left arm */}
            <g className="orbit-nexus-l-arm" style={{ transformOrigin: "72px 118px" }}>
              <circle cx="72" cy="114" r={shoulder} fill={`url(#${uid}-joint)`} stroke="rgba(160,180,200,0.4)" />
              <g className="orbit-nexus-l-upper" style={{ transformOrigin: "72px 118px" }}>
                <path d="M58 118 L48 148 L56 152 L66 124 Z" fill={`url(#${uid}-arm)`} stroke="rgba(150,170,190,0.35)" strokeWidth="0.8" />
                <g className="orbit-nexus-l-forearm" style={{ transformOrigin: "50px 152px" }}>
                  <path d="M44 152 L34 178 L42 182 L50 158 Z" fill={`url(#${uid}-arm)`} stroke="rgba(150,170,190,0.35)" strokeWidth="0.8" />
                  <g className="orbit-nexus-l-hand" style={{ transformOrigin: "36px 182px" }}>
                    <ellipse cx="28" cy="188" rx="10" ry="8" fill={`url(#${uid}-metal)`} stroke="rgba(0,180,216,0.35)" />
                    {[0, 1, 2, 3].map((i) => (
                      <rect key={i} x={22 + i * 3.2} y={178} width="2.4" height={isGreeting ? 11 : 9} rx="1.2" fill="#9aabb8" className={isGreeting ? "orbit-nexus-finger" : undefined} style={isGreeting ? { animationDelay: `${i * 0.07}s` } : undefined} />
                    ))}
                  </g>
                </g>
              </g>
            </g>

            {/* Right arm */}
            <g className="orbit-nexus-r-arm" style={{ transformOrigin: "148px 118px" }}>
              <circle cx="148" cy="114" r={shoulder} fill={`url(#${uid}-joint)`} stroke="rgba(160,180,200,0.4)" />
              <g className="orbit-nexus-r-upper" style={{ transformOrigin: "148px 118px" }}>
                <path d="M162 118 L172 148 L164 152 L154 124 Z" fill={`url(#${uid}-arm)`} stroke="rgba(150,170,190,0.35)" strokeWidth="0.8" />
                <g className="orbit-nexus-r-forearm" style={{ transformOrigin: "170px 152px" }}>
                  <path d="M176 152 L186 178 L178 182 L170 158 Z" fill={`url(#${uid}-arm)`} stroke="rgba(150,170,190,0.35)" strokeWidth="0.8" />
                  <g className="orbit-nexus-r-hand" style={{ transformOrigin: "182px 182px" }}>
                    {scanning ? (
                      <>
                        <rect x="188" y="172" width="16" height="12" rx="4" fill="#141e2e" stroke="rgba(0,180,216,0.55)" strokeWidth="1.2" />
                        <rect x="202" y="176" width="8" height="5" rx="1.5" fill={theme.visor[1]} className="orbit-core" />
                        <line x1="210" y1="178" x2="218" y2="178" stroke="#00e5ff" strokeWidth="2.5" className="orbit-nexus-scan-beam" />
                        <circle cx="218" cy="178" r="3" fill="#00e5ff" className="orbit-nexus-scan-dot" />
                      </>
                    ) : (
                      <>
                        <ellipse cx="192" cy="186" rx="10" ry="8" fill={`url(#${uid}-metal)`} stroke="rgba(0,180,216,0.35)" />
                        {[0, 1, 2, 3, 4].map((i) => (
                          <rect key={i} x={186 + i * 2.8} y={172 - (isGreeting ? i * 1.2 : 0)} width="2.2" height={isGreeting ? 13 - i * 0.4 : 9} rx="1.1" fill="#9aabb8" className={isGreeting ? "orbit-nexus-finger" : undefined} style={isGreeting ? { animationDelay: `${i * 0.06}s` } : undefined} />
                        ))}
                      </>
                    )}
                  </g>
                </g>
              </g>
            </g>
          </g>

          <defs>
            <linearGradient id={`${uid}-head`} x1="82" y1="32" x2="138" y2="92">
              <stop stopColor={theme.head[0]} /><stop offset="0.45" stopColor={theme.head[1]} /><stop offset="1" stopColor={theme.head[2]} />
            </linearGradient>
            <linearGradient id={`${uid}-torso`} x1="72" y1="92" x2="148" y2="206">
              <stop stopColor={theme.torso[0]} /><stop offset="0.4" stopColor={theme.torso[1]} /><stop offset="1" stopColor={theme.torso[2]} />
            </linearGradient>
            <linearGradient id={`${uid}-arm`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor={theme.arm[0]} /><stop offset="1" stopColor={theme.arm[1]} />
            </linearGradient>
            <linearGradient id={`${uid}-leg`} x1="78" y1="208" x2="102" y2="296">
              <stop stopColor={theme.leg[0]} /><stop offset="1" stopColor={theme.leg[1]} />
            </linearGradient>
            <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor={theme.metal[0]} /><stop offset="1" stopColor={theme.metal[1]} />
            </linearGradient>
            <linearGradient id={`${uid}-joint`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor={theme.joint[0]} /><stop offset="1" stopColor={theme.joint[1]} />
            </linearGradient>
            <linearGradient id={`${uid}-dark`} x1="78" y1="188" x2="142" y2="218">
              <stop stopColor={theme.dark[0]} /><stop offset="1" stopColor={theme.dark[1]} />
            </linearGradient>
            <linearGradient id={`${uid}-foot`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor={theme.foot[0]} /><stop offset="1" stopColor={theme.foot[1]} />
            </linearGradient>
            <linearGradient id={`${uid}-visor`} x1="84" y1="60" x2="136" y2="66">
              <stop stopColor={theme.visor[0]} /><stop offset="0.5" stopColor={theme.visor[1]} /><stop offset="1" stopColor={theme.visor[2]} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export const NEXUS_THEME: HumanoidTheme = {
  greetStyle: "wave",
  head: ["#d8e2ea", "#a8b8c8", "#687888"],
  torso: ["#c0ccd8", "#98a8b8", "#586878"],
  arm: ["#b0c0d0", "#687888"],
  leg: ["#98a8b8", "#485868"],
  metal: ["#c8d4e0", "#788898"],
  joint: ["#788898", "#384858"],
  dark: ["#404858", "#202830"],
  foot: ["#687888", "#384858"],
  visor: ["#00e5ff", "#00b4d8", "#0088bb"],
  accent: "rgba(0,180,216,1)",
};

export const SENTINEL_THEME: HumanoidTheme = {
  greetStyle: "salute",
  head: ["#4a5568", "#2d3748", "#1a202c"],
  torso: ["#3d4a5c", "#2a3444", "#1a2230"],
  arm: ["#4a5568", "#2d3748"],
  leg: ["#3d4a5c", "#1a2230"],
  metal: ["#5a6578", "#2d3748"],
  joint: ["#3d4a5c", "#1a202c"],
  dark: ["#1a202c", "#0d1117"],
  foot: ["#2d3748", "#1a202c"],
  visor: ["#ffb347", "#ff7a00", "#cc5500"],
  accent: "rgba(255,122,0,1)",
  headWide: true,
};

export const AERO_THEME: HumanoidTheme = {
  greetStyle: "open",
  head: ["#eef6ff", "#d0e4f5", "#98b8d8"],
  torso: ["#e8f4fc", "#b8d4ec", "#78a8c8"],
  arm: ["#d8ecf8", "#88b0cc"],
  leg: ["#b8d4ec", "#5898b8"],
  metal: ["#f0f8ff", "#98c0d8"],
  joint: ["#a8c8e0", "#5898b8"],
  dark: ["#6898b8", "#386878"],
  foot: ["#88b8d0", "#487898"],
  visor: ["#80ffff", "#00e5ff", "#00a8cc"],
  accent: "rgba(0,229,255,0.9)",
  slim: true,
};

export const PRIME_THEME: HumanoidTheme = {
  greetStyle: "wave",
  head: ["#e0e8f0", "#a0b0c0", "#607080"],
  torso: ["#d0d8e0", "#909aa8", "#505860"],
  arm: ["#b0bcc8", "#606870"],
  leg: ["#909aa8", "#404850"],
  metal: ["#c8d0d8", "#707880"],
  joint: ["#606870", "#303840"],
  dark: ["#303840", "#181c20"],
  foot: ["#505860", "#282c30"],
  visor: ["#00ffff", "#00b4d8", "#006688"],
  accent: "rgba(0,180,216,1)",
  headWide: true,
};

export const SPARK_THEME: HumanoidTheme = {
  greetStyle: "bounce",
  head: ["#c8e8f8", "#88c0e0", "#5090b8"],
  torso: ["#a8d8f0", "#68a8d0", "#4080a8"],
  arm: ["#98cce8", "#5090b8"],
  leg: ["#78b8d8", "#387898"],
  metal: ["#b8e0f8", "#5098b8"],
  joint: ["#5098b8", "#286080"],
  dark: ["#387898", "#184058"],
  foot: ["#4890b0", "#204060"],
  visor: ["#ffff80", "#ffd000", "#ff9500"],
  accent: "rgba(255,208,0,0.85)",
  slim: true,
};
