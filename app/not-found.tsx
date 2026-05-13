"use client"

import Link from "next/link"
import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { ArrowRight, Anchor, ShieldCheck, Ship, Box } from "lucide-react"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      tl.from(".not-found-num", {
        opacity: 0,
        y: 40,
        duration: 1.2,
      })
      
      tl.from(".not-found-content", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, "-=0.8")
      
      tl.from(".not-found-link", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.6,
      }, "-=0.4")
    },
    { scope: containerRef },
  )

  return (
    <main 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 lg:px-12 section-ink overflow-hidden"
    >
      {/* Decorative background anchor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <Anchor size={600} strokeWidth={0.5} className="text-white" />
      </div>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        {/* Left side - 404 Visual */}
        <div className="text-center lg:text-left">
          <span className="eyebrow mb-6 text-accent">Navigation Error</span>
          <h1 className="not-found-num font-display text-[clamp(6rem,20vw,12rem)] font-light text-white leading-none mb-4" style={{ letterSpacing: "-0.04em" }}>
            404
          </h1>
          <p className="not-found-content text-lg lg:text-xl font-light text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Lost at sea? Even the most precise logistics need a recalibration. The page you are looking for has been moved or doesn&apos;t exist.
          </p>
        </div>

        {/* Right side - Conversion Links */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-12 space-y-10">
          <div>
            <h2 className="text-white text-xs uppercase tracking-[0.25em] font-semibold mb-8 opacity-60">
              Get Back on Track
            </h2>
            
            <div className="grid gap-6">
              {[
                { label: "Our Services", href: "/services", icon: Ship, desc: "Total onshore and offshore logistics." },
                { label: "Track Record", href: "/projects", icon: ShieldCheck, desc: "Our 100% safety record in action." },
                { label: "Logistics Pillars", href: "/about", icon: Box, desc: "Built for operations that can't fail." },
              ].map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="not-found-link group flex items-start gap-4 p-4 -m-4 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <link.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                      {link.label}
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-xs text-white/40 mt-1">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 text-accent text-sm uppercase tracking-[0.18em] font-semibold hover:gap-5 transition-all"
            >
              Contact Coordination <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-30" />
    </main>
  )
}
