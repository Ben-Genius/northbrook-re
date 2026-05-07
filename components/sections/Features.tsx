"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    title: "Ship Agency & Husbandry",
    description: "Complete vessel husbandry services, from port clearance and documentation to coordination and onboard provisioning.",
    stat: "Managed calls: Safeen Argus 2, Luna Nelle",
    image: "/images/service-1.png",
    category: "Vessel Operations",
  },
  {
    title: "Air & Sea Freight Solutions",
    description: "Cost-effective, secure transport across borders powered by a global network and deep regional expertise.",
    stat: "West Africa Focus / Ghana Hub",
    image: "/images/hero.png",
    category: "Logistics",
  },
  {
    title: "Bunkering & Fuel Logistics",
    description: "Reliable fuel sourcing and delivery with transparent supply chains, ensuring offshore assets keep moving.",
    stat: "Supporting Borr Drilling Operations",
    image: "/images/project-2.png",
    category: "Energy Support",
  },
  {
    title: "Warehousing & Consolidation",
    description: "Secure, optimized storage with smart supply chain planning to reduce costs and improve efficiency.",
    stat: "Industrial & Bulk Commodities",
    image: "/images/project-4.png",
    category: "Supply Chain",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.from(".feature-card", {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".feature-card-mobile", {
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
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div className="space-y-4">
            <div className="section-eyebrow text-accent">Service Pillars</div>
            <h2 className="font-display text-6xl font-bold tracking-tighter text-balance lg:text-8xl">
              INTEGRATED <br />
              SOLUTIONS.
            </h2>
          </div>
          <div className="max-w-xs pb-4">
            <p className="text-muted-foreground leading-relaxed text-pretty">
              High-performance logistics built on over a decade of West African sub-region expertise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card group relative aspect-[16/10] overflow-hidden bg-secondary border border-foreground/5"
            >
              <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-12">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                    {feature.category}
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center border border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-4xl font-bold tracking-tighter leading-none group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm text-pretty opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {feature.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                      {feature.stat}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
