'use client';

import { useTheme } from '@/lib/theme-context';

export function useThemeIllustration() {
  const { theme } = useTheme();
  const suffix = theme === 'vellum-seal' ? 'valleum' : 'blue';

  return {
    hero: `/man-on-a-path-Photoroom-${suffix}.png`,
    problem: `/inbox-load-Photoroom-${suffix}.png`,
    cta: `/move-forward-Photoroom-${suffix}.png`,
  };
}