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
