'use client';

import Link from 'next/link';
import { designTokens, themeOrder } from '@/lib/design-tokens';

export default function SampleIndex() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-ground)', color: 'var(--color-ink)' }}>
      <header className="border-b px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--color-ink)' }}>
            OnThesis — Theme Samples
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Select a theme to preview full sections
          </p>
        </div>
      </header>

      <main className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {themeOrder.map((themeName) => {
            const theme = designTokens[themeName];
            return (
              <Link
                key={themeName}
                href={`/sample/${themeName}`}
                className="group rounded border bg-card p-6 shadow hover:shadow-lg transition-all"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-card)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                    {themeName}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold group-hover:text-accent transition-colors" style={{ color: 'var(--color-ink)' }}>
                  {theme.label}
                </h3>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                  {theme.description}
                </p>
                <div className="mt-6 flex gap-2">
                  {[
                    { label: 'Ground', value: theme.colors.ground },
                    { label: 'Ink', value: theme.colors.ink },
                    { label: 'Accent', value: theme.colors.accent },
                    { label: 'Thesis Bar', value: theme.colors.thesisBar },
                  ].map((swatch) => (
                    <div
                      key={swatch.label}
                      className="flex flex-col items-center gap-1"
                      title={swatch.label}
                    >
                      <div
                        className="h-6 w-6 rounded border"
                        style={{ backgroundColor: swatch.value, borderColor: 'var(--color-border)' }}
                      />
                      <span className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                        {swatch.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}