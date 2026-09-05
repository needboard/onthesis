'use client';

/**
 * Smooth-scroll to a section inside the StackContainer by its index.
 * On mobile (no stacking), uses element IDs instead of calculated positions.
 */
export function scrollToStackSection(sectionIndex: number) {
  const sectionIds = ['hero', 'problem', 'we-see-you', 'how-it-works', 'features', 'integrations', 'audience'];

  // On mobile, sections are in normal DOM flow — use element IDs
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    scrollToElement(sectionIds[sectionIndex]);
    return;
  }

  // On desktop, calculate stack position
  const container = document.getElementById('stack-container');
  if (!container) return;

  const sectionHeight = window.innerHeight;
  const target = container.offsetTop + sectionIndex * sectionHeight;

  window.scrollTo({ top: target, behavior: 'smooth' });
}

/**
 * Smooth-scroll to any element by its DOM id.
 */
export function scrollToElement(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
