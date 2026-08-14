import { business } from "@/lib/business"
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
            <Info label="Web" value={business.website} />
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
                  ○
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
          <form
            id="contact-form"
            className="card p-6 sm:p-8 space-y-5"
            action="mailto:hello@eggstravaganza.example.com"
            method="post"
            encType="text/plain"
          >
            <div>
              <span className="chip chip-lime">Contact form</span>
              <h2 className="mt-3 font-display text-3xl text-white">
                Tell us what you need.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                For catering, include the event date, pickup or delivery
                preference, guest count, and any menu items you already have in
                mind.
              </p>
            </div>
            <Field label="Your name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" />
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">
                Topic
              </label>
              <select
                name="topic"
                defaultValue="Catering"
                className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none"
              >
                <option>Catering</option>
                <option>Large order</option>
                <option>Press</option>
                <option>General question</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Event date" name="event-date" type="date" />
              <Field label="Guest count" name="guest-count" type="number" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell us what you are planning, what menu items you want, and whether you need pickup or delivery."
                className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="btn-primary inline-flex w-full justify-center rounded-full px-7 py-3.5 text-sm"
            >
              Send message
            </button>
            <p className="text-xs text-white/50">
              For fastest replies during the morning rush, call us at {business.phone}.
            </p>
          </form>
        </Reveal>
      </section>
    </div>
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none"
      />
    </div>
  )
}
