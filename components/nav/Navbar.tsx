"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { buttonVariants } from "../ui/button";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "QHSE", href: "#qhse" },
  { name: "Projects", href: "#projects" },
  { name: "Partners", href: "#partners" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const ctaOverlayRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      // Fade out with scroll, same rhythm as hero content
      gsap.to(nav, {
        opacity: 0,
        pointerEvents: "none",
        scrollTrigger: {
          start: "10% top",
          end: "30% top",
          scrub: true,
        },
      });

    },
    { scope: navRef }
  );

  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const links = linksRef.current?.querySelectorAll<HTMLElement>(".nb-link-wrap");
    const ctaEl = ctaOverlayRef.current;

    // Set initial states via GSAP so React inline styles don't fight the animation
    if (links && links.length) gsap.set(links, { clipPath: "inset(0 0 100% 0)", y: 40 });
    if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 20 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Overlay reveal
    tl.fromTo(
      overlay,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "expo.inOut" }
    );

    // Hamburger → X
    tl.to(line2Ref.current, { scaleX: 0, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.1);
    tl.to(line1Ref.current, { y: 9, rotation: 45, duration: 0.35, ease: "expo.out" }, 0.25);
    tl.to(line3Ref.current, { y: -9, rotation: -45, duration: 0.35, ease: "expo.out" }, 0.25);

    // Links stagger in
    if (links && links.length) {
      tl.to(
        links,
        { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.55, ease: "expo.out", stagger: 0.07 },
        0.45
      );
    }

    // CTA
    if (ctaEl) {
      tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, 0.85);
    }
  }, []);

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current?.querySelectorAll(".nb-link-wrap");
    const ctaEl = ctaOverlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = "";
      },
    });
    tlRef.current = tl;

    if (ctaEl) tl.to(ctaEl, { opacity: 0, y: 10, duration: 0.2 }, 0);
    if (links && links.length) {
      tl.to(links, { clipPath: "inset(0 0 100% 0)", y: -20, duration: 0.3, ease: "expo.in", stagger: 0.04 }, 0);
    }
    tl.to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "expo.inOut" }, 0.15);

    // X → hamburger
    tl.to(line1Ref.current, { y: 0, rotation: 0, duration: 0.3, ease: "expo.out" }, 0);
    tl.to(line3Ref.current, { y: 0, rotation: 0, duration: 0.3, ease: "expo.out" }, 0);
    tl.to(line2Ref.current, { scaleX: 1, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.2);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) closeMenu();
    else openMenu();
  }, [isOpen, openMenu, closeMenu]);

  return (
    <>
      <nav
        ref={navRef}
        style={{ zIndex: 200 }}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-5 sm:px-8 lg:px-14 py-5 lg:py-6 transition-[padding] duration-300"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="relative shrink-0" style={{ zIndex: 201 }}>
          <div className=" relative h-10 w-[160px] sm:w-[190px] lg:w-[210px] duration-300">
            <Image
              src="/images/logo.png"
              alt="North-Brook Ltd."
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Right controls */}
        <div className="relative flex items-center gap-3 sm:gap-4" style={{ zIndex: 201 }}>
          {/* Request Quote pill */}
          <a
            href="#contact"
            className="nb-quote-btn hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/40 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-primary hover:border-accent hover:text-white"
          >
            Request Quote
          </a>

          {/* Hamburger / X */}
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-0 focus-visible:outline-none"
          >
            <span
              ref={line1Ref}
              className="nb-burger-line block h-[2px] w-6 origin-center rounded-full bg-white transition-colors duration-300"
              style={{ marginBottom: "7px" }}
            />
            <span
              ref={line2Ref}
              className="nb-burger-line block h-[2px] w-6 origin-center rounded-full bg-white transition-colors duration-300"
            />
            <span
              ref={line3Ref}
              className="nb-burger-line block h-[2px] w-6 origin-center rounded-full bg-white transition-colors duration-300"
              style={{ marginTop: "7px" }}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 flex flex-col justify-between bg-[#0D0D0D] px-5 sm:px-10 lg:px-20 py-28 sm:py-32"
        style={{ zIndex: 190, clipPath: "inset(0 0 100% 0)", pointerEvents: isOpen ? "auto" : "none" }}
        aria-hidden={!isOpen}
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/logo.png')] bg-center bg-no-repeat bg-size-[600px_auto] pointer-events-none" />

        {/* Red accent bar */}
        <div className="absolute top-0 left-0 h-1 w-full bg-accent" />

        {/* Nav links */}
        <div ref={linksRef} className="flex flex-col gap-1 sm:gap-2 mt-auto">
          {NAV_LINKS.map((link, i) => (
            <div key={link.name} className="nb-link-wrap overflow-hidden">
              <a
                href={link.href}
                onClick={closeMenu}
                className="group flex items-baseline gap-4 sm:gap-6 py-2 sm:py-3"
              >
                <span className="font-mono text-[10px] text-white/30 tracking-widest tabular-nums">
                  0{i + 1}
                </span>
                <span className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-none tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-[#E31E24]">
                  {link.name}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          ref={ctaOverlayRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-white/10"
          style={{ opacity: 0, willChange: "opacity, transform" }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono">Headquarters</span>
            <span className="text-sm font-bold text-white/70">Tema, Greater Accra, Ghana</span>
          </div>

          <Link
            href="#contact"
            onClick={closeMenu}
            className={`${buttonVariants({ variant: "default", size: "lg" })} group inline-flex items-center gap-3 bg-primary hover:bg-white text-white hover:text-primary px-8 py-4! text-[11px] font-black uppercase tracking-[0.25em] transition-colors duration-300`}
          >
            Request a Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
