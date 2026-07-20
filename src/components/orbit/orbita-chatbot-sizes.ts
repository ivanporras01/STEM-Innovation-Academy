/** Fixed pixel sizes for Orbita chatbot — enforced via CSS + inline styles (not Tailwind-only). */
export const ORBITA_AVATAR = {
  chatbot: { width: 40, height: 50 },
  fab: { width: 32, height: 38 },
} as const;

export const ORBITA_PANEL_MAX_WIDTH = 300;

/** Greeting animation — ms between pose frames in chatbot widget */
export const ORBITA_CHAT_FRAME_MS = 550;

export const ORBITA_FAB_FRAME_MS = 550;

/** Preload all Orbita greeting frames (call on module load + mount). */
export function preloadOrbitaGreetingFrames(frames: readonly string[]): void {
  if (typeof window === "undefined") return;
  for (const href of frames) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = href;
  }
}
