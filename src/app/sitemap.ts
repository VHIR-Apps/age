import type { MetadataRoute } from 'next';

const BASE_URL = 'https://age.vhirtech.shop';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/age-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/job-quota-tracker', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/birthday-countdown', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/date-difference', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
