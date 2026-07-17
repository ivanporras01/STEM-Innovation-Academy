/**
 * Sync buddy portraits + metadata from coding-ai-lab-demo(2).html
 * Usage: node scripts/sync-buddies-from-html.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HTML =
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo(2).html";
const OUT_DIR = path.join(ROOT, "public", "buddies");

const NAME_TO_ID = {
  Novito: "navito",
  Navito: "navito",
  R3: "r3",
  Luna: "luna",
  Miko: "milo",
  Milo: "milo",
  Mike: "milo",
  Ollie: "ollie",
  Koda: "koda",
  Zara: "zara",
  Bolt: "bolt",
  Pixel: "pixel",
  Astra: "astra",
  Orion: "orion",
  Eleo: "eleo",
  "Prof. Hoot": "prof-hoot",
  Chelsea: "chelsea",
  Marina: "marina",
  Leo: "leo",
  "Dr. Bunny": "dr-bunny",
  Skyler: "skylar",
  Skylar: "skylar",
  Rhino: "rhino",
  Nexo: "nexo",
};

function parseBlock(html) {
  const start = html.indexOf("const buddies=");
  let depth = 0;
  let i = html.indexOf("{", start);
  for (; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  return html.slice(start, i + 1);
}

function parseBuddies(block) {
  const re =
    /"([^"]+)":\{([^}]*?)image:"(data:image\/[^;]+;base64,[^"]+)"([^}]*)\}/g;
  const found = [];
  let m;
  while ((m = re.exec(block))) {
    const rawName = m[1];
    const id = NAME_TO_ID[rawName];
    if (!id) continue;
    const tail = m[4];
    const role = (tail.match(/role:"([^"]+)"/) || [])[1] || "";
    const trait = (tail.match(/trait:"([^"]+)"/) || [])[1] || "";
    found.push({ rawName, id, role, trait, dataUrl: m[3] });
  }
  return found;
}

const html = fs.readFileSync(HTML, "utf8");
const buddies = parseBuddies(parseBlock(html));
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const b of buddies) {
  const b64 = b.dataUrl.split(",")[1];
  fs.writeFileSync(path.join(OUT_DIR, `${b.id}.jpg`), Buffer.from(b64, "base64"));
}

fs.writeFileSync(
  path.join(ROOT, "src", "data", "buddies-from-html.json"),
  JSON.stringify(buddies, null, 2)
);

console.log(`Synced ${buddies.length} buddies to public/buddies/`);
for (const b of buddies) {
  const stat = fs.statSync(path.join(OUT_DIR, `${b.id}.jpg`));
  console.log(`  ${b.id}.jpg (${Math.round(stat.size / 1024)} KB) — ${b.rawName} · ${b.role} · ${b.trait}`);
}
