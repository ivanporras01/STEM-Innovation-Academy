/**
 * Smoke-test Explore Now LAB arenas: advance to LAB stage, assert chrome, poke primary controls.
 */
import puppeteer from "puppeteer";

const BASE = process.env.SMOKE_BASE || "http://localhost:3020";

const MISSIONS = [
  { slug: "pixel-portal-escape", theme: "pixel", poke: "Playtest" },
  { slug: "viral-signal-brief", theme: "viral", poke: "Launch Campaign" },
  { slug: "restore-nova-signal", theme: "code", poke: "Transmit" },
  { slug: "rescue-rover", theme: "robot", poke: "Run" },
  { slug: "smart-greenhouse", theme: "iot", poke: "Emergency" },
  { slug: "founder-orbit-pitch", theme: "pitch", poke: null },
  { slug: "story-beacon-reel", theme: "story", poke: null },
  { slug: "phish-shadow-ops", theme: "cyber", poke: null },
  { slug: "community-spark-lab", theme: "impact", poke: "Assemble" },
];

async function advanceToLab(page) {
  await page.waitForSelector('[data-mission-cta="accept"]', { timeout: 45000 });
  await page.click('[data-mission-cta="accept"]');

  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("button")].some((b) =>
        /Continue with My Buddy/i.test(b.textContent || ""),
      ),
    { timeout: 25000 },
  );

  await page.evaluate(() => {
    for (const input of document.querySelectorAll("input")) {
      if (input instanceof HTMLInputElement && input.value.trim().length < 2) {
        const proto = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        );
        proto?.set?.call(input, "Explorer");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  });

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      /Continue with My Buddy/i.test(b.textContent || ""),
    );
    btn?.click();
  });

  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("button")].some((b) =>
        /Enter the LAB/i.test(b.textContent || ""),
      ),
    { timeout: 25000 },
  );

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      /Enter the LAB/i.test(b.textContent || ""),
    );
    btn?.click();
  });

  await page.waitForSelector(".lab-arena", { timeout: 25000 });
  await page.waitForSelector(".lab-arena-aurora", { timeout: 10000 });
}

async function smokeOne(browser, mission) {
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e)));

  await page.goto(`${BASE}/experiences/${mission.slug}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await advanceToLab(page);

  const report = await page.evaluate((theme) => {
    const arena = document.querySelector(".lab-arena");
    const shell = document.querySelector(".lab-hud-shell");
    const aurora = document.querySelector(".lab-arena-aurora");
    const meters = document.querySelectorAll(".lab-meter").length;
    const stageChrome = document.querySelector(".lab-stage-chrome");
    const themeOk = arena?.classList.contains(`lab-arena--${theme}`) ?? false;
    const mode = document.querySelector(".lab-mode-badge")?.textContent?.replace(/\s+/g, " ").trim() || "";
    return {
      hasArena: !!arena,
      hasShell: !!shell,
      hasAurora: !!aurora,
      hasStageChrome: !!stageChrome,
      meters,
      themeOk,
      mode,
    };
  }, mission.theme);

  let pokeOk = true;
  if (mission.poke) {
    pokeOk = await page.evaluate((label) => {
      const btn = [...document.querySelectorAll("button")].find((b) =>
        (b.textContent || "").includes(label),
      );
      if (!btn || btn.disabled) return false;
      btn.click();
      return true;
    }, mission.poke);
    await new Promise((r) => setTimeout(r, 350));
  } else {
    pokeOk = await page.evaluate(() => {
      const choice = document.querySelector(".lab-choice");
      if (choice instanceof HTMLButtonElement && !choice.disabled) {
        choice.click();
        return true;
      }
      const any = [...document.querySelectorAll(".lab-arena button")].find((b) => !b.disabled);
      if (any) {
        any.click();
        return true;
      }
      return true;
    });
    await new Promise((r) => setTimeout(r, 200));
  }

  await page.close();
  const ok =
    report.hasArena &&
    report.hasShell &&
    report.hasAurora &&
    report.hasStageChrome &&
    report.themeOk &&
    report.meters >= 1 &&
    pokeOk &&
    errors.length === 0;

  return { slug: mission.slug, ok, report, pokeOk, errors };
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const results = [];
try {
  for (const mission of MISSIONS) {
    process.stdout.write(`Smoke ${mission.slug}… `);
    try {
      const r = await smokeOne(browser, mission);
      results.push(r);
      console.log(
        r.ok ? "OK" : "FAIL",
        JSON.stringify({
          themeOk: r.report.themeOk,
          meters: r.report.meters,
          aurora: r.report.hasAurora,
          pokeOk: r.pokeOk,
          errors: r.errors,
        }),
      );
    } catch (e) {
      results.push({ slug: mission.slug, ok: false, error: String(e.message || e) });
      console.log("FAIL", e.message || e);
    }
  }
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log("\nSUMMARY", {
  passed: results.filter((r) => r.ok).length,
  failed: failed.length,
});
if (failed.length) {
  console.log(JSON.stringify(failed, null, 2));
  process.exit(1);
}
