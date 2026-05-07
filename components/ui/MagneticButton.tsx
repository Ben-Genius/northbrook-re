"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  radius = 120,
  className = "",
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = container.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          gsap.to(container, {
            x: dx * strength,
            y: dy * strength,
            ease: "power3.out",
            duration: 0.4,
          });
          gsap.to(text, {
            x: -(dx * strength * 0.5),
            y: -(dy * strength * 0.5),
            ease: "power3.out",
            duration: 0.4,
          });
        } else {
          reset();
        }
      };

      const reset = () => {
        gsap.to(container, {
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.4)",
          duration: 0.8,
        });
        gsap.to(text, {
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.4)",
          duration: 0.8,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", reset);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", reset);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`inline-block touch-manipulation ${className}`}>
      <div ref={textRef} className="block">
        {children}
      </div>
    </div>
  );
}
