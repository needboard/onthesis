export type ThemeName = 'ledger-steel' | 'vellum-seal';

export interface DesignTokens {
  name: ThemeName;
  label: string;
  description: string;
  colors: {
    ground: string;
    ink: string;
    muted: string;
    accent: string;
    accentHover: string;
    accentForeground: string;
    card: string;
    thesisBar: string;
    border: string;
  };
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
  radius: string;
  shadow: string;
}

export const designTokens: Record<ThemeName, DesignTokens> = {
  'ledger-steel': {
    name: 'ledger-steel',
    label: 'Ledger Steel',
    description: 'Institutional precision, cool restraint. Steel blue on slate ground.',
    colors: {
      ground: '#F8FAFC',
      ink: '#0F172A',
      muted: '#94A3B8',
      accent: '#2563EB',
      accentHover: '#1D4ED8',
      accentForeground: '#FFFFFF',
      card: '#FFFFFF',
      thesisBar: '#2563EB',
      border: '#E2E8F0',
    },
    fonts: {
      display: 'var(--font-display)',
      body: 'var(--font-body)',
      mono: 'var(--font-mono)',
    },
    radius: '0.125rem',
    shadow: '0 1px 2px rgb(15 23 42 / 0.06)',
  },
  'vellum-seal': {
    name: 'vellum-seal',
    label: 'Vellum Seal',
    description: 'Document authority, warm restraint. Seal red on vellum ground.',
    colors: {
      ground: '#FDFBF7',
      ink: '#1C1917',
      muted: '#A8A29E',
      accent: '#991B1B',
      accentHover: '#7F1D1D',
      accentForeground: '#FFFFFF',
      card: '#FEFEFE',
      thesisBar: '#991B1B',
      border: '#E7E5E4',
    },
    fonts: {
      display: 'var(--font-display)',
      body: 'var(--font-body)',
      mono: 'var(--font-mono)',
    },
    radius: '0.1875rem',
    shadow: '0 1px 3px rgb(28 25 23 / 0.08), 0 1px 2px -1px rgb(28 25 23 / 0.06)',
  },
};

export function getThemeCSSVars(theme: DesignTokens): string {
  return `
    --color-ground: ${theme.colors.ground};
    --color-ink: ${theme.colors.ink};
    --color-muted: ${theme.colors.muted};
    --color-accent: ${theme.colors.accent};
    --color-accent-hover: ${theme.colors.accentHover};
    --color-accent-foreground: ${theme.colors.accentForeground};
    --color-card: ${theme.colors.card};
    --color-thesis-bar: ${theme.colors.thesisBar};
    --color-border: ${theme.colors.border};
    --radius: ${theme.radius};
    --shadow: ${theme.shadow};
    --font-display: ${theme.fonts.display};
    --font-body: ${theme.fonts.body};
    --font-mono: ${theme.fonts.mono};
  `.trim();
}

export const themeOrder: ThemeName[] = ['ledger-steel', 'vellum-seal'];

export const defaultTheme: ThemeName = 'ledger-steel';