// "use client";

// import React, { useRef } from "react";
// import { gsap, SplitText, useGSAP } from "@/lib/gsap";
// import { Button } from "@/components/ui/button";
// import MagneticButton from "@/components/ui/MagneticButton";

// export default function CTASection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const headlineRef = useRef<HTMLHeadingElement>(null);

//   useGSAP(
//     () => {
//       if (!headlineRef.current) return;

//       const split = new SplitText(headlineRef.current, { type: "lines,words" });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none",
//         },
//       });

//       // Eyebrow line
//       tl.from(".cta-eyebrow", {
//         opacity: 0,
//         y: 16,
//         duration: 0.6,
//         ease: "power3.out",
//       });

//       // Headline words cascade
//       tl.from(
//         split.words,
//         {
//           opacity: 0,
//           y: 50,
//           rotateX: -40,
//           stagger: 0.04,
//           duration: 0.9,
//           ease: "power4.out",
//         },
//         "-=0.3"
//       );

//       // Divider line grows
//       tl.from(
//         ".cta-divider",
//         { scaleX: 0, duration: 0.8, ease: "power3.inOut", transformOrigin: "center" },
//         "-=0.4"
//       );

//       // Button + contact pop in
//       tl.from(
//         [".cta-btn-wrap", ".cta-contact"],
//         {
//           opacity: 0,
//           y: 24,
//           stagger: 0.12,
//           duration: 0.7,
//           ease: "power3.out",
//         },
//         "-=0.3"
//       );

//       // Ambient pulse — runs forever after reveal
//       gsap.to(".cta-pulse", {
//         scale: 1.3,
//         opacity: 0,
//         duration: 5,
//         repeat: -1,
//         ease: "sine.inOut",
//       });
//     },
//     { scope: containerRef }
//   );

//   return (
//     <section
//       ref={containerRef}
//       className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-foreground text-background px-6 text-center"
//     >
//       {/* Ambient glow */}
//       <div
//         className="cta-pulse absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px] opacity-60"
//         aria-hidden="true"
//       />

//       {/* Grid texture */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-[0.025]"
//         aria-hidden="true"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
//           backgroundSize: "4vw 4vw",
//         }}
//       />

//       <div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl w-full">
//         {/* Eyebrow */}
//         <div className="cta-eyebrow flex items-center gap-3">
//           <div className="h-px w-8 bg-accent" />
//           <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
//             Start a Project
//           </span>
//           <div className="h-px w-8 bg-accent" />
//         </div>

//         {/* Headline */}
//         <h2
//           ref={headlineRef}
//           className="font-display text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tighter leading-[0.88] uppercase text-background"
//           style={{ perspective: "800px" }}
//         >
//           Let's move your{" "}
//           <span className="text-accent italic">Operations</span>
//           <br />
//           Forward.
//         </h2>

//         {/* Divider */}
//         <div className="cta-divider w-full max-w-sm h-px bg-background/10" />

//         {/* CTA Button */}
//         <div className="cta-btn-wrap mt-4">
//           <MagneticButton strength={0.4} radius={120}>
//             <Button
//               size="lg"
//               className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.25em] bg-accent hover:bg-white hover:text-accent shadow-2xl transition-all"
//               asChild
//             >
//               <a href="mailto:info@northbrook.com.gh">Get in Touch →</a>
//             </Button>
//           </MagneticButton>
//         </div>

//         {/* Contact line */}
//         <p className="cta-contact font-mono text-[10px] uppercase tracking-[0.3em] text-background/40 text-pretty">
//           info@northbrook.com.gh&nbsp;&nbsp;·&nbsp;&nbsp;+233 (0) 244 270 797
//         </p>
//       </div>
//     </section>
//   );
// }


"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import RequestQuoteLink from "../request-quote-link"

