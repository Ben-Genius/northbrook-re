"use client";

import React, { useRef } from "react";
import { gsap, MotionPathPlugin, useGSAP } from "@/lib/gsap";
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
    offset: { x: 40, y: -80 },
  },
  {
    id: "02",
    label: "Port of Tema",
    region: "Ghana Hub",
    details: "18+ Strategic Vessel Calls per month. Primary logistics center for offshore operations.",
    coords: { x: 200, y: 300 },
    viewBox: "100 200 200 200",
    offset: { x: 60, y: -40 },
  },
  {
    id: "03",
    label: "Lomé Operations",
    region: "Togo Connection",
    details: "Integrated project cargo handling and customs clearance for regional drilling rigs.",
    coords: { x: 278, y: 382 },
    viewBox: "180 280 200 200",
    offset: { x: -300, y: -60 },
  },
  {
    id: "04",
    label: "Lagos / Apapa",
    region: "Nigeria Ops",
    details: "Complex crew management and heavy-lift freight solutions for major oil field developers.",
    coords: { x: 368, y: 452 },
    viewBox: "270 350 200 200",
    offset: { x: -300, y: 20 },
  },
  {
    id: "05",
    label: "Port Harcourt",
    region: "Onne Base",
    details: "Strategic warehousing and offshore supply chain maintenance for the sub-region.",
    coords: { x: 420, y: 482 },
    viewBox: "320 380 200 200",
    offset: { x: -320, y: -100 },
  },
];

// Cubic bezier path that passes THROUGH every waypoint coordinate exactly.
// Control points are chosen so each segment flows naturally into the next
// without kinking at any port.
const ROUTE_PATH =
  "M 148 342 " +
  "C 165 330, 185 302, 200 300 " +   // → Tema
  "C 218 298, 258 365, 278 382 " +   // → Lomé
  "C 305 405, 345 440, 368 452 " +   // → Lagos
  "C 385 456, 408 472, 420 482";     // → Port Harcourt

// Per-waypoint slot in the timeline (units).
// Structure per slot:  0–1 zoom+pin  |  1–1.8 card in  |  1.8–4 hold (user reads)
const SLOT = 4;
const INITIAL = 0.5; // initial map zoom-out

export default function WorkMapSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set("#wm-vessel", { opacity: 1 });

        const totalUnits = INITIAL + WAYPOINTS.length * SLOT;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${WAYPOINTS.length * SLOT * 100}%`,
            pin: true,
            scrub: 2,
            invalidateOnRefresh: true,
            snap: {
              snapTo: "labelsDirectional",
              duration: { min: 0.25, max: 0.6 },
              delay: 0.05,
              ease: "power3.inOut",
            },
          },
        });

        // Initial pull-back to show the full route
        tl.to(mapRef.current, {
          attr: { viewBox: "0 150 600 500" },
          duration: INITIAL,
          ease: "power2.inOut",
        });

        WAYPOINTS.forEach((point, i) => {
          const offset = INITIAL + i * SLOT;

          // Fade previous card out before zoom starts
          if (i > 0) {
            tl.to(`.waypoint-info-${i - 1}`, {
              opacity: 0,
              y: -12,
              filter: "blur(6px)",
              duration: 0.35,
              ease: "power2.in",
            }, offset);
          }

          // Smooth zoom to this port
          tl.to(mapRef.current, {
            attr: { viewBox: point.viewBox },
            duration: 1.0,
            ease: "power3.inOut",
          }, offset + 0.1);

          // Pin pops in
          tl.fromTo(
            `.waypoint-pin-${i}`,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1.1, 0.5)" },
            offset + 0.7
          );

          // Info card slides in
          tl.fromTo(
            `.waypoint-info-${i}`,
            { opacity: 0, y: 18, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
            offset + 1.1
          );

          // Label here — ScrollTrigger snaps to this moment
          tl.addLabel(`waypoint-${i}`, offset + 1.8);

          // Silent hold so the user can read
          tl.to({}, { duration: SLOT - 1.8 }, offset + 1.8);
        });

        // Vessel follows the route for the full timeline duration
        tl.to(
          "#wm-vessel",
          {
            motionPath: {
              path: "#wm-route-full",
              align: "#wm-route-full",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            ease: "none",
            duration: totalUnits,
          },
          0
        );
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: simple stagger reveal
        gsap.from(".waypoint-info-mobile", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-background overflow-hidden border-t border-foreground/5"
    >
      {/* Header */}
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

      {/* Map */}
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
              d="M 80 95 C 110 140,145 180,165 235 C 185 285,175 330,195 375 C 215 415,255 445,300 475 C 340 500,390 520,440 542 C 480 555,520 565,555 578"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground/10"
            />

            {/* Route — cubic bezier through all 5 ports exactly */}
            <path
              id="wm-route-full"
              d={ROUTE_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="opacity-20"
            />

            {/* Waypoint pins */}
            {WAYPOINTS.map((point, i) => (
              <g
                key={point.id}
                className={cn("waypoint-pin-" + i)}
                style={{ transformOrigin: `${point.coords.x}px ${point.coords.y}px` }}
              >
                <circle
                  cx={point.coords.x}
                  cy={point.coords.y}
                  r="10"
                  fill="var(--color-accent)"
                  className="opacity-15"
                />
                <circle
                  cx={point.coords.x}
                  cy={point.coords.y}
                  r="3"
                  fill="var(--color-accent)"
                />
              </g>
            ))}

            {/* Vessel — starts at Takoradi, GSAP moves it along the route */}
            <g
              id="wm-vessel"
              className="opacity-0"
              style={{ transformOrigin: "0px 0px" }}
            >
              <path
                d="M-6,-3 L9,0 L-6,3 Z"
                fill="var(--color-accent)"
                filter="drop-shadow(0 0 6px hsl(339 100% 29% / 0.7))"
              />
            </g>
          </svg>

          {/* Info cards */}
          {WAYPOINTS.map((point, i) => (
            <div
              key={point.id}
              className={cn(
                "waypoint-info-" + i,
                "absolute pointer-events-none z-30 opacity-0",
                "bg-background/92 backdrop-blur-md border border-foreground/8 p-6 lg:p-8 max-w-[280px]"
              )}
              style={{
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
                  <span className="text-[8px] font-bold uppercase tracking-widest text-accent">
                    Active Service Node
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
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
