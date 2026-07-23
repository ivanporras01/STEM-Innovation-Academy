import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Svg,
  Path,
  Polygon,
  Circle,
  G,
} from "@react-pdf/renderer";
import { getCertificateTemplateCopy } from "@/lib/certificates/copy";
import type { AppLocale } from "@/lib/locale";

export type CertificatePdfDocumentProps = {
  holderName: string;
  programTitle: string;
  credentialTitle?: string;
  category?: string;
  credentialLevel?: string;
  completionDate?: string | Date | null;
  issueDate?: string | Date | null;
  learningHours?: number | null;
  finalScore?: number | null;
  passingScore?: number | null;
  code: string;
  verificationUrl: string;
  qrCodeDataUrl: string;
  locale?: AppLocale;
};

function formatDate(date?: string | Date | null): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function NovaLogoIcon({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G>
        <Circle
          cx={16}
          cy={16}
          r={11}
          stroke="#00D4FF"
          strokeWidth={1.75}
          fill="none"
        />
        <Polygon
          points="16,9 17.4,14.6 23,16 17.4,17.4 16,23 14.6,17.4 9,16 14.6,14.6"
          fill="#FFFFFF"
        />
        <Circle cx={25.5} cy={10.5} r={2} fill="#00D4FF" />
      </G>
    </Svg>
  );
}

function CornerDecoration({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const scaleX = position.endsWith("r") ? -1 : 1;
  const scaleY = position.startsWith("b") ? -1 : 1;
  return (
    <Svg width={40} height={40} viewBox="0 0 48 48" style={{ transform: `scale(${scaleX}, ${scaleY})` }}>
      <G>
        <Path d="M4 44V12C4 6 8 4 12 4H44" stroke="#D4AF37" strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M4 44C4 38 6 34 10 30" stroke="#D4AF37" strokeWidth={1} strokeLinecap="round" opacity={0.7} />
        <Circle cx={12} cy={4} r={1.5} fill="#F5C451" />
        <Circle cx={4} cy={12} r={1} fill="#F5C451" opacity={0.8} />
      </G>
    </Svg>
  );
}

function HexagonIcon({ size = 24, color = "#D4AF37" }: { size?: number; color?: string }) {
  const half = size / 2;
  const h = size * 0.32;
  const points = [
    `${half},${0}`,
    `${size - h},${h}`,
    `${size - h},${size - h}`,
    `${half},${size}`,
    `${h},${size - h}`,
    `${h},${h}`,
  ].join(" ");
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Polygon points={points} fill={color} opacity={0.85} />
    </Svg>
  );
}

function Seal() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 100, height: 84 }}>
      <Svg width={100} height={70} viewBox="0 0 120 100" style={{ position: "absolute" }}>
        <G>
          <Path d="M18 72C8 58 6 42 14 28C20 18 28 14 34 16" stroke="#D4AF37" strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <Path d="M102 72C112 58 114 42 106 28C100 18 92 14 86 16" stroke="#D4AF37" strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <Circle cx={22} cy={48} r={3} fill="#D4AF37" opacity={0.55} />
          <Circle cx={30} cy={38} r={2.5} fill="#D4AF37" opacity={0.5} />
          <Circle cx={98} cy={48} r={3} fill="#D4AF37" opacity={0.55} />
          <Circle cx={90} cy={38} r={2.5} fill="#D4AF37" opacity={0.5} />
        </G>
      </Svg>
      <View
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          borderWidth: 1.5,
          borderColor: "#D4AF37",
          backgroundColor: "#0B1D3A",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <Text style={{ fontSize: 9, fontWeight: "bold", color: "#D4AF37", letterSpacing: 0.5 }}>NOVA</Text>
        <Text style={{ fontSize: 6, color: "#FFFFFF", marginTop: 1 }}>STEM HUB</Text>
        <Text style={{ fontSize: 5, color: "#D4AF37", marginTop: 1 }}>★ ★ ★</Text>
      </View>
    </View>
  );
}

