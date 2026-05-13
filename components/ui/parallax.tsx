"use client"

import { useRef, type ReactNode } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

interface ParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function Parallax({ children, offset = -80, className }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        innerRef.current,
        { y: -offset / 2 },
        {
          y: offset / 2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      <div ref={innerRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  )
}

export function ParallaxBackground({
  children,
  offset = 120,
}: {
  children: ReactNode
  offset?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        innerRef.current,
        { y: -offset },
        {
          y: offset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden>
      <div ref={innerRef} className="absolute inset-x-0" style={{ willChange: "transform", top: `-${offset}px`, bottom: `-${offset}px` }}>
        {children}
      </div>
    </div>
  )
}
