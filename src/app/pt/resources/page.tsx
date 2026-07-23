import type { Metadata } from "next";
import { ResourcesHub } from "@/components/resources/resources-hub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recursos — NOVA STEM HUB",
  description:
    "Explore o hub de recursos da NOVA STEM HUB: programas, bolsas, estágios, parcerias, verificação de certificados e mais.",
  path: "/pt/resources",
});

export default function ResourcesPagePt() {
  return <ResourcesHub locale="pt" />;
}
