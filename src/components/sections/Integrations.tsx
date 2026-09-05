'use client';

import { InView } from '@/components/ui/in-view';
import { TextEffect } from '@/components/ui/text-effect';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { landingPageCopy } from '@/copy/landingpage';
import { StackSection } from '@/components/ui/StackSection';

export function Integrations() {
  const { integrations } = landingPageCopy;

  return (
    <StackSection index={5} zIndex={60}>
      <section id="integrations" className="w-full">
        <div className="max-w-6xl mx-auto w-full px-6">
          <InView triggerOnce>
            <div className="mb-4 text-center max-w-2xl mx-auto">
              <p className="mb-2 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
                {integrations.eyebrow}
              </p>
              <h2 className="mb-2 font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
                <TextEffect as="span" per="line" preset="fade-in-blur" className="block" motionDelay="0ms">
                  {integrations.headline}
                </TextEffect>
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {integrations.subheadline}
              </p>
            </div>
          </InView>

          <InView triggerOnce>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 grid-auto-rows-[1fr]">
              {integrations.integrations.map((integration) => (
                <InView key={integration.title} triggerOnce className="h-full">
                  <Card className="group h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-card">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={integration.logo.src}
                            alt={integration.logo.alt}
                            width={28}
                            height={28}
                            className="h-7 w-7 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="font-display text-base font-semibold leading-none text-card-foreground group-hover:text-accent transition-colors">
                            {integration.title}
                          </CardTitle>
                          <p className="mt-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            {integration.priority ?? (integration.status === 'coming-first' ? 'Coming first' : 'Coming later')}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-0 flex-1">
                      <p className="text-sm leading-relaxed text-card-foreground/90">
                        {integration.description}
                      </p>
                    </CardContent>
                    <div className="px-6 pt-3 pb-0">
                      <span
                        className={
                          integration.status === 'coming-first'
                            ? 'inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent'
                            : 'inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground'
                        }
                      >
                        {integration.status === 'coming-first' ? 'Coming first' : 'Coming later'}
                      </span>
                    </div>
                  </Card>
                </InView>
              ))}
            </div>
          </InView>

          <InView triggerOnce>
            <div className="mt-4 text-center">
              <a
                href={integrations.ctaHref}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {integrations.ctaText}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </InView>
        </div>
      </section>
    </StackSection>
  );
}
