import type { Metadata } from "next";
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
    <div className="relative flex flex-1 flex-col">
      <PartnershipPageContent locale="es" />
      </div>
  );
}
