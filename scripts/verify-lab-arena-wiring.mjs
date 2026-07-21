import fs from "fs";
import path from "path";

const labsDir = "src/components/experiences/labs";
const files = [
  "lab-level-forge.tsx",
  "lab-quest.tsx",
  "lab-code.tsx",
  "lab-robot.tsx",
  "lab-iot.tsx",
];
const themes = new Set();
const arenaUsers = [];

for (const f of files) {
  const t = fs.readFileSync(path.join(labsDir, f), "utf8");
  if (!t.includes("LabArena")) {
    console.error("MISSING LabArena in", f);
    process.exit(1);
  }
  arenaUsers.push(f);
  for (const m of t.matchAll(/theme="([a-z]+)"/g)) themes.add(m[1]);
}

const arena = fs.readFileSync(path.join(labsDir, "lab-arena.tsx"), "utf8");
const themeClass = [...arena.matchAll(/(\w+): "lab-arena--/g)].map((m) => m[1]);
const css = fs.readFileSync("src/app/globals.css", "utf8");
const needed = [
  "lab-arena-aurora",
  "lab-arena-grid",
  "lab-arena-playfield",
  "lab-meter",
  "lab-mode-badge",
  "lab-hud-aurora",
  "lab-stage-chrome",
  "lab-arena--pixel",
  "lab-arena--viral",
  "lab-arena--pitch",
  "lab-arena--story",
  "lab-arena--cyber",
  "lab-arena--impact",
  "lab-arena--code",
  "lab-arena--robot",
  "lab-arena--iot",
];
const missingCss = needed.filter((c) => !css.includes(c));
const expected = [
  "pixel",
  "viral",
  "pitch",
  "story",
  "cyber",
  "impact",
  "code",
  "robot",
  "iot",
];
const missingThemes = expected.filter((t) => !themes.has(t));

const result = {
  arenaUsers,
  themesUsed: [...themes].sort(),
  themeClass,
  missingThemes,
  missingCss,
  ok: missingCss.length === 0 && missingThemes.length === 0 && themes.size === 9,
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
