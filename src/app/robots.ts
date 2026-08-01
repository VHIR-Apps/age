/**
 * Dynamic Robots.txt Generator
 * Optimized for Google crawling of calculator tools
 */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://age.vhirtech.shop/sitemap.xml',
  };
}
