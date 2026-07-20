import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const reps = [
  ["Quantum Computing Workforce (QW)", "Quantum Computing Workforce (QCW)"],
  ['shortName: "QW"', 'shortName: "QCW"'],
  ["QW quantum program", "QCW quantum program"],
  ["Programa QW", "Programa QCW"],
  ["programa QW", "programa QCW"],
  ["via the QW app", "via the QCW app"],
  ["app QWA", "app QCW"],
  ["QWA app", "QCW app"],
  ["QWA delivery", "QCW delivery"],
  ["App delivery QWA", "App delivery QCW"],
  ["programa QWA", "programa QCW"],
  ["programa cuántico QWA", "programa cuántico QCW"],
  ["QWA program", "QCW program"],
  ["QWA (Tier 2)", "QCW (Tier 2)"],
  ["QWA interactive", "QCW interactive"],
  ["QW interactive", "QCW interactive"],
  ["QW app", "QCW app"],
  ["QW delivery", "QCW delivery"],
  ["QW (Quantum Computing Workforce)", "QCW (Quantum Computing Workforce)"],
  ["Quantum Workforce Academy (QWA)", "Quantum Computing Workforce (QCW)"],
  ["Quantum Workforce Academy", "Quantum Computing Workforce"],
  ["QWA", "QCW"],
  ["QW lives", "QCW lives"],
  ["QW is", "QCW is"],
  ["qw.novastemhub", "qcw.novastemhub"],
  ["qwDelivery", "qcwDelivery"],
  ["QWA_APP", "QCW_APP"],
  ["QWA_COURSE_SLUG", "QCW_COURSE_SLUG"],
  ["QWA_LESSON_SEEDS", "QCW_LESSON_SEEDS"],
  ["QwaLessonSeed", "QcwLessonSeed"],
];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|md|mjs)$/.test(e.name) && !p.includes("rename-qcw.mjs")) {
      let c = fs.readFileSync(p, "utf8");
      const o = c;
      for (const [a, b] of reps) c = c.split(a).join(b);
      if (c !== o) {
        fs.writeFileSync(p, c);
        console.log("updated", p);
      }
    }
  }
}

walk(path.join(root, "src"));
walk(path.join(root, "docs"));
for (const f of ["README.md"]) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, "utf8");
  const o = c;
  for (const [a, b] of reps) c = c.split(a).join(b);
  if (c !== o) fs.writeFileSync(p, c);
}
console.log("done");
