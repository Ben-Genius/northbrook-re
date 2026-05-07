"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Anchor } from "lucide-react";

const WAYPOINTS = [
  {
    id: "01",
    label: "Takoradi Port",
    region: "Oil & Gas Hub",
    details: "Specialized husbandry services for deep-sea survey vessels and FPSO support.",
    coords: { x: 148, y: 342 },
    viewBox: "50 250 200 200",
    offset: { x: 40, y: -80 } // Position box relative to pin
  },
  {
    id: "02",
    label: "Port of Tema",
    region: "Ghana Hub",
    details: "18+ Strategic Vessel Calls per month. Primary logistics center for offshore operations.",
    coords: { x: 200, y: 300 },
    viewBox: "100 200 200 200",
    offset: { x: 60, y: -40 }
  },
  {
    id: "03",
    label: "Lomé Operations",
    region: "Togo Connection",
    details: "Integrated project cargo handling and customs clearance for regional drilling rigs.",
    coords: { x: 278, y: 382 },
    viewBox: "180 280 200 200",
    offset: { x: -300, y: -60 } // Shift to left if point is on right
  },
  {
    id: "04",
    label: "Lagos / Apapa",
    region: "Nigeria Ops",
    details: "Complex crew management and heavy-lift freight solutions for major oil field developers.",
    coords: { x: 368, y: 452 },
    viewBox: "270 350 200 200",
    offset: { x: -300, y: 20 }
  },
  {
    id: "05",
    label: "Port Harcourt",
    region: "Onne Base",
    details: "Strategic warehousing and offshore supply chain maintenance for the sub-region.",
    coords: { x: 420, y: 482 },
    viewBox: "320 380 200 200",
    offset: { x: -320, y: -100 }
  },
];

export default function WorkMapSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Set initial vessel position at start of path
        gsap.set("#wm-vessel-full", {
          opacity: 1,
          scale: 1,
          xPercent: -50,
          yPercent: -50
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=600%", // Longer scroll for more discovery time
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Zoom into the map
        tl.to(mapRef.current, {
          attr: { viewBox: "0 0 600 600" },
          duration: 0.5
        });

        // 2. Sequential Discovery
        WAYPOINTS.forEach((point, i) => {
          // Zoom to point
          tl.to(mapRef.current, {
            attr: { viewBox: point.viewBox },
            duration: 1.5,
            ease: "power2.inOut"
          });

          // Reveal Point Marker (Pulse)
          tl.fromTo(`.waypoint-pin-${i}`,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" },
            "-=1"
          );

          // Reveal Label (Near point)
          tl.fromTo(`.waypoint-info-${i}`,
            { opacity: 0, y: 20, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );

          // Hold
          tl.to({}, { duration: 1.2 });

          // Fade out if not last
          if (i < WAYPOINTS.length - 1) {
            tl.to(`.waypoint-info-${i}`, { opacity: 0, y: -20, filter: "blur(10px)", duration: 0.4 });
          }
        });

        // 3. Vessel Travel (Locked to scroll progress)
        // We link this to the container's scroll progress separately to ensure it spans the whole section
        gsap.to("#wm-vessel-full", {
          motionPath: {
            path: "#wm-route-full",
            align: "#wm-route-full",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2, // Tighter scrub for better sync
            immediateRender: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-screen bg-background overflow-hidden border-t border-foreground/5">
      {/* Background Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[4vw_4vw]" />
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-12 left-12 z-20 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground">
            Operational Hub Matrix
          </span>
        </div>
        <div className="font-mono text-[8px] text-muted-foreground tracking-widest pl-5">
          West African Sub-Region / Live Telemetry
        </div>
      </div>

      {/* Immersive Map Container */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative w-full h-full max-w-[85vw] flex items-center justify-center p-12">
          <svg
            ref={mapRef}
            viewBox="0 0 600 600"
            className="h-full w-full object-contain"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Coastline */}
            <path
              id="wm-coast-full"
              d="M 80 95 C 110 140,145 180,165 235 C 185 285,175 330,195 375 C 215 415,255 445,300 475 C 340 500,390 520,440 542 C 480 555,520 565,555 578"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground/10"
            />

            {/* Master Route Path (Aligned to waypoints) */}
            <path
              id="wm-route-full"
              d="M 148 342 Q 200 300, 278 382 Q 320 420, 368 452 Q 400 480, 420 482"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="opacity-10"
            />

            {/* Points */}
            {WAYPOINTS.map((point, i) => (
              <g key={point.id} className={cn("waypoint-pin-" + i, "origin-center")}>
                <circle cx={point.coords.x} cy={point.coords.y} r="10" fill="var(--color-accent)" className="opacity-10" />
                <circle cx={point.coords.x} cy={point.coords.y} r="3" fill="var(--color-accent)" />
              </g>
            ))}

            {/* Vessel */}
            <g id="wm-vessel-full" className="opacity-0">
              <path
                d="M-5,-4 L8,0 L-5,4 Z"
                fill="var(--color-accent)"
                className="drop-shadow-[0_0_8px_rgba(227,30,36,0.6)]"
              />
            </g>
          </svg>

          {/* Absolute Overlays (Positioned near the points but relative to the map center) */}
          {WAYPOINTS.map((point, i) => (
            <div
              key={point.id}
              className={cn(
                "waypoint-info-" + i,
                "absolute pointer-events-none z-30 bg-background/90 backdrop-blur-md border border-foreground/5 p-6 lg:p-8 max-w-[280px]"
              )}
              style={{
                // Rough positioning based on SVG coords - will be refined by GSAP
                left: `calc(50% + ${point.offset.x}px)`,
                top: `calc(50% + ${point.offset.y}px)`,
              }}
            >
              <div className="flex flex-col gap-3">
                <div className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.3em]">
                  {point.region}
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tighter uppercase">
                  {point.label}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {point.details}
                </p>

                <div className="pt-2 flex items-center gap-2 border-t border-foreground/5">
                  <Anchor size={10} className="text-accent" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-accent">Active Service Node</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Progress Indicators */}
      <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end gap-6">
        <div className="flex gap-2">
          {WAYPOINTS.map((_, i) => (
            <div key={i} className="h-[2px] w-8 bg-foreground/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-full bg-accent -translate-x-full transition-transform" />
            </div>
          ))}
        </div>
        <div className="font-mono text-[9px] font-bold text-accent tracking-[0.2em]">
          GH-NBL-NETWORK-v2.5
        </div>
      </div>
    </section>
  );
}
