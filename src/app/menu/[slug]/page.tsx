import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { menu, getItem, priceDisplay, categoryMeta } from "@/lib/menu"
import { business } from "@/lib/business"
import MenuCard from "@/lib/components/menu-card"
import OrderForm from "@/lib/components/order-form"
import Reveal from "@/lib/components/reveal"

export function generateStaticParams() {
  return menu.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) return { title: "Not found" }
  return {
    title: item.name,
    description: item.description || `${item.name} at ${business.name}`,
  }
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  const meta = categoryMeta[item.category]
  const related = menu
    .filter((m) => m.category === item.category && m.slug !== item.slug)
    .slice(0, 3)

  return (
    <div className="overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        <nav className="text-sm text-white/50">
          <Link href="/menu" className="hover:text-[color:var(--pink-2)]">Menu</Link>
          <span className="mx-2">/</span>
          <Link href={`/menu#${item.category}`} className="hover:text-[color:var(--pink-2)]">
            {meta?.label ?? item.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{item.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-8 grid lg:grid-cols-2 gap-12">
        <Reveal variant="left">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-[0_30px_60px_-15px_rgba(236,44,126,0.5)] bg-gradient-to-br from-[color:var(--pink)]/30 to-[color:var(--orange)]/20">
            {item.localImage ? (
              <Image
                src={item.localImage}
                alt={item.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="font-display text-[140px] leading-none sticker sticker-lime">
                    {item.name.charAt(0)}
                  </div>
                  <div className="mt-3 text-white/80 text-sm uppercase tracking-widest font-bold">
                    {meta?.label}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="flex flex-col">
            <span className="chip chip-orange w-fit">{meta?.label ?? item.category}</span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl tracking-tight text-white leading-[0.95]">
              {item.name}
            </h1>
            {item.price !== null && (
              <div className="mt-4 font-display text-4xl sticker sticker-lime w-fit">
                {priceDisplay(item.price)}
              </div>
            )}
            {item.description && (
              <p className="mt-5 text-lg text-white/75 leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="mt-8">
              <OrderForm item={item} />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <Detail label="Pickup" value="At the counter" />
              <Detail label="Delivery" value="Local, Sunnyside" />
              <Detail label="Payment" value="Card · Apple Pay" />
            </div>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-24">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl mb-8 text-white">
              More from <span className="sticker sticker-orange">{meta?.label}</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <MenuCard item={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t-2 border-white/15 pt-3">
      <div className="text-[10px] uppercase tracking-widest text-[color:var(--lime)] font-bold">{label}</div>
      <div className="mt-1 text-white">{value}</div>
    </div>
  )
}
