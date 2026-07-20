import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PartnershipPageContent } from "@/components/partnerships/partnership-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "NOVA Partnership — Colegios e instituciones",
  description:
    "Licencia NOVA School y NOVA College para tu institución — currículo, plataforma, guías del facilitador y certificados verificables.",
  path: "/es/partnership",
  locale: "es",
});

export default function SpanishPartnershipPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <PartnershipPageContent locale="es" />
      <Footer />
    </div>
  );
}
