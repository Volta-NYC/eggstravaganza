import Image from "next/image"
import Link from "next/link"
import { business } from "@/lib/business"
import { orderedCategories, featuredItems, priceDisplay } from "@/lib/menu"
import MenuCard from "@/lib/components/menu-card"
import Reveal from "@/lib/components/reveal"

export default function HomePage() {
  const featured = featuredItems()
  const hero = featured[0]

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="hero-grad relative">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 confetti opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-24 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative z-10">
            <Reveal>
              <span className="chip chip-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                Sunnyside, NY · Open today
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[44px] sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white">
                All-day breakfast.
                <br />
                <span className="sticker">Mexican soul.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
                Cage-free eggs, hand-pressed tortillas, and breakfast plates the
                neighborhood lines up for at 7 AM. Two kitchens, one counter.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base"
                >
                  See the menu
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href={business.orderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base"
                >
                  DoorDash
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12 flex items-center gap-8 text-sm">
                <Stat n={orderedCategories.length} l="Menu sections" />
                <div className="h-12 w-px bg-white/15" />
                <Stat n="76" l="Real dishes" />
                <div className="h-12 w-px bg-white/15 hidden sm:block" />
                <div className="hidden sm:block">
                  <Stat n="6 AM" l="Doors open" />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal variant="scale">
              <div className="relative">
                <div className="absolute -inset-10 bg-[color:var(--pink)]/30 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 h-40 w-40 spin-slow opacity-90 hidden lg:block">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    sizes="160px"
                    className="object-contain"
                    aria-hidden
                  />
                </div>
                {hero?.localImage && (
                  <div className="relative rounded-[28px] overflow-hidden border-4 border-white shadow-[0_30px_60px_-15px_rgba(236,44,126,0.4)] rotate-2 float-slow">
                    <Image
                      src={hero.localImage}
                      alt={hero.name}
                      width={900}
                      height={1100}
                      priority
                      className="w-full h-[460px] sm:h-[560px] object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-[color:var(--lime)] font-bold">
                            Today's pick
                          </div>
                          <div className="mt-1 font-display text-xl text-white leading-tight">
                            {hero.name}
                          </div>
                        </div>
                        <div className="font-display text-2xl text-white sticker sticker-orange">
                          {priceDisplay(hero.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute -bottom-6 -right-4 card-light px-4 py-3 flex items-center gap-3 max-w-[240px] rotate-[-3deg] shadow-xl">
                  <div className="h-10 w-10 rounded-full bg-[color:var(--lime)] grid place-items-center font-display text-base font-bold border-2 border-black text-black">NY</div>
                  <div className="text-xs leading-tight">
                    <div className="font-bold">"Formidable breakfast tacos."</div>
                    <div className="text-stone-500 mt-0.5">— NY Eater</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[color:var(--lime)] text-black border-y-4 border-white overflow-hidden">
        <div className="flex marquee whitespace-nowrap py-4 font-display text-2xl uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-6">
              <span>·Breakfast tacos</span>
              <span>·Huevos a la mexicana</span>
              <span>·Brioche sandwiches</span>
              <span>·Chicken & waffles</span>
              <span>·Quesadillas</span>
              <span>·French toast</span>
              <span>·Breakfast tacos</span>
              <span>·Huevos a la mexicana</span>
              <span>·Brioche sandwiches</span>
              <span>·Chicken & waffles</span>
              <span>·Quesadillas</span>
              <span>·French toast</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY STRIP */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="chip chip-orange">The menu</span>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl text-white">
                Order by section
              </h2>
            </div>
            <Link href="/menu" className="text-sm font-bold text-[color:var(--lime)] hidden sm:inline-flex items-center gap-1">
              See everything →
            </Link>
          </div>
        </Reveal>
        <div className="flex gap-3 overflow-x-auto scroll-x -mx-5 px-5 pb-2">
          {orderedCategories.map((c, i) => (
            <Reveal key={c.key} delay={i * 50} variant="up">
              <Link
                href={`/menu#${c.key}`}
                className="block shrink-0 rounded-2xl border-2 border-white/15 bg-white/[0.04] backdrop-blur px-5 py-4 min-w-[220px] hover:border-[color:var(--pink)] hover:bg-white/[0.08] transition-all hover:-translate-y-1"
              >
                <div className="font-display text-lg leading-tight text-white">{c.label}</div>
                <div className="text-xs text-[color:var(--lime)] mt-1 font-semibold uppercase tracking-wider">
                  {c.items.length} items
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="chip">Crowd favorites</span>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl text-white">
                What people order
              </h2>
              <p className="mt-3 text-white/60 max-w-xl">
                The dishes Sunnyside regulars come back for — picked from across
                the menu.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 70} variant="up">
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="mt-28 relative overflow-hidden">
        <div className="absolute inset-0 confetti opacity-50" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 grid md:grid-cols-2 gap-14 items-center">
          <Reveal variant="left">
            <div>
              <span className="chip chip-teal">From the kitchen</span>
              <h2 className="mt-5 font-display text-4xl sm:text-6xl leading-[1.02] text-white">
                Two kitchens,
                <br />
                <span className="sticker sticker-lime">one counter.</span>
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed max-w-lg">
                Half a New York breakfast counter — eggs any style, brioche
                sandwiches, French toast. Half a Mexican kitchen — huevos a la
                mexicana, breakfast tacos, quesadillas built the way the family
                makes them at home.
              </p>
              <Link
                href="/about"
                className="btn-lime mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
              >
                Read our story →
              </Link>
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(1, 5).map((f, i) => (
                <div
                  key={f.id}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 border-white/15 ${
                    i % 2 === 0 ? "translate-y-6" : ""
                  } hover:scale-105 transition-transform duration-500`}
                >
                  {f.localImage && (
                    <Image
                      src={f.localImage}
                      alt={f.name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-xs font-bold text-white truncate">
                    {f.name}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISIT / CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-20 grid md:grid-cols-3 gap-6">
        <Reveal className="md:col-span-2">
          <div className="card p-8 lg:p-10 h-full">
            <span className="chip chip-lime">Visit</span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl text-white">
              Find us on 39th Street
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              {business.location.full}. Browse the menu here, then use DoorDash
              for pickup or delivery.
            </p>
            <a
              href={business.phoneHref}
              className="mt-5 inline-flex font-display text-3xl text-[color:var(--lime)]"
            >
              {business.phone}
            </a>
            <div className="mt-7 grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--pink-2)] font-bold mb-2">
                  Hours
                </h3>
                <ul className="space-y-1 text-sm text-white/80">
                  {business.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3 max-w-xs">
                      <span className="text-white/60">{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--pink-2)] font-bold mb-2">
                  Service
                </h3>
                <ul className="text-sm space-y-1.5 text-white/80">
                  <li>• Walk-in at the counter</li>
                  <li>• DoorDash pickup & delivery</li>
                  <li>• Group platters & catering</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="card p-8 lg:p-10 h-full bg-gradient-to-br from-[color:var(--pink)] to-[color:var(--orange)] border-white">
            <h3 className="font-display text-3xl leading-tight text-white">Skip the line.</h3>
            <p className="mt-2 text-white/90 leading-relaxed">
              DoorDash handles pickup and delivery when you want Eggstravaganza
              brought to you.
            </p>
            <a
              href={business.orderUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-bold border-2 border-white hover:bg-[color:var(--lime)] transition-colors"
            >
              Order on DoorDash →
            </a>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-12 w-12 rounded-full bg-white grid place-items-center text-[color:var(--pink)] font-bold border-2 border-white">f</span>
              <span className="h-12 w-12 rounded-full bg-white grid place-items-center text-[color:var(--pink)] font-bold border-2 border-white">○</span>
              <div className="text-white font-display text-lg">
                {business.socials.handle}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Bottom spacer */}
      <div className="h-20" />
    </div>
  )
}

function Stat({ n, l }: { n: string | number; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-white">{n}</div>
      <div className="text-white/50 uppercase tracking-widest text-[10px] mt-1 font-bold">
        {l}
      </div>
    </div>
  )
}
