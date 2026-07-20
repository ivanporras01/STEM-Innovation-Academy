import type { Metadata } from "next";
import { CatalogPageClient } from "@/components/catalog/catalog-page-client";

export const metadata: Metadata = {
  title: "Program Catalog — 21 STEM & Language Programs",
  description:
    "Official NOVA STEM HUB catalog: 21 programs across School, College, and Language. Play free demo missions, browse syllabi and pricing, then enroll when you're ready.",
};

export default function CatalogPage() {
  return <CatalogPageClient />;
}
