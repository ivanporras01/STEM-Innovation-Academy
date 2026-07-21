/**
 * Focused smoke: rescue-rover + pixel-portal-escape arenas render buddy token + rich boards.
 */
import puppeteer from "puppeteer";

const BASE = process.env.SMOKE_BASE || "http://localhost:3020";
const CHROME =
  process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function advanceToLab(page) {
  await page.waitForSelector('[data-mission-cta="accept"]', { timeout: 60000 });
  await page.click('[data-mission-cta="accept"]');

  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("button")].some((b) =>
        /Continue with My Buddy/i.test(b.textContent || ""),
      ),
    { timeout: 25000 },
  );

  // Pick first buddy card if present, then continue
  await page.evaluate(() => {
    const cards = [...document.querySelectorAll("button")].filter((b) =>
      /navito|luna|milo|ollie|koda|buddy/i.test(b.textContent || ""),
    );
    cards[0]?.click();
    const cont = [...document.querySelectorAll("button")].find((b) =>
      /Continue with My Buddy/i.test(b.textContent || ""),
    );
    cont?.click();
  });

  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("button")].some((b) => /Enter the LAB/i.test(b.textContent || "")),
    { timeout: 25000 },
  );
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      /Enter the LAB/i.test(b.textContent || ""),
    );
    btn?.click();
  });
  await page.waitForSelector(".lab-arena, .lab-hud-shell", { timeout: 25000 });
}

async function smoke(slug, checks) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e)));

  try {
    await page.goto(`${BASE}/experiences/${slug}`, {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });
    await page.waitForSelector('[data-mission-cta="accept"], .experience-shell', {
      timeout: 60000,
    });
    await advanceToLab(page);
    await new Promise((r) => setTimeout(r, 800));

    const report = await page.evaluate((need) => {
      const out = {};
      for (const sel of need) {
        out[sel] = document.querySelectorAll(sel).length;
      }
      out.hasCoords = /,\s*\d|\d,\d/.test(
        [...document.querySelectorAll(".lab-sector-cell, .pixel-tile")]
          .map((el) => el.textContent || "")
          .join(" "),
      );
      out.buddyPortrait = document.querySelectorAll(".lab-buddy-token img, .lab-buddy-token-portrait img").length;
      out.buddyFallback = document.querySelectorAll(".lab-buddy-token--fallback").length;
      out.pageErrorsNote = document.body.innerText.slice(0, 80);
      return out;
    }, checks.selectors);

    // Primary interaction poke
    let pokeOk = true;
    if (checks.poke) {
      pokeOk = await page.evaluate((label) => {
        const btn = [...document.querySelectorAll("button")].find((b) =>
          (b.textContent || "").includes(label),
        );
        if (!btn || btn.disabled) return false;
        btn.click();
        return true;
      }, checks.poke);
      await new Promise((r) => setTimeout(r, 400));
    }

    const missing = checks.selectors.filter((s) => !report[s]);
    const buddyOk = report.buddyPortrait > 0 || report.buddyFallback > 0;
    const ok = missing.length === 0 && buddyOk && pokeOk && errors.length === 0 && !report.hasCoords;

    return { slug, ok, report, pokeOk, missing, errors, buddyOk };
  } finally {
    await browser.close();
  }
}

const jobs = [
  {
    slug: "rescue-rover",
    selectors: [
      ".lab-arena--robot",
      ".lab-arena-aurora",
      ".lab-sector-board",
      ".lab-sector-cell--launch",
      ".lab-sector-cell--debris",
      ".lab-sector-cell--pod",
      ".lab-buddy-token",
      ".lab-stage-chrome",
    ],
    poke: "Forward",
  },
  {
    slug: "pixel-portal-escape",
    selectors: [
      ".lab-arena--pixel",
      ".lab-arena-aurora",
      ".pixel-grid",
      ".pixel-tile--start",
      ".pixel-tile--exit",
      ".pixel-tile--glitch",
      ".lab-buddy-token",
      ".lab-stage-chrome",
    ],
    poke: "Playtest",
  },
];

const results = [];
for (const job of jobs) {
  process.stdout.write(`Smoke ${job.slug}… `);
  try {
    const r = await smoke(job.slug, job);
    results.push(r);
    console.log(
      r.ok ? "OK" : "FAIL",
      JSON.stringify({
        buddyOk: r.buddyOk,
        pokeOk: r.pokeOk,
        missing: r.missing,
        buddyPortrait: r.report?.buddyPortrait,
        hasCoords: r.report?.hasCoords,
        errors: r.errors,
      }),
    );
  } catch (e) {
    results.push({ slug: job.slug, ok: false, error: String(e.message || e) });
    console.log("FAIL", e.message || e);
  }
}

const failed = results.filter((r) => !r.ok);
console.log("\nSUMMARY", { passed: results.length - failed.length, failed: failed.length });
if (failed.length) {
  console.log(JSON.stringify(failed, null, 2));
  process.exit(1);
}
