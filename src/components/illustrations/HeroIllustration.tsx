'use client';

import { useThemeIllustration } from '@/lib/use-theme-illustration';

interface IllustrationProps {
  className?: string;
  ariaLabel: string;
}

export function HeroIllustration({ className = '', ariaLabel }: IllustrationProps) {
  const { hero } = useThemeIllustration();

  return (
    <img
      src={hero}
      alt={ariaLabel}
      className={`w-full max-w-xl h-auto ${className}`}
    />
  );
}