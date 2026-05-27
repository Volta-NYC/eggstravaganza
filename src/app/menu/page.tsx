import Link from "next/link"
import { orderedCategories } from "@/lib/menu"
import MenuCard from "@/lib/components/menu-card"
import { business } from "@/lib/business"
import Reveal from "@/lib/components/reveal"

export const metadata = { title: "Menu" }

export default function MenuPage() {
  return (
    <div className="overflow-x-clip">
      {/* Header */}
      <section className="hero-grad relative">
        <div className="absolute inset-0 confetti opacity-60 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <Reveal>
            <span className="chip chip-lime">The full menu</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-5xl sm:text-7xl tracking-tight text-white leading-[0.95]">
              Everything we
              <br />
              <span className="sticker">cook.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-white/70 leading-relaxed text-lg">
              Breakfast plates, Mexican classics, sandwiches and griddle items —
              served all day at {business.location.street}, Sunnyside.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-20 z-30 border-y border-white/10 bg-black/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex gap-2 overflow-x-auto scroll-x py-3">
            {orderedCategories.map((c) => (
              <a
                key={c.key}
                href={`#${c.key}`}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold text-white/70 hover:bg-[color:var(--pink)] hover:text-white border-2 border-transparent hover:border-white transition-all"
              >
                {c.label}
                <span className="ml-1.5 text-xs text-[color:var(--lime)]">
                  {c.items.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 space-y-24">
        {orderedCategories.map((c) => (
          <section key={c.key} id={c.key} className="scroll-mt-36">
            <Reveal>
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="chip chip-orange">{c.items.length} items</span>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl text-white">
                    {c.label}
                  </h2>
                  <p className="mt-2 text-white/60">{c.tagline}</p>
                </div>
                <Link
                  href="#top"
                  className="text-[10px] uppercase tracking-widest text-white/40 hover:text-[color:var(--lime)] font-bold"
                >
                  Back to top
                </Link>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 80}>
                  <MenuCard item={item} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
