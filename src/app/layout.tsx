import "./globals.css"
import { Fraunces, Inter } from "next/font/google"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"
import { business } from "@/lib/business"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "900"],
  display: "swap",
})
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata = {
  title: {
    default: `${business.name} — ${business.tagline}`,
    template: `%s · ${business.name}`,
  },
  description:
    "Eggstravaganza is a Sunnyside, NY kitchen serving all-day breakfast, Mexican classics, sandwiches, omelettes and griddle plates. Order on DoorDash or visit the counter.",
  metadataBase: new URL("https://eggstravaganza.example.com"),
  openGraph: {
    title: `${business.name} — ${business.tagline}`,
    description: "All-day breakfast & Mexican kitchen in Sunnyside, NY.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col paper">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
