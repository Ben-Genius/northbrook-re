"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

const partners = [
  { name: "Saipem",        abbr: "SP" },
  { name: "Borr Drilling", abbr: "BD" },
  { name: "Fugro",         abbr: "FG" },
  { name: "Rina",          abbr: "RN" },
  { name: "ENI",           abbr: "EN" },
  { name: "Safeen",        abbr: "SF" },
  { name: "Bourbon",       abbr: "BB" },
]

interface PartnerLogoWallProps {
  caption?: string
}

export function PartnerLogoWall({ caption }: PartnerLogoWallProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll(".partner-item")
    const cap = el.querySelector(".partner-caption")
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(items, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: { each: 0.07, from: "start" },
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=40",
          toggleActions: "play none none none",
        },
      })
      if (cap) {
        gsap.from(cap, {
          opacity: 0,
          duration: 0.4,
          delay: 0.4,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=40",
            toggleActions: "play none none none",
          },
        })
      }
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from([...Array.from(items), cap].filter(Boolean), {
        opacity: 0,
        duration: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=40",
          toggleActions: "play none none none",
        },
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-steel/15">
        {partners.map((p) => (
          <div
            key={p.name}
            className="partner-item group bg-white flex flex-col items-center justify-center py-12 px-6 cursor-default select-none"
          >
            <span
              aria-hidden
              className="font-display block text-[1.75rem] font-light text-primary/20 group-hover:text-accent/30 transition-colors duration-500 mb-3 leading-none"
            >
              {p.abbr}
            </span>
            <span
              className="font-display text-base lg:text-lg font-light tracking-wider text-primary/40 group-hover:text-primary transition-colors duration-400"
            >
              {p.name}
            </span>
            <span
              aria-hidden
              className="block mt-3 h-px w-0 group-hover:w-8 bg-accent transition-all duration-500 ease-out"
            />
          </div>
        ))}
      </div>

      {caption && (
        <p className="partner-caption text-center text-caption text-sm mt-6">
          {caption}
        </p>
      )}
    </div>
  )
}
