import Image from "next/image"
import Link from "next/link"
import { business } from "@/lib/business"
import { featuredItems } from "@/lib/menu"
import Reveal from "@/lib/components/reveal"

export const metadata = { title: "Our story" }

export default function AboutPage() {
  const featured = featuredItems()
  return (
    <div className="overflow-x-clip">
      <section className="hero-grad relative">
        <div className="absolute inset-0 confetti opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 lg:py-32 text-center">
          <Reveal>
            <span className="chip chip-lime">
              Established {business.establishedYear}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl sm:text-7xl tracking-tight leading-[0.95] text-white">
              A neighborhood kitchen on
              <br />
              <span className="sticker sticker-lime">39th Street.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              {business.name} is two kitchens behind one counter — a New York
              breakfast spot serving brioche sandwiches and French toast, and a
              family-run Mexican kitchen plating huevos a la mexicana, breakfast
              tacos, and quesadillas the way they're meant to be made.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 inline-block relative h-32 w-32">
              <Image
                src="/logo.png"
                alt=""
                fill
                sizes="128px"
                className="object-contain spin-slow"
                aria-hidden
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-24 grid md:grid-cols-2 gap-14 items-start">
        <Reveal variant="left">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl text-white leading-[1.05]">
              Cage-free eggs. Hand-pressed tortillas. <span className="sticker sticker-orange">Real cooking.</span>
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed">
              Every plate starts the same way: cage-free eggs cracked to order,
              cooked on a hot griddle. From there, your morning goes where you
              want it to. A Classic NYC on a Kaiser roll with American cheese.
              Breakfast tacos on gluten-free corn tortillas, finished with cotija
              and a sprinkle of cilantro. A Chicken & Waffles plate that hits
              both halves of the menu at once.
            </p>
            <p className="mt-4 text-white/75 leading-relaxed">
              We cook for the morning rush, the lunch line, and the regulars who
              come back at 4 PM because they know we serve breakfast all day.
            </p>
          </div>
        </Reveal>
        <Reveal variant="right">
          <div className="grid grid-cols-2 gap-4">
            {featured.slice(0, 4).map((f, i) => (
              <div
                key={f.id}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 border-white/15 ${
                  i % 2 === 0 ? "translate-y-8" : ""
                }`}
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
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 confetti opacity-50" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Cooked to order",
              body: "Eggs cracked when you order, tortillas pressed when you ask. Nothing sitting under a heat lamp.",
              accent: "chip-orange",
            },
            {
              title: "Two menus, one ticket",
              body: "Pair a breakfast taco with a chicken sandwich. The line cooks share the counter.",
              accent: "chip-lime",
            },
            {
              title: "Made for the neighborhood",
              body: "Sunnyside-paced service at the counter, with DoorDash pickup and delivery online.",
              accent: "chip-teal",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="card p-7 h-full">
                <span className={`chip ${v.accent}`}>{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl text-white">{v.title}</h3>
                <p className="mt-2 text-white/65 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
        <Reveal>
          <blockquote className="font-display text-4xl sm:text-5xl leading-tight text-white">
            <span className="sticker sticker-orange">"Formidable</span>{" "}
            breakfast tacos."
          </blockquote>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5 text-[color:var(--lime)] uppercase tracking-[0.25em] text-xs font-bold">
            — NY Eater
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-12">
            <Link
              href="/menu"
              className="btn-primary inline-flex rounded-full px-7 py-3.5 text-base"
            >
              See the menu →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
