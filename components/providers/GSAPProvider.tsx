"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/gsap";

const GSAPContext = createContext<{ smoother: ScrollSmoother | null }>({
  smoother: null,
});

export const useGSAPContext = () => useContext(GSAPContext);

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReduced) {
        smoother.current = ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 1.8,
          effects: true,
          normalizeScroll: true,
        });

        // Refresh ScrollTrigger after smoother init
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      return () => {
        smoother.current?.kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <GSAPContext.Provider value={{ smoother: smoother.current }}>
      <div id="smooth-wrapper" ref={wrapperRef} className="overflow-hidden">
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </GSAPContext.Provider>
  );
}
