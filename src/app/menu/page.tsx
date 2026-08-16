import Link from "next/link"
import { MenuItem, orderedCategories, priceDisplay } from "@/lib/menu"
import { business } from "@/lib/business"
import Reveal from "@/lib/components/reveal"
import MenuDescription from "@/lib/components/menu-description"

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
              Breakfast plates, Mexican classics, sandwiches and griddle items,
              laid out for browsing before you order on DoorDash.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={business.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base"
              >
                Order on DoorDash
                <span aria-hidden>→</span>
              </a>
              <Link
                href="#breakfast"
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base"
              >
                Browse menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-20 z-30 border-y border-[color:var(--orange)]/25 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex gap-2 overflow-x-auto scroll-x py-3">
            {orderedCategories.map((c) => (
              <a
                key={c.key}
                href={`#${c.key}`}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold text-stone-700 hover:bg-[color:var(--pink)] hover:text-white border-2 border-transparent hover:border-white transition-all"
              >
                {c.label}
                <span className="ml-1.5 text-xs text-[color:var(--orange)]">
                  {c.items.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 space-y-12">
        <Reveal>
          <div className="rounded-[24px] border-4 border-white bg-[color:var(--lime)] p-6 sm:p-8 text-black shadow-[0_18px_0_rgba(0,0,0,0.28)]">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-black">
                  Ready to eat?
                </div>
                <h2 className="mt-2 font-display text-3xl sm:text-5xl leading-none">
                  Order Eggstravaganza on DoorDash.
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-black/70">
                  DoorDash handles ordering, pickup, and delivery. The menu
                  below is for browsing what the kitchen is known for.
                </p>
              </div>
              <a
                href={business.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-full border-2 border-black bg-black px-7 py-3.5 text-sm font-bold text-white hover:bg-[color:var(--pink)] transition-colors"
              >
                Open DoorDash →
              </a>
            </div>
          </div>
        </Reveal>
        {orderedCategories.map((c) => (
          <section
            key={c.key}
            id={c.key}
            className="scroll-mt-36 rounded-[24px] border border-[color:var(--orange)]/25 bg-white text-stone-950 shadow-[0_24px_70px_-35px_rgba(106,39,8,0.55)]"
          >
            <Reveal>
              <div className="flex items-end justify-between gap-4 border-b border-stone-200 p-6 sm:p-8">
                <div>
                  <span className="chip chip-orange">{c.items.length} items</span>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl text-stone-950">
                    {c.label}
                  </h2>
                  <p className="mt-2 text-stone-600">{c.tagline}</p>
                </div>
                <Link
                  href="#top"
                  className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-[color:var(--pink)] font-bold"
                >
                  Back to top
                </Link>
              </div>
            </Reveal>
            <div className="grid lg:grid-cols-2">
              {c.items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 80}>
                  <MenuRow item={item} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div className="grid min-h-[116px] grid-cols-[1fr_auto] gap-5 border-b border-stone-200 p-5 last:border-b-0">
      <div>
        <h3 className="font-display text-xl leading-tight text-stone-950">
          {item.name}
        </h3>
        {item.description && <MenuDescription text={item.description} />}
      </div>
      <div className="font-display text-xl text-[color:var(--pink)]">
        {priceDisplay(item.price)}
      </div>
    </div>
  )
}
