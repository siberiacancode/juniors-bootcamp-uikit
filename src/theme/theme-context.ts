import { createContext } from 'react';

export const THEMES = ['light', 'system', 'dark'] as const;
export type Theme = (typeof THEMES)[number];
export type ThemeMode = 'manual' | 'system';
export type ResolvedTheme = Exclude<Theme, 'system'>;

export interface ThemeContextValue {
  mode: ThemeMode;
  theme: ResolvedTheme;
  value: Theme;
  set: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
