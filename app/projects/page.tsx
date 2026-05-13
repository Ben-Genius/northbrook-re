import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { projects } from "@/lib/projects"
import { ArrowRight } from "lucide-react"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"

export const metadata: Metadata = {
  title: "Projects | North-Brook Limited Logistics Track Record",
  description:
    "Selected case studies: vessel agency, drilling campaigns, geophysical and geotechnical surveys for Saipem, Borr Drilling, Fugro, ENI, Rina and more.",
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://northbrook.com.gh/projects" },
  ],
}

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Hero
        eyebrow="Our Work"
        heading="Operations delivered without incident."
        subheading="Named partners. Specific operations. A selection of campaigns we've run in Ghanaian waters and across West Africa."
        image="projects.jpg"
        imageAlt="North-Brook offshore project operations"
      />

      <VelocityMarquee variant="ports" />

      <Section gray>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.slug} delay={(i % 3) * 0.1}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block bg-white border border-wire hover:border-accent/40 transition-all duration-500 overflow-hidden lift-card rounded-md"
              >
                <div className="relative aspect-16/10 zoom-frame tile-vignette">
                  <SmartImage
                    src={`/images/projects/${p.slug}.jpg`}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    placeholderTone="primary"
                    placeholderLabel="NB"
                    placeholderHint={p.partner ?? "Project"}
                  />
                  {p.partner && (
                    <span className="absolute bottom-4 left-5 text-accent text-xs uppercase tracking-widest z-10">
                      {p.partner}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-light text-primary mb-3 group-hover:text-accent transition-colors leading-snug"
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed line-clamp-2 mb-4">
                    {p.description}
                  </p>
                  <span className="text-xs text-accent uppercase tracking-[0.14em] flex items-center gap-1 group-hover:gap-2 transition-all">
                    View case study <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
