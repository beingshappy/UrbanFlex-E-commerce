"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const slides = [
  {
    title: "Flex Your Streets",
    subtitle: "New drops every Friday",
    cta: "Shop New Drops",
    href: "/new",
    img: "/urban-streetwear-city-lights.jpg",
  },
  {
    title: "Limited Edition Heat",
    subtitle: "Once gone, gone forever",
    cta: "Explore Limited",
    href: "/limited",
    img: "/limited-edition-streetwear.jpg",
  },
  {
    title: "Bestsellers",
    subtitle: "Community-approved fits",
    cta: "Browse Bestsellers",
    href: "/bestsellers",
    img: "/bestsellers-street-style.jpg",
  },
]

export default function HeroCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    setReduceMotion(mq.matches)
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const section = el.closest("section") ?? el
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { root: null, threshold: 0.1 })
    io.observe(section)
    return () => io.disconnect()
  }, [])

  const scrollToIndex = (idx: number) => {
    const el = ref.current
    if (!el) return
    const width = el.clientWidth
    const left = idx * width
    el.scrollTo({ left, behavior: "smooth" })
  }

  useEffect(() => {
    if (paused || !inView || reduceMotion) return
    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length
        scrollToIndex(next)
        return next
      })
    }, 5000)
    return () => clearInterval(id)
  }, [paused, inView, reduceMotion])

  // Observe slide visibility inside the scroller to update active index
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index || 0)
            setActive(idx)
          }
        })
      },
      { root: el, threshold: 0.6 },
    )
    Array.from(el.children).forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section
      className="w-full rounded-[var(--radius)] overflow-hidden gradient-hero card relative"
      aria-roledescription="carousel"
      aria-label="Featured Collections"
      aria-live="off"
    >
      <div
        ref={ref}
        data-hide-scrollbar="true"
        className="flex overflow-x-auto snap-x scroll-smooth"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <article key={i} data-index={i} className="min-w-full snap-start relative">
            <img
              src={s.img || "/placeholder.svg?height=480&width=1280&query=urban%20streetwear%20hero"} // hard-coded placeholder query
              alt={s.title}
              className="w-full h-[360px] md:h-[480px] object-cover parallax"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-x-6 bottom-8 md:bottom-12 text-white">
              <h1 className="text-2xl md:text-4xl font-sans font-extrabold animate-in-left">{s.title}</h1>
              <p className="mt-2 text-sm md:text-base opacity-90 animate-in-right">{s.subtitle}</p>
              <Link href={s.href} className="inline-flex mt-4 px-5 py-3 rounded-md gradient-cta animate-pulse-soft">
                {s.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2" aria-hidden="true">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-2 bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  )
}
