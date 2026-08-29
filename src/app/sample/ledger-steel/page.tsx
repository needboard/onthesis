'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { useTheme } from '@/lib/theme-context';

export default function LedgerSteelSample() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <header className="border-b px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/sample"
            className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            ← All Samples
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider hidden sm:block">
              Preview
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Problem />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}