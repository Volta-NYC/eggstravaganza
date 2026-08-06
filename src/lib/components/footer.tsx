import Link from "next/link"
import Image from "next/image"
import { business } from "@/lib/business"

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black overflow-hidden">
      {/* Marquee */}
      <div className="bg-[color:var(--pink)] text-white border-y-2 border-white overflow-hidden">
        <div className="flex marquee whitespace-nowrap py-3 font-display text-xl uppercase tracking-wide">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 px-5">
              <span>·Cage-free eggs</span>
              <span>·Hand-pressed tortillas</span>
              <span>·Open at 6 AM weekdays</span>
              <span>·Pickup & local delivery</span>
              <span>·Sunnyside, NY</span>
              <span>·Cage-free eggs</span>
              <span>·Hand-pressed tortillas</span>
              <span>·Open at 6 AM weekdays</span>
              <span>·Pickup & local delivery</span>
              <span>·Sunnyside, NY</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative h-14 w-14 rounded-full overflow-hidden bg-white">
              <Image
                src="/logo.png"
                alt="Eggstravaganza"
                fill
                sizes="56px"
                className="object-cover scale-110"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-2xl text-white">Eggstravaganza</span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[color:var(--lime)] uppercase">
                Mexican Cuisine
              </span>
            </span>
          </Link>
          <p className="mt-5 text-white/60 max-w-sm leading-relaxed">
            A neighborhood kitchen in Sunnyside, NY serving all-day breakfast and
            Mexican classics — cooked to order, served at the counter.
          </p>
          <Link
            href="/menu"
            className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm"
          >
            Start an order →
          </Link>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold mb-4">
            Visit
          </h4>
          <p className="text-white leading-relaxed">
            {business.location.street}
            <br />
            {business.location.city}, {business.location.state}
          </p>
          <a
            href={business.phoneHref}
            className="mt-4 inline-block text-[color:var(--lime)] font-display text-xl"
          >
            {business.phone}
          </a>
          <ul className="mt-5 text-sm text-white/60 space-y-1">
            {business.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-white">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold mb-4">
            Explore
          </h4>
          <ul className="text-sm space-y-2 text-white/80">
            <li><Link href="/menu" className="hover:text-[color:var(--pink-2)]">Full menu</Link></li>
            <li><Link href="/about" className="hover:text-[color:var(--pink-2)]">Our story</Link></li>
            <li><Link href="/visit" className="hover:text-[color:var(--pink-2)]">Visit & hours</Link></li>
            <li><Link href="/contact" className="hover:text-[color:var(--pink-2)]">Contact</Link></li>
            <li><Link href="/cart" className="hover:text-[color:var(--pink-2)]">Your bag</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold mb-4">
            Follow
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={business.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[color:var(--pink-2)]"
              >
                <span className="h-7 w-7 rounded-full bg-white/10 grid place-items-center">f</span>
                Facebook
              </a>
            </li>
            <li>
              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[color:var(--pink-2)]"
              >
                <span className="h-7 w-7 rounded-full bg-white/10 grid place-items-center">○</span>
                Instagram
              </a>
            </li>
          </ul>
          <p className="mt-3 text-[color:var(--pink-2)] font-display text-lg">
            {business.socials.handle}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-white/40">
          <div>© {new Date().getFullYear()} {business.legalName}. All rights reserved.</div>
          <div className="flex gap-5">
            <span className="text-white/60">{business.website}</span>
            <Link
              href="https://www.novusnyc.org/"
              target="_blank"
              rel="noreferrer"
              className="text-[#F6B78D] hover:text-[#F6B78D]"
            >
              Made by Novus
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
