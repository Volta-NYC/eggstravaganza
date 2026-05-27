#!/usr/bin/env node
// Build src/data/menu.json + download images from the canonical taquitoshop-menu.json
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "taquitoshop-menu.json");
const OUT_JSON = path.join(ROOT, "src/data/menu.json");
const OUT_IMG = path.join(ROOT, "public/products");
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.mkdirSync(OUT_IMG, { recursive: true });

const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Map the source categories to our internal category keys
const CATEGORY_MAP = {
  "Early Breakfast": "breakfast",
  Lunch: "lunch",
  Starters: "sides",
  Drinks: "drinks",
  Burgers: "burgers",
};

function pickCategory(item) {
  const cats = item.categories || [];
  for (const c of cats) if (CATEGORY_MAP[c]) return CATEGORY_MAP[c];
  return "specials";
}

// Refine vague source categories ("Early Breakfast" / "Lunch") into focused sections by name
function refine(cat, item) {
  if (cat === "burgers" || cat === "drinks" || cat === "sides") return cat;
  const n = (item.name + " " + (item.description || "")).toLowerCase();
  if (/burger|skillman/.test(n)) return "burgers";
  if (/omelette|omelet/.test(n)) return "omelettes";
  if (/pancake|waffle|french toast|buttermilk/.test(n)) return "griddle";
  if (/(taco|quesadilla|burrito|huevos|chorizo|carne|asada|mexicana|guacamole|cotija|tortilla|platillos|taco bar)/.test(n))
    return "mexican";
  if (/(salad|bowl)/.test(n)) return "salads";
  if (/(sandwich|wrap|brioche|kaiser|bagel)/.test(n)) return "sandwiches";
  if (/(platter|plato|stockbroker|park avenue|deluxe platter)/.test(n)) return "platters";
  // Core breakfast plates: eggs/protein/named breakfasts
  if (/(breakfast|eggs any style|protein|rise and shine|hearty|denver|santa fe|torero|california|mexican-authentic)/.test(n))
    return "breakfast";
  return cat === "lunch" ? "specials" : cat;
}

const items = [];
const downloads = [];

for (const it of raw) {
  const baseCat = pickCategory(it);
  const category = refine(baseCat, it);
  const slug = slugify(it.name);
  let localImage;
  if (it.image_url) {
    const ext =
      (it.image_url.match(/\.(jpe?g|png|webp|gif)/i)?.[1] || "jpg").toLowerCase();
    const filename = `${slug}.${ext}`;
    localImage = `/products/${filename}`;
    downloads.push({ url: it.image_url, filepath: path.join(OUT_IMG, filename) });
  }

  const options = (it.modifiers || []).map((m) => ({
    name: m.name,
    required: !!m.required,
    choices: (m.choices || []).map((c) => ({
      name: c.name,
      extra: c.price_value || 0,
    })),
  }));

  items.push({
    id: String(it.id),
    slug,
    name: it.name,
    price: typeof it.price_low === "number" ? it.price_low : null,
    image: it.image_url || null,
    localImage,
    description: it.description || "",
    options,
    category,
    sourceUrl: it.site_link || "",
  });
}

// Download images in parallel batches
async function downloadAll() {
  const todo = downloads.filter((d) => !fs.existsSync(d.filepath));
  console.log(`Downloading ${todo.length} new images (${downloads.length - todo.length} cached)...`);
  const concurrency = 8;
  let i = 0;
  async function worker() {
    while (i < todo.length) {
      const idx = i++;
      const { url, filepath } = todo[idx];
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`  ✗ ${path.basename(filepath)} ${res.status}`);
          continue;
        }
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(filepath, buf);
        console.log(`  ✓ ${path.basename(filepath)} ${(buf.length / 1024).toFixed(0)}KB`);
      } catch (err) {
        console.warn(`  ✗ ${path.basename(filepath)}`, err.message);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

await downloadAll();

// Drop localImage from items whose file failed to download
for (const item of items) {
  if (item.localImage) {
    const full = path.join(ROOT, "public", item.localImage.replace(/^\//, ""));
    if (!fs.existsSync(full)) {
      delete item.localImage;
    }
  }
}

// Sort: by category then name
items.sort(
  (a, b) =>
    a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
);

fs.writeFileSync(OUT_JSON, JSON.stringify(items, null, 2));
const withImg = items.filter((i) => i.localImage).length;
console.log(`\nWrote ${items.length} items (${withImg} with local images) → ${OUT_JSON}`);
const byCat = {};
items.forEach((i) => (byCat[i.category] = (byCat[i.category] || 0) + 1));
console.log("By category:", byCat);
