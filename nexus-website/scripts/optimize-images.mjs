import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "public", "assets", "graphics");

const TARGETS = [
  "front-tower-36.webp",
  "night-view.webp",
  "retail-bed-cam.webp",
  "lounge-cam-1.webp",
  "new-project-to-come.webp",
  "corporate-suite.webp",
];

const MAX_WIDTH = 1800;
const QUALITY = 78;

for (const file of TARGETS) {
  const fp = path.join(ROOT, file);
  try {
    const buf = await fs.readFile(fp);
    const before = buf.length;
    const meta = await sharp(buf).metadata();
    const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);
    const out = await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();
    if (out.length < before) {
      await fs.writeFile(fp, out);
      console.log(
        `${file}: ${(before / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB (-${Math.round(((before - out.length) / before) * 100)}%)`
      );
    } else {
      console.log(`${file}: skipped (compressed version not smaller)`);
    }
  } catch (e) {
    console.error(`${file}: FAILED — ${e.message}`);
  }
}
