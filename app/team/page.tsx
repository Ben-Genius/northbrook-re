import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { team } from "@/lib/team"
import { ArrowRight } from "lucide-react"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"

export const metadata: Metadata = {
  title: "Leadership | North-Brook Limited",
  description:
    "Meet the board and executive team driving North-Brook Limited, Ghana's premier onshore and offshore logistics company.",
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "Team", item: "https://northbrook.com.gh/team" },
  ],
}

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Hero
        eyebrow="Our People"
        heading="Leadership built on decades of experience."
        subheading="We deliver industry-leading onshore and offshore solutions through partnerships; the people who lead those partnerships are the heart of this company."
        image="team.jpg"
        imageAlt="North-Brook leadership team"
      />

      <VelocityMarquee variant="stats" />

      <Section gray>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <FadeIn key={m.slug} delay={(i % 3) * 0.1}>
              <Link
                href={`/team/${m.slug}`}
                className="group block bg-white border border-wire hover:border-accent/40 transition-all duration-500 lift-card overflow-hidden rounded-md"
              >
                <div className="relative aspect-4/5 zoom-frame">
                  <SmartImage
                    src={`/images/team/${m.slug}.jpg`}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    placeholderTone="primary"
                    placeholderLabel={m.name.charAt(m.name.startsWith("Mr.") ? 4 : 0)}
                    placeholderHint={m.role}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink/30 via-transparent to-transparent"
                  />
                </div>
                <div className="p-7">
                  <h3
                    className="text-xl font-light text-primary mb-1 group-hover:text-accent transition-colors leading-snug"
                  >
                    {m.name}
                  </h3>
                  <p className="text-xs text-caption uppercase tracking-wider mb-4">{m.role}</p>
                  <p className="text-sm text-body leading-relaxed line-clamp-3 mb-4">
                    {m.bio[0]}
                  </p>
                  <span className="text-xs text-accent uppercase tracking-[0.14em] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read bio <ArrowRight size={12} />
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
