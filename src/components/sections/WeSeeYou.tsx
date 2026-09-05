'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { Separator } from '@/components/ui/separator';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function WeSeeYou() {
  const { weSeeYou } = landingPageCopy;

  return (
    <StackSection index={2} zIndex={30}>
      <section id="we-see-you" className="w-full">
        <div className="max-w-3xl mx-auto text-center w-full px-6">
          <InView triggerOnce>
            <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
              {weSeeYou.eyebrow}
            </p>
          </InView>

          <InView triggerOnce>
            <h2 className="mb-6 font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
              <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                {weSeeYou.headline}
              </TextEffect>
            </h2>
          </InView>

          <InView triggerOnce>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              {weSeeYou.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </InView>

          <InView triggerOnce>
            <Separator className="my-8 mx-auto max-w-xs" />
          </InView>
        </div>
      </section>
    </StackSection>
  );
}