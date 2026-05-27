"use client"

import { useMemo, useState } from "react"
import { MenuItem } from "@/lib/menu"
import { useCart } from "@/lib/cart/store"

export default function OrderForm({ item }: { item: MenuItem }) {
  const { add } = useCart()
  const basePrice = item.price ?? 0

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    for (const g of item.options) {
      if (g.required && g.choices[0]) init[g.name] = g.choices[0].name
    }
    return init
  })
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const missing = useMemo(
    () =>
      item.options
        .filter((g) => g.required && !selections[g.name])
        .map((g) => g.name),
    [item.options, selections]
  )

  const optionExtras = useMemo(() => {
    const out: { group: string; choice: string; extra: number }[] = []
    for (const g of item.options) {
      const choice = selections[g.name]
      if (!choice) continue
      const c = g.choices.find((c) => c.name === choice)
      if (c) out.push({ group: g.name, choice, extra: c.extra })
    }
    return out
  }, [item.options, selections])

  const unitPrice =
    basePrice + optionExtras.reduce((s, o) => s + o.extra, 0)
  const total = unitPrice * qty

  function handleAdd() {
    if (missing.length > 0) return
    add(
      {
        slug: item.slug,
        name: item.name,
        image: item.localImage,
        basePrice,
        options: optionExtras,
      },
      qty
    )
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <div className="space-y-6">
      {item.options.map((g) => (
        <fieldset
          key={g.name}
          className="border-2 border-white/15 rounded-2xl p-5 bg-white/[0.03]"
        >
          <legend className="flex items-baseline gap-3 px-1">
            <span className="font-bold text-white">{g.name}</span>
            {g.required && (
              <span className="text-[10px] uppercase tracking-widest text-[color:var(--pink-2)] font-bold">
                Required
              </span>
            )}
          </legend>
          <div className="mt-2 grid sm:grid-cols-2 gap-2">
            {g.choices.map((c) => {
              const active = selections[g.name] === c.name
              return (
                <label
                  key={c.name}
                  className={`flex items-center justify-between gap-3 rounded-xl border-2 px-3.5 py-2.5 cursor-pointer text-sm transition-colors ${
                    active
                      ? "border-[color:var(--lime)] bg-[color:var(--lime)]/10 text-white"
                      : "border-white/15 text-white/85 hover:border-white/40"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name={g.name}
                      value={c.name}
                      checked={active}
                      onChange={() =>
                        setSelections((s) => ({ ...s, [g.name]: c.name }))
                      }
                      className="accent-[color:var(--lime)]"
                    />
                    <span>{c.name}</span>
                  </span>
                  {c.extra > 0 && (
                    <span className="text-[color:var(--lime)] text-xs font-bold">
                      +${c.extra.toFixed(2)}
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex items-center gap-4">
        <div className="inline-flex items-center border-2 border-white/20 rounded-full bg-white/[0.03]">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-12 w-12 grid place-items-center hover:bg-white/10 rounded-l-full text-xl text-white"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center font-bold text-white">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="h-12 w-12 grid place-items-center hover:bg-white/10 rounded-r-full text-xl text-white"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={missing.length > 0}
          className="btn-primary inline-flex flex-1 items-center justify-between gap-3 rounded-full px-6 py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>
            {justAdded
              ? "Added to bag"
              : missing.length
              ? `Select ${missing[0]}`
              : "Add to bag"}
          </span>
          <span className="font-display text-base">${total.toFixed(2)}</span>
        </button>
      </div>

      <p className="text-xs text-white/50">
        Pickup at the counter or local delivery in Sunnyside. Tax calculated at
        checkout.
      </p>
    </div>
  )
}
