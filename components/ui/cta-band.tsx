import Link from "next/link"
import { FadeIn } from "./fade-in"
import { Button } from "@/components/ui/button"

interface CtaBandProps {
  heading?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
}

export function CtaBand({
  heading = "Ready to move your operations forward?",
  body = "Tell us what you're moving and where it needs to be. We'll come back with a plan, not a brochure.",
  ctaLabel = "Send a Brief",
  ctaHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="section-ink py-28 lg:py-36 px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient crimson glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(148,0,52,0.18) 0%, transparent 65%)" }}
      />
      {/* Diagonal accent block */}
      <div
        aria-hidden
        className="absolute -right-24 top-0 bottom-0 w-80 bg-accent/8"
        style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      <div className="max-w-7xl mx-auto text-center relative">
        <FadeIn>
          <p className="eyebrow justify-center mb-6">Start Your Project</p>
          <h2
            className="font-display text-4xl lg:text-[clamp(2.8rem,5vw,5.5rem)] text-white font-bold tracking-tight leading-none mb-6"
          >
            {heading}
          </h2>
          <div className="flex justify-center mb-10">
            <span className="block h-px w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(148,0,52,0.55), transparent)" }} />
          </div>
          <p className="text-white/55 max-w-xl mx-auto mb-12 text-base lg:text-lg leading-relaxed">
            {body}
          </p>
          <Button
            asChild
            size="lg"
            className="btn-shimmer rounded-md px-10 py-4 h-auto text-sm font-semibold uppercase tracking-[0.12em]"
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
