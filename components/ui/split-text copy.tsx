"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface SplitTextProps {
  text: string
  by?: "word" | "char"
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
  style?: React.CSSProperties
  /** "mount" = fires immediately on load (hero), "scroll" = ScrollTrigger (default) */
  trigger?: "mount" | "scroll"
}

export function SplitText({
  text,
  by = "word",
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  as: Tag = "h1",
  style,
  trigger = "scroll",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const units = by === "word" ? text.split(" ") : Array.from(text)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll(".split-inner")
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const baseVars: gsap.TweenVars = {
        y: "110%",
        opacity: 0,
        duration,
        ease: "power3.out",
        stagger,
        delay,
      }

      if (trigger === "mount") {
        gsap.from(items, baseVars)
      } else {
        gsap.from(items, {
          ...baseVars,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=60",
            toggleActions: "play none none none",
          },
        })
      }
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const baseVars: gsap.TweenVars = { opacity: 0, duration: 0.4, delay }

      if (trigger === "mount") {
        gsap.from(el, baseVars)
      } else {
        gsap.from(el, {
          ...baseVars,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=60",
            toggleActions: "play none none none",
          },
        })
      }
    })
  }, { scope: ref })

  const AnyTag = Tag as any
  return (
    <AnyTag ref={ref} className={className} style={style} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.12em",
            marginRight: by === "word" ? "0.28em" : undefined,
          }}
        >
          <span
            className="split-inner"
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {unit === " " ? " " : unit}
          </span>
        </span>
      ))}
    </AnyTag>
  )
}
