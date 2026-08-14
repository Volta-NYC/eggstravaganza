import Link from "next/link"
import { business } from "@/lib/business"
import Reveal from "@/lib/components/reveal"

export const metadata = { title: "Catering" }

const cateringHighlights = [
  "Breakfast tacos, egg sandwiches, platters, and griddle favorites",
  "Office breakfasts, school events, family gatherings, and group lunches",
  "Pickup from 39th Street with DoorDash delivery options for smaller orders",
]

export default function CateringPage() {
  return (
    <div className="overflow-x-clip">
      <section className="hero-grad relative">
        <div className="absolute inset-0 confetti opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <Reveal>
            <span className="chip chip-lime">Catering</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-5xl sm:text-7xl tracking-tight text-white leading-[0.95]">
              Feed the whole
              <br />
              <span className="sticker">crew.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Planning breakfast, lunch, or a group order from Eggstravaganza?
              Fill out the contact form with the details and the kitchen will
              follow up during business hours.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact#contact-form"
                className="btn-primary inline-flex rounded-full px-7 py-3.5 text-base"
              >
                Fill out the form →
              </Link>
              <Link
                href="/menu"
                className="btn-ghost inline-flex rounded-full px-7 py-3.5 text-base"
              >
                Browse menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <Reveal variant="left">
          <div className="card p-7 sm:p-9 h-full">
            <span className="chip chip-orange">
              Established {business.establishedYear}
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-tight text-white">
              Sunnyside breakfast and Mexican favorites for groups.
            </h2>
            <p className="mt-5 leading-relaxed text-white/65">
              Share the event date, guest count, pickup or delivery preference,
              and any favorites from the menu. For fastest same-day help, call
              the counter at {business.phone}.
            </p>
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="grid gap-4">
            {cateringHighlights.map((item, index) => (
              <div
                key={item}
                className="rounded-[22px] border-2 border-white bg-white p-5 text-black shadow-[0_12px_0_rgba(0,0,0,0.18)]"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] font-black text-[color:var(--pink)]">
                  0{index + 1}
                </div>
                <p className="mt-2 font-display text-2xl leading-tight">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
