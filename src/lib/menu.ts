import data from "@/data/menu.json"

export type OptionChoice = { name: string; extra: number }
export type OptionGroup = { name: string; required: boolean; choices: OptionChoice[] }

export type MenuItem = {
  id: string
  slug: string
  name: string
  price: number | null
  image: string | null
  localImage?: string
  description: string
  options: OptionGroup[]
  category: string
  sourceUrl: string
}

export const menu: MenuItem[] = data as MenuItem[]

export const categoryMeta: Record<
  string,
  { label: string; tagline: string; order: number; accent: string }
> = {
  breakfast: {
    label: "Breakfast Plates",
    tagline: "Classic American mornings, done right",
    order: 1,
    accent: "from-amber-100 to-orange-50",
  },
  mexican: {
    label: "Mexican Kitchen",
    tagline: "Tacos, huevos & quesadillas made the family way",
    order: 2,
    accent: "from-rose-100 to-amber-50",
  },
  griddle: {
    label: "From the Griddle",
    tagline: "Pancakes, waffles & French toast",
    order: 3,
    accent: "from-yellow-100 to-amber-50",
  },
  omelettes: {
    label: "Omelettes",
    tagline: "Cage-free, folded to order",
    order: 4,
    accent: "from-yellow-50 to-stone-50",
  },
  sandwiches: {
    label: "Sandwiches & Wraps",
    tagline: "Brioche, Kaiser, wraps — the Sunnyside lineup",
    order: 5,
    accent: "from-stone-100 to-amber-50",
  },
  burgers: {
    label: "Burgers",
    tagline: "Smashed, stacked & loaded",
    order: 6,
    accent: "from-red-100 to-amber-50",
  },
  platters: {
    label: "Platters",
    tagline: "Big-portion classics for big appetites",
    order: 7,
    accent: "from-orange-100 to-yellow-50",
  },
  salads: {
    label: "Salad Bowls",
    tagline: "Bright, fresh & filling",
    order: 8,
    accent: "from-lime-100 to-emerald-50",
  },
  sides: {
    label: "Sides & Snacks",
    tagline: "Crisp, golden, share-worthy",
    order: 9,
    accent: "from-amber-100 to-yellow-50",
  },
  drinks: {
    label: "Drinks",
    tagline: "Cold cans, hot brews & everything between",
    order: 10,
    accent: "from-sky-100 to-emerald-50",
  },
  specials: {
    label: "Specials",
    tagline: "Off-menu finds from the kitchen",
    order: 11,
    accent: "from-stone-100 to-amber-50",
  },
}

export const orderedCategories = Object.entries(categoryMeta)
  .sort((a, b) => a[1].order - b[1].order)
  .map(([key, meta]) => ({
    key,
    ...meta,
    items: menu.filter((m) => m.category === key),
  }))
  .filter((c) => c.items.length > 0)

export function getItem(slug: string): MenuItem | undefined {
  return menu.find((m) => m.slug === slug)
}

export function featuredItems(): MenuItem[] {
  const withImage = menu.filter((m) => m.localImage)
  return withImage.slice(0, 6)
}

export function priceDisplay(price: number | null): string {
  if (price === null || Number.isNaN(price)) return "MP"
  return `$${price.toFixed(2)}`
}
