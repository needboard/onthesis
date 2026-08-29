'use client';

import React, { createContext, useContext } from 'react';
import { MotionValue } from 'motion/react';

interface StackContextType {
  scrollY: MotionValue<number>;
  sectionHeight: number;
  totalSections: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const StackContext = createContext<StackContextType | null>(null);

export function StackProvider({
  children,
  scrollY,
  sectionHeight = 0,
  totalSections = 6,
  containerRef,
}: {
  children: React.ReactNode;
  scrollY: MotionValue<number>;
  sectionHeight: number;
  totalSections: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <StackContext.Provider value={{ scrollY, sectionHeight, totalSections, containerRef }}>
      {children}
    </StackContext.Provider>
  );
}

export function useStack() {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error('useStack must be used within a StackProvider');
  }
  return context;
}