import { business } from "@/lib/business"
import ContactForm from "@/lib/components/contact-form"
import Reveal from "@/lib/components/reveal"

export const metadata = { title: "Contact" }

export default function ContactPage() {
  return (
    <div className="overflow-x-clip">
      <section className="hero-grad relative">
        <div className="absolute inset-0 confetti opacity-60" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <Reveal>
            <span className="chip chip-orange">Get in touch</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-5xl sm:text-7xl tracking-tight text-white leading-[0.95]">
              Say <span className="sticker sticker-lime">hello.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-white/70 leading-relaxed text-lg">
              Catering inquiries, large orders, press, or general questions — drop
              us a note and we'll get back during kitchen hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-12">
        <Reveal variant="left">
          <div className="space-y-7">
            <Info label="Phone" value={business.phone} href={business.phoneHref} highlight />
            <Info label="Address" value={`${business.location.street}, ${business.location.city}, ${business.location.state}`} />
            <Info
              label="Hours"
              value={business.hours.map((h) => `${h.day} — ${h.time}`).join("\n")}
            />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
                Follow
              </div>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={business.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 w-11 rounded-full bg-white text-black grid place-items-center font-bold border-2 border-white hover:bg-[color:var(--lime)] transition-colors"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href={business.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 w-11 rounded-full bg-white text-black grid place-items-center font-bold border-2 border-white hover:bg-[color:var(--lime)] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <span className="font-display text-xl text-[color:var(--pink-2)]">
                  {business.socials.handle}
                </span>
              </div>
            </div>
            <div className="rounded-[24px] border-4 border-white bg-[color:var(--lime)] p-6 text-black shadow-[0_14px_0_rgba(0,0,0,0.24)]">
              <div className="text-[10px] uppercase tracking-[0.22em] font-black">
                Catering
              </div>
              <h2 className="mt-2 font-display text-3xl leading-none">
                Planning breakfast or lunch for a group?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
                Fill out the form with your date, guest count, and what you are
                thinking of ordering. The kitchen will follow up during business
                hours.
              </p>
              <a
                href="#contact-form"
                className="mt-5 inline-flex rounded-full border-2 border-black bg-black px-5 py-2.5 text-sm font-bold text-white hover:bg-[color:var(--pink)] transition-colors"
              >
                Fill out the form →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal variant="right">
          <ContactForm />
        </Reveal>
      </section>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Info({
  label,
  value,
  href,
  highlight,
}: {
  label: string
  value: string
  href?: string
  highlight?: boolean
}) {
  const cls = highlight
    ? "font-display text-3xl text-[color:var(--lime)]"
    : "font-display text-xl text-white whitespace-pre-line"
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--lime)] font-bold">
        {label}
      </div>
      {href ? (
        <a href={href} className={`mt-1 inline-block break-words hover:underline ${cls}`}>
          {value}
        </a>
      ) : (
        <div className={`mt-1 ${cls}`}>{value}</div>
      )}
    </div>
  )
}
