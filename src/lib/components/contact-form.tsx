"use client"

import { FormEvent, useState } from "react"
import { business } from "@/lib/business"

type FieldName = "name" | "email" | "phone" | "topic" | "eventDate" | "guestCount" | "message"
type FormErrors = Partial<Record<FieldName, string>>

export default function ContactForm({ id = "contact-form" }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const instructionsId = `${id}-instructions`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setErrors({})
    const form = event.currentTarget

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setErrors(result.errors ?? {})
        setStatus("error")
        return
      }

      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <form id={id} className="card p-6 sm:p-8 space-y-5" onSubmit={handleSubmit} noValidate aria-describedby={instructionsId}>
      <div>
        <span className="chip chip-lime">Contact form</span>
        <h2 className="mt-3 font-display text-3xl text-white">Tell us what you need.</h2>
        <p id={instructionsId} className="mt-2 text-sm leading-relaxed text-white/60">
          For catering, include the event date, pickup or delivery preference, guest count, and any menu items you already have in mind.
        </p>
      </div>
      <Field label="Your name" name="name" required error={errors.name} />
      <Field label="Email" name="email" type="email" required error={errors.email} />
      <Field label="Phone" name="phone" type="tel" error={errors.phone} />
      <div>
        <label htmlFor={`${id}-topic`} className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">Topic</label>
        <select id={`${id}-topic`} name="topic" defaultValue="Catering" aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? `${id}-topic-error` : undefined} className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none">
          <option>Catering</option><option>Large order</option><option>Press</option><option>General question</option>
        </select>
        <FieldError id={`${id}-topic-error`} message={errors.topic} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Event date" name="event-date" type="date" error={errors.eventDate} />
        <Field label="Guest count" name="guest-count" type="number" min="1" error={errors.guestCount} />
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">Message</label>
        <textarea id={`${id}-message`} name="message" rows={6} required placeholder="Tell us what you are planning, what menu items you want, and whether you need pickup or delivery." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${id}-message-error` : undefined} className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none" />
        <FieldError id={`${id}-message-error`} message={errors.message} />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary inline-flex w-full justify-center rounded-full px-7 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-70">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "success" && <p className="text-sm text-[color:var(--lime)]" role="status">Thanks! Your message has been sent.</p>}
      {status === "error" && <p className="text-sm text-red-300" role="alert">{Object.keys(errors).length ? "Please correct the highlighted fields and try again." : "We couldn’t send your message. Please try again or call us directly."}</p>}
      <p className="text-xs text-white/50">For fastest replies during the morning rush, call us at {business.phone}.</p>
    </form>
  )
}

function Field({ label, name, type = "text", placeholder, min, required, error }: { label: string; name: string; type?: string; placeholder?: string; min?: string; required?: boolean; error?: string }) {
  const inputId = `contact-${name}`
  return <div>
    <label htmlFor={inputId} className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">{label}{required && <span aria-hidden="true"> *</span>}</label>
    <input id={inputId} name={name} type={type} min={min} required={required} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none" />
    <FieldError id={`${inputId}-error`} message={error} />
  </div>
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1 text-xs text-red-300">{message}</p> : null
}
