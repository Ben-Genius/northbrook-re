"use client";

import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      const split = new SplitText(headlineRef.current, { type: "lines,words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Eyebrow line
      tl.from(".cta-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
      });

      // Headline words cascade
      tl.from(
        split.words,
        {
          opacity: 0,
          y: 50,
          rotateX: -40,
          stagger: 0.04,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // Divider line grows
      tl.from(
        ".cta-divider",
        { scaleX: 0, duration: 0.8, ease: "power3.inOut", transformOrigin: "center" },
        "-=0.4"
      );

      // Button + contact pop in
      tl.from(
        [".cta-btn-wrap", ".cta-contact"],
        {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Ambient pulse — runs forever after reveal
      gsap.to(".cta-pulse", {
        scale: 1.3,
        opacity: 0,
        duration: 5,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-foreground text-background px-6 text-center"
    >
      {/* Ambient glow */}
      <div
        className="cta-pulse absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px] opacity-60"
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "4vw 4vw",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl w-full">
        {/* Eyebrow */}
        <div className="cta-eyebrow flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
            Start a Project
          </span>
          <div className="h-px w-8 bg-accent" />
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tighter leading-[0.88] uppercase text-background"
          style={{ perspective: "800px" }}
        >
          Let's move your{" "}
          <span className="text-accent italic">Operations</span>
          <br />
          Forward.
        </h2>

        {/* Divider */}
        <div className="cta-divider w-full max-w-sm h-px bg-background/10" />

        {/* CTA Button */}
        <div className="cta-btn-wrap mt-4">
          <MagneticButton strength={0.4} radius={120}>
            <Button
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.25em] bg-accent hover:bg-white hover:text-accent shadow-2xl transition-all"
              asChild
            >
              <a href="mailto:info@northbrook.com.gh">Get in Touch →</a>
            </Button>
          </MagneticButton>
        </div>

        {/* Contact line */}
        <p className="cta-contact font-mono text-[10px] uppercase tracking-[0.3em] text-background/40 text-pretty">
          info@northbrook.com.gh&nbsp;&nbsp;·&nbsp;&nbsp;+233 (0) 244 270 797
        </p>
      </div>
    </section>
  );
}
