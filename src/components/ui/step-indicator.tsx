'use client';

import { HTMLAttributes } from 'react';

interface StepIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  steps: Array<{
    index: string;
    title: string;
    description: string;
  }>;
  orientation?: 'horizontal' | 'vertical';
}

export function StepIndicator({ steps, orientation = 'horizontal', className = '', ...props }: StepIndicatorProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`${isHorizontal ? 'flex gap-8' : 'space-y-8'} ${className}`} {...props}>
      {steps.map((step, index) => (
        <div key={index} className={isHorizontal ? 'flex-1 min-w-0' : ''}>
          <div className="relative">
            {/* Vertical connecting line */}
            {!isHorizontal && index < steps.length - 1 && (
              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-border" aria-hidden="true" />
            )}
            <div className="relative flex items-start gap-4">
              {/* Step number */}
              <div className="relative flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                  <span className="font-mono text-sm font-bold text-accent">{step.index}</span>
                </div>
                {/* Thesis bar on active step */}
                <div className="absolute -left-1 top-10 h-2 w-px bg-thesis-bar" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}