"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    title: "Geophysical Campaign",
    subtitle: "Strategic Alliances / Fugro & Rina",
    image: "/images/project-1.png",
    description: "Multi-vessel logistical coordination for deep-sea survey operations.",
  },
  {
    title: "Borr Drilling Ops",
    subtitle: "Jack-up Logistics / Offshore",
    image: "/images/project-2.png",
    description: "Integrated support for rig positioning and supply chain maintenance.",
  },
  {
    title: "Safeen Argus 2",
    subtitle: "Vessel Husbandry / Agency",
    image: "/images/project-3.png",
    description: "Complete port agency services for high-capacity bulk carriers.",
  },
  {
    title: "Saipem Operations",
    subtitle: "Industrial Freight / Crew",
    image: "/images/project-4.png",
    description: "Complex personnel rotations and heavy-lift freight solutions.",
  },
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        // Horizontal scroll with pinning
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // "Peel" and Parallax transitions
        const panels = gsap.utils.toArray(".project-panel");
        panels.forEach((panel: any, i: number) => {
          const img = panel.querySelector(".project-img");
          const content = panel.querySelector(".project-content");

          gsap.fromTo(img,
            { scale: 1.2, x: "-10%" },
            {
              scale: 1,
              x: "0%",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById("horizontal-scroll") as any, // Not using ID here, but containerAnimation is key
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );

          // Kinetic text beats
          gsap.from(content, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: panel,
              start: "left 60%",
              toggleActions: "play none none reverse",
            }
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".project-panel-mobile", {
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
    <section ref={containerRef} className="relative bg-foreground text-background overflow-hidden">
      {/* Desktop Horizontal View */}
      <div className="hidden md:block h-screen">
        <div ref={trackRef} className="flex h-full items-center gap-0">
          {/* Intro Panel */}
          <div className="shrink-0 w-[50vw] flex flex-col justify-center px-24 border-r border-background/10">
            <div className="section-eyebrow text-accent mb-8">Selected Case Studies</div>
            <h2 className="font-display text-8xl font-bold tracking-tighter leading-[0.9]">
              IMPACTFUL <br />
              PROJECTS.
            </h2>
            <p className="mt-12 text-xl text-background/60 max-w-sm text-pretty">
              A track record built on precision, reliability, and local insight across
              the West African sub-region.
            </p>
          </div>

          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="project-panel shrink-0 w-[80vw] h-screen flex items-center relative border-r border-background/10"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="project-img relative h-full w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 transition-all duration-700 hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-black/5" />
                </div>
              </div>

              <div className="project-content relative z-10 w-full px-24 grid grid-cols-2 gap-24">
                <div className="flex flex-col justify-center gap-8">
                  <div className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
                    {project.subtitle}
                  </div>
                  <h3 className="font-display text-7xl font-bold tracking-tighter leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>
                  <p className="text-xl text-white/70 max-w-sm text-pretty leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {project.description}
                  </p>
                  <div className="mt-8">
                    <Button variant="ghost" size="sm" className="group gap-4 px-0 font-bold uppercase tracking-widest text-accent hover:bg-transparent hover:text-background">
                      View details
                      <span className="transition-transform group-hover:translate-x-2">→</span>
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:flex items-end justify-end">
                  <div className="text-[15vw] font-bold text-background/5 leading-none select-none" aria-hidden="true">
                    0{i + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="md:hidden space-y-12 py-24 px-6">
        <div className="space-y-4">
          <div className="section-eyebrow text-accent">Notable Projects</div>
          <h2 className="text-5xl font-bold tracking-tighter leading-none uppercase">Project Portfolio.</h2>
        </div>
        <div className="space-y-16">
          {PROJECTS.map((project) => (
            <div key={project.title} className="project-panel-mobile space-y-4">
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-accent">{project.subtitle}</div>
                <h3 className="text-3xl font-bold tracking-tighter text-background">{project.title}</h3>
                <p className="text-background/60 text-sm text-pretty">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
