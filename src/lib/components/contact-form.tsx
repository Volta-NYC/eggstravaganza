"use client"

import type { ClipboardEvent, FocusEvent, FormEvent } from "react"
import { useState } from "react"
import { business } from "@/lib/business"
import {
  hasValidCharacters,
  type ContactFieldName,
  type ContactValues,
  validateContact,
  validateContactField,
} from "@/lib/contact-validation"

type FormErrors = Partial<Record<ContactFieldName, string>>

function contactValues(form: HTMLFormElement): ContactValues {
  const data = new FormData(form)
  return {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    phone: String(data.get("phone") ?? "").trim(),
    topic: String(data.get("topic") ?? "").trim(),
    eventDate: String(data.get("event-date") ?? "").trim(),
    guestCount: String(data.get("guest-count") ?? "").trim(),
    message: String(data.get("message") ?? "").trim(),
  }
}

function valueAfterInsertion(input: HTMLInputElement | HTMLTextAreaElement, inserted: string) {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? input.value.length
  return `${input.value.slice(0, start)}${inserted}${input.value.slice(end)}`
}

export default function ContactForm({ id = "contact-form" }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const instructionsId = `${id}-instructions`

  function setFieldError(field: ContactFieldName, error?: string) {
    setErrors((current) => {
      const next = { ...current }
      if (error) next[field] = error
      else delete next[field]
      return next
    })
  }

  function invalidCharacterMessage(field: ContactFieldName) {
    return validateContactField(field, field === "name" || field === "email" || field === "message" ? "\u0000" : "x") ?? "Please use valid characters."
  }

  function handleBeforeInput(field: ContactFieldName, event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inserted = (event.nativeEvent as InputEvent).data
    if (!inserted || hasValidCharacters(field, valueAfterInsertion(event.currentTarget, inserted))) return
    event.preventDefault()
    setFieldError(field, invalidCharacterMessage(field))
  }

  function handlePaste(field: ContactFieldName, event: ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const pastedText = event.clipboardData.getData("text")
    if (hasValidCharacters(field, valueAfterInsertion(event.currentTarget, pastedText))) return
    event.preventDefault()
    setFieldError(field, invalidCharacterMessage(field))
  }

  function handleInput(field: ContactFieldName, event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!hasValidCharacters(field, event.currentTarget.value)) setFieldError(field, invalidCharacterMessage(field))
    else setFieldError(field)
  }

  function handleBlur(field: ContactFieldName, event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFieldError(field, validateContactField(field, event.currentTarget.value.trim()))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = contactValues(form)
    const clientErrors = validateContact(values)
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      setStatus("error")
      return
    }

    setStatus("sending")
    setErrors({})

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
      <Field label="Your name" name="name" field="name" required error={errors.name} onBeforeInput={handleBeforeInput} onPaste={handlePaste} onInput={handleInput} onBlur={handleBlur} />
      <Field label="Email" name="email" field="email" type="email" required error={errors.email} onBeforeInput={handleBeforeInput} onPaste={handlePaste} onInput={handleInput} onBlur={handleBlur} />
      <Field label="Phone" name="phone" field="phone" type="tel" error={errors.phone} onBeforeInput={handleBeforeInput} onPaste={handlePaste} onInput={handleInput} onBlur={handleBlur} />
      <div>
        <label htmlFor={`${id}-topic`} className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">Topic</label>
        <select id={`${id}-topic`} name="topic" defaultValue="Catering" aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? `${id}-topic-error` : undefined} className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none">
          <option>Catering</option><option>Large order</option><option>Press</option><option>General question</option>
        </select>
        <FieldError id={`${id}-topic-error`} message={errors.topic} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Event date" name="event-date" field="eventDate" type="date" error={errors.eventDate} onBeforeInput={handleBeforeInput} onPaste={handlePaste} onInput={handleInput} onBlur={handleBlur} />
        <Field label="Guest count" name="guest-count" field="guestCount" type="number" min="1" error={errors.guestCount} onBeforeInput={handleBeforeInput} onPaste={handlePaste} onInput={handleInput} onBlur={handleBlur} />
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">Message</label>
        <textarea id={`${id}-message`} name="message" rows={6} required placeholder="Tell us what you are planning, what menu items you want, and whether you need pickup or delivery." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${id}-message-error` : undefined} onBeforeInput={(event) => handleBeforeInput("message", event)} onPaste={(event) => handlePaste("message", event)} onInput={(event) => handleInput("message", event)} onBlur={(event) => handleBlur("message", event)} className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none" />
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

function Field({ label, name, field, type = "text", placeholder, min, required, error, onBeforeInput, onPaste, onInput, onBlur }: { label: string; name: string; field: ContactFieldName; type?: string; placeholder?: string; min?: string; required?: boolean; error?: string; onBeforeInput: (field: ContactFieldName, event: FormEvent<HTMLInputElement>) => void; onPaste: (field: ContactFieldName, event: ClipboardEvent<HTMLInputElement>) => void; onInput: (field: ContactFieldName, event: FormEvent<HTMLInputElement>) => void; onBlur: (field: ContactFieldName, event: FocusEvent<HTMLInputElement>) => void }) {
  const inputId = `contact-${name}`
  return <div>
    <label htmlFor={inputId} className="block text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-2">{label}{required && <span aria-hidden="true"> *</span>}</label>
    <input id={inputId} name={name} type={type} min={min} required={required} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} onBeforeInput={(event) => onBeforeInput(field, event)} onPaste={(event) => onPaste(field, event)} onInput={(event) => onInput(field, event)} onBlur={(event) => onBlur(field, event)} className="w-full rounded-xl border-2 border-white/15 bg-white/[0.04] text-white placeholder-white/30 px-4 py-3 text-sm focus:border-[color:var(--lime)] focus:outline-none" />
    <FieldError id={`${inputId}-error`} message={error} />
  </div>
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1 text-xs text-red-300">{message}</p> : null
}
