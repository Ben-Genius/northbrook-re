"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    slug: "geophysical-fugro-rina",
    title: "Geophysical Campaign",
    subtitle: "Strategic Alliances / Fugro & Rina",
    image: "/images/projects/geophysical-fugro-rina.jpg",
    description: "Multi-vessel logistical coordination for deep-sea survey operations.",
  },
  {
    slug: "borr-drilling",
    title: "Borr Drilling Ops",
    subtitle: "Heavy-Lift / Offshore Support",
    image: "/images/projects/borr-drilling-heavy-lift.jpg",
    description: "Specialized logistical coordination for high-value drilling equipment and offshore assets.",
  },
  {
    slug: "safeen-argus-2",
    title: "Safeen Argus 2",
    subtitle: "Vessel Husbandry / Agency",
    image: "/images/projects/safeen-argus.png",
    description: "Complete port agency services for high-capacity bulk carriers.",
  },
  {
    slug: "saipem-dvd-santorini",
    title: "Saipem Operations",
    subtitle: "Industrial Freight / Crew",
    image: "/images/showcase/saipem.jpg",
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

        const panels = gsap.utils.toArray(".project-panel");
        panels.forEach((panel: any) => {
          const img = panel.querySelector(".project-img");
          const content = panel.querySelector(".project-content");

          gsap.fromTo(
            img,
            { scale: 1.2, x: "-10%" },
            {
              scale: 1,
              x: "0%",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById("horizontal-scroll") as any,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );

          gsap.from(content, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: panel,
              start: "left 60%",
              toggleActions: "play none none reverse",
            },
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
            <div className="section-eyebrow text-background/75 mb-8">Selected Case Studies</div>
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
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-panel group shrink-0 w-[80vw] h-screen flex items-center relative border-r border-background/10"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="project-img relative h-full w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="80vw"
                    loading="lazy"
                    className="object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-black/5" />
                </div>
              </div>

              <div className="project-content relative z-10 w-full px-24 grid grid-cols-2 gap-24">
                <div className="flex flex-col justify-center gap-8">
                  <div className="font-mono text-xs uppercase tracking-[0.4em] text-background/75">
                    {project.subtitle}
                  </div>
                  <h3 className="font-display text-7xl font-bold tracking-tighter leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>
                  <p className="text-xl text-white/70 max-w-sm text-pretty leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {project.description}
                  </p>
                  <div className="mt-8">
                    <span className="inline-flex items-center gap-3 font-bold uppercase tracking-widest text-sm text-background/80 transition-all duration-300 group-hover:gap-5">
                      View case study
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex items-end justify-end">
                  <div className="text-[15vw] font-bold text-background/5 leading-none select-none" aria-hidden="true">
                    0{i + 1}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* View All Projects End Panel */}
          <div className="shrink-0 w-[50vw] h-screen flex flex-col items-center justify-center px-24 gap-12">
            <div className="text-center space-y-6">
              <div className="section-eyebrow text-background/75">Full Portfolio</div>
              <p className="text-4xl font-display font-bold tracking-tighter leading-tight text-background/80 max-w-xs">
                More operations on record.
              </p>
            </div>
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="group gap-4 border-background/20 text-background bg-transparent hover:bg-background hover:text-foreground font-bold uppercase tracking-widest px-10 py-6 text-sm transition-all duration-300"
              >
                View all projects
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="md:hidden space-y-12 py-24 px-6">
        <div className="space-y-4">
          <div className="section-eyebrow text-background/75">Notable Projects</div>
          <h2 className="text-5xl font-bold tracking-tighter leading-none uppercase">Project Portfolio.</h2>
        </div>
        <div className="space-y-16">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-panel-mobile group block space-y-4"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-background/75">{project.subtitle}</div>
                <h3 className="text-3xl font-bold tracking-tighter text-background group-hover:text-accent transition-colors duration-200">{project.title}</h3>
                <p className="text-background/60 text-sm text-pretty">{project.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-background/75 pt-1 transition-all duration-200 group-hover:gap-3">
                  View case study <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="pt-8 border-t border-background/10">
          <Link href="/projects">
            <Button
              variant="outline"
              size="lg"
              className="w-full group gap-3 border-background/20 text-background bg-transparent hover:bg-background hover:text-foreground font-bold uppercase tracking-widest transition-all duration-300"
            >
              View all projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
