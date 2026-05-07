"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { UserCheck, Zap, Activity, Globe, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "01",
    title: "In-depth Consultation",
    label: "Phase / Consultation",
    description: "Understanding your unique onshore and offshore requirements through technical assessment.",
    icon: UserCheck,
  },
  {
    id: "02",
    title: "Strategic Planning",
    label: "Phase / Strategy",
    description: "Developing comprehensive logistical frameworks tailored to West African sub-region complexities.",
    icon: Zap,
  },
  {
    id: "03",
    title: "Operational Deployment",
    label: "Phase / Execution",
    description: "Executing total logistics solutions with precision where others hesitate.",
    icon: Activity,
  },
  {
    id: "04",
    title: "Global Integration",
    label: "Phase / Logistics",
    description: "Leveraging strategic alliances to deliver seamless air, sea, and freight solutions.",
    icon: Globe,
  },
  {
    id: "05",
    title: "Compliance & Safety",
    label: "Phase / Standards",
    description: "Ensuring zero compromise on QHSE timelines and international industry standards.",
    icon: ShieldCheck,
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const steps = gsap.utils.toArray(".process-step-item");
        
        // Pinned sequence
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + (steps.length * 100) + "%",
            pin: true,
            scrub: 1,
            // onUpdate for "beats"
            onUpdate: (self) => {
              // We could trigger subtle visual flashes here
            }
          }
        });

        steps.forEach((step: any, i: number) => {
          if (i > 0) {
            tl.from(step, {
              x: "100%",
              ease: "power2.inOut",
            }, i);
          }

          // Content staggers per step
          tl.from(step.querySelectorAll(".process-animate"), {
            opacity: 0,
            x: 50,
            stagger: 0.1,
            duration: 0.5,
          }, i + 0.5);
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".process-step-mobile", {
          y: 40,
          opacity: 0,
          stagger: 0.2,
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
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-background">
      {/* Desktop View: Modular Stack (Exergy3 style) */}
      <div className="hidden md:block h-full w-full">
        <div ref={trackRef} className="h-full w-full relative">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="process-step-item absolute inset-0 flex items-center justify-center bg-background"
              style={{ zIndex: i + 1 }}
            >
              <div className="grid grid-cols-12 w-full h-full border-l border-foreground/5">
                {/* Visual Side */}
                <div className="col-span-5 relative overflow-hidden bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon className="process-animate h-64 w-64 text-accent/10" strokeWidth={0.5} />
                  </div>
                  <div className="absolute bottom-12 left-12 font-mono text-[8vw] font-bold text-foreground/5 leading-none">
                    {step.id}
                  </div>
                </div>

                {/* Content Side */}
                <div className="col-span-7 flex flex-col justify-center px-24 space-y-12">
                  <div className="process-animate space-y-4">
                    <div className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
                      {step.label}
                    </div>
                    <h3 className="font-display text-7xl font-bold tracking-tighter leading-none">
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className="process-animate max-w-lg">
                    <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                      {step.description}
                    </p>
                  </div>

                  <div className="process-animate flex items-center gap-6 pt-8">
                    <div className="h-px w-24 bg-accent" />
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      Step 0{i + 1} / 0{STEPS.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Industrial Grid Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
                <div className="container h-full mx-auto grid grid-cols-12">
                  {Array.from({ length: 13 }).map((_, j) => (
                    <div key={j} className="h-full border-r border-foreground" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-24 py-24 px-6 overflow-y-auto h-full">
        <div className="space-y-4">
          <div className="section-eyebrow text-accent">Our Methodology</div>
          <h2 className="text-5xl font-bold tracking-tighter leading-none uppercase">The Process.</h2>
        </div>
        {STEPS.map((step) => (
          <div key={step.id} className="process-step-mobile space-y-8">
            <div className="text-6xl font-bold text-accent/20 font-mono">{step.id}</div>
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-accent">{step.label}</div>
              <h3 className="text-3xl font-bold tracking-tighter">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
