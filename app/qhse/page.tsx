import type { Metadata } from "next"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { QHSEGrid } from "@/components/qhse-grid"
import { SmartImage } from "@/components/ui/smart-image"
import { Reveal } from "@/components/ui/reveal"
import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { SplitText } from "@/components/ui/split-text"
import LogoMarquee from "@/components/sections/LogoMarquee"

export const metadata: Metadata = {
  title: "QHSE Policy | North-Brook Limited",
  description:
    "Our commitment to Quality, Health, Safety, and Environment standards across all onshore and offshore operations.",
}

const pillars = [
  {
    title: "Quality Commitment",
    body: "North-Brook is committed to delivering services that consistently meet or exceed the requirements of our clients and the applicable regulatory frameworks. We maintain documented quality management procedures and conduct regular internal reviews to ensure continuous service improvement across all logistics operations.",
  },
  {
    title: "Health & Safety Commitment",
    body: "The health, safety, and welfare of our employees, contractors, crew, and communities are non-negotiable priorities. We comply with all applicable health and safety legislation, conduct proactive hazard identification and risk assessments, and provide ongoing training to ensure every team member returns home safely. Safety performance is a key metric in all operational reviews.",
  },
  {
    title: "Environmental Commitment",
    body: "North-Brook acknowledges its responsibility to minimise the environmental impact of its operations. We comply with all relevant environmental legislation, apply best practices in waste management and fuel handling, and actively support initiatives that reduce our carbon footprint, including our community tree planting programme and warehouse recycling protocols.",
  },
  {
    title: "Continuous Improvement",
    body: "We are committed to continually improving our QHSE management system through the setting and regular review of measurable objectives. We encourage open reporting, investigate all incidents without blame, and use findings to drive systemic improvement across our operations, supply chain, and partner network.",
  },
]

export default function QHSEPage() {
  return (
    <>
      <Hero
        eyebrow="Standards We Care About"
        heading="Quality. Health. Safety. Environment."
        subheading="Our commitment to QHSE is not a compliance exercise; it is the foundation on which every North-Brook operation is built."
        image="qhse.jpg"
        imageAlt="North-Brook safety operations"
      />

      <VelocityMarquee variant="stats" />

      <Section>
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="eyebrow mb-6">Policy Statement</p>
              <SplitText
                as="h2"
                text="Zero incidents. Zero compromises."
                by="word"
                delay={0.1}
                stagger={0.05}
                className="text-4xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-8 leading-[1.05]"
              />
              <div className="space-y-6 text-body leading-relaxed">
                <p>
                  North-Brook Limited is committed to conducting its business in a manner that
                  protects the Quality of our services, the Health and Safety of all persons involved
                  in our operations, and the Environment in which we operate.
                </p>
                <p>
                  This commitment extends to all employees, subcontractors, vessel crews, clients, and the communities surrounding our operations in Ghana and across West Africa.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 overflow-visible">
            <Reveal variant="scale" delay={0.2}>
              <div className="relative aspect-4/3 overflow-hidden zoom-frame rounded-md border border-wire">
                <SmartImage
                  src="/images/projects/borr-drilling.jpg"
                  alt="North-Brook safety operations"
                  fill
                  className="object-cover"
                  placeholderTone="primary"
                />
                <div className="absolute inset-0 bg-ink/10" />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -right-6 glass-card shadow-sm p-8 z-10 max-w-[240px]">
                  <p className="text-accent text-3xl font-display font-bold tracking-tight mb-1">100%</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">Safety Record</p>
                  <p className="text-caption text-xs mt-3 leading-relaxed">Zero LTIs (Lost Time Injuries) recorded across all offshore campaigns since 2014.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Safety Metrics Band */}
      <section className="bg-smoke py-20 px-6 lg:px-12 border-y border-wire">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {[
            { label: "Lost Time Injuries", value: "0" },
            { label: "ISO Standards", value: "3+" },
            { label: "Field Audits / Year", value: "150+" },
            { label: "Class Certifications", value: "6" },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-3 font-mono">{stat.label}</span>
                <span className="text-accent font-display font-bold text-4xl lg:text-5xl tracking-tight leading-none">{stat.value}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Section gray>
        <FadeIn>
          <p className="eyebrow mb-6">Our Pillars</p>
          <SplitText
            as="h2"
            text="Four pillars of operational integrity."
            by="word"
            delay={0.1}
            stagger={0.05}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-16 leading-[1.05]"
          />
        </FadeIn>
        <QHSEGrid pillars={pillars} />
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <p className="eyebrow mb-6">Compliance</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground tracking-tight mb-8 leading-tight">
              Held to the world&apos;s most demanding standards.
            </h2>
            <p className="text-body text-sm leading-relaxed max-w-md mb-8">
              We hold international certifications from the six classification societies that set the global bar for marine safety and quality.
            </p>
            <Button asChild size="lg" className="rounded-md gap-3 h-auto px-6 py-4 text-xs uppercase tracking-[0.18em] font-semibold">
              <Link href="/docs/north-brook-qhse-policy.pdf" target="_blank" download="North-Brook-QHSE-Policy.pdf">
                <FileText size={16} />
                Download Full Policy (PDF)
              </Link>
            </Button>
          </div>
          <FadeIn delay={0.2}>
            <div className="pb-1">
              <p className="italic text-primary text-sm mb-1">Signed by:</p>
              <p className="text-lg font-light text-primary">Mr. Michael Blay</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mt-1">Chief Executive Officer</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-caption mt-4">Policy last reviewed: 2026</p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <LogoMarquee />

      <CtaBand />
    </>
  )
}
