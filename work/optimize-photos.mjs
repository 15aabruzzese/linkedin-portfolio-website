import { createRequire } from "node:module";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const require = createRequire(import.meta.url);
const jpeg = require("/Users/andrewabruzzese/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/jpeg-js");

const sourceDir = "work/original-photos";
const outputDir = "public/assets/photos/optimized";
mkdirSync(outputDir, { recursive: true });

function readOrientation(buffer) {
  for (let offset = 2; offset < buffer.length - 12;) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker === 0xe1 && buffer.toString("ascii", offset + 4, offset + 10) === "Exif\0\0") {
      const tiff = offset + 10;
      const little = buffer.toString("ascii", tiff, tiff + 2) === "II";
      const read16 = (pos) => little ? buffer.readUInt16LE(pos) : buffer.readUInt16BE(pos);
      const read32 = (pos) => little ? buffer.readUInt32LE(pos) : buffer.readUInt32BE(pos);
      const ifd = tiff + read32(tiff + 4);
      const entries = read16(ifd);
      for (let i = 0; i < entries; i += 1) {
        const entry = ifd + 2 + i * 12;
        if (read16(entry) === 0x0112) return read16(entry + 8);
      }
      return 1;
    }
    offset += 2 + length;
  }
  return 1;
}

function orient(image, orientation) {
  const { width, height, data } = image;
  if (![3, 6, 8].includes(orientation)) return image;
  const rotated = orientation === 3
    ? { width, height, data: Buffer.alloc(data.length) }
    : { width: height, height: width, data: Buffer.alloc(data.length) };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let tx = x;
      let ty = y;
      if (orientation === 3) {
        tx = width - 1 - x;
        ty = height - 1 - y;
      } else if (orientation === 6) {
        tx = height - 1 - y;
        ty = x;
      } else if (orientation === 8) {
        tx = y;
        ty = width - 1 - x;
      }
      const source = (y * width + x) * 4;
      const target = (ty * rotated.width + tx) * 4;
      rotated.data[target] = data[source];
      rotated.data[target + 1] = data[source + 1];
      rotated.data[target + 2] = data[source + 2];
      rotated.data[target + 3] = data[source + 3];
    }
  }
  return rotated;
}

function resize(image, maxSize) {
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  if (width === image.width && height === image.height) return image;

  const output = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const sourceY = Math.min(image.height - 1, Math.floor(y / scale));
    for (let x = 0; x < width; x += 1) {
      const sourceX = Math.min(image.width - 1, Math.floor(x / scale));
      const source = (sourceY * image.width + sourceX) * 4;
      const target = (y * width + x) * 4;
      output[target] = image.data[source];
      output[target + 1] = image.data[source + 1];
      output[target + 2] = image.data[source + 2];
      output[target + 3] = 255;
    }
  }
  return { width, height, data: output };
}

const files = readdirSync(sourceDir).filter((file) => /\.(jpe?g)$/i.test(file));

for (const file of files) {
  const input = join(sourceDir, file);
  const name = basename(file, extname(file));
  const output = join(outputDir, `${name}.jpg`);
  const raw = readFileSync(input);
  const orientation = readOrientation(raw);
  const decoded = jpeg.decode(raw, { useTArray: true, maxMemoryUsageInMB: 512 });
  const oriented = orient(decoded, orientation);
  const resized = resize(oriented, name.startsWith("andrew-") ? 520 : 1600);
  const encoded = jpeg.encode(resized, name.startsWith("andrew-") ? 82 : 78);
  writeFileSync(output, encoded.data);
  const before = statSync(input).size;
  const after = statSync(output).size;
  console.log(`${file}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
}
