'use client';

import { useRef, useState, useEffect } from 'react';
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(720);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    setSectionHeight(window.innerHeight);

    const handleMQ = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const handleResize = () => setSectionHeight(window.innerHeight);

    mq.addEventListener('change', handleMQ);
    window.addEventListener('resize', handleResize);
    return () => {
      mq.removeEventListener('change', handleMQ);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll snap logic (desktop only)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (isSnappingRef.current) return;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;

        const currentScrollY = window.scrollY;
        const containerRect = container.getBoundingClientRect();
        const containerTop = currentScrollY + containerRect.top;

        const relativeScroll = currentScrollY - containerTop;

        if (relativeScroll < 0 || relativeScroll > sectionHeight * totalSections) return;

        const offsetInSection = relativeScroll % sectionHeight;
        if (offsetInSection < 2 || offsetInSection > sectionHeight - 2) return;

        const sectionIndex = Math.floor(relativeScroll / sectionHeight);
        const sectionStart = sectionIndex * sectionHeight;

        if (sectionIndex <= 0 || sectionIndex >= totalSections) return;

        const progressOfNextSection = (relativeScroll - sectionStart) / sectionHeight;

        let targetPageScroll: number;

        if (progressOfNextSection < 0.25) {
          targetPageScroll = containerTop + sectionStart;
        } else {
          targetPageScroll = containerTop + sectionStart + sectionHeight;
        }

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
  }, [isDesktop, sectionHeight, totalSections]);

  // Mobile: plain scrolling, no stacking
  if (!isDesktop) {
    return <div className={cn('relative', className)}>{children}</div>;
  }

  // Desktop: full stacking behavior
  return (
    <StackProvider
      scrollY={scrollY}
      sectionHeight={sectionHeight}
      totalSections={totalSections}
      containerRef={containerRef}
    >
      <ScrollProgress />
      <div
        id="stack-container"
        ref={containerRef}
        className={cn('relative', className)}
        style={{ height: `${totalSections * 100}dvh` }}
      >
        {children}
      </div>
    </StackProvider>
  );
}
