"use client";

export function CatalogPrintToolbar() {
  return (
    <div className="catalog-print-toolbar no-print">
      <p>
        Open your browser print dialog and choose <strong>Save as PDF</strong>, or run{" "}
        <code>npm run catalog:pdf</code> to generate{" "}
        <code>public/downloads/NOVA-STEM-HUB-Program-Catalog.pdf</code>.
      </p>
      <button type="button" onClick={() => window.print()}>
        Print / Save as PDF
      </button>
    </div>
  );
}
