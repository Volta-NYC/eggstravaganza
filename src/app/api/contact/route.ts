import { google } from "googleapis"
import { NextResponse } from "next/server"
import { validateContact } from "@/lib/contact-validation"

export const runtime = "nodejs"

type ContactPayload = { name?: unknown; email?: unknown; phone?: unknown; topic?: unknown; "event-date"?: unknown; "guest-count"?: unknown; message?: unknown }
const stringValue = (value: unknown) => typeof value === "string" ? value.trim() : ""
const easternTimestamp = (date: Date) => new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZoneName: "short",
}).format(date)

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
  const errors = validateContact({ name, email, phone, topic, eventDate, guestCount, message })
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
      requestBody: { values: [[easternTimestamp(new Date()), name, email, phone, topic, eventDate, guestCount, message]] },
    })
  } catch (error) {
    console.error("Unable to append contact submission to Google Sheets.", error)
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 502 })
  }
  return NextResponse.json({ success: true })
}
