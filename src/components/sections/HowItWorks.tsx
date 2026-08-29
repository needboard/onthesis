'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { StepCarousel } from '@/components/ui/step-carousel';
import { landingPageCopy } from '@/copy/landingpage';

export function HowItWorks() {
  const { howItWorks } = landingPageCopy;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <InView triggerOnce>
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
              {howItWorks.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
              <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                {howItWorks.headline}
              </TextEffect>
            </h2>
          </div>
        </InView>

        <InView triggerOnce>
          <StepCarousel steps={howItWorks.steps} />
        </InView>
      </div>
    </section>
  );
}