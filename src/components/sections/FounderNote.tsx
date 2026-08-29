'use client';

import { InView } from '@/components/ui/in-view';
import { landingPageCopy } from '@/copy/landingpage';

export function FounderNote() {
  const { founderNote } = landingPageCopy;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <InView triggerOnce>
          <p className="mb-4 text-sm font-mono font-medium uppercase tracking-wider text-muted-foreground">
            {founderNote.eyebrow}
          </p>
        </InView>

        <InView triggerOnce>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {founderNote.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </InView>

        <InView triggerOnce>
          <div className="mt-10 pt-10 relative thesis-bar pl-6 max-w-xl mx-auto">
            <p className="text-base font-medium text-foreground">
              {founderNote.signOff}
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}