export function CertificatePdfDocument({
  holderName,
  programTitle,
  credentialTitle,
  category,
  credentialLevel,
  completionDate,
  issueDate,
  learningHours,
  finalScore,
  passingScore,
  code,
  verificationUrl,
  qrCodeDataUrl,
}: CertificatePdfDocumentProps) {
  const copy = getCertificateTemplateCopy();
  const displayTitle = credentialTitle ?? copy.title;
  const displayCategory = category ?? "—";
  const displayLevel = credentialLevel ?? copy.levelLabel;
  const displayHours = learningHours != null ? String(learningHours) : "—";
  const displayScore = finalScore != null ? `${finalScore}%` : "—";
  const displayPassing = passingScore != null ? `${passingScore}%` : copy.minimum;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ backgroundColor: "#0B1D3A", color: "#FFFFFF" }}>
        <View style={{ width: "100%", height: "100%", padding: 32 }}>
          {/* Outer + inner border frames */}
          <View
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              right: 24,
              bottom: 24,
              borderWidth: 1,
              borderColor: "#D4AF37",
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 30,
              left: 30,
              right: 30,
              bottom: 30,
              borderWidth: 1,
              borderColor: "#00E5FF",
            }}
          />

          {/* Corners */}
          <View style={{ position: "absolute", top: 24, left: 24 }}>
            <CornerDecoration position="tl" />
          </View>
          <View style={{ position: "absolute", top: 24, right: 24 }}>
            <CornerDecoration position="tr" />
          </View>
          <View style={{ position: "absolute", bottom: 24, left: 24 }}>
            <CornerDecoration position="bl" />
          </View>
          <View style={{ position: "absolute", bottom: 24, right: 24 }}>
            <CornerDecoration position="br" />
          </View>

          {/* Main content */}
          <View style={{ flex: 1, alignItems: "center", paddingTop: 8, paddingHorizontal: 48 }}>
            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <NovaLogoIcon size={28} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF", letterSpacing: 0.5 }}>
                  {copy.hub}
                </Text>
              </View>
              <Text style={{ fontSize: 9, color: "#A5E6F3", marginTop: 2 }}>
                {copy.onlineCourse} · {copy.location}
              </Text>
            </View>

            {/* Title */}
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Times-Bold",
                color: "#F5C451",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {displayTitle}
            </Text>

            <View style={{ width: 120, height: 1, backgroundColor: "#D4AF37", marginVertical: 8 }} />

            {/* Certifies */}
            <Text style={{ fontSize: 10, color: "#A5E6F3", textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>
              {copy.certifies}
            </Text>

            {/* Holder name */}
            <Text
              style={{
                fontSize: 32,
                fontFamily: "Times-Italic",
                color: "#FFFFFF",
                textAlign: "center",
                marginVertical: 6,
                maxWidth: 640,
              }}
            >
              {holderName}
            </Text>

            {/* Achievement statement */}
            <Text style={{ fontSize: 9, color: "#A5E6F3", textAlign: "center", maxWidth: 560, lineHeight: 1.4, marginTop: 4 }}>
              {copy.completed}
            </Text>

            {/* Program title */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#00E5FF",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginTop: 8,
                maxWidth: 600,
              }}
            >
              {programTitle}
            </Text>

            {/* Category / level / hours */}
            <View style={{ flexDirection: "row", gap: 16, marginTop: 8, justifyContent: "center" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 7, color: "#A5E6F3", textTransform: "uppercase" }}>{copy.categoryLabel}</Text>
                <Text style={{ fontSize: 9, color: "#FFFFFF", fontWeight: "bold" }}>{displayCategory}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 7, color: "#A5E6F3", textTransform: "uppercase" }}>{copy.levelLabel}</Text>
                <Text style={{ fontSize: 9, color: "#FFFFFF", fontWeight: "bold" }}>{displayLevel}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 7, color: "#A5E6F3", textTransform: "uppercase" }}>{copy.hoursLabel}</Text>
                <Text style={{ fontSize: 9, color: "#FFFFFF", fontWeight: "bold" }}>{displayHours}</Text>
              </View>
            </View>

            {/* Institutional statement */}
            <Text style={{ fontSize: 7, color: "#A5E6F3", textAlign: "center", maxWidth: 560, marginTop: 8, opacity: 0.85 }}>
              {copy.institutional}
            </Text>

            {/* Stats row */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 640, marginTop: "auto", marginBottom: 20 }}>
              {/* Score */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, minWidth: 140 }}>
                <HexagonIcon size={28} color="#F5C451" />
                <View>
                  <Text style={{ fontSize: 8, color: "#A5E6F3" }}>{copy.assessment}</Text>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#FFFFFF" }}>{displayScore}</Text>
                  <Text style={{ fontSize: 7, color: "#A5E6F3" }}>{displayPassing}</Text>
                </View>
              </View>

              {/* Seal */}
              <Seal />

              {/* Date */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, minWidth: 140, justifyContent: "flex-end" }}>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 8, color: "#A5E6F3" }}>{copy.date}</Text>
                  <Text style={{ fontSize: 11, fontWeight: "bold", color: "#FFFFFF" }}>{formatDate(issueDate)}</Text>
                  {completionDate && (
                    <Text style={{ fontSize: 7, color: "#A5E6F3" }}>Completed {formatDate(completionDate)}</Text>
                  )}
                </View>
                <HexagonIcon size={28} color="#F5C451" />
              </View>
            </View>

            {/* Footer */}
            <View style={{ width: "100%", borderTopWidth: 0.5, borderColor: "#D4AF37", paddingTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              {/* Academic Director */}
              <View style={{ alignItems: "center", minWidth: 120 }}>
                <Text style={{ fontSize: 20, color: "#D4AF37", fontFamily: "Times-Italic" }}>✦</Text>
                <View style={{ width: 80, height: 0.5, backgroundColor: "#D4AF37", marginVertical: 4 }} />
                <Text style={{ fontSize: 8, color: "#FFFFFF", fontWeight: "bold" }}>{copy.academicDirector}</Text>
                <Text style={{ fontSize: 7, color: "#A5E6F3" }}>{copy.hub}</Text>
              </View>

              {/* QR + verification */}
              <View style={{ alignItems: "center", maxWidth: 260 }}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image src={qrCodeDataUrl} style={{ width: 56, height: 56, backgroundColor: "#FFFFFF" }} />
                <Text style={{ fontSize: 8, color: "#A5E6F3", marginTop: 4 }}>{copy.scanToVerify}</Text>
                <Text style={{ fontSize: 7, color: "#00E5FF", textAlign: "center" }}>
                  {verificationUrl}
                </Text>
                <Text style={{ fontSize: 7, color: "#A5E6F3", marginTop: 2 }}>
                  {copy.verifyCode}: {code}
                </Text>
              </View>

              {/* Program Director */}
              <View style={{ alignItems: "center", minWidth: 120 }}>
                <Text style={{ fontSize: 20, color: "#D4AF37", fontFamily: "Times-Italic" }}>✦</Text>
                <View style={{ width: 80, height: 0.5, backgroundColor: "#D4AF37", marginVertical: 4 }} />
                <Text style={{ fontSize: 8, color: "#FFFFFF", fontWeight: "bold" }}>{copy.programDirector}</Text>
                <Text style={{ fontSize: 7, color: "#A5E6F3" }}>{copy.hub}</Text>
              </View>
            </View>

            {/* Verified badge */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 10, borderWidth: 0.5, borderColor: "#D4AF37", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 10, color: "#F5C451" }}>✓</Text>
              <View>
                <Text style={{ fontSize: 8, color: "#FFFFFF", fontWeight: "bold" }}>{copy.verified}</Text>
                <Text style={{ fontSize: 7, color: "#A5E6F3" }}>{copy.novaCertified}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
