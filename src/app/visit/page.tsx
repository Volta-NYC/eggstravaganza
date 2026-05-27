import Link from "next/link"
import { business } from "@/lib/business"
import Reveal from "@/lib/components/reveal"

export const metadata = { title: "Visit" }

export default function VisitPage() {
  return (
    <div className="overflow-x-clip">
      <section className="hero-grad relative">
        <div className="absolute inset-0 confetti opacity-60" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <Reveal>
            <span className="chip chip-lime">Visit us</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-5xl sm:text-7xl tracking-tight text-white leading-[0.95]">
              Come by the
              <br />
              <span className="sticker">counter.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-white/70 leading-relaxed text-lg">
              Pickup, local delivery, or pull up a chair — find us on 39th Street
              in Sunnyside.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-5 gap-10">
        <Reveal variant="left" className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
              Address
            </h2>
            <p className="mt-2 font-display text-2xl leading-snug text-white">
              {business.location.street}
              <br />
              {business.location.city}, {business.location.state}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(business.location.full)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-sm font-bold text-[color:var(--pink-2)]"
            >
              Open in Google Maps →
            </a>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
              Phone
            </h2>
            <a
              href={business.phoneHref}
              className="mt-2 inline-flex font-display text-3xl text-[color:var(--lime)]"
            >
              {business.phone}
            </a>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
              Hours
            </h2>
            <ul className="mt-3 space-y-2 max-w-sm text-sm">
              {business.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex justify-between border-b border-white/10 pb-2 text-white/80"
                >
                  <span>{h.day}</span>
                  <span className="font-bold text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
              Ways to order
            </h2>
            <ul className="mt-3 space-y-1.5 text-white/80 text-sm">
              <li>• Walk-in at the counter</li>
              <li>• Online order — pickup</li>
              <li>• Local delivery within Sunnyside</li>
              <li>• Group platters & catering on request</li>
            </ul>
            <Link
              href="/menu"
              className="btn-primary mt-5 inline-flex rounded-full px-6 py-3 text-sm"
            >
              Start an order →
            </Link>
          </div>
        </Reveal>

        <Reveal variant="right" className="lg:col-span-3">
          <div className="rounded-3xl overflow-hidden border-4 border-white aspect-[4/3] bg-stone-100 shadow-[0_20px_60px_-20px_rgba(236,44,126,0.4)]">
            <iframe
              title="Map to Eggstravaganza"
              src={`https://www.google.com/maps?q=${encodeURIComponent(business.location.full)}&output=embed`}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
