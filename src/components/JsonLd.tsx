/**
 * JsonLd — Enhanced Schema Markup for Google Rich Snippets
 * SoftwareApplication + FAQPage + Organization schemas
 */

import { softwareApplicationSchema, faqPageSchema, organizationSchema } from '@/lib/seo-data';

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
