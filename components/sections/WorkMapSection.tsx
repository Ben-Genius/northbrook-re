"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, MotionPathPlugin, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Anchor, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const WAYPOINTS = [
  {
    id: "01",
    label: "Takoradi Port",
    region: "Oil & Gas Hub",
    details: "Specialized husbandry services for deep-sea survey vessels and FPSO support.",
    coords: { x: 148, y: 342 },
    viewBox: "50 250 200 200",
    offset: { x: 40, y: -80 },
    // label anchor: which side of the pin
    labelAnchor: "right" as const,
  },
  {
    id: "02",
    label: "Port of Tema",
    region: "Ghana Hub",
    details: "18+ Strategic Vessel Calls per month. Primary logistics center for offshore operations.",
    coords: { x: 200, y: 300 },
    viewBox: "100 200 200 200",
    offset: { x: 60, y: -40 },
    labelAnchor: "right" as const,
  },
  {
    id: "03",
    label: "Lomé Operations",
    region: "Togo Connection",
    details: "Integrated project cargo handling and customs clearance for regional drilling rigs.",
    coords: { x: 278, y: 382 },
    viewBox: "180 280 200 200",
    offset: { x: -300, y: -60 },
    labelAnchor: "left" as const,
  },
  {
    id: "04",
    label: "Lagos / Apapa",
    region: "Nigeria Ops",
    details: "Complex crew management and heavy-lift freight solutions for major oil field developers.",
    coords: { x: 368, y: 452 },
    viewBox: "270 350 200 200",
    offset: { x: -300, y: 20 },
    labelAnchor: "left" as const,
  },
  {
    id: "05",
    label: "Port Harcourt",
    region: "Onne Base",
    details: "Strategic warehousing and offshore supply chain maintenance for the sub-region.",
    coords: { x: 420, y: 482 },
    viewBox: "320 380 200 200",
    offset: { x: -320, y: -100 },
    labelAnchor: "left" as const,
  },
];

const ROUTE_PATH =
  "M 148 342 " +
  "C 165 330, 185 302, 200 300 " +
  "C 218 298, 258 365, 278 382 " +
  "C 305 405, 345 440, 368 452 " +
  "C 385 456, 408 472, 420 482";

const SLOT = 2.5;
const INITIAL = 0.5;

