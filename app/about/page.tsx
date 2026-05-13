import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { ArrowRight } from "lucide-react"
import { AboutQuote } from "@/components/about-quote"
import { PillarGrid } from "@/components/pillar-grid"
import { CommunityImpact } from "@/components/community-impact"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { SplitText } from "@/components/ui/split-text"
import { Reveal } from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "About North-Brook Limited | West Africa Logistics Since 2014",
  description:
    "Founded November 2014 in Accra, North-Brook Limited delivers total onshore and offshore logistics across Ghana and West Africa. Meet our board, leadership, and CSR commitments.",
}

const boardMembers = [
  { name: "Frank Adu Jnr", role: "Board Chairman", slug: "frank-adu-jnr" },
  { name: "Kwabena Amponsah Osei-Bonsu", role: "Non-Executive Director", slug: "kwabena-osei-bonsu" },
  { name: "Percival O. Ampomah", role: "Non-Executive Director", slug: "percival-ampomah" },
  { name: "Cheryl Otoo", role: "Non-Executive Director", slug: "cheryl-otoo" },
]

const pillars = [
  {
    title: "Built Around Your Requirements",
    body: "Every engagement starts with your deadlines, not a standard package. We design the service around your operation, not the other way around.",
  },
  {
    title: "Tools That Actually Work",
    body: "We adopt technology that improves speed, visibility, and compliance: real-time cargo tracking, digital port documentation, automated scheduling.",
  },
  {
    title: "Performance You Can Measure",
    body: "100% on-time delivery targets. Zero safety incidents. Full regulatory compliance on every operation we run.",
  },
  {
    title: "Local Authority, Global Standards",
    body: "Decade-long relationships with Ghana's port authorities, customs, and maritime regulators give our partners a genuine speed advantage.",
  },
  {
    title: "Certified. And Then Some.",
    body: "DNV-GL certified. Six international classification body registrations. Every subcontractor we engage meets our safety standard, not just the industry average.",
  },
]

const csr = [
  {
    area: "Education & Skills Development",
    body: "Donation of books, computers, and school supplies to coastal community schools.",
  },
  {
    area: "Community Support",
    body: "Sponsorship of local sports events that promote youth development and discipline. Distribution of basic PPE (gloves, helmets, masks) to local contractors and artisans.",
  },
  {
    area: "Environmental Protection",
    body: "Tree planting projects to reduce carbon impact and restore green spaces. Promotion of waste segregation and recycling within our warehouses and partner facilities.",
  },
  {
    area: "Local Employment & Capacity Building",
    body: "Partnerships with vocational institutions to develop a pipeline of skilled technicians.",
  },
]

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://northbrook.com.gh/about" },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Hero
        eyebrow="About Us"
        heading="Built for the operations that can't fail."
        subheading="Ten years running the logistics operations that others find too complex, too remote, or too time-critical. Here's who built that record."
        image="about.jpg"
        imageAlt="North-Brook leadership and operations team"
      />

      <VelocityMarquee variant="stats" />

      {/* Stat band */}
      <section className="bg-smoke py-20 px-6 lg:px-12 border-y border-wire">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {[
            { label: "Years Operating", value: "10+" },
            { label: "Port Calls", value: "347" },
            { label: "Class Certifications", value: "6" },
            { label: "Lost Time Injuries", value: "0" },
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

      {/* Who We Are */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-3">
            <FadeIn>
              <p className="eyebrow mb-6">Who We Are</p>
              <SplitText
                as="h2"
                text="North-Brook Limited"
                by="word"
                delay={0.1}
                stagger={0.06}
                className="text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight leading-[1.1]"
              />
            </FadeIn>
          </div>
          <div className="lg:col-span-9">
            <FadeIn delay={0.15}>
              <p className="text-body leading-relaxed text-base">
                Rigs off the coast of Takoradi. Cargo to remote inland sites. Vessels on tight port turnarounds. Since 2014, North-Brook has handled the kind of logistics where a single missed step costs clients millions. We cover air and sea freight, cargo consolidation, crew management, bunkering, warehousing, and full-service ship agency: not as separate offerings bolted together, but as one integrated operation designed to move without friction.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Board */}
      <Section gray>
        <FadeIn>
          <p className="eyebrow mb-4">Our Board</p>
          <SplitText
            as="h2"
            text="The board behind the operation."
            by="word"
            delay={0.1}
            stagger={0.05}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-4 leading-[1.05]"
          />
          <p className="text-caption max-w-xl mb-14">
            The board shaping strategy for West Africa&apos;s most trusted offshore logistics operator.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {boardMembers.map((m, i) => (
            <FadeIn key={m.slug} delay={i * 0.1}>
              <Link
                href={`/team/${m.slug}`}
                className="group block bg-white border border-wire hover:border-accent/40 transition-all duration-500 lift-card overflow-hidden rounded-md"
              >
                <div className="relative aspect-4/5 zoom-frame">
                  <SmartImage
                    src={`/images/team/${m.slug}.webp`}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                    placeholderTone="primary"
                    placeholderLabel={m.name.charAt(0)}
                    placeholderHint={m.role}
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-light text-primary mb-1 group-hover:text-accent transition-colors"
                  >
                    {m.name}
                  </h3>
                  <p className="text-xs text-caption uppercase tracking-wider">{m.role}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-accent text-sm uppercase tracking-[0.14em] hover:gap-4 transition-all"
          >
            Meet our full team <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </Section>

      {/* CEO Quote */}
      <AboutQuote />

      {/* How We Work */}
      <Section>
        <SplitText
          as="h2"
          text="How We Work"
          by="word"
          delay={0.1}
          stagger={0.08}
          className="text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-14 leading-[1.05]"
        />

        <PillarGrid pillars={pillars} />
      </Section>

      {/* CSR */}
      <Section gray>
        <FadeIn>
          <p className="eyebrow mb-4">CSR</p>
          <SplitText
            as="h2"
            text="Our Community Impact"
            by="word"
            delay={0.1}
            stagger={0.05}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-6 leading-[1.05]"
          />
          <p className="text-caption max-w-2xl leading-relaxed mb-14">
            Commercial performance is one measure. Community impact is another. We run both with the same discipline: books and PPE for coastal schools, tree planting, waste reduction in our warehouses, and vocational pipelines for the next generation of technicians.
          </p>
        </FadeIn>

        <CommunityImpact items={csr} />
      </Section>

      <CtaBand />
    </>
  )
}
