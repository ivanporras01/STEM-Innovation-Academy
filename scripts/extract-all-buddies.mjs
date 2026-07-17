import fs from "fs";
import path from "path";

const htmlFiles = [
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo(2).html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.1.html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.0.html",
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo.html",
];

const outDir = "C:/Users/Laptop9/Documents/GitHub/STEM-Innovation-Academy/public/buddies";
fs.mkdirSync(outDir, { recursive: true });

const nameToId = {
  Novito: "navito",
  Navito: "navito",
  R3: "r3",
  Luna: "luna",
  Miko: "milo",
  Milo: "milo",
  Ollie: "ollie",
  Koda: "koda",
  Zara: "zara",
  Bolt: "bolt",
  Pixel: "pixel",
  Astra: "astra",
  Orion: "orion",
  Eleo: "eleo",
  Elea: "eleo",
  "Prof. Hoot": "prof-hoot",
  "Prof Hoot": "prof-hoot",
  Chelsea: "chelsea",
  Marina: "marina",
  Leo: "leo",
  "Dr. Bunny": "dr-bunny",
  "Dr Bunny": "dr-bunny",
  Skylar: "skylar",
  Skyler: "skylar",
  Rhino: "rhino",
  Nexo: "nexo",
};

function extractBuddyBlock(content) {
  const start = content.indexOf("const buddies=");
  if (start < 0) return null;
  let depth = 0;
  for (let i = content.indexOf("{", start); i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) return content.slice(start, i + 1);
    }
  }
  return null;
}

const extracted = new Map();

for (const file of htmlFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf8");
  const block = extractBuddyBlock(content);
  if (!block) continue;

  const re = /(?:"([^"]+)"|([A-Za-z0-9_.\s]+)):\{[^}]*?image:"(data:image\/[^;]+;base64,[^"]+)"/g;
  let match;
  while ((match = re.exec(block)) !== null) {
    const rawName = (match[1] || match[2]).trim();
    const dataUrl = match[3];
    const id = nameToId[rawName] ?? rawName.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
    if (extracted.has(id)) continue;
    const base64 = dataUrl.split(",")[1];
    const ext = dataUrl.includes("jpeg") || dataUrl.includes("jpg") ? "jpg" : "webp";
    const outPath = path.join(outDir, `${id}.${ext}`);
    fs.writeFileSync(outPath, Buffer.from(base64, "base64"));
    extracted.set(id, { id, rawName, source: path.basename(file), outPath, ext });
    console.log("EXTRACTED:", id, "<-", rawName, "from", path.basename(file));
  }
}

console.log("\nTotal:", extracted.size);
for (const info of extracted.values()) {
  console.log(`  ${info.id}.${info.ext} (${fs.statSync(info.outPath).size} bytes)`);
}
