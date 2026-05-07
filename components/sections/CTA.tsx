"use client";

import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

// --- Components ---

function CTARoot({ children, className }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Background Pulse
        gsap.to(".cta-pulse", {
          scale: 1.2,
          opacity: 0.1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-secondary/50 px-6 text-center border-y border-border/50",
        className
      )}
    >
      {/* Background Pulse */}
      <div className="cta-pulse absolute left-1/2 top-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" aria-hidden="true" />
      
      {children}
    </section>
  );
}

function CTAContent() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!headlineRef.current) return;

        const split = new SplitText(headlineRef.current, {
          type: "words",
        });

        gsap.from(split.words, {
          y: 40,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 70%",
          },
        });

        gsap.from(".cta-btn-wrap", {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 60%",
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".cta-mobile", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
          },
        });
      });

      return () => mm.revert();
    }
  );

  return (
    <div className="relative z-10 flex flex-col items-center gap-8">
      <Badge variant="outline" className="cta-mobile border-accent/20 px-4 py-1 text-accent">
        Start a Project
      </Badge>
      
      <h2
        ref={headlineRef}
        className="cta-mobile font-display max-w-4xl text-5xl font-bold tracking-tight text-balance lg:text-8xl"
      >
        LET’S MOVE YOUR <br />
        <span className="text-accent uppercase">Operations</span> FORWARD.
      </h2>

      <div className="cta-btn-wrap cta-mobile mt-8">
        <MagneticButton strength={0.5} radius={150}>
          <Button
            size="lg"
            className="cta-button h-20 rounded-none px-16 text-sm font-bold uppercase tracking-[0.2em]"
            asChild
          >
            <a href="mailto:info@northbrook.com.gh">Get in Touch</a>
          </Button>
        </MagneticButton>
      </div>

      <p className="cta-mobile mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground text-pretty">
        info@northbrook.com.gh — +233 (0) 244 270 797
      </p>
    </div>
  );
}

// --- Export ---
export const CTA = Object.assign(CTARoot, {
  Content: CTAContent,
});

export default function CTASection() {
  return (
    <CTA>
      <CTA.Content />
    </CTA>
  );
}
