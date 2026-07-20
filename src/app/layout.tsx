import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { NovaCosmosBackground } from "@/components/ui/nova-universe";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import { buildRootMetadata } from "@/lib/seo";
import { getOrbitoRealVariant } from "@/components/orbit/orbito-real-catalog";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = buildRootMetadata();

const ORBITA_GREETING_FRAMES = getOrbitoRealVariant("orbita").greetingFrames;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {ORBITA_GREETING_FRAMES.map((href) => (
          <link key={href} rel="preload" as="image" href={href} fetchPriority="high" />
        ))}
      </head>
      <body className={inter.className}>        <GoogleAnalytics />
        <NovaCosmosBackground />
        <div className="relative z-[1]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
