'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselNavigator } from './carousel-navigator';

export interface StepCarouselProps {
  steps: Array<{
    index: string;
    title: string;
    description: string;
  }>;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export function StepCarousel({
  steps,
  autoPlay = true,
  autoPlayDelay = 4500,
}: StepCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const initializedRef = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

  const clearAutoPlayTimer = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const startAutoPlayTimer = useCallback(() => {
    if (!autoPlay || isHoveringRef.current || isDraggingRef.current) return;
    clearAutoPlayTimer();
    autoPlayTimerRef.current = setTimeout(() => {
      if (emblaApi && emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (emblaApi) {
        emblaApi.scrollTo(0);
      }
    }, autoPlayDelay);
  }, [autoPlay, autoPlayDelay, emblaApi, clearAutoPlayTimer]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      startAutoPlayTimer();
    };

    // Initialize on first render
    if (!initializedRef.current) {
      initializedRef.current = true;
      setSelectedIndex(emblaApi.selectedScrollSnap());
      startAutoPlayTimer();
    }

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, startAutoPlayTimer]);

  const onPointerDown = useCallback(() => {
    isDraggingRef.current = true;
    clearAutoPlayTimer();
  }, [clearAutoPlayTimer]);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    startAutoPlayTimer();
  }, [startAutoPlayTimer]);

  const onDotClick = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const onMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    clearAutoPlayTimer();
  }, [clearAutoPlayTimer]);

  const onMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    startAutoPlayTimer();
  }, [startAutoPlayTimer]);

  useEffect(() => {
    return () => clearAutoPlayTimer();
  }, [clearAutoPlayTimer]);

  const themes = steps.map((_, i) => ({
    bg: i === 0 ? 'bg-[var(--color-ground)]' : 'bg-[var(--color-ground)]',
    button: 'bg-[var(--color-accent)]',
    dot: 'bg-[var(--color-border)]',
    progress: 'bg-[var(--color-accent)]',
  }));

  return (
    <div className="w-full">
      <div
        ref={emblaRef}
        className="overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <div className="flex touch-pan-x">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 px-3"
            >
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  className="relative flex-shrink-0"
                >
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                    <span className="font-mono text-sm font-bold text-accent">
                      {step.index}
                    </span>
                  </div>
                  <div className="absolute -left-1 top-10 h-2 w-px bg-thesis-bar" aria-hidden="true" />
                </motion.div>
                <motion.div variants={itemVariants} className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <CarouselNavigator
        totalSlides={steps.length}
        autoDelay={autoPlayDelay}
        themes={themes}
        currentIndex={selectedIndex}
        onIndexChange={onDotClick}
      />
    </div>
  );
}