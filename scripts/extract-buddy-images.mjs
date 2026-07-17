/**
 * Extract NOVA Buddy portrait images from demo HTML (base64) and/or
 * crop individual portraits from the 20-character mockup grid.
 *
 * Usage: node scripts/extract-buddy-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "buddies");

const BUDDY_IDS = [
  "navito",
  "r3",
  "luna",
  "milo",
  "ollie",
  "koda",
  "zara",
  "bolt",
  "pixel",
  "astra",
  "orion",
  "eleo",
  "prof-hoot",
  "chelsea",
  "marina",
  "leo",
  "dr-bunny",
  "skylar",
  "rhino",
  "nexo",
];

/** HTML demo names → buddies.ts ids */
const HTML_NAME_MAP = {
  Novito: "navito",
  Navito: "navito",
  R3: "r3",
  Luna: "luna",
  Milo: "milo",
  Ollie: "ollie",
  Koda: "koda",
  Zara: "zara",
  Bolt: "bolt",
  Pixel: "pixel",
  Astra: "astra",
  Orion: "orion",
  Eleo: "eleo",
  "Prof. Hoot": "prof-hoot",
  "Prof Hoot": "prof-hoot",
  Chelsea: "chelsea",
  Marina: "marina",
  Leo: "leo",
  "Dr. Bunny": "dr-bunny",
  "Dr Bunny": "dr-bunny",
  Skylar: "skylar",
  Rhino: "rhino",
  Nexo: "nexo",
};

const HTML_SOURCES = [
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo(2).html",
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo.html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.1.html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.0.html",
];

const MOCKUP_PATH =
  "C:/Users/Laptop9/.cursor/projects/c-Users-Laptop9-Documents-GitHub-STEM-Innovation-Academy/assets/c__Users_Laptop9_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-60f60146-0a12-4652-9c5e-71c4e23da2d5.png";

function parseBuddiesFromHtml(html) {
  const start = html.indexOf("const buddies=");
  if (start === -1) return {};

  const chunk = html.slice(start, start + 3_000_000);
  const re = /([A-Za-z][A-Za-z0-9._\s-]*?):\{image:"(data:image\/[^"]+)"/g;
  const found = {};
  let m;
  while ((m = re.exec(chunk))) {
    const rawName = m[1].trim();
    const id = HTML_NAME_MAP[rawName];
    if (id) found[id] = m[2];
  }
  return found;
}

function decodeDataUrl(dataUrl) {
  const comma = dataUrl.indexOf(",");
  const meta = dataUrl.slice(0, comma);
  const b64 = dataUrl.slice(comma + 1);
  const ext = meta.includes("png") ? "png" : "jpg";
  return { buffer: Buffer.from(b64, "base64"), ext };
}

async function cropFromMockup(missingIds) {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("sharp not installed — run: npm install --save-dev sharp");
    return {};
  }

  if (!fs.existsSync(MOCKUP_PATH)) {
    console.warn("Mockup not found:", MOCKUP_PATH);
    return {};
  }

  const image = sharp(MOCKUP_PATH);
  const meta = await image.metadata();
  const { width, height } = meta;

  // Mockup layout: 5 cols × 4 rows of buddy cards (portrait area in upper portion of each card)
  const cols = 5;
  const rows = 4;

  // Grid starts below header text — tuned for the reference mockup screenshot
  const gridTop = Math.round(height * 0.155);
  const gridBottom = Math.round(height * 0.92);
  const gridLeft = Math.round(width * 0.02);
  const gridRight = Math.round(width * 0.98);

  const gridW = gridRight - gridLeft;
  const gridH = gridBottom - gridTop;
  const cellW = gridW / cols;
  const cellH = gridH / rows;

  // Portrait sits in top ~62% of each card
  const portraitHFrac = 0.62;
  const portraitPadX = 0.06;
  const portraitPadTop = 0.08;

  const cropped = {};
  for (let i = 0; i < BUDDY_IDS.length; i++) {
    const id = BUDDY_IDS[i];
    if (!missingIds.includes(id)) continue;

    const col = i % cols;
    const row = Math.floor(i / cols);

    const left = Math.round(gridLeft + col * cellW + cellW * portraitPadX);
    const top = Math.round(gridTop + row * cellH + cellH * portraitPadTop);
    const w = Math.round(cellW * (1 - portraitPadX * 2));
    const h = Math.round(cellH * portraitHFrac);

    const buf = await sharp(MOCKUP_PATH)
      .extract({ left, top, width: w, height: h })
      .jpeg({ quality: 92 })
      .toBuffer();

    cropped[id] = buf;
  }

  return cropped;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const extracted = {};
  const sources = {};

  for (const htmlPath of HTML_SOURCES) {
    if (!fs.existsSync(htmlPath)) {
      console.log("Skip missing HTML:", htmlPath);
      continue;
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    const buddies = parseBuddiesFromHtml(html);
    const names = Object.keys(buddies);
    console.log(`Found ${names.length} buddies in ${path.basename(htmlPath)}:`, names.join(", "));

    for (const [id, dataUrl] of Object.entries(buddies)) {
      if (!extracted[id]) {
        extracted[id] = dataUrl;
        sources[id] = path.basename(htmlPath);
      }
    }
  }

  const missing = BUDDY_IDS.filter((id) => !extracted[id]);
  console.log(`HTML provided ${Object.keys(extracted).length}/20; cropping ${missing.length} from mockup`);

  const cropped = await cropFromMockup(missing);

  const report = [];

  for (const id of BUDDY_IDS) {
    const outPath = path.join(OUT_DIR, `${id}.jpg`);

    if (extracted[id]) {
      const { buffer } = decodeDataUrl(extracted[id]);
      fs.writeFileSync(outPath, buffer);
      report.push({ id, source: sources[id] });
    } else if (cropped[id]) {
      fs.writeFileSync(outPath, cropped[id]);
      report.push({ id, source: "mockup-grid-crop" });
    } else {
      console.error("MISSING:", id);
    }
  }

  console.log("\n=== Buddy Image Report ===");
  for (const { id, source } of report) {
    const stat = fs.statSync(path.join(OUT_DIR, `${id}.jpg`));
    console.log(`${id}.jpg  (${Math.round(stat.size / 1024)} KB)  ← ${source}`);
  }
  console.log(`\nWrote ${report.length} images to public/buddies/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
