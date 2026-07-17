import fs from "fs";
import path from "path";

const htmlFiles = [
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.1.html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.0.html",
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo.html",
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo(2).html",
  "C:/Users/Laptop9/Downloads/iot-lab-demo.html",
  "C:/Users/Laptop9/Downloads/robotics-lab-demo.html",
  "C:/Users/Laptop9/Downloads/NOVA_Explorer_Portal_Alpha.html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_001_Code_the_Future.html",
  "C:/Users/Laptop9/Documents/GitHub/STEM-Innovation-Academy/design/nova-experiences-v1/coding-ai-lab-demo.html",
  "C:/Users/Laptop9/Documents/GitHub/STEM-Innovation-Academy/design/nova-experiences-v1/iot-lab-demo.html",
  "C:/Users/Laptop9/Documents/GitHub/STEM-Innovation-Academy/design/nova-experiences-v1/robotics-lab-demo.html",
];

const outDir = "C:/Users/Laptop9/Documents/GitHub/STEM-Innovation-Academy/public/buddies";
fs.mkdirSync(outDir, { recursive: true });

const nameToId = {
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

const extracted = new Map();

for (const file of htmlFiles) {
  if (!fs.existsSync(file)) {
    console.log("SKIP (missing):", file);
    continue;
  }
  const content = fs.readFileSync(file, "utf8");
  const re = /([A-Za-z0-9_.\s-]+):\{[^}]*?image:"(data:image\/[^;]+;base64,[^"]+)"/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const rawName = match[1].trim();
    const dataUrl = match[2];
    const id = nameToId[rawName] ?? rawName.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
    if (extracted.has(id)) continue;
    const base64 = dataUrl.split(",")[1];
    const ext = dataUrl.includes("jpeg") || dataUrl.includes("jpg") ? "jpg" : "webp";
    const outPath = path.join(outDir, `${id}.${ext}`);
    fs.writeFileSync(outPath, Buffer.from(base64, "base64"));
    extracted.set(id, { id, rawName, source: path.basename(file), outPath, ext });
    console.log("EXTRACTED:", id, "from", path.basename(file));
  }
}

console.log("\nTotal extracted:", extracted.size);
for (const [id, info] of extracted) {
  const stat = fs.statSync(info.outPath);
  console.log(`  ${id}.${info.ext} (${stat.size} bytes) <- ${info.rawName} @ ${info.source}`);
}
