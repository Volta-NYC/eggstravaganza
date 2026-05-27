"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { business } from "@/lib/business"
import { useCart } from "@/lib/cart/store"

const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/visit", label: "Visit" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, openDrawer } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full overflow-hidden bg-white shadow-[0_0_0_2px_var(--pink)] group-hover:rotate-12 transition-transform duration-500">
            <Image
              src="/logo.png"
              alt="Eggstravaganza"
              fill
              sizes="56px"
              className="object-cover scale-110"
              priority
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-2xl text-white">
              Eggstravaganza
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[color:var(--lime)] uppercase">
              Mexican Cuisine
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-white/80 hover:text-[color:var(--pink-2)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={business.phoneHref}
            className="text-[color:var(--lime)] hover:text-[color:var(--lime-2)] transition-colors tabular-nums hidden lg:inline"
          >
            {business.phone}
          </a>
          <CartButton count={count} onOpen={openDrawer} />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <CartButton count={count} onOpen={openDrawer} compact />
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/30 text-white"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-white relative before:absolute before:inset-x-0 before:-top-1.5 before:h-px before:bg-white after:absolute after:inset-x-0 after:top-1.5 after:h-px after:bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1 text-base font-semibold">
            {navItems.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-white/90 hover:text-[color:var(--pink-2)]"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={business.phoneHref}
              className="py-3 text-[color:var(--lime)]"
            >
              {business.phone}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function CartButton({
  count,
  onOpen,
  compact,
}: {
  count: number
  onOpen: () => void
  compact?: boolean
}) {
  return (
    <button
      onClick={onOpen}
      className={`btn-primary relative inline-flex items-center gap-2 rounded-full ${
        compact ? "h-11 w-11 justify-center text-base" : "px-5 py-2.5 text-sm"
      }`}
      aria-label={`Open cart (${count} items)`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M6 7h12l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
      {!compact && <span>Bag</span>}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-[color:var(--lime)] text-black text-[11px] font-bold grid place-items-center border-2 border-black">
          {count}
        </span>
      )}
    </button>
  )
}
