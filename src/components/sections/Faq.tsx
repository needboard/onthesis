'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { Accordion } from '@/components/ui/accordion';
import { landingPageCopy } from '@/copy/landingpage';

export function Faq() {
  const { faq } = landingPageCopy;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <InView triggerOnce>
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
              {faq.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
              <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                {faq.headline}
              </TextEffect>
            </h2>
          </div>
        </InView>

        <InView triggerOnce>
          <Accordion items={faq.items} />
        </InView>
      </div>
    </section>
  );
}