// "use client";

// import React from "react";
// import Link from "next/link";
// import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
// import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
// import { Separator } from "@/components/ui/separator";

// const FOOTER_LINKS = {
//   Services: [
//     { name: "Ship Agency", href: "#" },
//     { name: "Freight Forwarding", href: "#" },
//     { name: "Bunkering", href: "#" },
//     { name: "Crew Management", href: "#" },
//   ],
//   Company: [
//     { name: "About Us", href: "#" },
//     { name: "Our Projects", href: "#" },
//     { name: "QHSE Policy", href: "#" },
//     { name: "Contact", href: "#" },
//   ],
//   Contact: [
//     { name: "info@northbrook.com.gh", href: "mailto:info@northbrook.com.gh", icon: Mail },
//     { name: "+233 (0) 30 290 8555", href: "tel:+233302908555", icon: Phone },
//     { name: "Tema, Ghana", href: "#", icon: MapPin },
//   ],
// };

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-foreground text-background pt-24 pb-12 overflow-hidden border-t border-background/5">
//       <div className="px-6 lg:px-24">
//         {/* Top Grid (Exergy3 style) */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
//           <div className="md:col-span-4 space-y-12">
//             <Link href="/" className="inline-block">
//               <span className="text-3xl font-bold tracking-tighter uppercase">
//                 North<span className="text-accent">Brook</span>
//               </span>
//             </Link>
//             <p className="text-background/60 text-lg leading-relaxed max-w-sm text-pretty">
//               Precision in Oil & Gas operations. Moving entire operations forward
//               with local insight and global expertise since 2011.
//             </p>
//             <div className="flex gap-6">
//               {[FaLinkedin, FaTwitter, FaFacebook, FaInstagram].map((Icon, i) => (
//                 <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center border border-background/10 hover:border-accent hover:text-accent transition-all">
//                   <Icon size={18} />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-12 lg:pl-24">
//             {Object.entries(FOOTER_LINKS).map(([title, links]) => (
//               <div key={title} className="space-y-8">
//                 <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
//                   {title}
//                 </div>
//                 <ul className="space-y-4">
//                   {links.map((link) => (
//                     <li key={link.name}>
//                       <Link
//                         href={link.href}
//                         className="group flex items-center gap-2 text-background/60 hover:text-background transition-colors"
//                       >
//                         <span className="text-sm font-bold uppercase tracking-widest">{link.name}</span>
//                         <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <Separator className="bg-background/10 h-px mb-12" />

//         {/* Bottom Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//           <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-background/40">
//             <span>© {currentYear} North-Brook Limited</span>
//             <div className="hidden md:block h-3 w-px bg-background/10" />
//             <Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link>
//             <Link href="#" className="hover:text-background transition-colors">Terms of Service</Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative h-2 w-2">
//               <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
//               <div className="relative h-full w-full rounded-full bg-green-500" />
//             </div>
//             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40">
//               System Live / GH-OPR-01
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Industrial Grid Lines */}
//       <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true">
//         <div className="container h-full mx-auto grid grid-cols-12">
//           {Array.from({ length: 13 }).map((_, i) => (
//             <div key={i} className="h-full border-r border-background" />
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }


import Link from "next/link"
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa"

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our People", href: "/about#board" },
  { label: "Our Projects", href: "/projects" },
  { label: "Partners & Clients", href: "/partners" },
  { label: "QHSE Policy", href: "/qhse" },
]

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
]

const social = [
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/company/northbrook-limited" },
  { Icon: FaFacebook, label: "Facebook", href: "https://facebook.com/northbrooklimited" },
  { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com/northbrooklimited" },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-background/5 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="North-Brook Limited"
              style={{ height: "40px", width: "auto", opacity: 0.9, marginBottom: "16px" }}
            />
            <p className="text-background/60 text-sm leading-relaxed max-w-sm text-pretty mt-4">
              West Africa&apos;s premier onshore and offshore logistics partner, ship agency,
              bunkering, freight, and warehousing since 2014.
            </p>
            <address className="text-background/60 text-sm leading-relaxed max-w-sm text-pretty not-italic mt-3">
              <p>No 12 Joseph Richard Asiedu St, Accra</p>
              <p>
                <Link href="tel:+233244270797" className="hover:text-accent transition-colors duration-200">
                  +233 (0) 244 270 797
                </Link>
              </p>
              <p>
                <Link href="mailto:info@northbrook.com.gh" className="hover:text-accent transition-colors duration-200">
                  info@northbrook.com.gh
                </Link>
              </p>
            </address>
          </div>

          {/* Col 2: Company */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">Company</p>
            <ul className="space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/60 hover:text-accent transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">Support</p>
            <div className="space-y-3 text-sm text-background/60">
              <p>
                <Link href="mailto:info@northbrook.com.gh" className="hover:text-accent transition-colors duration-200">
                  info@northbrook.com.gh
                </Link>
              </p>
              <p>
                <Link href="tel:+233244270797" className="hover:text-accent transition-colors duration-200">
                  +233 (0) 244 270 797
                </Link>
              </p>
              <p>
                <Link href="https://wa.me/233244270797" className="hover:text-accent transition-colors duration-200">
                  WhatsApp the ops desk
                </Link>
              </p>
              <p className="text-background/40 text-xs mt-4 pt-4 border-t border-background/8">
                Ops desk available 24 / 7 · Response in &lt; 2 hours
              </p>
            </div>
          </div>

          {/* Col 4: Follow */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">Follow</p>
            <div className="flex gap-3">
              {social.map(({ Icon, label, href }) => (
                <Link
                  key={label} href={href} aria-label={label}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-background/15 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-200"
                  style={{ borderRadius: "6px" }}
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-background/40">
          <p>North-Brook Limited © 2026. All Rights Reserved.</p>
          <div className="flex gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-background/60 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
