'use client';

import { InView } from '@/components/ui/in-view';
import { ProblemIllustration } from '@/components/illustrations/ProblemIllustration';
import { Separator } from '@/components/ui/separator';
import { landingPageCopy } from '@/copy/landingpage';

export function Problem() {
  const { problem } = landingPageCopy;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <InView triggerOnce>
          <div className="mb-12">
            <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
              {problem.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
              {problem.headline}
            </h2>
          </div>
        </InView>

        <div className="grid lg:grid-cols-12 gap-12">
          <InView triggerOnce className="lg:col-span-5 min-w-0 max-w-md mx-auto lg:mx-0">
            <ProblemIllustration ariaLabel={problem.illustrationAlt} />
          </InView>

          <InView triggerOnce className="lg:col-span-7 min-w-0">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {problem.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex items-start gap-4">
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
          </InView>
        </div>
      </div>
    </section>
  );
}