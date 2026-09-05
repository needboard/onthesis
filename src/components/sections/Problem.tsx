'use client';

import { InView } from '@/components/ui/in-view';
import { ProblemIllustration } from '@/components/illustrations/ProblemIllustration';
import { Separator } from '@/components/ui/separator';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function Problem() {
  const { problem } = landingPageCopy;

  return (
    <StackSection index={1} zIndex={20}>
      <section id="problem" className="w-full">
        <div className="max-w-6xl mx-auto w-full px-6">
          <InView triggerOnce>
            <div className="mb-6">
              <p className="mb-2 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
                {problem.eyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
                {problem.headline}
              </h2>
            </div>
          </InView>

          <InView triggerOnce>
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 min-w-0 max-w-[180px] md:max-w-[240px] lg:max-w-[300px] mx-auto lg:mx-0">
                <ProblemIllustration ariaLabel={problem.illustrationAlt} />
              </div>

              <div className="lg:col-span-7 min-w-0">
                <div className="space-y-3 text-lg leading-relaxed text-muted-foreground">
                  {problem.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <Separator
                    orientation="vertical"
                    className="h-12 w-px bg-[var(--color-thesis-bar)] shrink-0"
                    decorative={false}
                    aria-label="Thesis threshold marker"
                  />
                  <div>
                    <div className="text-3xl md:text-4xl font-mono font-bold text-foreground">
                      {problem.stat.value}
                    </div>
                    <p className="mt-1 text-lg font-medium text-foreground">
                      {problem.stat.label}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-8">
                  {problem.supportingStats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {stat.value}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </StackSection>
  );
}