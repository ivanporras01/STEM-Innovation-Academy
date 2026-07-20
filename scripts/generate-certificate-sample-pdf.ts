/**
 * Generates locale-specific sample PDFs under public/downloads/
 * from the /certificado-muestra page.
 *
 * Usage: npm run cert:sample-pdf
 * Env: CERT_SAMPLE_BASE_URL (optional override)
 *      PORT (used when auto-detecting local server)
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "downloads");

const LOCALES = ["en", "es", "pt"] as const;

const PDF_NAMES: Record<(typeof LOCALES)[number], string> = {
  en: "certificate-of-achievement-nova-sample-en.pdf",
  es: "certificate-of-achievement-nova-sample-es.pdf",
  pt: "certificate-of-achievement-nova-sample-pt.pdf",
};

async function resolveBaseUrl(): Promise<string> {
  const explicit = process.env.CERT_SAMPLE_BASE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const envPort = process.env.PORT?.trim();
  const ports = envPort ? [envPort] : ["3020", "3000", "3001", "3002", "3003", "3010"];

  for (const port of ports) {
    const candidate = `http://127.0.0.1:${port}`;
    try {
      const res = await fetch(`${candidate}/certificado-muestra?locale=en`, {
        signal: AbortSignal.timeout(5_000),
      });
      if (res.ok) {
        console.log("Using local server:", candidate);
        return candidate;
      }
    } catch {
      /* try next port */
    }
  }

  throw new Error(
    `No local Next.js server found on ports ${ports.join(", ")}. ` +
      "Start with `npm run dev` or `npm run build && npm run start`, " +
      "or set CERT_SAMPLE_BASE_URL.",
  );
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

async function generatePdfForLocale(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof launchBrowser>>["newPage"]>>,
  baseUrl: string,
  locale: (typeof LOCALES)[number],
) {
  const pageUrl = `${baseUrl}/certificado-muestra?locale=${locale}`;
  const pdfPath = join(OUT_DIR, PDF_NAMES[locale]);

  await page.goto(pageUrl, { waitUntil: "networkidle0", timeout: 120_000 });
  await page.waitForSelector("#nova-certificate[data-sample='true']", {
    timeout: 90_000,
  });
  await page.waitForFunction(
    (expectedLocale) => {
      const el = document.querySelector("#nova-certificate[data-sample='true']");
      return el?.getAttribute("data-locale") === expectedLocale;
    },
    { timeout: 30_000 },
    locale,
  );
  await page.emulateMediaType("print");

  await page.pdf({
    path: pdfPath,
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: "0.35in", right: "0.35in", bottom: "0.35in", left: "0.35in" },
  });

  console.log("Wrote PDF:", pdfPath);
  console.log("Source:", pageUrl);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const baseUrl = await resolveBaseUrl();

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

  for (const locale of LOCALES) {
    await generatePdfForLocale(page, baseUrl, locale);
  }

  await browser.close();
  console.log(`Generated ${LOCALES.length} sample certificate PDFs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
