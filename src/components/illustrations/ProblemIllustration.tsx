'use client';

import { useThemeIllustration } from '@/lib/use-theme-illustration';

interface IllustrationProps {
  className?: string;
  ariaLabel: string;
}

export function ProblemIllustration({ className = '', ariaLabel }: IllustrationProps) {
  const { problem } = useThemeIllustration();

  return (
    <img
      src={problem}
      alt={ariaLabel}
      className={`w-full max-w-lg h-auto ${className}`}
    />
  );
}