'use client';

import { InView } from '@/components/ui/in-view';
import { HeroIllustration } from '@/components/illustrations/HeroIllustration';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function Hero() {
  const { hero } = landingPageCopy;

  return (
    <StackSection index={0} zIndex={10}>
      <div className="text-center max-w-4xl mx-auto">
        <InView triggerOnce>
          <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
            {hero.eyebrow}
          </p>
        </InView>

        <InView triggerOnce>
          <h1 className="mb-6 font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-900">
            <span className="block animate-blur-sm-in">
              {hero.headlineLines[0]}
            </span>
            <span className="block animate-blur-sm-in-delay">
              {hero.headlineLines[1]}
            </span>
          </h1>
        </InView>

        <InView triggerOnce>
          <p className="mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-slate-500 dark:text-slate-500">
            {hero.subheadline}
          </p>
        </InView>

        <InView triggerOnce>
          <div className="mb-8 max-w-sm mx-auto" aria-hidden="true">
            <HeroIllustration ariaLabel={hero.illustrationAlt} />
          </div>
        </InView>

        <InView triggerOnce>
          <p className="text-sm text-slate-500 dark:text-slate-500">{hero.ctaHelperText}</p>
        </InView>
      </div>
    </StackSection>
  );
}