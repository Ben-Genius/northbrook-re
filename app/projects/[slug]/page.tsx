import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/lib/projects"
import { FadeIn } from "@/components/ui/fade-in"
import { Section } from "@/components/ui/section"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} | North-Brook Projects`,
    description: project.description.split(".")[0] + ".",
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const idx = projects.indexOf(project)
  const prev = idx > 0 ? projects[idx - 1] : null
  const next = idx < projects.length - 1 ? projects[idx + 1] : null

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://northbrook.com.gh/projects" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://northbrook.com.gh/projects/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero with full-bleed image */}
      <section className="relative pt-40 pb-28 px-6 lg:px-12 section-dark overflow-hidden min-h-[70vh] flex items-end">
        {/* Brand marker: crimson left bar */}
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent z-10" />
        <div className="absolute inset-0">
          <SmartImage
            src={`/images/projects/${project.slug}.jpg`}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            placeholderTone="primary"
            placeholderLabel="NB"
            placeholderHint={project.partner ?? "Project"}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/45 to-ink/15"
        />
        <div className="max-w-7xl mx-auto relative w-full">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={12} /> All Projects
            </Link>
          </FadeIn>
          {project.partner && (
            <FadeIn delay={0.05}>
              <p className="eyebrow mb-4">{project.partner}</p>
            </FadeIn>
          )}
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl lg:text-6xl font-light text-white max-w-4xl leading-[1.05] mb-6"
            >
              {project.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <FadeIn>
              <p className="text-body leading-relaxed text-base">{project.description}</p>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <div className="bg-gray-light p-8">
              <p className="text-xs text-primary uppercase tracking-[0.14em] font-medium mb-5">
                Services Provided
              </p>
              <ul className="space-y-3">
                {project.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-caption">
                    <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              {project.partner && (
                <div className="mt-6 pt-6 border-t border-steel/20">
                  <p className="text-xs text-primary uppercase tracking-[0.14em] font-medium mb-2">
                    Partner
                  </p>
                  <p className="text-sm text-caption">{project.partner}</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Prev / Next with thumbnails */}
      <section className="bg-gray-light py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-5 bg-white p-5 lift-card"
            >
              <div className="relative w-24 h-24 shrink-0 overflow-hidden zoom-frame">
                <SmartImage
                  src={`/images/projects/${prev.slug}.jpg`}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                  placeholderTone="primary"
                  placeholderLabel="NB"
                />
              </div>
              <div>
                <p className="text-[10px] text-caption uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ArrowLeft size={12} /> Previous
                </p>
                <p
                  className="text-base font-light leading-snug text-primary group-hover:text-accent transition-colors"
                >
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-5 bg-white p-5 lift-card md:flex-row-reverse md:text-right"
            >
              <div className="relative w-24 h-24 shrink-0 overflow-hidden zoom-frame">
                <SmartImage
                  src={`/images/projects/${next.slug}.jpg`}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                  placeholderTone="primary"
                  placeholderLabel="NB"
                />
              </div>
              <div>
                <p className="text-[10px] text-caption uppercase tracking-widest mb-2 flex items-center md:justify-end gap-2">
                  Next <ArrowRight size={12} />
                </p>
                <p
                  className="text-base font-light leading-snug text-primary group-hover:text-accent transition-colors"
                >
                  {next.title}
                </p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
