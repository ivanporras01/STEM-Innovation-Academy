import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { NovaCosmosBackground } from "@/components/ui/nova-universe";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "NOVA — STEM Innovation Academy",
    template: "%s | NOVA LMS",
  },
  description:
    "Practical STEM education for future innovators. NOVA helps middle and high school learners explore technology, build projects, and grow into confident innovators. Learn • Build • Innovate • Inspire.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NovaCosmosBackground />
        <div className="relative z-[1]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
