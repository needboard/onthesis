'use client';

import { TextEffect } from '@/components/ui/text-effect';
import { InView } from '@/components/ui/in-view';
import { HeroIllustration } from '@/components/illustrations/HeroIllustration';
import { landingPageCopy } from '@/copy/landingpage';

export function Hero() {
  const { hero } = landingPageCopy;

  return (
    <section className="relative py-20 md:py-32 lg:py-40 px-6 bg-white dark:bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <InView triggerOnce>
            <p className="mb-6 text-sm font-mono font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
              {hero.eyebrow}
            </p>
          </InView>

          <InView triggerOnce>
            <h1 className="mb-8 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-900">
              <TextEffect as="span" per="line" preset="blur-sm" className="block" motionDelay="0ms">
                {hero.headlineLines[0]}
              </TextEffect>
              <TextEffect as="span" per="line" preset="blur-sm" className="block" motionDelay="100ms">
                {hero.headlineLines[1]}
              </TextEffect>
            </h1>
          </InView>

          <InView triggerOnce>
            <p className="mb-12 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-slate-500 dark:text-slate-500">
              {hero.subheadline}
            </p>
          </InView>

          <InView triggerOnce>
            <div className="mb-12 max-w-md mx-auto" aria-hidden="true">
              <HeroIllustration ariaLabel={hero.illustrationAlt} />
            </div>
          </InView>

          <InView triggerOnce>
            <p className="text-sm text-slate-500 dark:text-slate-500">{hero.ctaHelperText}</p>
          </InView>
        </div>
      </div>
    </section>
  );
}