export default function WorkMapSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [activePin, setActivePin] = useState<number | null>(null);

  // Animate bottom sheet in/out
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    if (activePin !== null) {
      gsap.fromTo(sheet,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
      );
    } else {
      gsap.to(sheet, { y: "100%", opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [activePin]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Desktop ──────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        gsap.set("#wm-vessel", { opacity: 1 });

        const totalUnits = INITIAL + WAYPOINTS.length * SLOT;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${WAYPOINTS.length * SLOT * 100}%`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        tl.to(mapRef.current, {
          attr: { viewBox: "0 150 600 500" },
          duration: INITIAL,
          ease: "power2.inOut",
        });

        WAYPOINTS.forEach((point, i) => {
          const offset = INITIAL + i * SLOT;

          if (i > 0) {
            tl.to(`.waypoint-info-${i - 1}`, {
              opacity: 0, y: -12, filter: "blur(6px)",
              duration: 0.35, ease: "power2.in",
            }, offset);
          }

          tl.to(mapRef.current, {
            attr: { viewBox: point.viewBox },
            duration: 1.0, ease: "power3.inOut",
          }, offset + 0.1);

          tl.fromTo(`.waypoint-pin-${i}`,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1.1, 0.5)" },
            offset + 0.7
          );

          tl.fromTo(`.waypoint-info-${i}`,
            { opacity: 0, y: 18, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
            offset + 1.1
          );

          tl.addLabel(`waypoint-${i}`, offset + 1.8);
          tl.to({}, { duration: SLOT - 1.8 }, offset + 1.8);
        });

        tl.to("#wm-vessel", {
          motionPath: {
            path: "#wm-route-full",
            align: "#wm-route-full",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          duration: totalUnits,
        }, 0);
      });

      // ── Mobile: route draws in, pins pop ─────────────────────
      mm.add("(max-width: 767px)", () => {
        gsap.from("#wm-route-mobile", {
          strokeDashoffset: 800,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        });

        gsap.fromTo(".wm-mobile-pin",
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            stagger: 0.12, duration: 0.5, ease: "elastic.out(1.1, 0.5)",
            scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
          }
        );

        gsap.from(".wm-pin-label",
          {
            opacity: 0, duration: 0.4,
            stagger: 0.1, delay: 0.6,
            scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const activeWaypoint = activePin !== null ? WAYPOINTS[activePin] : null;

  return (
    <section
      ref={containerRef}
      className="relative bg-background border-t border-foreground/5"
    >

      {/* Desktop */}
      <div className="hidden md:block h-screen overflow-hidden">
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

        <div className="relative h-full w-full">
          <svg ref={mapRef} viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
            <path d="M 80 95 C 110 140,145 180,165 235 C 185 285,175 330,195 375 C 215 415,255 445,300 475 C 340 500,390 520,440 542 C 480 555,520 565,555 578" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
            <path id="wm-route-full" d={ROUTE_PATH} fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 6" className="opacity-20" />
            {WAYPOINTS.map((point, i) => (
              <g key={point.id} className={cn("waypoint-pin-" + i)} style={{ transformOrigin: `${point.coords.x}px ${point.coords.y}px` }}>
                <circle cx={point.coords.x} cy={point.coords.y} r="10" fill="var(--color-accent)" className="opacity-15" />
                <circle cx={point.coords.x} cy={point.coords.y} r="3" fill="var(--color-accent)" />
              </g>
            ))}
            <g id="wm-vessel" className="opacity-0" style={{ transformOrigin: "0px 0px" }}>
              <path d="M-6,-3 L9,0 L-6,3 Z" fill="var(--color-accent)" filter="drop-shadow(0 0 6px hsl(339 100% 29% / 0.7))" />
            </g>
          </svg>

          {WAYPOINTS.map((point, i) => (
            <div
              key={point.id}
              className={cn("waypoint-info-" + i, "absolute pointer-events-none z-30 opacity-0 rounded-md", "bg-background/92 backdrop-blur-md border border-foreground/8 p-6 lg:p-8 max-w-[280px]")}
              style={{ left: `calc(50% + ${point.offset.x}px)`, top: `calc(50% + ${point.offset.y}px)` }}
            >
              <div className="flex flex-col gap-3">
                <div className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.3em]">{point.region}</div>
                <h3 className="font-display text-2xl font-bold tracking-tighter uppercase">{point.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{point.details}</p>
                <div className="pt-2 flex items-center gap-2 border-t border-foreground/5">
                  <Anchor size={10} className="text-accent" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-accent">Active Service Node</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end gap-6">
          <div className="flex gap-2">
            {WAYPOINTS.map((_, i) => (
              <div key={i} className="h-[2px] w-8 bg-foreground/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-accent -translate-x-full transition-transform" />
              </div>
            ))}
          </div>
          <div className="font-mono text-[9px] font-bold text-accent tracking-[0.2em]">GH-NBL-NETWORK-v2.5</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col" style={{ height: "100dvh" }}>

        {/* Header strip */}
        <div className="shrink-0 px-5 pt-10 pb-4 border-b border-foreground/6 bg-background">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground font-bold">
              Operational Hub Matrix
            </span>
          </div>
          <div className="font-mono text-[8px] text-muted-foreground tracking-widest pl-[18px]">
            West African Sub-Region
          </div>
          <div className="pl-[18px] mt-2 flex items-center gap-2">
            <div className="h-px w-4 bg-accent/60" />
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-accent">
              Tap a port to explore
            </span>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            viewBox="90 270 380 250"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Nautical grid */}
            {[290, 330, 370, 410, 450, 490].map(y => (
              <line key={y} x1="80" y1={y} x2="500" y2={y} stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
            ))}
            {[100, 160, 220, 280, 340, 400, 460].map(x => (
              <line key={x} x1={x} y1="260" x2={x} y2="540" stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
            ))}
            {/* Coastline */}
            <path
              d="M 80 95 C 110 140,145 180,165 235 C 185 285,175 330,195 375 C 215 415,255 445,300 475 C 340 500,390 520,440 542 C 480 555,520 565,555 578"
              fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.1"
            />
            {/* Route */}
            <path
              id="wm-route-mobile"
              d={ROUTE_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.8"
              strokeDasharray="6 8"
              strokeDashoffset="800"
              opacity="0.6"
            />
            {/* Pins + labels */}
            {WAYPOINTS.map((point, i) => (
              <g
                key={point.id}
                className="wm-mobile-pin cursor-pointer"
                style={{ transformOrigin: `${point.coords.x}px ${point.coords.y}px` }}
                onClick={() => setActivePin(activePin === i ? null : i)}
              >
                {/* Large tap target */}
                <circle cx={point.coords.x} cy={point.coords.y} r="24" fill="transparent" />
                {/* Active pulse */}
                {activePin === i && (
                  <circle cx={point.coords.x} cy={point.coords.y} r="20" fill="var(--color-accent)" opacity="0.12" />
                )}
                {/* Outer ring */}
                <circle cx={point.coords.x} cy={point.coords.y} r="11"
                  fill="var(--color-accent)" opacity={activePin === i ? 0.3 : 0.12} />
                {/* Inner dot */}
                <circle cx={point.coords.x} cy={point.coords.y} r="4.5"
                  fill="var(--color-accent)" opacity={activePin === i ? 1 : 0.8} />
                {/* Port name */}
                <text
                  className="wm-pin-label"
                  x={point.labelAnchor === "right" ? point.coords.x + 16 : point.coords.x - 16}
                  y={point.coords.y - 8}
                  fill="currentColor"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  textAnchor={point.labelAnchor === "right" ? "start" : "end"}
                  opacity="0.8"
                >
                  {point.label}
                </text>
                {/* Region tag */}
                <text
                  x={point.labelAnchor === "right" ? point.coords.x + 16 : point.coords.x - 16}
                  y={point.coords.y + 3}
                  fill="var(--color-accent)"
                  fontSize="7.5"
                  fontFamily="monospace"
                  fontWeight="600"
                  textAnchor={point.labelAnchor === "right" ? "start" : "end"}
                  opacity="0.7"
                >
                  {point.region}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Bottom sheet */}
        <div
          ref={sheetRef}
          className="absolute bottom-0 left-0 right-0 z-50 bg-background border-t border-foreground/10 shadow-2xl"
          style={{ transform: "translateY(100%)", opacity: 0, maxHeight: "50dvh" }}
        >
          {activeWaypoint && (
            <div className="px-6 pt-5 pb-8 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "50dvh" }}>
              {/* Handle */}
              <div className="w-10 h-1 rounded-full bg-foreground/15 mx-auto shrink-0" />

              {/* Region tag + close */}
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 bg-accent/10 px-3 py-1.5">
                  <div className="h-1 w-1 rounded-full bg-accent" />
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.35em] text-accent">
                    {activeWaypoint.region}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActivePin(null)}
                  aria-label="Close"
                  className="border border-foreground/10 text-muted-foreground"
                >
                  <X size={13} />
                </Button>
              </div>

              {/* Port name */}
              <div className="flex items-start gap-4 shrink-0">
                <span className="font-display text-5xl font-black text-accent/15 leading-none -mt-1">
                  {activeWaypoint.id}
                </span>
                <h3 className="font-display text-2xl font-black tracking-tighter uppercase leading-tight">
                  {activeWaypoint.label}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeWaypoint.details}
              </p>

              <div className="flex items-center gap-2 border-t border-foreground/5 pt-3 shrink-0">
                <Anchor size={10} className="text-accent" />
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-accent">
                  Active Service Node
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
