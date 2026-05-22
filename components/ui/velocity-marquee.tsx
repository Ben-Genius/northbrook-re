"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

interface VelocityMarqueeProps {
  variant?: "stats" | "ports"
  dark?: boolean
}

const STATS_ITEMS = ["347 port calls", "12,400t cargo", "zero LTI hours", "98.4% on-time", "42 vessels"]
const PORTS_ITEMS = ["Tema", "Takoradi", "Lomé", "Lagos", "Port Harcourt", "Abidjan", "Cotonou"]

export function VelocityMarquee({ variant = "stats", dark = false }: VelocityMarqueeProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const twRef = useRef<gsap.core.Tween | null>(null)
  const items = variant === "stats" ? STATS_ITEMS : PORTS_ITEMS
  const doubled = [...items, ...items, ...items, ...items]
  const isStats = variant === "stats"

  useGSAP(() => {
    const el = rowRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Slow baseline so every word is readable; velocity nudge stays subtle (max 1.8×).
    const tw = gsap.to(el, {
      xPercent: isStats ? -50 : 50,
      duration: isStats ? 55 : 45,
      repeat: -1, ease: "none",
    })
    twRef.current = tw

    ScrollTrigger.create({
      trigger: el, start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity() / 1400), 1.8) + 1
        gsap.to(tw, { timeScale: v * (self.direction === -1 ? -1 : 1), duration: 1.2, overwrite: true })
      },
      onLeave: () => gsap.to(tw, { timeScale: 1, duration: 1.5 }),
      onLeaveBack: () => gsap.to(tw, { timeScale: 1, duration: 1.5 }),
    })
  }, { scope: rowRef })

  const handleMouseEnter = () => {
    if (twRef.current) gsap.to(twRef.current, { timeScale: 0, duration: 0.5, overwrite: true })
  }
  const handleMouseLeave = () => {
    if (twRef.current) gsap.to(twRef.current, { timeScale: 1, duration: 0.7, overwrite: true })
  }

  return (
    <div
      className="overflow-hidden select-none"
      style={{
        background: dark ? "#18090E" : "var(--nb-gray-light)",
        borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(58,59,71,0.12)",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(58,59,71,0.12)",
        cursor: "default",
      }}
      aria-hidden
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={rowRef}
        style={{
          display: "flex", gap: "60px", padding: "24px 0",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 500, fontSize: "clamp(22px,2.5vw,32px)",
          letterSpacing: "-0.02em",
          fontStyle: isStats ? "normal" : "normal",
          color: dark ? "rgba(255,255,255,0.72)" : "var(--nb-ink)",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "60px" }}>
            {item}
            <span style={{ color: dark ? "rgba(140,0,48,0.8)" : "var(--nb-accent)", fontStyle: "normal" }}>✱</span>
          </span>
        ))}
      </div>
    </div>
  )
}
