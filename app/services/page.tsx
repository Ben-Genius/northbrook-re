import type { Metadata } from "next"
import { Hero } from "@/components/ui/hero"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { SectionNav } from "@/components/ui/section-nav"
import { CheckCircle2, Tag } from "lucide-react"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { SplitText } from "@/components/ui/split-text"

export const metadata: Metadata = {
  title: "Logistics Services | Ship Agency, Freight, Bunkering, Warehousing | North-Brook",
  description:
    "Total onshore and offshore logistics: ship agency & husbandry, air & sea freight, bunkering & fuel logistics, warehousing & cargo consolidation. Serving Ghana and West Africa.",
}

const services = [
  {
    id: "ship-agency",
    title: "Ship Agency & Husbandry",
    body: "We act as the single point of contact for every vessel call — coordinating port clearance, documentation, crew logistics, and onboard provisioning to ensure efficient turnarounds and uninterrupted operations. Past vessel calls we have managed include the Safeen Argus 2, Luna Nelle, and the Ametrin Valor.",
    tags: ["Oil & Gas", "Mining"],
    includes: [
      "Vessel inward/outward clearance",
      "Port documentation & formalities",
      "Onboard provisioning & supplies",
      "Husbandry & welfare coordination",
    ],
  },
  {
    id: "freight",
    title: "Sea Freight Forwarding",
    body: "We coordinate the end-to-end movement of sea freight — consolidating cargo, managing documentation, and working with our global network to deliver on time and within budget regardless of the complexity. We have handled freight for Dolphin Geo Subsea’s subsea campaigns, Cypress Energy’s supply chain, and mining equipment consignments requiring specialist handling.",
    tags: ["Oil & Gas", "Mining", "Chemicals", "Manufacturing"],
    includes: [
      "FCL & LCL cargo movement",
      "Global network coordination",
      "Subsea campaign logistics",
      "Specialist equipment handling",
    ],
  },
  {
    id: "bunkering",
    title: "Bunkering",
    body: "We source and deliver fuel to vessels and offshore assets with transparent supply chains, a firm focus on quality control, and the local network to minimise turnaround time. Our bunkering support has kept vessels on schedule across Borr Drilling’s campaigns and multiple survey operations in Ghanaian waters.",
    tags: ["Oil & Gas", "Mining"],
    includes: [
      "Marine fuel sourcing",
      "Quality control & sampling",
      "Offshore asset refuelling",
      "Transparent supply chains",
    ],
  },
  {
    id: "warehousing",
    title: "Warehousing & Cargo Consolidation",
    body: "Our warehousing facilities provide secure storage, inventory management, and cargo consolidation services. With optimized supply chain planning, we help reduce costs, improve efficiency, and keep your goods ready for distribution when and where you need them.",
    tags: ["Oil & Gas", "Mining", "Manufacturing"],
    includes: [
      "Bonded & non-bonded storage",
      "Inventory management",
      "Cargo consolidation & deconsolidation",
      "Supply chain optimization",
    ],
  },
  {
    id: "documentation",
    title: "Import & Export Documentation",
    body: "We manage the full scope of import and export paperwork — from permits and certificates of origin to dangerous goods declarations — ensuring every shipment is accurately documented and compliant with local and international regulations. This has included documentation for Fugro’s offshore geophysical surveys and Saipem’s multi-phase drilling campaigns operating in Ghanaian waters.",
    tags: ["Oil & Gas", "Mining"],
    includes: [
      "Permits & certificates of origin",
      "Dangerous goods declarations",
      "Regulatory compliance management",
      "Project-specific documentation",
    ],
  },
  {
    id: "crew-management",
    title: "Crew Management",
    body: "We handle the full cycle of crew logistics — travel, accommodation, visa processing, and port formalities — so that every rotation is seamless and every regulation met. We have delivered crew management support for OSM Thome and across Saipem’s extended drilling operations in the region.",
    tags: ["Oil & Gas", "Mining"],
    includes: [
      "Visa & travel processing",
      "Accommodation & logistics",
      "Port formalities & rotations",
      "Regulatory compliance",
    ],
  },
  {
    id: "customs",
    title: "Customs Clearance",
    body: "We navigate the full customs process on behalf of our clients — managing documentation, duties, inspections, and regulatory requirements to move cargo through borders quickly and compliantly. This has covered everything from drilling equipment for Eni and Borr Drilling, to chemical consignments and manufactured components requiring specialist classification.",
    tags: ["Oil & Gas", "Chemicals", "Manufacturing"],
    includes: [
      "Customs documentation & duties",
      "Cargo inspection coordination",
      "Specialist classification",
      "Border clearance management",
    ],
  },
  {
    id: "haulage",
    title: "Haulage Services",
    body: "We move cargo from port to destination — whether heavy drilling equipment, bulk materials, automotive parts, or sensitive chemical consignments — with routes and handling tailored to the nature of each load. We have provided haulage across Saipem’s operational sites and for Fugro’s survey equipment throughout Ghana.",
    tags: ["Oil & Gas", "Automotive", "Manufacturing", "Chemicals"],
    includes: [
      "Heavy equipment transport",
      "Bulk material haulage",
      "Automotive & parts logistics",
      "Chemical consignment handling",
    ],
  },
]

const serviceSchemas = services.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  provider: {
    "@type": "Organization",
    name: "North-Brook Limited",
    url: "https://northbrook.com.gh",
  },
  description: s.body,
  areaServed: { "@type": "Place", name: "West Africa" },
}))

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://northbrook.com.gh/services" },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemas) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Hero
        eyebrow="Our Services"
        heading="Total logistics. Onshore and offshore."
        subheading="Eight core service lines, designed for the operations that can't afford a missed deadline."
        image="services.jpg"
        imageAlt="North-Brook logistics services"
      />

      <VelocityMarquee variant="ports" />

      <SectionNav
        items={services.map((s) => ({ id: s.id, label: s.title }))}
      />

      {services.map((service, i) => {
        const isEven = i % 2 === 0
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 lg:py-32 px-6 lg:px-12 ${isEven ? "bg-background" : "bg-smoke"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                <FadeIn direction="left">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-accent/20 text-7xl lg:text-8xl font-light leading-none">
                      0{i + 1}
                    </span>
                    {service.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-light text-[10px] uppercase tracking-wider text-caption font-semibold rounded-full"
                          >
                            <Tag size={10} className="text-accent" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <SplitText
                    as="h2"
                    text={service.title}
                    by="word"
                    delay={0.1}
                    stagger={0.05}
                    className="text-4xl lg:text-5xl font-display font-light text-primary mb-6 leading-[1.05]"
                  />
                  <p className="text-body leading-relaxed mb-8">{service.body}</p>

                  <p className="text-xs text-primary uppercase tracking-[0.14em] font-medium mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-caption">
                        <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="relative aspect-square overflow-hidden zoom-frame rounded-md">
                    <SmartImage
                      src={`/images/services/${service.id}.jpg`}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      placeholderTone="primary"
                      placeholderLabel={`0${i + 1}`}
                      placeholderHint={service.title}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-tr from-ink/30 via-transparent to-transparent pointer-events-none"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        )
      })}

      <CtaBand />
    </>
  )
}
