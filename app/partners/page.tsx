import type { Metadata } from "next"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { PartnerLogoWall } from "@/components/ui/partner-logo-wall"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { SplitText } from "@/components/ui/split-text"

export const metadata: Metadata = {
  title: "Partners & Clients | North-Brook Limited",
  description:
    "North-Brook works with global energy operators, drilling contractors, and survey specialists across West Africa. Saipem, Borr Drilling, Fugro, Rina, ENI, and more.",
}

const values = [
  {
    title: "Unmatched Local Authority",
    body: "Over a decade of established relationships with Ghana's port authorities, customs officials, and maritime regulators means our partners clear faster, comply cleaner, and operate with confidence.",
  },
  {
    title: "One Partner. Total Coverage.",
    body: "From vessel clearance to crew welfare, bunkering to bulk cargo; our integrated service lines mean our partners deal with one trusted contact for the full logistics lifecycle.",
  },
  {
    title: "Certified to International Standards",
    body: "Multi-certified by ABS, ClassNK, DNV-GL, Korean Register, Lloyd's Register, and RINA, we meet the compliance bar set by the world's most demanding operators.",
  },
]

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "Partners", item: "https://northbrook.com.gh/partners" },
  ],
}

export default function PartnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Hero
        eyebrow="Partners & Clients"
        heading="The companies that trust us with their operations."
        subheading="Saipem. Borr Drilling. Fugro. ENI. The names that run West Africa's most demanding offshore operations, and their logistics run through us."
        image="partners.jpg"
        imageAlt="North-Brook partners and operations"
      />

      <VelocityMarquee variant="ports" />

      {/* Partner logo wall */}
      <Section gray>
        <FadeIn>
          <p className="eyebrow mb-10">Our Partners</p>
        </FadeIn>
        <PartnerLogoWall caption="+ others across the West African energy and maritime sector" />
      </Section>

      {/* Why they work with us */}
      <Section>
        <FadeIn>
          <SplitText
            as="h2"
            text="Why global operators choose North-Brook"
            by="word"
            delay={0.1}
            stagger={0.05}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-14 max-w-xl leading-[1.05]"
          />
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.12}>
              <div className="bg-smoke border border-wire rounded-md p-8 flex flex-col gap-5">
                <span className="text-accent font-display font-bold text-5xl leading-none opacity-15 select-none -mb-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-foreground tracking-tight leading-snug">
                  {v.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{v.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
