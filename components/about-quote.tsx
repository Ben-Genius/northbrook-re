"use client"

import { useRef, useState } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { SmartImage } from "@/components/ui/smart-image"

const WORDS = ["trust", "resilience", "precision"]

export function AboutQuote() {
  const [wordIndex, setWordIndex] = useState(0)
  const wordRef = useRef<HTMLSpanElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Parallax effect on background */
        gsap.to(bgRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })

        /* Entrance animation for content */
        gsap.from(contentRef.current, {
          autoAlpha: 0,
          y: 60,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=200",
            toggleActions: "play none none none",
          },
        })

        /* Rotating word cycle */
        let i = 0
        const cycle = () => {
          const next = (i + 1) % WORDS.length
          if (!wordRef.current) return

          const tl = gsap.timeline()

          tl.to(wordRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              i = next
              setWordIndex(i)
            },
          })

          tl.fromTo(
            wordRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          )
        }

        const id = setInterval(cycle, 3200)
        return () => clearInterval(id)
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden section-ink"
      style={{ minHeight: "600px" }}
    >
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0 top-[-10%] h-[120%]">
        <SmartImage
          src="/images/hero/about.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
          placeholderTone="primary"
        />
        {/* Deep architectural gradients */}
        <div
          className="absolute inset-0 bg-linear-to-b from-ink via-ink/60 to-ink"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-transparent via-ink/20 to-ink/90"
          aria-hidden
        />
      </div>

      {/* Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48 flex flex-col items-center text-center"
      >
        <div className="w-12 h-px bg-accent mb-12 opacity-60" />

        <blockquote className="max-w-4xl">
          <p
            className="font-display font-light text-white leading-[1.2] mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 4.2rem)", letterSpacing: "-0.02em" }}
          >
            We don&apos;t just move cargo or manage crews; we deliver{" "}
            <span
              ref={wordRef}
              className="inline-block italic text-accent"
              style={{ minWidth: "1.2em" }}
            >
              {WORDS[wordIndex]}
            </span>{" "}
            at every turn.
          </p>

          <footer className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-8 bg-accent/40" />
              <p className="text-white text-base font-light tracking-wide">Mr. Michael Blay</p>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              Chief Executive Officer
            </p>
          </footer>
        </blockquote>
      </div>

      {/* Decorative side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
    </section>
  )
}
