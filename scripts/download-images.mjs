#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const images = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/images.json"), "utf8")
);
const menu = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/menu.json"), "utf8")
);
const OUT_DIR = path.join(process.cwd(), "public/products");
fs.mkdirSync(OUT_DIR, { recursive: true });

const localMap = {};
for (const { slug, image } of images) {
  const ext = image.match(/\.(jpe?g|png|webp|gif)/i)?.[1] || "jpg";
  const filename = `${slug}.${ext.toLowerCase()}`;
  const target = path.join(OUT_DIR, filename);
  if (fs.existsSync(target)) {
    localMap[slug] = `/products/${filename}`;
    continue;
  }
  try {
    const res = await fetch(image);
    if (!res.ok) {
      console.warn(`Failed ${slug}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(target, buf);
    localMap[slug] = `/products/${filename}`;
    console.log(`Saved ${filename} (${buf.length} bytes)`);
  } catch (err) {
    console.warn(`Error ${slug}:`, err.message);
  }
}

// Rewrite menu.json with localImage paths
for (const item of menu) {
  if (localMap[item.slug]) item.localImage = localMap[item.slug];
}
fs.writeFileSync(
  path.join(process.cwd(), "src/data/menu.json"),
  JSON.stringify(menu, null, 2)
);
console.log(`Updated menu.json with ${Object.keys(localMap).length} local images`);
