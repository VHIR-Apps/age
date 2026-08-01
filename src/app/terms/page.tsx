import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - Age Calculator BD',
  description: 'Terms of Service for Age Calculator BD by VHIR Tech. Read our terms and conditions before using our tools.',
  alternates: { canonical: 'https://age.vhirtech.shop/terms' },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">📜 Terms of Service</h1>
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <article className="space-y-6 text-sm leading-relaxed text-slate-300">
                <p className="text-slate-400">Last updated: January 2025</p>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">1. Acceptance of Terms</h2>
                  <p>By accessing and using Age Calculator BD (age.vhirtech.shop), operated by VHIR Tech, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">2. Description of Service</h2>
                  <p>Age Calculator BD provides free online tools for calculating age, tracking BD government job quota eligibility, birthday countdowns, and date difference calculations. All calculations are performed locally in your browser and are provided for informational purposes only.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">3. Accuracy Disclaimer</h2>
                  <p className="mb-2">While we strive for maximum accuracy in all our calculations, we make no warranties or guarantees about the accuracy, completeness, or reliability of the results. Age calculations are based on the Gregorian calendar and may have minor variations.</p>
                  <p className="font-medium text-amber-400">⚠️ BD government job age limits are subject to change by government policy. Always verify with official government sources before making any career decisions. Our tool should not be used as the sole basis for job application decisions.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">4. Use of Service</h2>
                  <p>You agree to use our service only for lawful purposes and in accordance with these terms. You agree not to:</p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to interfere with or disrupt the service</li>
                    <li>Use automated tools to access the service excessively</li>
                    <li>Reproduce, duplicate, or copy any part of the service without permission</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">5. Intellectual Property</h2>
                  <p>All content, design, and code on Age Calculator BD are the property of VHIR Tech and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">6. Limitation of Liability</h2>
                  <p>VHIR Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our service. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">7. Changes to Terms</h2>
                  <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the service after any changes constitutes acceptance of the new terms.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">8. Contact</h2>
                  <p>For questions about these Terms of Service, please contact us at:</p>
                  <a href="mailto:vhirsupport@gmail.com" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-400 transition-colors hover:bg-teal-500/20">
                    📧 vhirsupport@gmail.com
                  </a>
                </section>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
