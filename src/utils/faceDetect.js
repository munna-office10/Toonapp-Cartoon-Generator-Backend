import vision from "@google-cloud/vision";
import { createCanvas, loadImage } from "canvas";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new vision.ImageAnnotatorClient({
  keyFilename: join(__dirname, "serviceAccountKey.json")
});


import rembg from "rembg-node";
import sharp from "sharp";
import { CLIENT_RENEG_LIMIT } from "tls";

const { removeBackground } = rembg;

export async function extractHead(buffer) {
  // Step 1: Remove background with U2Net
  const segmented = await removeBackground(buffer, { model: "u2net" });

  // Step 2: Load into sharp (RGBA)
  const image = sharp(segmented);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Step 3: Find all non-transparent pixels
  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];

      if (alpha > 10) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Step 4: Crop tightly around the head shape
  const cropped = await image
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .png()
    .toBuffer();

  console.log("ok");

  return cropped;
}
