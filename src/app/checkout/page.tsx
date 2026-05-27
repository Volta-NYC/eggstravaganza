"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { useCart, unitPrice } from "@/lib/cart/store"
import { business } from "@/lib/business"

type Fulfillment = "pickup" | "delivery"

export default function CheckoutPage() {
  const router = useRouter()
  const { lines, subtotal, clear } = useCart()
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup")
  const [submitting, setSubmitting] = useState(false)

  const taxRate = 0.08875
  const deliveryFee = fulfillment === "delivery" ? 3.99 : 0
  const tax = subtotal * taxRate
  const total = subtotal + tax + deliveryFee

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (lines.length === 0) return
    setSubmitting(true)
    const orderId = "EGG-" + Math.random().toString(36).slice(2, 8).toUpperCase()
    try {
      sessionStorage.setItem(
        "egg-last-order",
        JSON.stringify({
          orderId,
          lines,
          subtotal,
          tax,
          deliveryFee,
          total,
          fulfillment,
          placedAt: new Date().toISOString(),
        })
      )
    } catch {}
    setTimeout(() => {
      clear()
      router.push(`/checkout/success?id=${orderId}`)
    }, 400)
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
        <h1 className="font-display text-4xl text-white">Your bag is empty</h1>
        <p className="mt-3 text-white/60">
          Add a few items before heading to checkout.
        </p>
        <Link
          href="/menu"
          className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm"
        >
          Browse the menu →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
      <Link
        href="/cart"
        className="text-sm text-white/50 hover:text-[color:var(--pink-2)]"
      >
        ← Back to bag
      </Link>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl tracking-tight text-white">
        Checkout
      </h1>
      <p className="mt-2 text-white/60">
        Demo checkout — no real card will be charged.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid lg:grid-cols-3 gap-10 items-start"
      >
        <div className="lg:col-span-2 space-y-6">
          <Section title="Fulfillment">
            <div className="grid sm:grid-cols-2 gap-3">
              <FulfillmentCard
                active={fulfillment === "pickup"}
                onClick={() => setFulfillment("pickup")}
                title="Pickup"
                subtitle={`Ready in ~15 min · ${business.location.street}`}
                price="Free"
              />
              <FulfillmentCard
                active={fulfillment === "delivery"}
                onClick={() => setFulfillment("delivery")}
                title="Local delivery"
                subtitle="Sunnyside only · ~30–45 min"
                price="$3.99"
              />
            </div>
          </Section>

          <Section title="Contact">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <div className="sm:col-span-2">
                <Field label="Email" name="email" type="email" required />
              </div>
            </div>
          </Section>

          {fulfillment === "delivery" && (
            <Section title="Delivery address">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Street address" name="address" required />
                </div>
                <Field label="Apt / unit" name="unit" />
                <Field label="ZIP" name="zip" required />
              </div>
            </Section>
          )}

          <Section title="Payment">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field
                  label="Card number"
                  name="card"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <Field label="Expiry" name="exp" placeholder="MM / YY" required />
              <Field label="CVC" name="cvc" placeholder="123" required />
            </div>
            <p className="mt-3 text-xs text-white/50">
              Placeholder form — this is a demo and no real payment is processed.
            </p>
          </Section>

          <Section title="Order notes">
            <textarea
              name="notes"
              rows={3}
              placeholder="Allergies, prep notes, extra napkins…"
              className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none"
            />
          </Section>
        </div>

        <aside className="card p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl text-white">Order summary</h2>
          <ul className="mt-5 space-y-3 max-h-64 overflow-y-auto pr-1">
            {lines.map((l) => (
              <li
                key={l.key}
                className="flex justify-between gap-3 text-sm border-b border-white/10 pb-3 last:border-0"
              >
                <div>
                  <div className="font-medium text-white">
                    {l.qty} × {l.name}
                  </div>
                  {l.options.length > 0 && (
                    <div className="text-xs text-white/50">
                      {l.options.map((o) => o.choice).join(" · ")}
                    </div>
                  )}
                </div>
                <div className="whitespace-nowrap text-white">
                  ${(unitPrice(l) * l.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-1.5 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {deliveryFee > 0 && (
              <Row label="Delivery" value={`$${deliveryFee.toFixed(2)}`} />
            )}
            <Row label="Tax" value={`$${tax.toFixed(2)}`} />
          </dl>
          <div className="mt-4 pt-4 border-t-2 border-white/15 flex justify-between font-display text-xl">
            <span className="text-white">Total</span>
            <span className="text-[color:var(--lime)]">${total.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-6 inline-flex w-full justify-center rounded-full px-5 py-3.5 text-sm disabled:opacity-50"
          >
            {submitting ? "Placing order…" : `Place order · $${total.toFixed(2)}`}
          </button>
          <p className="mt-3 text-xs text-white/40 text-center">
            By placing this order you agree to our terms. Demo only.
          </p>
        </aside>
      </form>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="card p-6">
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-1.5">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none"
      />
    </label>
  )
}

function FulfillmentCard({
  active,
  onClick,
  title,
  subtitle,
  price,
}: {
  active: boolean
  onClick: () => void
  title: string
  subtitle: string
  price: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border-2 p-4 transition-colors ${
        active
          ? "border-[color:var(--lime)] bg-[color:var(--lime)]/10"
          : "border-white/15 hover:border-white/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-bold text-white">{title}</div>
        <div className="text-sm text-[color:var(--lime)] font-bold">{price}</div>
      </div>
      <div className="mt-1 text-xs text-white/55">{subtitle}</div>
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-white/60">{label}</dt>
      <dd className="text-white">{value}</dd>
    </div>
  )
}
