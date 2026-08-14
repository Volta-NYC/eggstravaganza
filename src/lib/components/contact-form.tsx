import { business } from "@/lib/business"

export default function ContactForm({ id = "contact-form" }: { id?: string }) {
  return (
    <form
      id={id}
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
          For catering, include the event date, pickup or delivery preference,
          guest count, and any menu items you already have in mind.
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
