import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Age Calculator BD',
  description: 'Privacy Policy for Age Calculator BD by VHIR Tech. Learn how we protect your privacy and data. All calculations happen locally in your browser.',
  alternates: { canonical: 'https://age.vhirtech.shop/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">🔒 Privacy Policy</h1>
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <article className="space-y-6 text-sm leading-relaxed text-slate-300">
                <p className="text-slate-400">Last updated: January 2025</p>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">1. Introduction</h2>
                  <p>Welcome to Age Calculator BD (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operated by VHIR Tech. This Privacy Policy explains how we collect, use, and protect information when you use our website at age.vhirtech.shop. We are committed to protecting your privacy and ensuring a safe experience.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">2. Data Collection</h2>
                  <p className="mb-2"><strong className="text-teal-400">Local Calculations Only:</strong> All age calculations and job quota tracking happen entirely in your browser (client-side). We do <strong>NOT</strong> collect, store, or transmit your date of birth, age results, or any personal information to our servers.</p>
                  <p className="mb-2"><strong className="text-teal-400">No Account Required:</strong> Our tools do not require any registration, login, or account creation. You can use all features anonymously.</p>
                  <p><strong className="text-teal-400">Automatically Collected Data:</strong> Like most websites, we may collect standard web analytics data such as IP address, browser type, device type, and pages visited. This data is used solely to improve our website performance and user experience.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">3. Cookies</h2>
                  <p>We may use cookies and similar technologies to improve your browsing experience. These may include:</p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>Essential cookies for website functionality</li>
                    <li>Analytics cookies to understand how visitors use our site</li>
                    <li>Advertising cookies from third-party services like Google AdSense</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">4. Third-Party Services</h2>
                  <p className="mb-2">We may use third-party services including:</p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li><strong>Google AdSense:</strong> For displaying advertisements. Google may use cookies to serve ads based on your prior visits.</li>
                    <li><strong>Google Analytics:</strong> For website analytics and performance monitoring.</li>
                  </ul>
                  <p className="mt-2">These services have their own privacy policies, and we encourage you to review them.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">5. Data Security</h2>
                  <p>We take reasonable measures to protect your data. Since all calculations happen locally in your browser, your personal calculation data never leaves your device. We use HTTPS encryption to secure all data transmissions.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">6. Children&apos;s Privacy</h2>
                  <p>Our tools are available to users of all ages. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us at vhirsupport@gmail.com.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">7. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">8. Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
