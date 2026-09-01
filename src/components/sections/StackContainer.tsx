'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useScroll } from 'motion/react';
import { StackProvider } from '@/components/ui/StackContext';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { cn } from '@/lib/utils';

interface StackContainerProps {
  children: React.ReactNode;
  totalSections?: number;
  className?: string;
}

export function StackContainer({
  children,
  totalSections = 6,
  className,
}: StackContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(() => {
    if (typeof window !== 'undefined') return window.innerHeight;
    return 720;
  });

  useEffect(() => {
    setSectionHeight(window.innerHeight);
    const handleResize = () => setSectionHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll snap logic
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isSnappingRef.current) return;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout — fires when scrolling stops (150ms debounce)
      scrollTimeoutRef.current = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;

        const currentScrollY = window.scrollY;
        const containerRect = container.getBoundingClientRect();
        const containerTop = currentScrollY + containerRect.top;

        // Calculate relative scroll within the container
        const relativeScroll = currentScrollY - containerTop;

        // Don't snap if we're not within the container
        if (relativeScroll < 0 || relativeScroll > sectionHeight * totalSections) return;

        // If within 2px of any section boundary, don't snap (already aligned)
        const offsetInSection = relativeScroll % sectionHeight;
        if (offsetInSection < 2 || offsetInSection > sectionHeight - 2) return;

        // Find the current visible section (largest sectionStart <= relativeScroll)
        const sectionIndex = Math.floor(relativeScroll / sectionHeight);
        const sectionStart = sectionIndex * sectionHeight;

        // Don't snap for first section or beyond last section
        if (sectionIndex <= 0 || sectionIndex >= totalSections) return;

        // Calculate how far the NEXT section has transitioned in (0 to 1)
        const progressOfNextSection = (relativeScroll - sectionStart) / sectionHeight;

        let targetPageScroll: number;

        if (progressOfNextSection < 0.25) {
          // Less than 25% into next section → snap back to current section start
          targetPageScroll = containerTop + sectionStart;
        } else {
          // 25% or more into next section → snap forward to next section start
          targetPageScroll = containerTop + sectionStart + sectionHeight;
        }

        // Only snap if we're not already at the target
        if (Math.abs(currentScrollY - targetPageScroll) < 2) return;

        isSnappingRef.current = true;
        window.scrollTo({ top: targetPageScroll, behavior: 'smooth' });
        setTimeout(() => {
          isSnappingRef.current = false;
        }, 500);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [sectionHeight, totalSections]);

  return (
    <StackProvider
      scrollY={scrollY}
      sectionHeight={sectionHeight}
      totalSections={totalSections}
      containerRef={containerRef}
    >
      <ScrollProgress />
      <div
        ref={containerRef}
        className={cn('relative', className)}
        style={{ height: `${totalSections * 100}dvh` }}
      >
        {children}
      </div>
    </StackProvider>
  );
}