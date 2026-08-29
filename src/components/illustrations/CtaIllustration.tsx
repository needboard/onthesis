'use client';

import { useThemeIllustration } from '@/lib/use-theme-illustration';

interface IllustrationProps {
  className?: string;
  ariaLabel: string;
}

export function CtaIllustration({ className = '', ariaLabel }: IllustrationProps) {
  const { cta } = useThemeIllustration();

  return (
    <img
      src={cta}
      alt={ariaLabel}
      className={`w-full max-w-sm h-auto ${className}`}
    />
  );
}