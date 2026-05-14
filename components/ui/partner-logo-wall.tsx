"use client"

import Image from "next/image"
import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

const partners = [
  { name: "Saipem",        logo: "/images/partners/saipem.png",        abbr: "SP" },
  { name: "Borr Drilling", logo: "/images/partners/borr-drilling.jpg", abbr: "BD" },
  { name: "Fugro",         logo: "/images/partners/fugro.jpg",         abbr: "FG" },
  { name: "Rina",          logo: "/images/partners/rina.jpg",          abbr: "RN" },
  { name: "ENI",           logo: null,                                  abbr: "EN" },
  { name: "Safeen",        logo: null,                                  abbr: "SF" },
  { name: "Bourbon",       logo: null,                                  abbr: "BB" },
  { name: "OSM Thome",     logo: null,                                  abbr: "OT" },
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border border-black/[0.08] divide-x divide-y divide-black/[0.08]">
        {partners.map((p) => (
          <div
            key={p.name}
            className="partner-item group hover:bg-black/[0.02] flex flex-col items-center justify-center py-12 px-8 cursor-default select-none transition-colors duration-300"
          >
            {p.logo ? (
              <>
                <div className="relative h-10 w-32 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
                <span className="mt-4 text-xs font-medium tracking-wide text-foreground/30 group-hover:text-foreground/60 transition-colors duration-300">
                  {p.name}
                </span>
              </>
            ) : (
              <>
                <span
                  aria-hidden
                  className="font-display block text-[1.75rem] font-bold text-foreground/10 group-hover:text-accent/25 transition-colors duration-500 mb-3 leading-none tracking-tight"
                >
                  {p.abbr}
                </span>
                <span className="font-display text-base lg:text-lg font-medium tracking-wide text-foreground/40 group-hover:text-foreground transition-colors duration-300">
                  {p.name}
                </span>
              </>
            )}
            <span
              aria-hidden
              className="block mt-4 h-px w-0 group-hover:w-8 bg-accent transition-all duration-500 ease-out"
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
