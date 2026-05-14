import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import LogoMarquee from "@/components/sections/LogoMarquee"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact North-Brook Limited | Logistics Ghana",
  description:
    "Get in touch with North-Brook Limited in Accra, Ghana. Email info@northbrook.com.gh or call +233 (0) 244 270 797.",
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://northbrook.com.gh" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://northbrook.com.gh/contact" },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Hero
        eyebrow="Get In Touch"
        heading="Tell us what you're moving."
        subheading="Ship agency, freight, bunkering, warehousing, or all four. Send us a brief and we'll come back within one business day."
        image="contact.jpg"
        imageAlt="North-Brook Accra office"
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact details */}
          <FadeIn direction="left">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mb-2">
              Find us in Accra
            </h2>
            <p className="text-body text-sm leading-relaxed mb-8">
              One business day response, guaranteed. For urgent operational matters, call directly.
            </p>

            {/* Response promise */}
            <div className="flex items-center gap-4 border border-black/8 rounded-lg px-5 py-4 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <p className="text-sm text-foreground font-medium">We respond within <span className="text-accent">1 business day</span> to all enquiries.</p>
            </div>

            <div className="space-y-5 mb-10">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg border border-black/8 flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-caption uppercase tracking-widest mb-1 font-mono">Address</p>
                  <p className="text-foreground text-sm leading-relaxed">
                    No 12 Joseph Richard Asiedu St,<br />Accra, Ghana
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg border border-black/8 flex items-center justify-center shrink-0">
                  <Mail size={15} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-caption uppercase tracking-widest mb-1 font-mono">Email</p>
                  <a
                    href="mailto:info@northbrook.com.gh"
                    className="text-foreground text-sm hover:text-accent transition-colors"
                  >
                    info@northbrook.com.gh
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg border border-black/8 flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-caption uppercase tracking-widest mb-1 font-mono">Phone</p>
                  <a
                    href="tel:+233244270797"
                    className="text-foreground text-sm hover:text-accent transition-colors"
                  >
                    +233 (0) 244 270 797
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg border border-black/8 flex items-center justify-center shrink-0">
                  <Clock size={15} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-caption uppercase tracking-widest mb-1 font-mono">Hours</p>
                  <p className="text-foreground text-sm">Mon–Fri, 8:00 AM – 5:30 PM GMT</p>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="aspect-4/3 border border-black/8 rounded-lg relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8763!2d-0.187!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAccra%2C+Ghana!5e0!3m2!1sen!2sgh!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(80%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="North-Brook Limited office location, Accra, Ghana"
                className="absolute inset-0"
              />
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.15}>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mb-8">
              Send a Brief
            </h2>
            <ContactForm />
          </FadeIn>
        </div>
      </Section>

      <LogoMarquee />
    </>
  )
}
