"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap";
import { Badge } from "../ui/badge";
import MagneticButton from "@/components/ui/MagneticButton";
import { Button, buttonVariants } from "@/components/ui/button";
import ImageSequencePlayer from "@/components/ui/ImageSequencePlayer";
import Link from "next/link";
import RequestQuoteLink from "../request-quote-link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Entrance: runs after preloader via event, uses direct refs (not scoped selectors)
  useEffect(() => {
    const badge = badgeRef.current;
    const title = titleRef.current;
    const sub = subRef.current;
    const btns = btnsRef.current;
    if (!badge || !title || !sub || !btns) return;

    const split = new SplitText(title, { type: "lines,chars" });

    // Hide everything immediately
    gsap.set(badge, { opacity: 0, y: 16 });
    gsap.set(split.chars, { opacity: 0, y: 80, rotateX: -90 });
    gsap.set([sub, btns], { opacity: 0, y: 20 });

    const runEntrance = () => {
      const tl = gsap.timeline();
      tl.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      tl.to(split.chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.018, duration: 1, ease: "power4.out" }, "-=0.2");
      tl.to([sub, btns], { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }, "-=0.4");
    };

    if ((window as any).__preloaderDone) {
      runEntrance();
    } else {
      window.addEventListener("preloader:complete", runEntrance, { once: true });
    }

    return () => window.removeEventListener("preloader:complete", runEntrance);
  }, []);

  // Scroll sequences
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: pinned scroll sequence
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      }).to(contentRef.current, {
        opacity: 0, y: -100, scale: 0.9, duration: 1,
      });
    });

    // Desktop reduced-motion: no pin, simple fade
    mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      }).to(contentRef.current, { opacity: 0, duration: 1 });
    });

    // Mobile: no pin, lighter fade
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      }).to(contentRef.current, {
        opacity: 0, y: -60, scale: 0.95, duration: 1,
      });
    });
  },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-dvh w-full bg-background overflow-hidden"
    >
      {/* Cinematic Image Sequence */}
      <ImageSequencePlayer
        frameCount={220}
        baseUrl="/hero/frame_"
        extension=".webp"
        className="absolute inset-0 z-10 h-screen"
        onFrameUpdate={setCurrentFrame}
        progress={scrollProgress}
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Top fade */}
        <div className="absolute top-0 left-0 w-full h-[22vh] bg-linear-to-b from-black/50 to-transparent" />

        {/* Left column scrim */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] bg-linear-to-r from-black/70 via-black/40 sm:via-black/25 to-transparent" />

        {/* Bottom-left anchor fade */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-linear-to-t from-black/50 via-black/15 to-transparent" />
      </div>

      {/* Editorial Content */}
      <div
        ref={contentRef}
        className="relative z-30 h-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-28 sm:py-32"
      >
        <div ref={badgeRef} className="self-start">
          <Badge className="gap-2 border-white/25 bg-black/25 backdrop-blur-sm text-white/90 p-3 rounded-md font-mono text-[9px] uppercase tracking-[0.4em] font-bold">
            Strategic Industrial Logistics
          </Badge>
        </div>

        {/* Headline + body */}
        <div className="w-full max-w-[90vw] sm:max-w-[60vw] lg:max-w-[520px] flex flex-col gap-4 sm:gap-6">
          <h1 ref={titleRef} className="font-display text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.82] uppercase text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            Precision
            <br />
            <span className="text-accent italic">In Motion.</span>
          </h1>

          <p ref={subRef} className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-xs drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Over a decade moving entire operations forward where others hesitate across the West African sub-region.
          </p>

          <div ref={btnsRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2">
            <MagneticButton strength={0.2} radius={50}>
              <RequestQuoteLink />
            </MagneticButton>
            <MagneticButton strength={0.1} radius={40}>
              <Link href="/projects" className={`${buttonVariants({ variant: "outline", size: "lg" })} px-8 py-6 text-[11px] font-black uppercase tracking-widest border-white/25 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-accent shadow-xl transition-all`}>
                See Our Work
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>


      {/* Bottom-right corner triangle badge */}
      <div className="absolute bottom-0 right-0 z-40 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none">
        <div
          className="absolute inset-0 bg-accent/90 backdrop-blur-sm"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[7px] text-white/60 uppercase tracking-[0.25em]">Live</span>
          </div>
          <span className="font-mono text-[9px] text-white font-black uppercase tracking-widest leading-tight text-right">
            Port of Tema
          </span>
          <span className="font-mono text-[7px] text-white/70 uppercase tracking-[0.2em] text-right">
            Ghana · Est. 2014
          </span>
        </div>
      </div>
    </section>
  );
}