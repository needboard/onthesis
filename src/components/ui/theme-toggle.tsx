'use client';

import { ThemeSwitch } from './theme-switch';

export function ThemeToggle({ size = 'default', className }: { size?: 'default' | 'sm'; className?: string }) {
  return <ThemeSwitch size={size} className={className} />;
}