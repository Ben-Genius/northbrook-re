import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { team } from "@/lib/team"
import { FadeIn } from "@/components/ui/fade-in"
import { Section } from "@/components/ui/section"
import { CtaBand } from "@/components/ui/cta-band"
import { SmartImage } from "@/components/ui/smart-image"
import { ArrowLeft } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = team.find((m) => m.slug === slug)
  if (!member) return {}
  return {
    title: `${member.name} | ${member.role}`,
    description: member.bio[0].split(".")[0] + ".",
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params
  const member = team.find((m) => m.slug === slug)
  if (!member) notFound()

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      "@type": "Organization",
      name: "North-Brook Limited",
      url: "https://northbrook.com.gh",
    },
    description: member.bio[0],
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://northbrook.com.gh/about" },
      { "@type": "ListItem", position: 3, name: member.name, item: `https://northbrook.com.gh/team/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-ink min-h-[72vh] flex items-end overflow-hidden">
        {/* Mobile full-bleed background image */}
        <div className="lg:hidden absolute inset-0">
          <SmartImage
            src={`/images/team/${member.slug}.webp`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
            placeholderTone="primary"
            placeholderLabel={member.name.charAt(member.name.startsWith("Mr.") ? 4 : 0)}
            placeholderHint={member.role}
          />
          <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/60 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 to-transparent" />
        </div>

        <div className="w-full flex items-end">
          {/* Content — 4/5 */}
          <div className="relative flex-3 flex flex-col justify-end px-6 lg:px-12 pt-40 pb-16">
            <FadeIn>
              <Link
                href="/about#board"
                className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest mb-10 hover:gap-3 transition-all"
              >
                <ArrowLeft size={12} /> Our People
              </Link>
            </FadeIn>

            <FadeIn delay={0.06}>
              <p className="eyebrow mb-4">{member.role}</p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="font-display font-bold text-white leading-none tracking-tight text-[clamp(2.6rem,6vw,5.5rem)] mb-6">
                {member.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-accent opacity-70" />
                <span className="text-white/40 text-xs uppercase tracking-[0.16em]">North-Brook Limited</span>
              </div>
            </FadeIn>

            {/* Ambient crimson glow */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 w-[40vw] h-[30vw] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(140,0,48,0.12) 0%, transparent 70%)" }}
            />
          </div>

          {/* Portrait — 1/5 */}
          <div className="hidden lg:block flex-2 self-stretch relative min-h-[72vh]">
            <SmartImage
              src={`/images/team/${member.slug}.webp`}
              alt={`Portrait of ${member.name}`}
              fill
              sizes="20vw"
              className="object-cover object-top"
              priority
              placeholderTone="primary"
              placeholderLabel={member.name.charAt(member.name.startsWith("Mr.") ? 4 : 0)}
              placeholderHint={member.role}
            />
            <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Bio */}
      <Section>
        <div className="max-w-3xl">
          {member.bio.map((para, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="text-body leading-relaxed mb-6 text-base">{para}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section gray>
        <FadeIn>
          <p className="eyebrow mb-4">Other Leaders</p>
          <h2
            className="font-display font-bold text-3xl lg:text-4xl text-foreground tracking-tight leading-tight mb-12"
          >
            Meet the rest of the team
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {team
            .filter((m) => m.slug !== slug)
            .slice(0, 4)
            .map((m, i) => (
              <FadeIn key={m.slug} delay={i * 0.08}>
                <Link
                  href={`/team/${m.slug}`}
                  className="group block bg-white border border-wire hover:border-accent/40 rounded-md overflow-hidden lift-card"
                >
                  <div className="relative aspect-4/5 zoom-frame">
                    <SmartImage
                      src={`/images/team/${m.slug}.webp`}
                      alt={`Portrait of ${m.name}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                      placeholderTone="primary"
                      placeholderLabel={m.name.charAt(m.name.startsWith("Mr.") ? 4 : 0)}
                      placeholderHint={m.role}
                    />
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-base font-light text-primary mb-1 group-hover:text-accent transition-colors leading-snug"
                    >
                      {m.name}
                    </h3>
                    <p className="text-[10px] text-caption uppercase tracking-wider">{m.role}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
        </div>
        <FadeIn>
          <Link
            href="/about#board"
            className="inline-flex items-center gap-2 text-accent text-sm uppercase tracking-[0.14em] hover:gap-4 transition-all"
          >
            <ArrowLeft size={14} /> Back to Leadership
          </Link>
        </FadeIn>
      </Section>

      <CtaBand />
    </>
  )
}
