'use client';

import { useState, useRef, useEffect } from 'react';

interface AccordionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
  className?: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
}

function AccordionItem({ question, answer, index }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="border border-border rounded overflow-hidden bg-card">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-0 focus:bg-accent/3"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
      >
        <span className="font-medium text-foreground pr-8">{question}</span>
        <svg
          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={`accordion-content-${index}`}
        role="region"
        aria-labelledby={`accordion-header-${index}`}
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{
          maxHeight: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-6 pb-6 pt-0">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <div className={`space-y-4 ${className}`} role="list">
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} index={index} />
      ))}
    </div>
  );
}