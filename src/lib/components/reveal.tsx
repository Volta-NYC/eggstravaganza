"use client"

import { useEffect, useRef, useState } from "react"

type Variant = "up" | "left" | "right" | "scale"

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: As = "div",
  once = true,
}: {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  className?: string
  as?: React.ElementType
  once?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            if (once) io.disconnect()
          } else if (!once) {
            setShown(false)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  const variantClass =
    variant === "left"
      ? "reveal-left"
      : variant === "right"
      ? "reveal-right"
      : variant === "scale"
      ? "reveal-scale"
      : ""

  return (
    <As
      ref={ref as never}
      className={`reveal ${variantClass} ${shown ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </As>
  )
}
