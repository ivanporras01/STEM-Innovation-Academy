import fs from "fs";

const html = fs.readFileSync(
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo(2).html",
  "utf8"
);
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
const block = html.slice(start, i + 1);

const re = /"([^"]+)":\{([^}]*?)\}/g;
let m;
const items = [];
while ((m = re.exec(block))) {
  const name = m[1];
  const inner = m[2];
  const role = (inner.match(/role:"([^"]+)"/) || [])[1];
  const trait = (inner.match(/trait:"([^"]+)"/) || [])[1];
  const tier = (inner.match(/tier:"([^"]+)"/) || [])[1];
  items.push({ name, role, trait, tier, hasImg: inner.includes("data:image") });
}
console.log(JSON.stringify(items, null, 2));
