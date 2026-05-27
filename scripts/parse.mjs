#!/usr/bin/env node
// Parses the raw scraped markdown files into a normalized menu JSON.
import fs from "node:fs";
import path from "node:path";

const RAW_DIR = path.join(process.cwd(), "raw messy data");
const OUT = path.join(process.cwd(), "src/data/menu.json");

const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith(".md"));

function slugFromFilename(file) {
  const m = file.match(/_product_(.+)_(\d+)\.md$/);
  return m ? { slug: m[1], id: m[2] } : null;
}

function parseFile(file) {
  const full = path.join(RAW_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const ids = slugFromFilename(file);
  if (!ids) return null;

  const lines = raw.split("\n");

  // Strip front matter
  let start = 0;
  if (lines[0]?.startsWith("---")) {
    const end = lines.indexOf("---", 1);
    if (end !== -1) start = end + 1;
  }
  const body = lines.slice(start);

  // Name: first # heading
  let name = "";
  for (const l of body) {
    const m = l.match(/^#\s+(.+)/);
    if (m) {
      name = m[1].trim();
      break;
    }
  }
  if (!name) {
    // Fall back to slug-based name
    name = ids.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Price: first ### $X.XX
  let price = null;
  for (const l of body) {
    const m = l.match(/^###\s*\$([\d.]+)/);
    if (m) {
      price = parseFloat(m[1]);
      break;
    }
  }

  // Image (non-payment)
  let image = null;
  const imgRegex = /!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g;
  let im;
  while ((im = imgRegex.exec(raw)) !== null) {
    if (!im[1].includes("payment-methods") && !im[1].includes("static/icons")) {
      image = im[1];
      break;
    }
  }

  // Description: line after a "Description" header or last paragraph before "Back to Cart"
  let description = "";
  const descIdx = body.findIndex((l) => l.trim() === "Description");
  if (descIdx !== -1) {
    for (let i = descIdx + 1; i < body.length; i++) {
      const t = body[i].trim();
      if (!t) continue;
      if (t.startsWith("Back to Cart")) break;
      description = t;
      break;
    }
  }
  if (!description) {
    // Description sometimes appears as plain text after "$X.XX" line then "Add to Cart"
    const addIdx = body.findIndex(
      (l) => l.trim() === "Add to Cart"
    );
    if (addIdx !== -1) {
      for (let i = addIdx + 1; i < body.length; i++) {
        const t = body[i].trim();
        if (!t) continue;
        if (t.startsWith("$")) continue;
        if (t.startsWith("Back to Cart")) break;
        if (t.startsWith("Eggstravaganza")) break;
        if (/^!\[/.test(t)) continue;
        description = t;
        break;
      }
    }
  }

  // Option groups: find blocks like "<GroupName>\n\nRequired\n\nSelect one\n\n<options>"
  const options = [];
  for (let i = 0; i < body.length; i++) {
    if (body[i].trim() === "Required" && body[i + 2]?.trim().startsWith("Select")) {
      // group name is previous non-empty line
      let groupName = "";
      for (let j = i - 1; j >= 0; j--) {
        const t = body[j].trim();
        if (t) {
          groupName = t;
          break;
        }
      }
      // collect option choices until blank line gap + non-option keyword
      const choices = [];
      let k = i + 3;
      while (k < body.length) {
        const t = body[k].trim();
        if (!t) {
          k++;
          continue;
        }
        // Stop conditions: known section keywords
        if (
          /^(Required|Local delivery|Store pickup|Add to Cart|Description|Back to Cart|Check your address|Enter delivery|eggstravaganza|4120)/i.test(
            t
          )
        ) {
          break;
        }
        // Another group label: a short Title-Case line followed by Required
        if (body[k + 2]?.trim() === "Required") {
          break;
        }
        // choice line: e.g. "Bacon and Eggs (+ $2.75)" or "American"
        const m = t.match(/^(.+?)(?:\s*\(\+\s*\$([\d.]+)\))?$/);
        if (m) {
          choices.push({
            name: m[1].trim(),
            extra: m[2] ? parseFloat(m[2]) : 0,
          });
        }
        k++;
      }
      if (choices.length) {
        options.push({ name: groupName, required: true, choices });
      }
      i = k;
    }
  }

  return {
    id: ids.id,
    slug: ids.slug,
    name,
    price,
    image,
    description,
    options,
    sourceUrl: `https://www.taquitoshop.com/product/${ids.slug}/${ids.id}`,
  };
}

// Categorize based on keywords in name/description (order matters: most specific first)
function categorize(p) {
  const n = (p.name + " " + p.description + " " + p.slug).toLowerCase();
  if (
    /\b(coffee|coke|pepsi|water|gatorade|snapple|seltzer|soda|jarritos|ginger ale|doctor pepper|iced|cola|drink)\b/.test(
      n
    )
  ) {
    return "drinks";
  }
  if (/\b(burger|skillman)\b/.test(n)) return "burgers";
  if (/\b(salad|salad bowls)\b/.test(n)) return "salads";
  if (/\b(omelette|omelet)\b/.test(n)) return "omelettes";
  if (/(pancake|waffle|french toast|chicken-waffles|chicken & waffles|buttermilk)/.test(n))
    return "griddle";
  if (
    /\b(fries|onion rings|tater tots|chicken tenders|tortilla chips|chips snack|home fries|potatoes|guacamole dip|onion-rings|tater-tots)\b/.test(
      n
    )
  ) {
    return "sides";
  }
  if (
    /(taco|quesadilla|burrito|huevos|chorizo|carne|asada|mexicana|mexican-authentic|platillos|taco-bar|taco-plato|sunnyside-burritos|mexican grilled)/.test(
      n
    )
  ) {
    return "mexican";
  }
  if (/\b(platter|plato|stockbroker|park avenue|park-avenue)\b/.test(n))
    return "platters";
  if (/\b(sandwich|wrap|brioche|kaiser|bagel)\b/.test(n))
    return "sandwiches";
  if (
    /\b(breakfast|eggs|protein|rise and shine|hearty|denver|santa fe|torero|california|mexican-authentic)\b/.test(
      n
    )
  ) {
    return "breakfast";
  }
  return "specials";
}

const parsedAll = files.map(parseFile).filter(Boolean);
const rich = parsedAll.filter((p) => p.price !== null || p.description);
const richSlugs = new Set(rich.map((p) => p.slug));

// Stub items for cart-only pages (no price, no desc): derive name from slug
// so the menu still surfaces the offering.
const stubs = parsedAll
  .filter((p) => p.price === null && !p.description)
  .filter((p) => !richSlugs.has(p.slug))
  .map((p) => ({
    ...p,
    name: p.slug
      .replace(/-+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\b\d+\b/g, "")
      .trim(),
  }));

const items = [...rich, ...stubs];
for (const p of items) p.category = categorize(p);

// Sort by category then name
items.sort(
  (a, b) =>
    a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
);

fs.writeFileSync(OUT, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items to ${OUT}`);

// also output simple image list
const images = items.filter((i) => i.image).map((i) => ({ slug: i.slug, image: i.image }));
fs.writeFileSync(
  path.join(process.cwd(), "src/data/images.json"),
  JSON.stringify(images, null, 2)
);
console.log(`Wrote ${images.length} image refs`);
