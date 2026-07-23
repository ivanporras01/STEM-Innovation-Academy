import type { Metadata } from "next";
import { ResourcesHub } from "@/components/resources/resources-hub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recursos — NOVA STEM HUB",
  description:
    "Explora el hub de recursos de NOVA STEM HUB: programas, becas, pasantías, partnerships, verificación de certificados y más.",
  path: "/es/resources",
});

export default function ResourcesPageEs() {
  return <ResourcesHub locale="es" />;
}
