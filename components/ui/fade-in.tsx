"use client"

import { useRef, type ReactNode } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "left" | "none"
  className?: string
}

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const from: gsap.TweenVars =
        direction === "up"
          ? { opacity: 0, y: 24 }
          : direction === "left"
            ? { opacity: 0, x: -24 }
            : { opacity: 0 }

      gsap.from(el, {
        ...from,
        duration: 0.75,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=60",
          toggleActions: "play none none none",
        },
      })
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(el, {
        opacity: 0,
        duration: 0.4,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=60",
          toggleActions: "play none none none",
        },
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
