"use client"

import { useRef, type ReactNode } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

type RevealVariant = "fade" | "rise" | "slide" | "blur" | "scale"

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  once?: boolean
  margin?: string
  as?: "div" | "section" | "span" | "article" | "li"
  className?: string
}

const fromVarsNormal: Record<RevealVariant, gsap.TweenVars> = {
  fade:  { opacity: 0 },
  rise:  { opacity: 0, y: 28 },
  slide: { opacity: 0, x: -32 },
  blur:  { opacity: 0, filter: "blur(12px)", y: 12 },
  scale: { opacity: 0, scale: 0.96 },
}

const fromVarsReduced: Record<RevealVariant, gsap.TweenVars> = {
  fade:  { opacity: 0 },
  rise:  { opacity: 0 },
  slide: { opacity: 0 },
  blur:  { opacity: 0 },
  scale: { opacity: 0 },
}

function marginToStart(margin: string): string {
  const val = parseInt(margin)
  if (isNaN(val) || val >= 0) return "top bottom"
  return `top bottom-=${Math.abs(val)}`
}

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration = 0.85,
  once = true,
  margin = "-80px",
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const start = marginToStart(margin)
  const toggleActions = once ? "play none none none" : "play reverse play reverse"

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el, {
        ...fromVarsNormal[variant],
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, toggleActions },
      })
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(el, {
        ...fromVarsReduced[variant],
        duration: 0.4,
        delay,
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      })
    })
  }, { scope: ref })

  const AnyTag = Tag as any
  return (
    <AnyTag ref={ref} className={className}>
      {children}
    </AnyTag>
  )
}

interface RevealStaggerProps {
  children: ReactNode
  delay?: number
  stagger?: number
  className?: string
}

export function RevealStagger({ children, delay = 0, stagger = 0.08, className }: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll(":scope > *")
    if (!items.length) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 0.75,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start: "top bottom-=80", toggleActions: "play none none none" },
      })
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(items, {
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top bottom-=80", toggleActions: "play none none none" },
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function RevealItem({
  children,
  variant = "rise",
  className,
}: {
  children: ReactNode
  variant?: RevealVariant
  className?: string
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
