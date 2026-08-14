"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { business } from "@/lib/business"

const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/visit", label: "Visit" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          <a
            href={business.orderUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
          >
            DoorDash
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <a
            href={business.orderUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex h-11 items-center rounded-full px-4 text-xs"
          >
            Order
          </a>
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
