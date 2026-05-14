import type { Metadata } from "next"
import { Hero } from "@/components/ui/hero"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
// import { SectionNav } from "@/components/ui/section-nav"
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
    body: "We coordinate the end-to-end movement of sea freight — consolidating cargo, managing documentation, and working with our global network to deliver on time and within budget regardless of the complexity. We have handled freight for Dolphin Geo Subsea's subsea campaigns, Cypress Energy's supply chain, and mining equipment consignments requiring specialist handling.",
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
    body: "We source and deliver fuel to vessels and offshore assets with transparent supply chains, a firm focus on quality control, and the local network to minimise turnaround time. Our bunkering support has kept vessels on schedule across Borr Drilling's campaigns and multiple survey operations in Ghanaian waters.",
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
    body: "Our warehousing facilities provide secure storage, inventory management, and cargo consolidation services. With optimised supply chain planning, we help reduce costs, improve efficiency, and keep your goods ready for distribution when and where you need them.",
    tags: ["Oil & Gas", "Mining", "Manufacturing"],
    includes: [
      "Bonded & non-bonded storage",
      "Inventory management",
      "Cargo consolidation & deconsolidation",
      "Supply chain optimisation",
    ],
  },
  {
    id: "documentation",
    title: "Import & Export Documentation",
    body: "We manage the full scope of import and export paperwork — from permits and certificates of origin to dangerous goods declarations — ensuring every shipment is accurately documented and compliant with local and international regulations. This has included documentation for Fugro's offshore geophysical surveys and Saipem's multi-phase drilling campaigns.",
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
    body: "We handle the full cycle of crew logistics — travel, accommodation, visa processing, and port formalities — so that every rotation is seamless and every regulation met. We have delivered crew management support for OSM Thome and across Saipem's extended drilling operations in the region.",
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
    body: "We navigate the full customs process on behalf of our clients — managing documentation, duties, inspections, and regulatory requirements to move cargo through borders quickly and compliantly. This has covered drilling equipment for Eni and Borr Drilling, chemical consignments, and manufactured components requiring specialist classification.",
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
    body: "We move cargo from port to destination — whether heavy drilling equipment, bulk materials, automotive parts, or sensitive chemical consignments — with routes and handling tailored to the nature of each load. We have provided haulage across Saipem's operational sites and for Fugro's survey equipment throughout Ghana.",
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
        image="services.jpg"
        subheading="Eight core service lines, designed for the operations that can't afford a missed deadline."
        imageAlt="North-Brook logistics services — vessel operations in Ghanaian waters"
      />
      {/* Operational proof strip */}
      <div className="bg-ink border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "2011", label: "Established" },
              { value: "6", label: "Classification Societies" },
              { value: "24 / 7", label: "Operations Desk" },
              { value: "Tema, Ghana", label: "Headquarters" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1.5 px-6 py-8 first:pl-0 last:pr-0">
                <dt className="font-mono text-[9px] uppercase tracking-[0.35em] text-steel">{label}</dt>
                <dd className="text-xl font-display font-bold text-warm-cream tracking-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* <SectionNav items={services.map((s) => ({ id: s.id, label: s.title }))} /> */}

      {/* Service sections — full-bleed split layout */}
      {services.map((service, i) => {
        const imageRight = i % 2 === 0

        return (
          <section
            key={service.id}
            id={service.id}
            className="bg-paper border-b border-black/8 overflow-hidden"
          >
            <div className={`flex flex-col ${imageRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

              {/* Text panel */}
              <div className="flex-1 min-w-0 px-6 lg:px-14 xl:px-20 py-20 lg:py-28 flex flex-col justify-center">
                <FadeIn>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-px w-10 bg-wire shrink-0" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-steel">
                      {service.tags.join("  ·  ")}
                    </span>
                  </div>

                  <SplitText
                    as="h2"
                    text={service.title}
                    by="word"
                    delay={0.05}
                    stagger={0.04}
                    className="text-[clamp(1.75rem,3vw,2.75rem)] font-display font-bold text-foreground tracking-tight leading-[1.05] mb-5 max-w-[20ch]"
                  />

                  <p className="text-sm text-steel leading-relaxed mb-10 max-w-[52ch]">
                    {service.body}
                  </p>

                  <div className="border-t border-black/8 pt-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-steel mb-4">
                      Scope of Work
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-8">
                      {service.includes.map((item, idx) => (
                        <li
                          key={item}
                          className="flex items-start gap-4 py-3 border-b border-black/[0.08]/60 last:border-0 sm:nth-last-2:border-0"
                        >
                          <span className="font-mono text-[9px] tracking-[0.3em] text-accent/40 shrink-0 mt-0.5">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium text-foreground/90 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>

              {/* Image panel — fills its half to the viewport edge */}
              <div className="relative w-full lg:w-[46%] shrink-0 aspect-4/3 lg:aspect-auto lg:min-h-[600px]">
                <FadeIn delay={0.1} className="absolute inset-0">
                  <SmartImage
                    src={`/images/services/${service.id}.jpg`}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                    placeholderTone="primary"
                    placeholderLabel={String(i + 1).padStart(2, "0")}
                    placeholderHint={service.title}
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/20 via-transparent to-transparent pointer-events-none" />
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
