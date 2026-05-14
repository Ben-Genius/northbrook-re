"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { CheckCircle2, ShieldCheck, Activity, Leaf, Zap } from "lucide-react"

interface Pillar {
  title: string
  body: string
  icon?: any
}

const icons = [ShieldCheck, Activity, Leaf, Zap]

interface QHSEGridProps {
  pillars: Pillar[]
}

export function QHSEGrid({ pillars }: QHSEGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".qhse-item")
      
      gsap.from(items, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
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
    <div ref={containerRef} className="grid md:grid-cols-2 border border-black/[0.08] divide-x divide-y divide-black/[0.08] rounded-lg overflow-hidden">
      {pillars.map((p, i) => {
        const Icon = icons[i % icons.length]
        return (
          <div key={p.title} className="qhse-item group bg-white p-10 lg:p-14 relative overflow-hidden">
            {/* Background decorative number */}
            <span className="absolute -bottom-10 -right-10 text-[12rem] font-display font-light text-accent/5 select-none transition-transform duration-700 group-hover:scale-110 group-hover:text-accent/10">
              0{i + 1}
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <Icon size={24} />
                </div>
                <div className="h-px flex-1 bg-accent/10 group-hover:bg-accent/30 transition-colors duration-500" />
              </div>

              <h3 className="text-2xl font-light text-primary mb-5 group-hover:text-accent transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-body text-sm leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {p.body}
              </p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
          </div>
        )
      })}
    </div>
  )
}
