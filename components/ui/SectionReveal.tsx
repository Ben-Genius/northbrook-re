"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  trigger?: string;
  id?: string;
}

export default function SectionReveal({ children, className, trigger, id }: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      gsap.fromTo(el, 
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "power4.inOut",
          duration: 1.5,
          scrollTrigger: {
            trigger: trigger || el,
            start: "top 90%",
            end: "top 20%",
            scrub: true,
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {children}
    </div>
  );
}
