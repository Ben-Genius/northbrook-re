"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { SmartImage } from "@/components/ui/smart-image"

interface CSRItem {
  area: string
  body: string
}

interface CommunityImpactProps {
  items: CSRItem[]
}

export function CommunityImpact({ items }: CommunityImpactProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Staggered reveal for CSR items
      gsap.from(".csr-card", {
        opacity: 0,
        x: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <div ref={sectionRef} className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      {/* Visual side */}
      <div className="lg:col-span-5 relative order-2 lg:order-1">
        <div ref={imageRef} className="relative aspect-3/4 overflow-hidden zoom-frame rounded-lg border border-black/8">
          <SmartImage
            src="/images/csr-impact.jpg"
            alt="North-Brook community impact in coastal Ghana"
            fill
            className="object-cover"
            placeholderTone="primary"
          />
          <div className="absolute inset-0 bg-ink/10 pointer-events-none" />
        </div>

        {/* Floating stat */}
        <div className="absolute -bottom-8 -right-8 bg-white border border-black/8 p-8 hidden lg:block z-20 max-w-[240px] rounded-lg">
          <p className="text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-2">Our Promise</p>
          <p className="text-primary text-sm font-light italic leading-relaxed">
            "Commercial success is only sustainable when shared with the communities that host us."
          </p>
        </div>

        {/* Decorative background element */}
        <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-accent/20 -z-10" />
      </div>

      {/* Content side */}
      <div ref={contentRef} className="lg:col-span-7 order-1 lg:order-2 space-y-12">
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {items.map((item, i) => (
            <div key={item.area} className="csr-card group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <h3 className="text-lg font-light text-primary group-hover:text-accent transition-colors duration-300">
                  {item.area}
                </h3>
              </div>
              <p className="text-sm text-body leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="pt-8 border-t border-black/8">
          <p className="text-caption text-xs uppercase tracking-widest leading-relaxed">
            Partnering with local institutions to build a <span className="text-primary font-medium">lasting legacy</span> in West Africa.
          </p>
        </div>
      </div>
    </div>
  )
}
