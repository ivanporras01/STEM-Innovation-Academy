import fs from "fs";

const files = [
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo(2).html",
  "C:/Users/Laptop9/Downloads/coding-ai-lab-demo.html",
  "C:/Users/Laptop9/Downloads/NOVA_LAB_Experience_Demo_v1.1.html",
];

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

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const block = extractBuddyBlock(content);
  if (!block) {
    console.log(file, "no buddies");
    continue;
  }
  const quoted = [...block.matchAll(/"([^"]+)":\{[^}]*?image:/g)].map((m) => m[1]);
  const plain = [...block.matchAll(/([A-Za-z0-9_.\s]+):\{[^}]*?image:/g)].map((m) => m[1].trim());
  console.log(file.split("/").pop());
  console.log("  quoted:", quoted.length, quoted.join(", "));
  console.log("  plain:", plain.length, plain.join(", "));
}
