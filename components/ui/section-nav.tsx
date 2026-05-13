"use client"

import { useEffect, useState } from "react"

interface NavItem {
  id: string
  label: string
}

/**
 * Sticky in-page navigation. Sits below the fixed navbar, highlights the
 * currently visible section using IntersectionObserver, and provides
 * smooth-scroll anchor jumps. Use on long pages (services, etc.).
 */
export function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "")

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [items])

  return (
    <div className="sticky top-[68px] z-30 bg-background/90 backdrop-blur-md border-y border-wire print:hidden">
      <nav
        aria-label="Section navigation"
        className="max-w-7xl mx-auto px-6 lg:px-12 flex gap-1 overflow-x-auto no-scrollbar"
      >
        {items.map((it) => {
          const isActive = it.id === active
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`relative shrink-0 px-4 py-4 text-[11px] uppercase tracking-[0.16em] font-medium transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-caption hover:text-primary"
              }`}
            >
              {it.label}
              <span
                aria-hidden
                className={`absolute bottom-0 left-4 right-4 h-px bg-accent transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          )
        })}
      </nav>
    </div>
  )
}
