export const contactTopics = ["Catering", "Large order", "Press", "General question"] as const

export type ContactFieldName = "name" | "email" | "phone" | "topic" | "eventDate" | "guestCount" | "message"
export type ContactValues = Record<ContactFieldName, string>
export type ContactErrors = Partial<Record<ContactFieldName, string>>

const nameCharacters = /^[^\d<>{}\\[\]|`~!@#$%^&*+=;:"/?\r\n\t]*$/
const emailCharacters = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~@\-]*$/
const phoneCharacters = /^[0-9+().\-\s]*$/
const messageCharacters = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function hasValidCharacters(field: ContactFieldName, value: string) {
  switch (field) {
    case "name": return nameCharacters.test(value)
    case "email": return emailCharacters.test(value)
    case "phone": return phoneCharacters.test(value)
    case "guestCount": return /^\d*$/.test(value)
    case "message": return messageCharacters.test(value)
    default: return true
  }
}

function invalidCharactersMessage(field: ContactFieldName) {
  switch (field) {
    case "name": return "Use letters, spaces, periods, apostrophes, or hyphens only."
    case "email": return "Use a valid email address without spaces or unsupported characters."
    case "phone": return "Use digits, spaces, +, parentheses, periods, or hyphens only."
    case "guestCount": return "Guest count can only contain whole numbers."
    case "message": return "Your message contains unsupported control characters."
    default: return "Please enter a valid value."
  }
}

function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

export function validateContactField(field: ContactFieldName, value: string): string | undefined {
  if (!hasValidCharacters(field, value)) return invalidCharactersMessage(field)

  switch (field) {
    case "name":
      if (!value) return "Please enter your name."
      return value.length > 100 ? "Your name must be 100 characters or fewer." : undefined
    case "email":
      if (!value) return "Please enter your email address."
      if (!emailFormat.test(value)) return "Please enter a valid email address."
      return value.length > 254 ? "Your email address is too long." : undefined
    case "phone":
      return value.length > 50 ? "Your phone number must be 50 characters or fewer." : undefined
    case "topic":
      return contactTopics.includes(value as (typeof contactTopics)[number]) ? undefined : "Please choose a valid topic."
    case "eventDate":
      return value && !isRealDate(value) ? "Please enter a valid event date." : undefined
    case "guestCount":
      if (!value) return undefined
      return Number(value) < 1 || Number(value) > 100000 ? "Guest count must be a whole number between 1 and 100,000." : undefined
    case "message":
      if (!value) return "Please enter a message."
      return value.length > 5000 ? "Your message must be 5,000 characters or fewer." : undefined
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  return Object.fromEntries(
    (Object.keys(values) as ContactFieldName[])
      .map((field) => [field, validateContactField(field, values[field])] as const)
      .filter(([, error]) => error),
  )
}
