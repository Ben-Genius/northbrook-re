"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PARTNERS = [
  "Eni", "Saipem", "Fugro", "Borr Drilling", "OSM Thome", 
  "Safeen", "Dolphin Geo", "RINA", "Lloyd’s Register", 
  "DNV-GL", "ABS", "ClassNK", "Korean Register"
];

export default function LogoMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const animation = gsap.to(track, {
        x: "-50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      const onEnter = () => {
        gsap.to(animation, { timeScale: 0.2, duration: 0.8, ease: "power2.out" });
      };

      const onLeave = () => {
        gsap.to(animation, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
      };

      containerRef.current?.addEventListener("mouseenter", onEnter);
      containerRef.current?.addEventListener("mouseleave", onLeave);

      return () => {
        containerRef.current?.removeEventListener("mouseenter", onEnter);
        containerRef.current?.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="border-y border-foreground/5 bg-background py-16 lg:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-foreground/5" />
          <div className="section-eyebrow text-accent uppercase tracking-[0.3em]">
            Strategic Industry Alliances
          </div>
          <div className="h-px flex-1 bg-foreground/5" />
        </div>
      </div>
      
      <div className="whitespace-nowrap flex">
        <div ref={trackRef} className="inline-flex items-center gap-16 lg:gap-32 px-16">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={`${partner}-${i}`}
              className="text-3xl font-bold uppercase tracking-tighter text-foreground/10 transition-all hover:text-accent hover:scale-105 lg:text-6xl cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
