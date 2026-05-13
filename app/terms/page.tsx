import type { Metadata } from "next"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"

export const metadata: Metadata = {
  title: "Terms & Conditions | North-Brook Limited",
  description: "Terms and conditions for use of the North-Brook Limited website. Governed by the laws of Ghana.",
}

export default function TermsPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        heading="Terms & Conditions"
        subheading="Please read these terms carefully before using our website."
        dark
      />

      <Section>
        <div className="max-w-3xl">
          <FadeIn>
            <div className="text-caption space-y-8 text-sm leading-relaxed">
              <p>Last updated: April 2026</p>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using the North-Brook Limited website at northbrook.com.gh (the &ldquo;Site&rdquo;), you accept and agree to be bound by these Terms &amp; Conditions. If you do not agree, please discontinue use of the Site immediately.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">2. Use of This Site</h2>
                <p className="mb-3">You may use this Site for lawful purposes only. You agree not to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use the Site in any way that violates applicable Ghanaian or international law or regulation</li>
                  <li>Transmit unsolicited commercial communications</li>
                  <li>Attempt to gain unauthorised access to any part of the Site or its underlying systems</li>
                  <li>Use the Site to transmit harmful, offensive, or misleading content</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">3. Intellectual Property</h2>
                <p>All content on this Site (including text, graphics, logos, images, and design) is the property of North-Brook Limited or its content suppliers and is protected by Ghanaian and international intellectual property laws. You may not reproduce, distribute, or create derivative works from any Site content without express written permission from North-Brook Limited.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">4. Disclaimer of Warranties</h2>
                <p>This Site is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. North-Brook Limited does not warrant that the Site will be uninterrupted, error-free, or free from viruses or other harmful components. The content on this Site is for general information purposes only and does not constitute professional advice.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">5. Limitation of Liability</h2>
                <p>To the fullest extent permitted by Ghanaian law, North-Brook Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this Site, even if we have been advised of the possibility of such damages. Our total liability for any claim arising from the use of this Site shall not exceed GHS 500.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">6. Third-Party Links</h2>
                <p>This Site may contain links to third-party websites. These links are provided for convenience only. North-Brook Limited has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">7. Governing Law</h2>
                <p>These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising from these terms or your use of this Site shall be subject to the exclusive jurisdiction of the courts of Ghana.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">8. Contact for Disputes</h2>
                <p>For any disputes or queries relating to these terms, please contact us at <a href="mailto:info@northbrook.com.gh" className="text-accent">info@northbrook.com.gh</a> or in writing to North-Brook Limited, No 12 Joseph Richard Asiedu St, Accra, Ghana.</p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">9. Changes to These Terms</h2>
                <p>We reserve the right to update these Terms &amp; Conditions at any time. Changes will be posted on this page with an updated revision date. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
