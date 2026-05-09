"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "QHSE", href: "#qhse" },
  { name: "Projects", href: "#projects" },
  { name: "Partners", href: "#partners" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const scrollTriggerConfig = {
        start: "80px top",
        toggleActions: "play none none reverse",
      };

      gsap.to(nav, {
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        scrollTrigger: scrollTriggerConfig,
      });

      // Flip text dark once nav has a white background
      gsap.to(".nav-text-item", {
        color: "hsl(0 0% 10%)",
        scrollTrigger: scrollTriggerConfig,
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-100 w-full transition-all duration-300 py-6 px-6 lg:px-12 flex items-center justify-between"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="relative flex items-center gap-2">
          {/* Northbrook Logo */}
          <div className="relative w-48 h-10 lg:w-56 lg:h-12">
            <Image
              src="/images/logo.png"
              alt="Northbrook Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Live Status Beats */}
        <div className="hidden lg:flex items-center gap-3 pl-8 border-l border-foreground/10">
          <div className="relative h-2 w-2">
            <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
            <div className="relative h-full w-full rounded-full bg-accent" />
          </div>
          <span className="nav-text-item font-mono text-[9px] uppercase tracking-[0.3em] text-white font-black">
            Ops Status: Nominal / GH-TEMA
          </span>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.name}>
                <MagneticButton strength={0.15} radius={30}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "nav-text-item bg-transparent hover:bg-transparent hover:text-accent focus:bg-transparent text-white uppercase text-[11px] tracking-[0.2em] font-black transition-colors"
                      )}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </MagneticButton>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="h-6 w-px bg-foreground/10 mx-4" />

        <MagneticButton strength={0.2} radius={50}>
          <Button variant="default" className="px-10 h-14 font-black uppercase tracking-widest text-[11px] shadow-xl bg-accent hover:bg-foreground">
            Request a Quote
          </Button>
        </MagneticButton>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground">
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-accent/20 flex flex-col justify-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="default" className="mt-8 py-10 text-xl font-black uppercase tracking-widest bg-accent">
              Request a Quote
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
