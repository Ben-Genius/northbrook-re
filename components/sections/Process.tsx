"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const STEPS = [
  {
    id: "01",
    title: "In-depth Consultation",
    label: "Phase / Consultation",
    description: "Understanding your unique onshore and offshore requirements through rigorous technical assessment and direct stakeholder engagement.",
  },
  {
    id: "02",
    title: "Strategic Planning",
    label: "Phase / Strategy",
    description: "Developing comprehensive logistical frameworks tailored to West African sub-region complexities and your operational timelines.",
  },
  {
    id: "03",
    title: "Operational Deployment",
    label: "Phase / Execution",
    description: "Executing total logistics solutions with precision: mobilising assets, coordinating vendors, and delivering where others hesitate.",
  },
  {
    id: "04",
    title: "Global Integration",
    label: "Phase / Logistics",
    description: "Leveraging strategic alliances with Eni, Saipem, Fugro and others to deliver seamless air, sea, and freight solutions across borders.",
  },
  {
    id: "05",
    title: "Compliance & Safety",
    label: "Phase / Standards",
    description: "Ensuring zero compromise on QHSE timelines and international industry standards: ABS, DNV-GL, Lloyd's Register certified.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const stepCountRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const prevStep = useRef(0);

  const animateTransition = useCallback((next: number) => {
    const els = [numberRef.current, titleRef.current, labelRef.current, descRef.current];

    // Out
    gsap.to(els, {
      opacity: 0,
      y: -30,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveStep(next);
        // In — runs after React re-renders new content
        gsap.fromTo(
          els,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.06 }
        );
      },
    });

    // Step counter crossfade
    if (stepCountRef.current) {
      gsap.to(stepCountRef.current, { opacity: 0, duration: 0.15, onComplete: () => {
        if (stepCountRef.current) stepCountRef.current.textContent = `Step ${STEPS[next].id} / 0${STEPS.length}`;
        gsap.to(stepCountRef.current, { opacity: 1, duration: 0.2 });
      }});
    }
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            // Progress bar
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }

            // Step index
            const idx = Math.min(Math.floor(self.progress * STEPS.length), STEPS.length - 1);
            if (idx !== prevStep.current) {
              animateTransition(idx);
              prevStep.current = idx;
            }
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".process-mobile-card", {
          clipPath: "inset(100% 0 0 0)",
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut",
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [animateTransition] }
  );

  const step = STEPS[activeStep];

  return (
    <section ref={containerRef} className="relative bg-foreground text-background overflow-hidden">

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col h-screen">

        {/* Top bar */}
        <div className="flex items-center justify-between px-14 pt-12 pb-8 border-b border-background/10">
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-background/50">
              Our Methodology
            </span>
          </div>
          <div ref={stepCountRef} className="font-mono text-[10px] uppercase tracking-[0.4em] text-background/40">
            Step {step.id} / 0{STEPS.length}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left — giant number */}
          <div className="w-[280px] shrink-0 flex items-center justify-center border-r border-background/10 relative">
            <div
              ref={numberRef}
              className="font-display font-black text-[clamp(8rem,14vw,14rem)] leading-none text-accent select-none"
            >
              {step.id}
            </div>
          </div>

          {/* Right — content */}
          <div className="flex-1 flex flex-col justify-center px-16 xl:px-24 gap-8 max-w-3xl">
            <div ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              {step.label}
            </div>

            <h3
              ref={titleRef}
              className="font-display text-[clamp(2.8rem,5.5vw,6rem)] font-black tracking-tighter leading-[0.88] uppercase text-background"
            >
              {step.title}.
            </h3>

            <p ref={descRef} className="text-base xl:text-lg text-background/60 leading-relaxed max-w-lg">
              {step.description}
            </p>

            {/* Step dots */}
            <div className="flex items-center gap-3 pt-4">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeStep ? "2rem" : "0.5rem",
                    backgroundColor: i === activeStep ? "var(--color-accent)" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-full bg-background/10 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 w-full bg-accent origin-left"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden px-6 py-20">
        <div className="mb-14 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-background/50">Our Methodology</span>
          </div>
          <h2 className="font-display text-5xl font-black tracking-tighter uppercase text-background leading-none">
            The Process.
          </h2>
        </div>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="process-mobile-card border border-background/10 p-8 space-y-6"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-6xl font-black text-accent/30 leading-none">{s.id}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-background/40 pt-2">{s.label}</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-black uppercase tracking-tighter text-background leading-tight">
                  {s.title}.
                </h3>
                <p className="text-sm text-background/60 leading-relaxed">{s.description}</p>
              </div>
              <div className="h-px w-full bg-background/10" />
              <div className="font-mono text-[9px] text-background/30 uppercase tracking-widest">
                {i + 1} of {STEPS.length}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
