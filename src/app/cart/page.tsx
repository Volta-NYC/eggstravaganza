"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart, unitPrice } from "@/lib/cart/store"

export default function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart()

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <span className="chip chip-lime">Your bag</span>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl tracking-tight text-white">
            Review & <span className="sticker">checkout</span>
          </h1>
        </div>
        {lines.length > 0 && (
          <button
            onClick={clear}
            className="text-sm text-white/50 hover:text-[color:var(--pink-2)]"
          >
            Clear bag
          </button>
        )}
      </div>

      {lines.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="font-display text-3xl text-white">Your bag is empty.</p>
          <p className="mt-2 text-white/60">Pick something tasty from the menu.</p>
          <Link
            href="/menu"
            className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm"
          >
            Browse the menu →
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <ul className="lg:col-span-2 space-y-4">
            {lines.map((line) => (
              <li key={line.key} className="card p-4 sm:p-5 flex gap-5">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  {line.image ? (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center font-display text-3xl text-[color:var(--lime)]">
                      {line.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <Link
                      href={`/menu/${line.slug}`}
                      className="font-display text-lg text-white hover:text-[color:var(--pink-2)]"
                    >
                      {line.name}
                    </Link>
                    <div className="font-bold text-[color:var(--lime)] whitespace-nowrap">
                      ${(unitPrice(line) * line.qty).toFixed(2)}
                    </div>
                  </div>
                  {line.options.length > 0 && (
                    <ul className="mt-1 text-xs text-white/55 space-y-0.5">
                      {line.options.map((o) => (
                        <li key={o.group}>
                          <span className="text-white/40">{o.group}:</span>{" "}
                          {o.choice}
                          {o.extra > 0 && ` (+$${o.extra.toFixed(2)})`}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border-2 border-white/20 rounded-full">
                      <button
                        onClick={() => setQty(line.key, line.qty - 1)}
                        className="h-9 w-9 grid place-items-center text-white hover:bg-white/10 rounded-l-full"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm font-bold text-white">
                        {line.qty}
                      </span>
                      <button
                        onClick={() => setQty(line.key, line.qty + 1)}
                        className="h-9 w-9 grid place-items-center text-white hover:bg-white/10 rounded-r-full"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(line.key)}
                      className="text-xs text-white/40 hover:text-[color:var(--pink-2)]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="card p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl text-white">Summary</h2>
            <dl className="mt-5 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Estimated tax" value={`$${(subtotal * 0.08875).toFixed(2)}`} />
              <Row label="Delivery" value="Free pickup" muted />
            </dl>
            <div className="mt-5 pt-5 border-t-2 border-white/15 flex justify-between font-display text-xl">
              <span className="text-white">Total</span>
              <span className="text-[color:var(--lime)]">
                ${(subtotal * 1.08875).toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="btn-primary mt-6 inline-flex w-full justify-center rounded-full px-5 py-3 text-sm"
            >
              Continue to checkout →
            </Link>
            <Link
              href="/menu"
              className="btn-ghost mt-3 inline-flex w-full justify-center rounded-full px-5 py-2.5 text-sm"
            >
              Keep shopping
            </Link>
            <p className="mt-5 text-xs text-white/50">
              Pickup at 4120 39th St, Sunnyside, NY — usually ready in 10–15 min.
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}

function Row({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-white/60">{label}</dt>
      <dd className={muted ? "text-white/40" : "text-white font-bold"}>
        {value}
      </dd>
    </div>
  )
}
