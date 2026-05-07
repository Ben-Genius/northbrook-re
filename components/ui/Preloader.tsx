"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide preloader
          gsap.to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
              if (containerRef.current) containerRef.current.style.display = "none";
            }
          });
        }
      });

      // Counter animation
      const countObj = { value: 0 };
      tl.to(countObj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setPercentage(Math.floor(countObj.value));
        }
      });

      // Progress bar
      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 2.5,
        ease: "power2.inOut",
      }, 0);

      // Final reveal staggers
      tl.to(".preloader-text", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.in"
      }, "+=0.2");

    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground text-background"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="preloader-text overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">
            North-Brook Operations
          </div>
        </div>
        
        <div ref={counterRef} className="preloader-text font-display text-8xl font-bold tracking-tighter lg:text-[12vw]">
          {percentage.toString().padStart(3, "0")}
        </div>

        <div className="preloader-text overflow-hidden">
          <div className="text-[10px] font-mono uppercase tracking-widest">
            System Initialization / West Africa
          </div>
        </div>

        <div className="mt-12 h-[1px] w-64 overflow-hidden bg-background/10 lg:w-96">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-accent"
          />
        </div>
      </div>

      <div className="absolute bottom-12 left-12 font-mono text-[9px] uppercase tracking-widest opacity-40">
        Status: High Priority / Integrated Logistics
      </div>
    </div>
  );
}
