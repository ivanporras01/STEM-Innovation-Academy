import type { Metadata } from "next";
import { CatalogPrintDocument } from "@/components/catalog/catalog-print-document";
import { CatalogPrintToolbar } from "@/components/catalog/catalog-print-toolbar";
import "./catalog-print.css";

export const metadata: Metadata = {
  title: "Program Catalog PDF — NOVA STEM HUB",
  description: "Printable catalog of all 21 NOVA programs with suggested tuition fees.",
  robots: { index: false, follow: false },
};

export default function CatalogPrintPage() {
  return (
    <div className="catalog-print-page">
      <CatalogPrintToolbar />
      <CatalogPrintDocument />
    </div>
  );
}
