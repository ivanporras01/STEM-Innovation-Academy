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
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-nova-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#061321]"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <NovaCosmosBackground />
        <div id="main-content" className="relative z-[1]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
