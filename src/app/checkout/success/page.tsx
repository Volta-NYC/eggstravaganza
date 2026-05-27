"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

type Receipt = {
  orderId: string
  lines: { name: string; qty: number }[]
  subtotal: number
  tax: number
  deliveryFee: number
  total: number
  fulfillment: "pickup" | "delivery"
  placedAt: string
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-5 py-20 text-center text-white/50">
          Loading…
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  )
}

function SuccessInner() {
  const params = useSearchParams()
  const id = params.get("id")
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("egg-last-order")
      if (raw) setReceipt(JSON.parse(raw))
    } catch {}
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-[color:var(--lime)] grid place-items-center text-black border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.5)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 className="mt-8 font-display text-4xl sm:text-6xl tracking-tight text-white">
        Order <span className="sticker">placed.</span>
      </h1>
      <p className="mt-4 text-white/70">
        Thanks — the kitchen has it. Your confirmation number is{" "}
        <span className="font-mono font-bold text-[color:var(--lime)]">
          {id || receipt?.orderId}
        </span>
        .
      </p>

      {receipt && (
        <div className="card mt-10 p-6 text-left">
          <div className="flex justify-between text-sm">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
                Fulfillment
              </div>
              <div className="mt-1 font-bold text-white capitalize">
                {receipt.fulfillment}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
                Estimated ready
              </div>
              <div className="mt-1 font-bold text-white">
                {receipt.fulfillment === "pickup" ? "10–15 min" : "30–45 min"}
              </div>
            </div>
          </div>
          <ul className="mt-5 space-y-1.5 text-sm border-t border-white/10 pt-4 text-white/80">
            {receipt.lines.map((l, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {l.qty} × {l.name}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t-2 border-white/15 flex justify-between font-display text-xl">
            <span className="text-white">Total paid</span>
            <span className="text-[color:var(--lime)]">
              ${receipt.total.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center gap-3 flex-wrap">
        <Link
          href="/menu"
          className="btn-primary inline-flex rounded-full px-6 py-3 text-sm"
        >
          Order something else
        </Link>
        <Link
          href="/"
          className="btn-ghost inline-flex rounded-full px-6 py-3 text-sm"
        >
          Back home
        </Link>
      </div>

      <p className="mt-10 text-xs text-white/40">
        Demo checkout — no real payment processed.
      </p>
    </div>
  )
}
