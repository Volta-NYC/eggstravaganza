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
          </div>
        </Reveal>

        <Reveal variant="right">
          <form
            className="card p-6 sm:p-8 space-y-5"
            action="mailto:hello@eggstravaganza.example.com"
            method="post"
            encType="text/plain"
          >
            <Field label="Your name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Topic" name="topic" placeholder="Catering, large order, press…" />
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
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
