"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const obj = { value: 0 };

  useGSAP(
    () => {
      const el = countRef.current;
      if (!el) return;

      gsap.to(obj, {
        value: end,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (el) el.textContent = Math.floor(obj.value).toString();
        },
      });
    },
    { scope: countRef }
  );

  return (
    <span className={className} aria-live="polite">
      {prefix}
      <span ref={countRef}>0</span>
      {suffix}
    </span>
  );
}
