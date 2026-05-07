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

      {/* Atmospheric Contrast Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Top Vignette (for Navbar visibility) */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-linear-to-b from-background/80 to-transparent" />

        {/* Bottom Vignette (for watermark hiding and button visibility) */}
        <div className="absolute bottom-0 left-0 w-full h-[45vh] bg-linear-to-t from-background/90 via-background/40 to-transparent" />

        {/* Center Contrast shelf */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[40vh] bg-[radial-gradient(circle,rgba(0,0,0,0.4)_0%,transparent_70%)] opacity-80" />
        </div>

        {/* Industrial Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-size-[5vw_5vw] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />
      </div>

      {/* Editorial Content */}
      <div
        ref={contentRef}
        className="relative z-30 h-full container mx-auto px-6 lg:px-24 flex flex-col items-center justify-center text-center"
      >
        <div className="section-eyebrow text-accent font-black mb-8 uppercase tracking-[0.5em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Strategic Industrial Logistics
        </div>

        <h1 className="hero-title font-display text-7xl md:text-[11vw] font-black tracking-tighter leading-[0.8] uppercase text-foreground drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          Precision <br />
          <span className="text-accent italic">In Motion.</span>
        </h1>

        <div className="mt-12 max-w-3xl mx-auto space-y-10 relative">
          <div className="absolute inset-x-0 -inset-y-4 bg-background/5 backdrop-blur-[2px] rounded-full scale-110 -z-10 opacity-60" />

          <p className="text-xl md:text-3xl text-white font-bold leading-tight text-pretty drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            Over a decade of moving entire operations forward where others hesitate.
            Delivering trust at every turn in the West African sub-region.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <MagneticButton strength={0.2} radius={50}>
              <Button size="lg" className="rounded-none px-12 py-8 text-xs font-black uppercase tracking-widest bg-accent hover:bg-white hover:text-accent shadow-2xl transition-all">
                Request a Quote
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.1} radius={40}>
              <Button variant="outline" size="lg" className="rounded-none px-12 py-8 text-xs font-black uppercase tracking-widest border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-accent shadow-2xl transition-all">
                See Our Work
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Telemetry Overlays */}
      <div className="absolute bottom-12 left-12 z-40 hidden md:flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-foreground/80 font-bold">
            Telemetry: GH-FR-{String(currentFrame).padStart(3, "0")}
          </div>
          <div className="h-[2px] w-32 bg-foreground/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
        <div className="font-mono text-[9px] text-foreground/60 uppercase tracking-[0.2em] font-medium">
          Coordinates: 5.5500° N, 0.2000° E
        </div>
      </div>

      {/* Bottom Right: Industrial Status (Covers "Veo" watermark) */}
      <div className="absolute bottom-2 right-0 z-40 bg-background/90 backdrop-blur-xl px-8 py-6 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <div className="h-3 w-3 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
            <span className="font-mono text-[11px] font-black text-white uppercase tracking-widest">System Nominal</span>
          </div>
          <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.3em]">Operational Readiness 2025</span>
          <div className="h-px w-16 bg-accent mt-3" />
        </div>
      </div>
    </section>
  );
}
