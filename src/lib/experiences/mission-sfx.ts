/** Tasteful Web Audio chimes for Explore Now mission moments. */

const MUTE_KEY = "nova-mission-sfx-muted";

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new AC();
  }
  return sharedCtx;
}

export function isMissionSfxMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMissionSfxMuted(muted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    // ignore quota / private mode
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function tone(
  ctx: AudioContext,
  {
    freq,
    start,
    dur,
    type = "sine",
    gain = 0.08,
  }: {
    freq: number;
    start: number;
    dur: number;
    type?: OscillatorType;
    gain?: number;
  }
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

/** Soft clear when a LAB objective is solved (all 9 experiences). */
export async function playLabClearChime(): Promise<void> {
  if (isMissionSfxMuted() || prefersReducedMotion()) return;
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return;
    }
  }
  const t = ctx.currentTime;
  tone(ctx, { freq: 523.25, start: t, dur: 0.18, gain: 0.06 }); // C5
  tone(ctx, { freq: 659.25, start: t + 0.12, dur: 0.22, gain: 0.07 }); // E5
  tone(ctx, { freq: 783.99, start: t + 0.26, dur: 0.35, type: "triangle", gain: 0.05 }); // G5
}

/** Short fanfare when the full mission hits Achievement Unlocked. */
export async function playMissionCompleteFanfare(): Promise<void> {
  if (isMissionSfxMuted() || prefersReducedMotion()) return;
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return;
    }
  }
  const t = ctx.currentTime;
  tone(ctx, { freq: 392.0, start: t, dur: 0.2, gain: 0.07 }); // G4
  tone(ctx, { freq: 523.25, start: t + 0.14, dur: 0.22, gain: 0.08 }); // C5
  tone(ctx, { freq: 659.25, start: t + 0.28, dur: 0.24, gain: 0.08 }); // E5
  tone(ctx, { freq: 783.99, start: t + 0.44, dur: 0.45, type: "triangle", gain: 0.07 }); // G5
  tone(ctx, { freq: 1046.5, start: t + 0.55, dur: 0.55, type: "sine", gain: 0.045 }); // C6 sparkle
}
