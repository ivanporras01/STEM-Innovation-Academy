import { ImageResponse } from "next/og";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";

export const runtime = "edge";
export const alt = NOVA_STEM_HUB.metadataTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1D3A 0%, #0d1b3d 45%, #1e3a8a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: 48,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: 32 }}
        >
          <defs>
            <linearGradient id="og-orbit" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#0B1D3A" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="11" stroke="url(#og-orbit)" strokeWidth="1.75" fill="none" />
          <polygon
            points="16,9 17.4,14.6 23,16 17.4,17.4 16,23 14.6,17.4 9,16 14.6,14.6"
            fill="#FFFFFF"
          />
          <circle cx="25.5" cy="10.5" r="2" fill="#00D4FF" />
        </svg>
        <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: -2 }}>{NOVA_STEM_HUB.name}</div>
        <div style={{ fontSize: 24, marginTop: 20, color: "#6ee7f9", textAlign: "center" }}>
          {NOVA_STEM_HUB.tagline}
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
            fontSize: 20,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <span>School</span>
          <span>·</span>
          <span>College</span>
          <span>·</span>
          <span>Language</span>
          <span>·</span>
          <span>Shop</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
