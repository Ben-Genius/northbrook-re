import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { projects } from "@/lib/projects"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects | North-Brook Limited Logistics Track Record",
  description:
    "Selected case studies: vessel agency, drilling campaigns, geophysical and geotechnical surveys for Saipem, Borr Drilling, Fugro, ENI, Rina and more.",
  openGraph: {
    title: "Projects | North-Brook Limited",
    description: "Case studies across drilling, geophysical survey, vessel agency, and offshore supply — Saipem, Borr Drilling, Fugro, ENI and more.",
    url: "https://northbrook.com.gh/projects",
    images: [{ url: "https://northbrook.com.gh/images/hero/projects.jpg", width: 1200, height: 630, alt: "North-Brook Limited — Projects" }],
  },
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://northbrook.com.gh/projects" },
  ],
}

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "North-Brook Limited — Selected Projects",
  url: "https://northbrook.com.gh/projects",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    url: `https://northbrook.com.gh/projects/${p.slug}`,
    description: p.description,
  })),
}

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <Hero
        eyebrow="Our Work"
        heading="Operations delivered without incident."
        subheading="Named partners. Specific operations. A selection of campaigns we've run in Ghanaian waters and across West Africa."
        image="projects.jpg"
        imageAlt="North-Brook offshore project operations"
      />

      <Section>
        {/* Featured first project */}
        {projects[0] && (
          <FadeIn className="mb-6">
            <Link
              href={`/projects/${projects[0].slug}`}
              className="group block border border-black/8 hover:border-accent/30 transition-all duration-500 overflow-hidden rounded-lg"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto lg:min-h-[380px] zoom-frame tile-vignette">
                  <SmartImage
                    src={`/images/projects/${projects[0].slug}.jpg`}
                    alt={projects[0].title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    placeholderTone="primary"
                    placeholderLabel="NB"
                    placeholderHint={projects[0].partner ?? "Project"}
                  />
                  {projects[0].partner && (
                    <span className="absolute bottom-5 left-6 text-accent text-xs uppercase tracking-widest z-10">
                      {projects[0].partner}
                    </span>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="eyebrow mb-4">Featured Project</p>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 leading-snug group-hover:text-accent transition-colors">
                    {projects[0].title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed mb-6">
                    {projects[0].description}
                  </p>
                  <span className="text-xs text-accent uppercase tracking-[0.14em] flex items-center gap-1.5 group-hover:gap-3 transition-all">
                    View case study <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        )}

        {/* Remaining projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(1).map((p, i) => (
            <FadeIn key={p.slug} delay={(i % 3) * 0.1}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block border border-black/8 hover:border-accent/30 transition-all duration-500 overflow-hidden lift-card rounded-lg"
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
                  <h3 className="text-lg font-medium text-primary mb-3 group-hover:text-accent transition-colors leading-snug">
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
