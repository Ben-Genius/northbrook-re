import type { Metadata } from "next"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"

export const metadata: Metadata = {
  title: "Privacy Policy | North-Brook Limited",
  description: "Privacy policy for North-Brook Limited, Accra, Ghana. Governe under the Data Protection Act, 2012 (Act 843).",
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        heading="Privacy Policy"
        subheading="How we collect, use, and protect your personal information."
        dark
      />

      <Section>
        <div className="max-w-3xl">
          <FadeIn>
            <div className="prose prose-lg max-w-none text-body">
              <p className="text-sm text-caption mb-8">Last updated: April 2026</p>

              <h2 className="text-2xl font-light text-primary mb-4">1. Who We Are</h2>
              <p className="mb-6">North-Brook Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a company registered in Ghana, located at No 12 Joseph Richard Asiedu St, Accra, Ghana. We are the data controller responsible for your personal data collected through this website and our business operations.</p>

              <h2 className="text-2xl font-light text-primary mb-4">2. Legal Framework</h2>
              <p className="mb-6">This policy is governed by the <strong>Data Protection Act, 2012 (Act 843)</strong> of Ghana, administered by the Data Protection Commission. Where North-Brook processes data of individuals in the European Economic Area, we also comply with applicable GDPR obligations.</p>

              <h2 className="text-2xl font-light text-primary mb-4">3. What Data We Collect</h2>
              <p className="mb-3">We may collect the following categories of personal data:</p>
              <ul className="list-disc pl-5 mb-6 space-y-2 text-sm">
                <li><strong>Identification data:</strong> name, job title, company name</li>
                <li><strong>Contact data:</strong> email address, phone number, postal address</li>
                <li><strong>Inquiry data:</strong> service interest and message content submitted via our contact form</li>
                <li><strong>Technical data:</strong> IP address, browser type, pages visited, time on site (collected via cookies)</li>
              </ul>

              <h2 className="text-2xl font-light text-primary mb-4">4. How We Use Your Data</h2>
              <p className="mb-3">We use your personal data for the following lawful purposes:</p>
              <ul className="list-disc pl-5 mb-6 space-y-2 text-sm">
                <li>Responding to your inquiries and providing our logistics services</li>
                <li>Managing our contractual relationships with clients and partners</li>
                <li>Complying with legal and regulatory obligations</li>
                <li>Improving our website and service offerings (analytics)</li>
                <li>Sending relevant communications you have consented to receive</li>
              </ul>

              <h2 className="text-2xl font-light text-primary mb-4">5. Cookies</h2>
              <p className="mb-6">We use cookies to improve your experience on our website. You can manage your cookie preferences using the cookie consent banner displayed on your first visit. Necessary cookies cannot be disabled as they are essential to the site&apos;s operation. For a full breakdown of cookie categories, see our Cookie Preferences panel.</p>

              <h2 className="text-2xl font-light text-primary mb-4">6. Third Parties</h2>
              <p className="mb-6">We do not sell your personal data. We may share data with trusted service providers (e.g., email hosting, analytics providers) who are contractually bound to handle it securely. Where required by law or regulatory authority, we may disclose personal data to government agencies, port authorities, or customs bodies as part of our logistics operations.</p>

              <h2 className="text-2xl font-light text-primary mb-4">7. Your Rights</h2>
              <p className="mb-3">Under the Data Protection Act, 2012 (Act 843), you have the right to:</p>
              <ul className="list-disc pl-5 mb-6 space-y-2 text-sm">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data where there is no lawful basis for continued processing</li>
                <li>Object to processing for direct marketing purposes</li>
                <li>Lodge a complaint with the Data Protection Commission of Ghana</li>
              </ul>

              <h2 className="text-2xl font-light text-primary mb-4">8. Data Retention</h2>
              <p className="mb-6">We retain personal data only as long as necessary for the purposes for which it was collected. Contact form submissions are retained for up to 3 years. Client and operational data is retained for the period required by applicable Ghanaian commercial and tax law.</p>

              <h2 className="text-2xl font-light text-primary mb-4">9. Contact for Data Requests</h2>
              <p className="mb-6">To exercise your rights or for any data protection queries, please contact us at: <a href="mailto:info@northbrook.com.gh" className="text-accent">info@northbrook.com.gh</a> or write to us at our Accra address. We will respond within 30 days.</p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
