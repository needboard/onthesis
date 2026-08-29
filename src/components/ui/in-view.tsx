'use client';

import { useEffect, useRef, useState } from 'react';

interface InViewProps {
  children: React.ReactNode;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  as?: React.ElementType;
}

export function InView({
  children,
  rootMargin = '-10%',
  triggerOnce = true,
  className = '',
  as: Component = 'div',
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, triggerOnce]);

  return <Component ref={ref} className={className}>{isInView ? children : null}</Component>;
}