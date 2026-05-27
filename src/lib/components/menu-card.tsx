import Image from "next/image"
import Link from "next/link"
import { MenuItem, priceDisplay } from "@/lib/menu"

const CATEGORY_ACCENT: Record<string, string> = {
  breakfast: "from-[color:var(--orange)]/30 to-[color:var(--pink)]/20",
  mexican: "from-[color:var(--pink)]/40 to-[color:var(--orange)]/20",
  griddle: "from-[color:var(--orange)]/40 to-[color:var(--lime)]/20",
  omelettes: "from-[color:var(--lime)]/30 to-[color:var(--orange)]/20",
  sandwiches: "from-[color:var(--teal)]/30 to-[color:var(--pink)]/20",
  burgers: "from-[color:var(--pink)]/40 to-[color:var(--orange)]/30",
  platters: "from-[color:var(--orange)]/40 to-[color:var(--pink)]/20",
  salads: "from-[color:var(--lime)]/40 to-[color:var(--teal)]/20",
  sides: "from-[color:var(--orange)]/30 to-[color:var(--lime)]/20",
  drinks: "from-[color:var(--teal)]/40 to-[color:var(--lime)]/20",
  specials: "from-[color:var(--pink)]/30 to-[color:var(--teal)]/20",
}

export default function MenuCard({ item }: { item: MenuItem }) {
  const accent = CATEGORY_ACCENT[item.category] ?? CATEGORY_ACCENT.specials
  return (
    <Link
      href={`/menu/${item.slug}`}
      className="card group flex flex-col overflow-hidden cursor-pointer"
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${accent}`}
      >
        {item.localImage ? (
          <Image
            src={item.localImage}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <PlaceholderArt name={item.name} />
        )}
        {item.price !== null && (
          <div className="absolute top-3 right-3 rounded-full bg-black/80 text-white border-2 border-white px-3 py-1 text-sm font-bold backdrop-blur">
            {priceDisplay(item.price)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg leading-snug text-white group-hover:text-[color:var(--pink-2)] transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-1.5 text-sm text-white/55 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs">
          <span className="text-white/40 uppercase tracking-widest">{item.category}</span>
          <span className="text-[color:var(--lime)] font-bold">View →</span>
        </div>
      </div>
    </Link>
  )
}

function PlaceholderArt({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "E"
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="font-display text-7xl text-white/80 drop-shadow-sm select-none sticker sticker-lime">
        {letter}
      </span>
    </div>
  )
}
