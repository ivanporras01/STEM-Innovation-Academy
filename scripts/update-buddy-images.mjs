import fs from "fs";

const file = "C:/Users/Laptop9/Documents/GitHub/STEM-Innovation-Academy/src/lib/experiences/buddies.ts";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
  /id: "([^"]+)",[\s\S]*?emoji: "[^"]+",/g,
  (block, id) => block.replace(/emoji: "[^"]+",/, `image: "/buddies/${id}.jpg",`)
);

fs.writeFileSync(file, content);
const count = (content.match(/image: "\/buddies\//g) ?? []).length;
console.log("Updated", count, "buddy image paths");
