"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "QHSE", href: "#qhse" },
  { name: "Projects", href: "#projects" },
  { name: "Partners", href: "#partners" },
];

export default function Navbar() {
  return (
    <header className="flex items-stretch bg-primary px-6 lg:px-24">
      {/* Left panel — white card, curves visible against red header */}
      <div className="w-full md:w-2/3 lg:w-1/2 bg-background p-4 rounded-b-2xl flex items-center gap-2">
        <a href="/" className="shrink-0 bg-foreground rounded-lg px-3 py-1.5">
          <Image src="/images/logo.png" alt="North-Brook Logo" width={120} height={40} className="object-contain" priority />
        </a>

        <nav className="hidden lg:flex items-center justify-between w-full pl-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="link"
              asChild
              className="cursor-pointer hover:text-primary transition-colors text-[11px] uppercase tracking-widest font-bold text-foreground no-underline"
            >
              <a href={item.href}>{item.name}</a>
            </Button>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden ml-auto">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] p-0 bg-background backdrop-blur-md border-r border-border/50"
          >
            <SheetHeader className="p-6 text-left border-b border-border/50">
              <SheetTitle>
                <a href="/" className="inline-block bg-foreground rounded-lg px-3 py-1.5">
                  <Image src="/images/logo.png" alt="North-Brook Logo" width={120} height={40} className="object-contain" />
                </a>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col p-6 space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className="justify-start px-2 h-12 text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <a href={item.href}>{item.name}</a>
                </Button>
              ))}
            </nav>
            <Separator className="mx-6" />
            <div className="p-6">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg uppercase tracking-widest text-[11px] font-bold" asChild>
                <a href="#contact">
                  Request a Quote
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right — CTA pill floating on red background */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-4">
        <a
          href="#contact"
          className="group flex items-center h-12 rounded-full bg-background shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10"
        >
          <span className="pl-5 pr-3 text-sm font-bold uppercase tracking-widest text-foreground whitespace-nowrap">
            Request a Quote
          </span>
          <div className="w-12 h-12 rounded-full bg-primary border-2 border-background flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300 shadow-md shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </a>
      </div>
    </header>
  );
}
