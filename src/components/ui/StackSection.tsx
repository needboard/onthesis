'use client';

import { motion, useTransform, EasingFunction } from 'motion/react';
import { useStack } from './StackContext';
import { cn } from '@/lib/utils';

interface StackSectionProps {
  index: number;
  zIndex: number;
  children: React.ReactNode;
  className?: string;
}

// Easing function: slow start then fast (cubic ease-in)
const cardEase: EasingFunction = (t) => t * t * t;

export function StackSection({ index, zIndex, children, className }: StackSectionProps) {
  let scrollY;
  let sectionHeight;
  let totalSections;

  try {
    const stack = useStack();
    scrollY = stack.scrollY;
    sectionHeight = stack.sectionHeight;
    totalSections = stack.totalSections;
  } catch {
    // No provider — mobile: plain scrolling
    return (
      <div className={cn('relative w-full', className)}>
        <div className="max-w-6xl mx-auto w-full px-6 pt-6 md:pt-8 pb-16 md:pb-20">
          {children}
        </div>
      </div>
    );
  }

  const sectionStart = index * sectionHeight;
  const isLastSection = index >= totalSections - 1;

  const y = useTransform(
    scrollY,
    [sectionStart - sectionHeight, sectionStart],
    [sectionHeight, 0],
    { ease: cardEase }
  );

  const nextSectionStart = (index + 1) * sectionHeight;
  const nextSectionY = useTransform(
    scrollY,
    [nextSectionStart - sectionHeight, nextSectionStart],
    [sectionHeight, 0],
    { ease: cardEase }
  );

  const clipBottomRaw = useTransform(nextSectionY, [sectionHeight, 0], [0, 100]);
  const clipPath = useTransform(clipBottomRaw, v => isLastSection ? undefined : `inset(0 0 ${v}% 0)`);

  return (
    <motion.div
      style={{
        y,
        zIndex,
        clipPath: isLastSection ? undefined : clipPath,
        justifyContent: 'safe center' as unknown as string,
        height: 'calc(100dvh - var(--header-height, 64px))',
        top: 'var(--header-height, 64px)',
      }}
      className={cn(
        'relative w-full',
        'sticky',
        'overflow-hidden',
        'bg-background',
        'flex flex-col',
        className
      )}
      data-index={index}
      data-z-index={zIndex}
    >
      <div className="max-w-6xl mx-auto w-full px-6 pt-4 pb-3">
        {children}
      </div>
    </motion.div>
  );
}
