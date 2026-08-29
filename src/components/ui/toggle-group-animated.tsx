'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3 min-w-[72px]',
        sm: 'h-8 px-2.5 min-w-[64px]',
        lg: 'h-10 px-4 min-w-[80px]',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  children,
  onClick,
  disabled,
  type = 'button',
  'aria-pressed': ariaPressed,
  'aria-label': ariaLabel,
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof toggleVariants> & {
    children: React.ReactNode;
  }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(toggleVariants({ variant, size, className }))}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

const toggleGroupVariants = cva(
  'group/toggle-group flex gap-1 w-fit items-center rounded-xl data-[variant=outline]:shadow-xs data-[variant=outline]:border data-[variant=outline]:p-1',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
);

interface ToggleGroupContextType {
  value: string | undefined;
  onValueChange: (value: string) => void;
  type: 'single';
  variant: 'default' | 'outline';
  size: 'default' | 'sm' | 'lg';
}

const ToggleGroupContext = React.createContext<ToggleGroupContextType | undefined>(undefined);

function useToggleGroup() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error('useToggleGroup must be used within a ToggleGroup');
  }
  return context;
}

interface ToggleGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  'aria-label'?: string;
}

export function ToggleGroup({
  children,
  value,
  onValueChange,
  variant = 'outline',
  size = 'default',
  className,
  'aria-label': ariaLabel,
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange: onValueChange || (() => {}), type: 'single', variant, size }}>
      <motion.div
        data-slot="toggle-group"
        className={cn(toggleGroupVariants({ variant, size }), className)}
        role="radiogroup"
        aria-label={ariaLabel}
      >
        <AnimatePresence initial={false} mode="wait">
          {value && (
            <motion.div
              layoutId="toggle-highlight"
              data-slot="toggle-group-highlight"
              className="absolute inset-0 z-0 bg-accent rounded-lg shadow-sm"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        {children}
      </motion.div>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function ToggleGroupItem({
  value,
  children,
  disabled = false,
  className,
}: ToggleGroupItemProps) {
  const { value: groupValue, onValueChange, variant, size } = useToggleGroup();
  const isActive = groupValue === value;

  return (
    <Toggle
      value={value}
      type="button"
      role="radio"
      aria-checked={isActive}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(
        toggleVariants({ variant, size }),
        'relative z-10 flex-1',
        isActive && 'text-accent-foreground',
        className
      )}
      data-state={isActive ? 'on' : 'off'}
    >
      {children}
    </Toggle>
  );
}