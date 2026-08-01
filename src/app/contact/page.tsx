import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Contact Us - VHIR Tech',
  description: 'Contact VHIR Tech for questions, feedback, or suggestions about Age Calculator BD. Email us at vhirsupport@gmail.com.',
  alternates: { canonical: 'https://age.vhirtech.shop/contact' },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">📧 Contact Us</h1>
              <p className="text-sm text-slate-400">আমাদের সাথে যোগাযোগ করুন</p>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/20 to-teal-600/20 shadow-lg">
                  <svg className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">Get in Touch</h2>
                <p className="text-sm text-slate-400">
                  Have questions, suggestions, or feedback about our Age Calculator BD tool? We would love to hear from you!
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  আমাদের এজ ক্যালকুলেটর বিডি টুল সম্পর্কে প্রশ্ন, পরামর্শ বা মতামত আছে? আমরা আপনার কাছ থেকে শুনতে চাই!
                </p>
              </div>

              {/* Email Card */}
              <div className="stat-card rounded-2xl p-6 text-center">
                <div className="mb-3 text-3xl">📧</div>
                <h3 className="mb-2 text-lg font-bold text-white">Email Us</h3>
                <p className="mb-4 text-sm text-slate-400">
                  For any inquiries, support, or feedback, please email us at:
                </p>
                <a
                  href="mailto:vhirsupport@gmail.com"
                  className="btn-neon inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  vhirsupport@gmail.com
                </a>
                <p className="mt-4 text-xs text-slate-500">
                  We typically respond within 24-48 hours.
                </p>
              </div>

              {/* What to contact about */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: '🐛', title: 'Bug Reports', desc: 'Found a bug? Let us know so we can fix it quickly.' },
                  { icon: '💡', title: 'Feature Requests', desc: 'Have an idea for a new feature? We would love to hear it.' },
                  { icon: '❓', title: 'General Questions', desc: 'Any questions about our tools or how they work.' },
                  { icon: '🤝', title: 'Partnerships', desc: 'Interested in partnering with VHIR Tech? Reach out.' },
                ].map((item) => (
                  <div key={item.title} className="stat-card rounded-xl p-4">
                    <div className="mb-2 text-lg">{item.icon}</div>
                    <h4 className="mb-1 text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
