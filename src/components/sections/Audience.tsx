'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { Card, CardContent } from '@/components/ui/card';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function Audience() {
  const { audience } = landingPageCopy;

  return (
    <StackSection index={5} zIndex={60}>
      <section className="h-[100dvh] w-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full px-6">
          <InView triggerOnce>
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
                {audience.eyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
                <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                  {audience.headline}
                </TextEffect>
              </h2>
            </div>
          </InView>

          <InView triggerOnce>
            <div className="grid gap-6 md:grid-cols-2 grid-auto-rows-[1fr]">
              {audience.segments.map((segment) => (
                <InView key={segment.title} triggerOnce className="h-full">
                  <Card className="p-8 md:p-10 h-full">
                    <h3 className="font-display text-xl font-semibold text-card-foreground mb-4">
                      {segment.title}
                    </h3>
                    <p className="leading-relaxed text-card-foreground/90">
                      {segment.description}
                    </p>
                  </Card>
                </InView>
              ))}
            </div>
          </InView>
        </div>
      </section>
    </StackSection>
  );
}