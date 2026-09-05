'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function Features() {
  const { features } = landingPageCopy;

  return (
    <StackSection index={4} zIndex={50}>
      <section id="features" className="w-full">
        <div className="max-w-6xl mx-auto w-full px-6">
          <InView triggerOnce>
            <div className="mb-4 text-center max-w-2xl mx-auto">
              <p className="mb-2 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
                {features.eyebrow}
              </p>
              <h2 className="mb-2 font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
                <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                  {features.headline}
                </TextEffect>
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {features.subheadline}
              </p>
            </div>
          </InView>

          <InView triggerOnce>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 grid-auto-rows-[1fr]">
              {features.features.map((feature) => (
                <InView key={feature.title} triggerOnce className="h-full">
                  <Card className="group h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-display text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-0">
                      <p className="leading-relaxed text-card-foreground/90">
                        {feature.description}
                      </p>
                    </CardContent>
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