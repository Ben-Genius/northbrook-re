"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export default function MorphTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            scrub: 1,
          },
        });

        tl.to(".morph-panel-b", {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
        });

        tl.to(".morph-diagonal-line", {
          strokeDashoffset: 0,
          duration: 1,
        }, 0);
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(".morph-panel-b", {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: ".morph-panel-b",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative md:h-screen overflow-hidden bg-background">
      <MorphPanelA />
      <MorphPanelB />

      {/* Industrial Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[4vw_4vw]" />
      </div>
    </section>
  );
}

function MorphPanelA() {
  return (
    <div className="relative md:absolute md:inset-0 flex items-center justify-center bg-card p-12 py-20 lg:p-24">
      <div className="morph-panel-a-content text-center max-w-5xl space-y-12">
        <div className="section-eyebrow text-accent uppercase tracking-[0.4em]">Established 2014</div>
        <h2 className="font-display text-4xl font-bold leading-none tracking-tighter text-balance lg:text-8xl">
          LOCAL INSIGHT <br />
          WITH <span className="text-accent uppercase">Global Expertise.</span>
        </h2>
        <div className="flex justify-center items-center gap-12 pt-8">
          <div className="text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Region</div>
            <div className="text-xl font-bold">West Africa</div>
          </div>
          <div className="h-8 w-px bg-foreground/10" />
          <div className="text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Standard</div>
            <div className="text-xl font-bold">QHSE/ISO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MorphPanelB() {
  const lineRef = useRef<SVGLineElement>(null);

  return (
    <div
      className="morph-panel-b relative md:absolute md:inset-0 flex items-center justify-center bg-foreground text-background p-12 py-20 lg:p-24"
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="morph-diagonal-line"
          x1="0" y1="100" x2="100" y2="0"
          stroke="var(--color-accent)"
          strokeWidth="0.05"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
      </svg>

      <div className="text-center max-w-5xl relative z-10 space-y-12">
        <div className="section-eyebrow text-background/75 uppercase tracking-[0.4em]">The Northbrook Promise</div>
        <h2 className="font-display text-4xl font-bold leading-none tracking-tighter text-balance lg:text-8xl">
          &ldquo;WE DON&apos;T JUST <br /> MOVE CARGO, <br />
          <span className="text-background italic">WE DELIVER TRUST.&rdquo;</span>
        </h2>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.4em] text-background/65">
          Michael Blay / CEO / North-Brook Ltd
        </p>
      </div>
    </div>
  );
}
