'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { CtaIllustration } from '@/components/illustrations/CtaIllustration';
import { EmailCapture } from '@/components/ui/email-capture';
import { landingPageCopy } from '@/copy/landingpage';

export function FinalCta() {
  const { finalCta, form } = landingPageCopy;

  return (
    <section id="final-cta" className="py-20 md:py-28 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <InView triggerOnce>
            <h2 className="mb-4 font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
              <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                {finalCta.headline}
              </TextEffect>
              <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="80ms">
                {finalCta.subheadline}
              </TextEffect>
            </h2>
          </InView>

          <InView triggerOnce>
            <div className="mb-10 max-w-xs mx-auto" aria-hidden="true">
              <CtaIllustration ariaLabel="A quiet echo of the hero motif" />
            </div>
          </InView>

          <InView triggerOnce>
            <EmailCapture
              placeholder={finalCta.ctaPlaceholder}
              buttonText={finalCta.ctaButton}
              helperText={form.successMessage}
              showCrmField
              crmPlaceholder={finalCta.crmPlaceholder}
              crmOtherPlaceholder={finalCta.crmOtherPlaceholder}
              crmHelperText={form.crmHelperText}
            />
          </InView>
        </div>
      </div>
    </section>
  );
}