'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeName, designTokens, defaultTheme } from '@/lib/design-tokens';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  tokens: typeof designTokens[ThemeName];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): ThemeName {
  if (typeof window === 'undefined') return defaultTheme;
  const stored = localStorage.getItem('onthesis-theme') as ThemeName | null;
  return stored && stored in designTokens ? stored : defaultTheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // Apply theme class to html element
  const applyThemeClass = useCallback((themeName: ThemeName) => {
    if (typeof window === 'undefined') return;
    const html = document.documentElement;
    html.classList.remove('theme-ledger-steel', 'theme-vellum-seal');
    if (themeName === 'vellum-seal') {
      html.classList.add('theme-vellum-seal');
    }
  }, []);

  // Apply theme class on mount and when theme changes
  useEffect(() => {
    applyThemeClass(theme);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, [theme, applyThemeClass]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('onthesis-theme', newTheme);
    }
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: defaultTheme, setTheme: () => {}, tokens: designTokens[defaultTheme] }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, tokens: designTokens[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}