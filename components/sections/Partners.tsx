"use client";

import Image from "next/image";

const PARTNERS = [
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3727.png", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3728.png", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3730.jpg", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3732.png", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3731.jpg", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3726.jpg", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/IMG_3733.png", alt: "Partner" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/macwest-logo-2.webp", alt: "Macwest" },
  { src: "https://i0.wp.com/northbrook.com.gh/wp-content/uploads/2025/09/macwest-logo-1.webp", alt: "Macwest" },
];

export function Partners() {
  return (
    <section className="py-16  overflow-hidden">
      {/* Label */}
      <div className="container mx-auto px-4 mb-10 flex items-center gap-6">
        <div className="h-px flex-1 bg-border" />
        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-muted-foreground/50 whitespace-nowrap">
          Trusted by Industry Leaders Worldwide
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Marquee strip with edge fades */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)",
        }}
      >
        {/* Duplicate items so translateX(-50%) creates a seamless loop */}
        <div className="group flex w-max animate-marquee hover:paused">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center h-24 px-14"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={250}
                height={80}
                sizes="200px"
                loading="lazy"
                className="h-16 w-auto max-w-[200px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
