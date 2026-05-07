"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";
import Image from "next/image";

const STATS = [
  { value: 11, label: "Years Experience", suffix: "+", image: "/images/project-1.png" },
  { value: 8, label: "Service Lines", suffix: "+", image: "/images/project-2.png" },
  { value: 6, label: "Global Certs", suffix: "+", image: "/images/project-3.png" },
  { value: 100, label: "QHSE Compliance", suffix: "%", image: "/images/project-4.png" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray(".stat-panel");

        panels.forEach((panel: any, i: number) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          });

          tl.from(panel.querySelector(".stat-bg"), {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
          })
            .from(panel.querySelector(".stat-content"), {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            }, "-=0.6");
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".stat-panel-mobile", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
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
    <section ref={containerRef} className="bg-background py-24 lg:py-40">
      <div className="px-6 lg:px-24">
        <div className="mb-24 space-y-4">
          <div className="section-eyebrow text-accent">Proven Track Record</div>
          <h2 className="font-display text-5xl font-bold tracking-tighter text-balance lg:text-7xl">
            DELIVERING TRUST <br />
            AT EVERY TURN.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-1">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-panel relative group aspect-4/5 overflow-hidden bg-secondary">
              <div className="stat-bg absolute inset-0 z-0 overflow-hidden" style={{ clipPath: "inset(0% 0 0 0)" }}>
                <Image
                  src={stat.image}
                  alt={stat.label}
                  fill
                  className="object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-40 group-hover:grayscale-0"
                />
              </div>

              <div className="stat-content relative z-10 flex h-full flex-col justify-end p-8">
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                  0{i + 1} / Performance
                </div>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-6xl font-bold tracking-tighter lg:text-8xl"
                />
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </div>

              {/* Industrial Border Beats (Exergy3 style) */}
              <div className="absolute right-0 top-0 h-full w-px bg-foreground/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
