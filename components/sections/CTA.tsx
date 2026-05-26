"use client"

import RequestQuoteLink from "../request-quote-link"

export default function CTASection() {
  return (
    <section
      style={{ background: "var(--color-foreground)", color: "#f4efe6" }}
      className="py-32 px-6 text-center"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-tight tracking-tight text-white"
        >
          Let&apos;s Work Together
        </h2>
        <p className="text-white/50 text-base max-w-md">
          Tell us what you need, and we&apos;ll get back to you within 2 hours.
        </p>
        <RequestQuoteLink />
      </div>
    </section>
  )
}
