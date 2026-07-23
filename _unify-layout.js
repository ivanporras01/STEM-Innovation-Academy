const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "src", "app");

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(APP_DIR);

for (const file of files) {
  const rel = path.relative(__dirname, file).replace(/\\/g, "/");
  if (rel === "src/app/layout.tsx") continue;

  let content = fs.readFileSync(file, "utf8");
  const original = content;

  // Remove Navbar / Footer imports
  content = content.replace(/import\s+\{\s*Navbar\s*\}\s+from\s+["']@\/components\/layout\/navbar["'];?\s*\n?/g, "");
  content = content.replace(/import\s+\{\s*Footer\s*\}\s+from\s+["']@\/components\/layout\/footer["'];?\s*\n?/g, "");
  // Remove combined imports if any (rare, but defensive)
  content = content.replace(/import\s+\{\s*(?:Navbar|Footer)\s*,\s*(?:Footer|Navbar)\s*\}\s+from\s+["']@\/components\/layout\/(?:navbar|footer)["'];?\s*\n?/g, "");

  // Remove self-closing JSX tags
  content = content.replace(/<Navbar\s*\/>\s*\n?/g, "");
  content = content.replace(/<Footer\s*\/>\s*\n?/g, "");

  // Replace min-h-screen with flex-1 (outer page wrapper) while preserving flex-col
  content = content.replace(/min-h-screen/g, "flex-1");

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log("Updated:", rel);
  }
}

console.log("Done.");
