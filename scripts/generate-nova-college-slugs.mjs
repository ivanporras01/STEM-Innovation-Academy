/** One-off helper: derive kebab-case slugs from lesson titles. */
function toSlug(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const courses = [
  "it-support-cloud",
  "cybersecurity-analyst",
  "data-analytics",
  "iot-smart-systems",
  "robotics-automation",
];

for (const c of courses) {
  const fs = await import("fs");
  const path = `src/data/nova-college/${c}.ts`;
  const text = fs.readFileSync(path, "utf8");
  const titles = [...text.matchAll(/title: "([^"]+)"/g)].map((m) => m[1]);
  const types = [...text.matchAll(/type: "(theory|soft-skills|exam-prep|project|lab)"/g)].map(
    (m) => m[1],
  );
  // Skip course-level titles — lessons follow type fields in modules
  const lessonTitles = [];
  const lessonTypes = [];
  let inModules = false;
  let depth = 0;
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("modules: [")) inModules = true;
    if (!inModules) continue;
    if (line.includes("title:") && !line.includes("labOrProject")) {
      const m = line.match(/title: "([^"]+)"/);
      if (m && lines.slice(i, i + 5).some((l) => l.includes("type:"))) {
        lessonTitles.push(m[1]);
      }
    }
    if (line.includes("type:")) {
      const m = line.match(/type: "(theory|soft-skills|exam-prep|project|lab)"/);
      if (m) lessonTypes.push(m[1]);
    }
  }
  const slugs = new Set();
  console.log(`\n=== ${c} ===`);
  lessonTitles.forEach((t, i) => {
    let slug = toSlug(t);
    let n = 2;
    while (slugs.has(slug)) {
      slug = `${toSlug(t)}-${n++}`;
    }
    slugs.add(slug);
    console.log(`${lessonTypes[i]}\t${slug}\t${t}`);
  });
}
