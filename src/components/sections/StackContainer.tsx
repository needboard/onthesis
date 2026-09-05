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
    const getHeaderH = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      const n = parseInt(v, 10);
      if (!isNaN(n) && n > 0) return n;
      const el = document.querySelector('header');
      return el ? Math.round(el.getBoundingClientRect().height) : 64;
    };

    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    setSectionHeight(window.innerHeight - (mq.matches ? getHeaderH() : 0));

    const handleMQ = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setSectionHeight(window.innerHeight - (e.matches ? getHeaderH() : 0));
    };
    const handleResize = () => setSectionHeight(window.innerHeight - (isDesktop ? getHeaderH() : 0));

    mq.addEventListener('change', handleMQ);
    window.addEventListener('resize', handleResize);
    // header height may change via ResizeObserver in Header.tsx (updates --header-height)
    const ro = new ResizeObserver(() => {
      if (isDesktop) setSectionHeight(window.innerHeight - getHeaderH());
    });
    const headerEl = document.querySelector('header');
    if (headerEl) ro.observe(headerEl);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      mq.removeEventListener('change', handleMQ);
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, [isDesktop]);

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

        if (sectionIndex < 0 || sectionIndex >= totalSections) return;

        const progressOfNextSection = (relativeScroll - sectionStart) / sectionHeight;

        let targetPageScroll: number;

        if (progressOfNextSection < 0.3) {
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
        style={{ height: `${totalSections * sectionHeight}px` }}
      >
        {children}
      </div>
    </StackProvider>
  );
}
