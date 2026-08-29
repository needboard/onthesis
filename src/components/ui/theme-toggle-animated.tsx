'use client';

import { useTheme } from '@/lib/theme-context';
import { ToggleGroup, ToggleGroupItem } from './toggle-group-animated';
import { cn } from '@/lib/utils';
import type { ThemeName } from '@/lib/design-tokens';

interface ThemeOption {
  value: ThemeName;
  label: string;
  description?: string;
}

export function ThemeToggleAnimated({
  options = [
    { value: 'ledger-steel', label: 'LEDGER STEEL' },
    { value: 'vellum-seal', label: 'VELLUM SEAL' },
  ],
  size = 'default',
  className,
}: {
  options?: ThemeOption[];
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      value={theme}
      onValueChange={(value) => setTheme(value as ThemeName)}
      variant="outline"
      size={size}
      className={cn('flex gap-1', className)}
      aria-label="Select theme"
    >
      {options.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} disabled={theme === option.value}>
          <span className="font-mono text-xs tracking-wider">{option.label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}