'use client';

import { Footer31 } from '@/components/ui/footer-31';
import { landingPageCopy } from '@/copy/landingpage';

export function Footer() {
  const { footer, finalCta } = landingPageCopy;

  return (
    <Footer31
      heading={finalCta.headline}
      subtitle={footer.tagline}
      newsletterPlaceholder={finalCta.ctaPlaceholder}
      newsletterButtonText={finalCta.ctaButton}
      brandDescription={footer.tagline}
      bigText={footer.productName}
      columns={[
        {
          title: 'LEGAL',
          links: footer.links,
        },
      ]}
    />
  );
}