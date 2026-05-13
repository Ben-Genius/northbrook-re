"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

interface Pillar {
  title: string
  body: string
}

interface PillarGridProps {
  pillars: Pillar[]
}

export function PillarGrid({ pillars }: PillarGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".pillar-item")
      
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {pillars.map((p, i) => (
        <div key={p.title} className="pillar-item group relative">
          {/* Decorative number with vertical line */}
          <div className="flex items-start gap-4 mb-6">
            <span className="font-display text-4xl text-accent/20 group-hover:text-accent/40 transition-colors duration-500 leading-none">
              0{i + 1}
            </span>
            <div className="h-10 w-px bg-accent/20 group-hover:bg-accent/40 transition-colors duration-500 mt-1" />
          </div>
          
          <h3 className="text-xl font-light text-primary mb-4 group-hover:text-accent transition-colors duration-300">
            {p.title}
          </h3>
          <p className="text-sm text-body leading-relaxed max-w-sm">
            {p.body}
          </p>
          
          {/* Subtle bottom accent line that expands on hover */}
          <div className="absolute -bottom-4 left-0 right-0 h-px bg-accent/10">
            <div className="h-full w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out" />
          </div>
        </div>
      ))}
    </div>
  )
}
