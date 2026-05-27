"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type CartLineOption = {
  group: string
  choice: string
  extra: number
}

export type CartLine = {
  /** Stable per-configuration line key (slug + serialized options) */
  key: string
  slug: string
  name: string
  image?: string
  basePrice: number
  options: CartLineOption[]
  qty: number
}

type CartCtx = {
  lines: CartLine[]
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  count: number
  subtotal: number
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const Ctx = createContext<CartCtx | null>(null)
const STORAGE_KEY = "egg-cart-v1"

function lineUnitPrice(l: { basePrice: number; options: CartLineOption[] }) {
  return l.basePrice + l.options.reduce((s, o) => s + o.extra, 0)
}

function keyFor(slug: string, options: CartLineOption[]) {
  const sig = options
    .map((o) => `${o.group}:${o.choice}`)
    .sort()
    .join("|")
  return sig ? `${slug}#${sig}` : slug
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isDrawerOpen, setDrawer] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {}
  }, [lines, hydrated])

  const add: CartCtx["add"] = useCallback((line, qty = 1) => {
    const key = keyFor(line.slug, line.options)
    setLines((prev) => {
      const existing = prev.find((p) => p.key === key)
      if (existing) {
        return prev.map((p) =>
          p.key === key ? { ...p, qty: p.qty + qty } : p
        )
      }
      return [...prev, { ...line, key, qty }]
    })
    setDrawer(true)
  }, [])

  const setQty: CartCtx["setQty"] = useCallback((key, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((p) => p.key !== key)
        : prev.map((p) => (p.key === key ? { ...p, qty } : p))
    )
  }, [])

  const remove: CartCtx["remove"] = useCallback((key) => {
    setLines((prev) => prev.filter((p) => p.key !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      add,
      setQty,
      remove,
      clear,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + lineUnitPrice(l) * l.qty, 0),
      isDrawerOpen,
      openDrawer: () => setDrawer(true),
      closeDrawer: () => setDrawer(false),
    }),
    [lines, add, setQty, remove, clear, isDrawerOpen]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useCart must be used within <CartProvider>")
  return v
}

export function unitPrice(line: CartLine) {
  return lineUnitPrice(line)
}
