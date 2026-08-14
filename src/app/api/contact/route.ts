import { google } from "googleapis"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const topics = new Set(["Catering", "Large order", "Press", "General question"])
type ContactPayload = { name?: unknown; email?: unknown; phone?: unknown; topic?: unknown; "event-date"?: unknown; "guest-count"?: unknown; message?: unknown }
const stringValue = (value: unknown) => typeof value === "string" ? value.trim() : ""

export async function POST(request: Request) {
  let body: ContactPayload
  try { body = await request.json() } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }) }

  const name = stringValue(body.name)
  const email = stringValue(body.email)
  const phone = stringValue(body.phone)
  const topic = stringValue(body.topic)
  const eventDate = stringValue(body["event-date"])
  const guestCount = stringValue(body["guest-count"])
  const message = stringValue(body.message)
  const errors: Record<string, string> = {}

  if (!name) errors.name = "Please enter your name."
  else if (name.length > 100) errors.name = "Your name must be 100 characters or fewer."
  if (!email) errors.email = "Please enter your email address."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address."
  else if (email.length > 254) errors.email = "Your email address is too long."
  if (phone.length > 50) errors.phone = "Your phone number must be 50 characters or fewer."
  if (!topics.has(topic)) errors.topic = "Please choose a valid topic."
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) errors.eventDate = "Please enter a valid event date."
  if (guestCount && (!/^\d+$/.test(guestCount) || Number(guestCount) < 1 || Number(guestCount) > 100000)) errors.guestCount = "Guest count must be a whole number between 1 and 100,000."
  if (!message) errors.message = "Please enter a message."
  else if (message.length > 5000) errors.message = "Your message must be 5,000 characters or fewer."
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 })

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n")
  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.error("Google Sheets environment variables are not fully configured.")
    return NextResponse.json({ error: "The contact form is temporarily unavailable." }, { status: 503 })
  }

  try {
    const auth = new google.auth.JWT({ email: clientEmail, key: privateKey, scopes: ["https://www.googleapis.com/auth/spreadsheets"] })
    const sheets = google.sheets({ version: "v4", auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[new Date().toISOString(), name, email, phone, topic, eventDate, guestCount, message]] },
    })
  } catch (error) {
    console.error("Unable to append contact submission to Google Sheets.", error)
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 502 })
  }
  return NextResponse.json({ success: true })
}
