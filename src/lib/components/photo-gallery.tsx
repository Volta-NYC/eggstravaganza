"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { GalleryImage } from "@/lib/gallery"

export default function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const currentX = useRef(0)
  const targetX = useRef(0)
  const halfWidth = useRef(0)
  const hovered = useRef(false)
  const touching = useRef(false)
  const touchLastX = useRef(0)
  const passivePausedUntil = useRef(0)

  function cardDistance() {
    const card = trackRef.current?.querySelector<HTMLElement>(".gallery-card")
    return card ? card.offsetWidth + 20 : 440
  }

  function pausePassive(ms = 1400) {
    passivePausedUntil.current = Date.now() + ms
    targetX.current = currentX.current
  }

  function move(direction: -1 | 1) {
    pausePassive(2200)
    targetX.current += direction * cardDistance()
  }

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track || images.length === 0) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const passiveSpeed = reduceMotion ? 0 : 0.38
    let frame = 0

    const computeHalf = () => {
      halfWidth.current = images.length * cardDistance()
    }

    const onResize = () => computeHalf()
    const onMouseEnter = () => {
      hovered.current = true
      pausePassive()
    }
    const onMouseLeave = () => {
      hovered.current = false
    }
    const onWheel = (event: WheelEvent) => {
      if (!hovered.current) return
      event.preventDefault()
      pausePassive()
      targetX.current += event.deltaY * 0.9
    }
    const onTouchStart = (event: TouchEvent) => {
      touchLastX.current = event.touches[0].clientX
      touching.current = true
      pausePassive()
    }
    const onTouchMove = (event: TouchEvent) => {
      if (!touching.current) return
      const x = event.touches[0].clientX
      pausePassive()
      targetX.current -= (x - touchLastX.current) * 1.2
      touchLastX.current = x
    }
    const onTouchEnd = () => {
      touching.current = false
      pausePassive()
    }

    computeHalf()
    window.addEventListener("resize", onResize, { passive: true })
    wrap.addEventListener("mouseenter", onMouseEnter)
    wrap.addEventListener("mouseleave", onMouseLeave)
    wrap.addEventListener("wheel", onWheel, { passive: false })
    wrap.addEventListener("touchstart", onTouchStart, { passive: true })
    wrap.addEventListener("touchmove", onTouchMove, { passive: true })
    wrap.addEventListener("touchend", onTouchEnd, { passive: true })

    const tick = () => {
      if (
        passiveSpeed &&
        !hovered.current &&
        !touching.current &&
        Date.now() > passivePausedUntil.current
      ) {
        targetX.current += passiveSpeed
      }

      currentX.current += (targetX.current - currentX.current) * 0.09

      if (halfWidth.current > 0) {
        if (currentX.current >= halfWidth.current) {
          currentX.current -= halfWidth.current
          targetX.current -= halfWidth.current
        }
        if (currentX.current < 0) {
          currentX.current += halfWidth.current
          targetX.current += halfWidth.current
        }
      }

      track.style.transform = `translateX(${-currentX.current}px)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
      wrap.removeEventListener("mouseenter", onMouseEnter)
      wrap.removeEventListener("mouseleave", onMouseLeave)
      wrap.removeEventListener("wheel", onWheel)
      wrap.removeEventListener("touchstart", onTouchStart)
      wrap.removeEventListener("touchmove", onTouchMove)
      wrap.removeEventListener("touchend", onTouchEnd)
    }
  }, [images.length])

  if (images.length === 0) return null

  const loopImages = [...images, ...images]

  return (
    <section className="gallery-section" aria-labelledby="gallery-heading">
      <div className="gallery-sticky">
        <div className="gallery-header">
          <span className="gallery-kicker">From the kitchen</span>
          <h2 id="gallery-heading" className="gallery-title">
            Feast with your eyes.
          </h2>
        </div>
        <div className="gallery-controls" aria-label="Browse food photos">
          <button
            className="gallery-control"
            type="button"
            aria-label="Previous food photo"
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            className="gallery-control"
            type="button"
            aria-label="Next food photo"
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
        <div className="gallery-track-wrap" ref={wrapRef}>
          <div className="gallery-track" ref={trackRef}>
            {loopImages.map((image, index) => {
              const duplicated = index >= images.length
              return (
                <figure
                  key={`${image.src}-${index}`}
                  className="gallery-card"
                  aria-hidden={duplicated ? "true" : undefined}
                >
                  <Image
                    src={image.src}
                    alt={duplicated ? "" : image.alt}
                    width={840}
                    height={840}
                    sizes="(min-width: 1024px) 420px, 72vw"
                    className="gallery-card-image"
                  />
                </figure>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
