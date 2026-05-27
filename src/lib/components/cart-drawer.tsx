"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart, unitPrice } from "@/lib/cart/store"

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, lines, subtotal, setQty, remove, count } =
    useCart()

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-[color:var(--bg-2)] border-l-4 border-[color:var(--pink)] shadow-2xl flex flex-col transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b-2 border-white/10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
              Your bag
            </div>
            <div className="font-display text-2xl text-white mt-0.5">
              {count} item{count === 1 ? "" : "s"}
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="h-10 w-10 rounded-full border-2 border-white/20 grid place-items-center text-white hover:border-[color:var(--pink)] transition-colors"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-white/60">
              <div>
                <p className="font-display text-2xl text-white">Your bag is empty.</p>
                <p className="mt-2 text-sm">Pick something from the menu to get started.</p>
                <Link
                  href="/menu"
                  onClick={closeDrawer}
                  className="btn-primary mt-6 inline-flex rounded-full px-5 py-2.5 text-sm"
                >
                  Browse the menu →
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 border-b border-white/10 pb-4"
                >
                  <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center font-display text-2xl text-[color:var(--lime)]">
                        {line.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div className="font-bold text-white truncate">{line.name}</div>
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
                            {o.extra > 0 && (
                              <span className="text-white/40">
                                {" "}+${o.extra.toFixed(2)}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border-2 border-white/20 rounded-full">
                        <button
                          onClick={() => setQty(line.key, line.qty - 1)}
                          className="h-8 w-8 grid place-items-center text-white hover:bg-white/10 rounded-l-full"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm text-white">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => setQty(line.key, line.qty + 1)}
                          className="h-8 w-8 grid place-items-center text-white hover:bg-white/10 rounded-r-full"
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
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t-2 border-white/10 px-6 py-5 space-y-3 bg-black/40">
            <div className="flex justify-between text-sm text-white/60">
              <span>Subtotal</span>
              <span className="font-bold text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-white/40">
              Tax & delivery calculated at checkout.
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="btn-primary inline-flex w-full justify-center rounded-full px-5 py-3 text-sm"
            >
              Checkout · ${subtotal.toFixed(2)}
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="btn-ghost inline-flex w-full justify-center rounded-full px-5 py-2.5 text-sm"
            >
              View full bag
            </Link>
          </footer>
        )}
      </aside>
    </>
  )
}
