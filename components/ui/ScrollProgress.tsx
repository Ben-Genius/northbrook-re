"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: barRef }
  );

  return (
    <div className="fixed top-0 left-0 z-9999 h-0.5 w-full bg-border origin-left" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full bg-accent scale-x-0 origin-left"
      />
    </div>
  );
}
