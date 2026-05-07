"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Disable on mobile/touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = containerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!container || !dot || !ring) return;

    // 1. Force hide default cursor with a high-priority style tag
    const style = document.createElement("style");
    style.id = "hide-default-cursor";
    style.innerHTML = `
      *, *::before, *::after { 
        cursor: none !important; 
      }
      html, body {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // 2. Initialize GSAP quickTo for high performance
    // Note: We target 'x' and 'y' which GSAP maps to translate()
    const xTo = gsap.quickTo(container, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(container, "y", { duration: 0.3, ease: "power3" });

    // 3. Visibility state
    let visible = false;

    const moveCursor = (e: MouseEvent) => {
      if (!visible) {
        gsap.to(container, { opacity: 1, duration: 0.2 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest("a, button, [role='button'], .hover-trigger, input, select");
      const isText = target.closest("h1, h2, h3, .hero-title, .editorial-text");

      if (isHoverable) {
        gsap.to(ring, {
          scale: 1.5,
          backgroundColor: "rgba(227, 30, 36, 0.15)",
          borderColor: "var(--color-accent)",
          borderWidth: 1,
          duration: 0.3
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      } else if (isText) {
        gsap.to(ring, {
          scale: 2.2,
          backgroundColor: "transparent",
          borderColor: "rgba(227, 30, 36, 0.2)",
          borderWidth: 0.5,
          duration: 0.4
        });
        gsap.to(dot, { scale: 1.2, opacity: 1, duration: 0.3 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(227, 30, 36, 0.5)",
          borderWidth: 1,
          duration: 0.3
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    const handleLeave = () => {
      gsap.to(container, { opacity: 0, duration: 0.3 });
      visible = false;
    };

    const handleEnter = () => {
      gsap.to(container, { opacity: 1, duration: 0.3 });
      visible = true;
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      const el = document.getElementById("hide-default-cursor");
      if (el) el.remove();
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="pointer-events-none fixed left-0 top-0 z-999999 opacity-0 will-change-transform"
      style={{ transform: "translate(-100px, -100px)" }} // Start off-screen
    >
      {/* Outer Industrial Ring */}
      <div
        ref={ringRef}
        className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50"
      />

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(227,30,36,0.5)]"
      />

      {/* Industrial Crosshair Detail */}
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="h-px w-5 bg-accent" />
        <div className="w-px h-5 bg-accent translate-x-[-2.5px] translate-y-[-2.5px]" />
      </div>
    </div>,
    document.body
  );
}
