/**
 * Crop baked-in corner numbers from legacy buddy portraits.
 * Crops ~14% from top, then resizes back to original dimensions.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUDDIES_DIR = path.join(__dirname, "../public/buddies");
const CROP_TOP_RATIO = 0.14;

async function main() {
  const files = fs.readdirSync(BUDDIES_DIR).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

  for (const file of files) {
    const input = path.join(BUDDIES_DIR, file);
    const tmp = input + ".tmp.jpg";
    const meta = await sharp(input).metadata();
    const cropTop = Math.round((meta.height ?? 0) * CROP_TOP_RATIO);
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;

    await sharp(input)
      .extract({
        left: 0,
        top: cropTop,
        width,
        height: height - cropTop,
      })
      .resize(width, height, { fit: "cover", position: "centre" })
      .jpeg({ quality: 93 })
      .toFile(tmp);

    fs.renameSync(tmp, input);
    console.log(`Processed ${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
