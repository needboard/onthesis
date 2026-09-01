'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { StepCarousel } from '@/components/ui/step-carousel';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function HowItWorks() {
  const { howItWorks } = landingPageCopy;

  return (
    <StackSection index={3} zIndex={40}>
      <section className="h-[100dvh] w-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full px-6">
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
    </StackSection>
  );
}