function splitChars(el: HTMLElement) {
  const text = el.textContent || ""
  el.textContent = ""
  const chars: HTMLSpanElement[] = []
  for (const c of text) {
    if (c === " ") { el.appendChild(document.createTextNode(" ")) } else {
      const s = document.createElement("span")
      s.className = "final-ch"
      s.textContent = c
      s.style.display = "inline-block"
      s.style.willChange = "transform,opacity"
      el.appendChild(s); chars.push(s)
    }
  }
  return chars
}

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    containerRef.current?.querySelectorAll<HTMLElement>(".final-row").forEach(r => splitChars(r))

    ScrollTrigger.create({
      trigger: ".final-pin", start: "top top", end: "bottom bottom", pin: ".final-stick",
    })

    const chars = containerRef.current?.querySelectorAll<HTMLElement>(".final-ch")
    if (chars?.length) {
      gsap.from(chars, {
        y: 160, opacity: 0, rotate: () => gsap.utils.random(-35, 35),
        stagger: 0.03, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".final-pin", start: "top top+=15%" },
      })
    }

    gsap.from(".final-sub", {
      y: 30, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: ".final-pin", start: "top top+=30%" },
    })

    // Drifting vessel silhouettes
    containerRef.current?.querySelectorAll<SVGElement>(".final-vessel").forEach((v, i) => {
      gsap.to(v, { x: window.innerWidth + 400, duration: 50 + i * 18, ease: "none", repeat: -1, delay: i * 8 })
    })

    // Breathing radial glow
    gsap.to(".final-glow", {
      scale: 1.35, opacity: 0.22, duration: 3.5, ease: "sine.inOut",
      yoyo: true, repeat: -1,
    })

    // Magnetic CTAs
    containerRef.current?.querySelectorAll<HTMLElement>(".magnetic-wrap").forEach((el) => {
      const btn = el.querySelector<HTMLElement>("a")
      if (!btn) return
      el.addEventListener("mousemove", (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: "power2.out" })
      })
      el.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }))
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} style={{
      background: "var(--color-foreground)", color: "#f4efe6",
      position: "relative", overflow: "hidden",
    }}>
      {/* Vessel silhouettes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05, zIndex: 1 }} aria-hidden>
        {[
          "M 0 65 L 320 65 L 300 78 L 20 78 Z M 60 65 L 60 35 L 280 35 L 280 65 Z M 100 35 L 100 10 L 200 10 L 200 35 Z",
          "M 0 70 L 330 70 L 300 80 L 20 80 Z M 50 70 L 50 40 L 270 40 L 270 70 Z",
        ].map((d, i) => (
          <svg key={i} className="final-vessel" style={{ position: "absolute", left: "-340px", top: `${20 + i * 40}%`, width: "340px", height: "90px" }} viewBox="0 0 340 90">
            <path d={d} fill="#fff" />
          </svg>
        ))}
      </div>

      {/* Crimson glow — animated */}
      <div className="final-glow" aria-hidden style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "70vw", height: "70vw",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(227,30,36,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
        willChange: "transform, opacity",
        opacity: 0.12,
      }} />

      <div className="final-pin" style={{ height: "200vh", position: "relative" }}>
        <div className="final-stick" style={{
          position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "clamp(40px,8vh,80px) clamp(20px,5vw,60px)",
          zIndex: 2, textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(48px,9vw,120px)",
            lineHeight: 0.86, letterSpacing: "-0.04em",
            color: "#fff", margin: 0,
          }}>
            <span className="final-row" style={{ display: "block" }}>Got cargo?</span>
            <span className="final-row" style={{ display: "block" }}>
              <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 400 }}>Talk to the desk.</em>
            </span>
          </h2>

          <div className="final-sub" style={{ marginTop: "clamp(28px,4vh,48px)" }}>
            <p style={{ fontSize: "14px", color: "var(--color-background)", opacity: 0.5, marginBottom: "24px" }}>
              24/7 ops desk · responses in &lt; 2 hours
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <span className="magnetic-wrap inline-block">
                <RequestQuoteLink />
              </span>
              <span className="magnetic-wrap inline-block">
                <Button asChild variant="outline" size="lg" className="h-auto px-[26px] py-[14px] text-sm font-semibold border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white will-change-transform">
                  <Link href="https://wa.me/233244270797">WhatsApp the desk</Link>
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
