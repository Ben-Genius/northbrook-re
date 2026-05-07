"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  Services: [
    { name: "Ship Agency", href: "#" },
    { name: "Freight Forwarding", href: "#" },
    { name: "Bunkering", href: "#" },
    { name: "Crew Management", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Our Projects", href: "#" },
    { name: "QHSE Policy", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Contact: [
    { name: "info@northbrook.com.gh", href: "mailto:info@northbrook.com.gh", icon: Mail },
    { name: "+233 (0) 30 290 8555", href: "tel:+233302908555", icon: Phone },
    { name: "Tema, Ghana", href: "#", icon: MapPin },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-24 pb-12 overflow-hidden border-t border-background/5">
      <div className="px-6 lg:px-24">
        {/* Top Grid (Exergy3 style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4 space-y-12">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tighter uppercase">
                North<span className="text-accent">Brook</span>
              </span>
            </Link>
            <p className="text-background/60 text-lg leading-relaxed max-w-sm text-pretty">
              Precision in Oil & Gas operations. Moving entire operations forward
              with local insight and global expertise since 2011.
            </p>
            <div className="flex gap-6">
              {[FaLinkedin, FaTwitter, FaFacebook, FaInstagram].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center border border-background/10 hover:border-accent hover:text-accent transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-12 lg:pl-24">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                  {title}
                </div>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-background/60 hover:text-background transition-colors"
                      >
                        <span className="text-sm font-bold uppercase tracking-widest">{link.name}</span>
                        <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-background/10 h-px mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-background/40">
            <span>© {currentYear} North-Brook Limited</span>
            <div className="hidden md:block h-3 w-px bg-background/10" />
            <Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative h-2 w-2">
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
              <div className="relative h-full w-full rounded-full bg-green-500" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40">
              System Live / GH-OPR-01
            </span>
          </div>
        </div>
      </div>

      {/* Industrial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true">
        <div className="container h-full mx-auto grid grid-cols-12">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="h-full border-r border-background" />
          ))}
        </div>
      </div>
    </footer>
  );
}
