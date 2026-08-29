'use client';

import { useTheme } from '@/lib/theme-context';
import { Switch } from './switch';
import { cn } from '@/lib/utils';

export function ThemeSwitch({ size = 'default', className }: { size?: 'default' | 'sm'; className?: string }) {
  const { theme, setTheme } = useTheme();
  const isVellum = theme === 'vellum-seal';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'font-mono text-xs tracking-wider transition-colors',
          isVellum ? 'text-muted-foreground' : 'text-accent'
        )}
      >
        LEDGER
      </span>
      <Switch
        checked={isVellum}
        onCheckedChange={(checked) => setTheme(checked ? 'vellum-seal' : 'ledger-steel')}
        size={size}
        aria-label="Switch theme"
      />
      <span
        className={cn(
          'font-mono text-xs tracking-wider transition-colors',
          isVellum ? 'text-accent' : 'text-muted-foreground'
        )}
      >
        VELLUM
      </span>
    </div>
  );
}