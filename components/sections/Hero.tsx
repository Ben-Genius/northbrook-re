"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/button";
import ImageSequencePlayer from "@/components/ui/ImageSequencePlayer";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Entrance: Kinetic Typography
        const split = new SplitText(".hero-title", { type: "lines,chars" });
        gsap.from(split.chars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1.2,
          ease: "power4.out",
        });

        // Scroll Sequence: Main Driver
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
            onUpdate: (self) => setScrollProgress(self.progress),
          },
        });

        // Text Morph / Fade as ship moves
        tl.to(contentRef.current, {
          opacity: 0,
          y: -100,
          scale: 0.9,
          filter: "blur(20px)",
          duration: 1,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-background overflow-hidden"
    >
      {/* Cinematic Image Sequence */}
      <ImageSequencePlayer
        frameCount={240}
        baseUrl="/hero/frame_"
        extension=".webp"
        className="absolute inset-0 z-10"
        onFrameUpdate={setCurrentFrame}
        progress={scrollProgress}
      />

      {/* Cinematic Overlays — minimal, image-first */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Top fade — just enough for navbar legibility */}
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-linear-to-b from-black/40 to-transparent" />

        {/* Bottom fade — enough to ground the buttons, no more */}
        <div className="absolute bottom-0 left-0 w-full h-[35vh] bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Edge vignette — darkens corners, leaves center crisp */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Editorial Content */}
      <div
        ref={contentRef}
        className="relative z-30 h-full container mx-auto px-6 lg:px-24 flex flex-col items-center justify-center text-center"
      >
        <div className="inline-flex items-center gap-3 mb-8 border border-white/25 bg-black/30 backdrop-blur-md px-5 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-white font-bold">
            Strategic Industrial Logistics
          </span>
        </div>

        <h1 className="hero-title font-display text-7xl md:text-[11vw] font-black tracking-tighter leading-[0.8] uppercase text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
          Precision <br />
          <span className="text-accent italic">In Motion.</span>
        </h1>

        <div className="mt-12 max-w-3xl mx-auto space-y-10">
          <p className="text-xl md:text-2xl text-white/90 font-semibold leading-snug text-pretty drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            Over a decade of moving entire operations forward where others hesitate.
            Delivering trust at every turn in the West African sub-region.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <MagneticButton strength={0.2} radius={50}>
              <Button size="lg" className="px-12 py-8 text-xs font-black uppercase tracking-widest bg-accent hover:bg-white hover:text-accent shadow-2xl transition-all">
                Request a Quote
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.1} radius={40}>
              <Button variant="outline" size="lg" className="px-12 py-8 text-xs font-black uppercase tracking-widest border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-accent shadow-2xl transition-all">
                See Our Work
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Telemetry Overlays */}
      <div className="absolute bottom-12 left-12 z-40 hidden md:flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/70 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Telemetry: GH-FR-{String(currentFrame).padStart(3, "0")}
          </div>
          <div className="h-[2px] w-32 bg-white/15 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
        <div className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Coordinates: 5.5500° N, 0.2000° E
        </div>
      </div>

      {/* Bottom-right corner triangle badge */}
      <div className="absolute bottom-0 right-0 z-40 w-52 h-52 pointer-events-none">
        {/* Triangle fill */}
        <div
          className="absolute inset-0 bg-accent/90 backdrop-blur-sm"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        {/* Text anchored to the bottom-right corner */}
        <div className="absolute bottom-5 right-4 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[9px] text-white/60 uppercase tracking-[0.25em]">Live</span>
          </div>
          <span className="font-mono text-[11px] text-white font-black uppercase tracking-widest leading-tight text-right">
            Port of Tema
          </span>
          <span className="font-mono text-[9px] text-white/70 uppercase tracking-[0.2em] text-right">
            Ghana · Est. 2011
          </span>
        </div>
      </div>
    </section>
  );
}
