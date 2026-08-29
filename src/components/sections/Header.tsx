'use client';

import Link from 'next/link';
import { ThemeSwitch } from '@/components/ui/theme-switch';

export function Header() {
  return (
    <header className="border-b px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold text-foreground">
          OnThesis
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitch size="default" />
        </div>
      </div>
    </header>
  );
}