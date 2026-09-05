'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { scrollToStackSection, scrollToElement } from '@/lib/scroll-to-section';

const navItems = [
  { label: 'How It Works', action: () => scrollToStackSection(3) },
  { label: 'Features', action: () => scrollToStackSection(4) },
  { label: 'Integrations', action: () => scrollToStackSection(5) },
  { label: "Who It's For", action: () => scrollToStackSection(6) },
  { label: 'FAQ', action: () => scrollToElement('faq') },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Measure header height for dropdown positioning and section offset
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        const h = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(h);
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener('resize', measure);
    window.visualViewport?.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.visualViewport?.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      // Don't close if clicking the hamburger button
      if (hamburgerRef.current?.contains(e.target as Node)) return;
      // Don't close if clicking inside the dropdown
      if (menuRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleNavClick = (action: () => void) => {
    action();
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[200] border-b bg-background/80 backdrop-blur-md"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="font-display text-xl font-semibold text-foreground shrink-0 cursor-pointer">
          OnThesis
        </Link>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 -mr-2 cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <HamburgerIcon open={menuOpen} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 ml-6 mr-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToElement('final-cta')}
            className="whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-sm hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Join Waitlist
          </button>
        </nav>

        <div className="shrink-0">
          <ThemeSwitch size="default" />
        </div>
      </div>

      {/* Mobile dropdown - portaled to body for backdrop-blur */}
      {menuOpen && createPortal(
        <>
          {/* Backdrop - blurs content below header, clicking closes menu */}
          <div
            className="fixed left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm z-[150] lg:hidden"
            style={{ top: headerHeight }}
            onClick={() => setMenuOpen(false)}
          />
          {/* Dropdown - positioned below header */}
          <div
            ref={menuRef}
            className="fixed left-0 right-0 border-b border-border shadow-lg lg:hidden z-[201] bg-background/80 backdrop-blur-md"
            style={{ top: headerHeight }}
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.action)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-border pt-4 mt-1">
                <button
                  onClick={() => handleNavClick(() => scrollToElement('final-cta'))}
                  className="w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  Join Waitlist
                </button>
              </div>
            </nav>
          </div>
        </>,
        document.body
      )}
    </header>
  );
}
