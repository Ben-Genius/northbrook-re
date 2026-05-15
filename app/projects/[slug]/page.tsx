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
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/40 to-ink/10" />
        <div className="max-w-7xl mx-auto relative w-full">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-sm text-accent text-[10px] uppercase tracking-widest hover:bg-black/70 hover:border-accent/40 transition-all duration-200 group cursor-pointer mb-8"
            >
              <ArrowLeft size={10} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              All Projects
            </Link>
          </FadeIn>
          {project.partner && (
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-5 h-px bg-[#FF2A30]" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FF2A30] bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                  {project.partner}
                </span>
              </div>
            </FadeIn>
          )}
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-white max-w-4xl leading-none tracking-tight mb-6">
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
            <div className="border border-black/8 rounded-lg p-8">
              <p className="eyebrow mb-5">Services Provided</p>
              <ul className="space-y-3">
                {project.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-caption">
                    <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              {project.partner && (
                <div className="mt-6 pt-6 border-t border-black/8">
                  <p className="eyebrow mb-2">Partner</p>
                  <p className="text-sm font-medium text-foreground">{project.partner}</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Photo gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 px-6 lg:px-12 border-t border-black/8">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">
                Project Photos
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {project.gallery.map((src, i) => (
                <FadeIn key={src} delay={i * 0.07}>
                  <div className="relative aspect-square overflow-hidden">
                    <SmartImage
                      src={src}
                      alt={`${project.title} - photo ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                      placeholderTone="primary"
                      placeholderLabel={String(i + 1).padStart(2, "0")}
                      placeholderHint={project.title}
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next with thumbnails */}
      <section className="py-12 px-6 lg:px-12 border-t border-black/8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-5 border border-black/8 hover:border-accent/30 rounded-lg p-5 lift-card"
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
              className="group flex items-center gap-5 border border-black/8 hover:border-accent/30 rounded-lg p-5 lift-card md:flex-row-reverse md:text-right"
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
