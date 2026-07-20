/**
 * Generates public/downloads/NOVA-STEM-HUB-Program-Catalog.pdf
 * from the unified catalog data (21 programs + Quantum QCW).
 *
 * Usage: npm run catalog:pdf
 * Requires: puppeteer (installed on first run via npx)
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATALOG_STATS,
  NOVA_PROGRAM_BUNDLES,
  NOVA_PROGRAM_CATALOG,
} from "../src/data/courses/catalog";
import type { NovaProgram, ProgramVertical } from "../src/data/courses/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "downloads");
const PDF_PATH = join(OUT_DIR, "NOVA-STEM-HUB-Program-Catalog.pdf");
const HTML_PATH = join(OUT_DIR, "NOVA-STEM-HUB-Program-Catalog.html");

const VERTICAL_LABELS: Record<ProgramVertical, string> = {
  school: "NOVA School — Youth Electives (9)",
  college: "NOVA College — Employability Tracks (9)",
  language: "NOVA Language — CEFR Programs (3)",
};

const PRICING_GUIDE = [
  { tier: "School standard electives", range: "$179 / elective" },
  { tier: "School premium (Coding, Robotics, IoT + demo missions)", range: "$249 / elective" },
  { tier: "Cybersecurity Teens", range: "$199 / elective" },
  { tier: "School Explorer Pass (all 9 electives)", range: "$1,299 / year" },
  { tier: "College Tier 1 tracks", range: "$749 – $949 (most $849 – $899)" },
  { tier: "Quantum Workforce — Tier 2 Advanced (QCW)", range: "$1,899 / program" },
  { tier: "College Career Starter (any 2 Tier 1 tracks)", range: "$1,499" },
  { tier: "NOVA Language (each)", range: "$449 / program" },
  { tier: "Language Trilingual Pack (EN + ES + PT)", range: "$999" },
];

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function programHtml(p: NovaProgram): string {
  const isQuantum = p.slug === "quantum-workforce";
  const highlights = (p.highlights ?? [])
    .map((h) => `<li>${esc(h)}</li>`)
    .join("");
  const quantumExtra = isQuantum
    ? `<div class="quantum-extra">
        <h4>Quantum Computing Workforce (QCW) — Tier 2 Advanced</h4>
        <p>12-module curriculum from qubit fundamentals to industry capstone. Interactive labs: Bloch sphere, gate playground, optical bench, Qiskit projects. Certificate <strong>NOVA-COL-QNT</strong>. Pathway to IBM Quantum Developer Certification.</p>
        <p>Platform: <a href="https://quantum-workforce-academy.vercel.app">quantum-workforce-academy.vercel.app</a> · Course: quantum-computing-workforce-development</p>
      </div>`
    : "";

  return `<article class="catalog-program${isQuantum ? " catalog-program-quantum" : ""}" id="${esc(p.slug)}">
    <header class="catalog-program-header">
      <div>
        <h3>${esc(p.title)}</h3>
        <p class="tagline">${esc(p.tagline)}</p>
      </div>
      <div class="tuition-badge">${esc(p.tuitionLabel ?? `$${p.tuitionUsd}`)}</div>
    </header>
    <p class="description">${esc(p.description.replace(/\*\*/g, ""))}</p>
    <dl class="meta-grid">
      <div><dt>Duration</dt><dd>${esc(p.durationLabel)}</dd></div>
      <div><dt>Age range</dt><dd>${esc(p.ageRange ?? "—")}</dd></div>
      <div><dt>Tuition (USD)</dt><dd>$${p.tuitionUsd.toLocaleString("en-US")}</dd></div>
      <div><dt>Access</dt><dd>${esc(p.access === "demo-then-paid" ? "Free demo mission → paid full course" : "Paid after registration")}</dd></div>
      ${p.certCode ? `<div><dt>Certificate</dt><dd>${esc(p.certCode)}</dd></div>` : ""}
      ${p.demoHref ? `<div class="meta-span-2"><dt>Preview</dt><dd>${esc(p.demoLabel ?? "Preview")}: ${esc(p.demoHref)}</dd></div>` : ""}
    </dl>
    ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}
    ${p.deliveryNote ? `<p class="delivery-note">${esc(p.deliveryNote)}</p>` : ""}
    ${quantumExtra}
  </article>`;
}

function buildHtml(): string {
  const generated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cssPath = join(ROOT, "src", "app", "catalog", "print", "catalog-print.css");
  const css = readFileSync(cssPath, "utf8");

  const verticals: ProgramVertical[] = ["school", "college", "language"];
  const sections = verticals
    .map((v) => {
      const programs = NOVA_PROGRAM_CATALOG.filter((p) => p.vertical === v);
      return `<section class="catalog-section catalog-vertical">
        <h2>${VERTICAL_LABELS[v]}</h2>
        ${programs.map(programHtml).join("\n")}
      </section>`;
    })
    .join("\n");

  const pricingRows = PRICING_GUIDE.map(
    (r) => `<tr><td>${esc(r.tier)}</td><td>${esc(r.range)}</td></tr>`,
  ).join("");

  const bundles = NOVA_PROGRAM_BUNDLES.map(
    (b) => `<article class="bundle-block">
      <header class="catalog-program-header">
        <div><h3>${esc(b.title)}</h3><p class="tagline">${esc(b.description)}</p></div>
        <div class="tuition-badge">${esc(b.tuitionLabel ?? `$${b.tuitionUsd}`)}</div>
      </header>
      <p><strong>$${b.tuitionUsd.toLocaleString("en-US")}</strong>${b.savingsUsd ? ` · save ~$${b.savingsUsd} vs individual` : ""}</p>
      <p class="bundle-slugs">Includes: ${b.programSlugs.join(", ")}</p>
    </article>`,
  ).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>NOVA STEM HUB — Program Catalog</title>
  <style>${css}
    body { margin: 0; background: #fff; }
    .catalog-print-root { box-shadow: none; max-width: none; }
  </style>
</head>
<body>
  <div class="catalog-print-root">
    <header class="catalog-cover">
      <p class="eyebrow">NOVA STEM HUB · Official Program Catalog</p>
      <h1>Complete Catalog — 21 Programs</h1>
      <p class="subtitle">NOVA School · NOVA College · NOVA Language · Quantum Workforce (QCW)</p>
      <p class="generated">Generated ${esc(generated)} · stem-innovation-academy.vercel.app/catalog</p>
    </header>
    <section class="catalog-section">
      <h2>Catalog at a glance</h2>
      <div class="stats-row">
        <div><strong>${CATALOG_STATS.totalPrograms}</strong><span>Total programs</span></div>
        <div><strong>${CATALOG_STATS.school}</strong><span>School electives</span></div>
        <div><strong>${CATALOG_STATS.college}</strong><span>College tracks</span></div>
        <div><strong>${CATALOG_STATS.language}</strong><span>Languages</span></div>
      </div>
      <p class="access-model"><strong>Access model:</strong> Play to learn — syllabi, outcomes, and pricing are public with no login required. NOVA School offers free demo missions on Coding &amp; AI, Robotics, and IoT electives. Full course content unlocks when you enroll.</p>
    </section>
    <section class="catalog-section">
      <h2>Suggested tuition fees (USD)</h2>
      <table class="pricing-table"><thead><tr><th>Category</th><th>Suggested price</th></tr></thead><tbody>${pricingRows}</tbody></table>
    </section>
    ${sections}
    <section class="catalog-section">
      <h2>Bundle packages</h2>
      ${bundles}
    </section>
    <footer class="catalog-footer">
      <p>NOVA STEM HUB · <a href="https://stem-innovation-academy.vercel.app">stem-innovation-academy.vercel.app</a></p>
      <p>Live catalog: <a href="https://stem-innovation-academy.vercel.app/catalog">/catalog</a> · Quantum: <a href="https://quantum-workforce-academy.vercel.app">quantum-workforce-academy.vercel.app</a></p>
      <p class="fine-print">Tuition shown are suggested list prices. Scholarships and B2B licensing available. Prices subject to change.</p>
    </footer>
  </div>
</body>
</html>`;
}

async function launchBrowser() {
  const puppeteer = await import("puppeteer");
  const chromePaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    process.env.PUPPETEER_EXECUTABLE_PATH,
  ].filter(Boolean) as string[];

  for (const executablePath of chromePaths) {
    try {
      return await puppeteer.default.launch({
        headless: true,
        executablePath,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    } catch {
      /* try next */
    }
  }

  return puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const html = buildHtml();
  writeFileSync(HTML_PATH, html, "utf8");
  console.log("Wrote HTML:", HTML_PATH);

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(`file:///${HTML_PATH.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });
  await page.pdf({
    path: PDF_PATH,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
  });
  await browser.close();

  console.log("Wrote PDF:", PDF_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
