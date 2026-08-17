'use client';

import type { ReactNode } from 'react';

import { usePreferredColorScheme } from '@siberiacancode/reactuse';
import { useEffect, useState } from 'react';

import type { ResolvedTheme, Theme } from './theme-context';

import { ThemeContext } from './theme-context';

const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'system' || value === 'dark';

const applyTheme = (theme: ResolvedTheme, attribute: string) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.setAttribute(attribute, theme);
};

export interface ThemeProviderProps {
  attribute?: string;
  children: ReactNode;
  initialTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({
  attribute = 'data-theme',
  children,
  initialTheme = 'system',
  storageKey = 'theme'
}: ThemeProviderProps) => {
  const preferredColorScheme = usePreferredColorScheme();
  const [value, setValue] = useState<Theme>(() => {
    if (typeof window === 'undefined') return initialTheme;
    const storedTheme = window.localStorage.getItem(storageKey);
    return isTheme(storedTheme) ? storedTheme : initialTheme;
  });

  const mode = value === 'system' ? 'system' : 'manual';
  const theme: ResolvedTheme =
    value === 'system' ? (preferredColorScheme === 'dark' ? 'dark' : 'light') : value;

  useEffect(() => {
    applyTheme(theme, attribute);
  }, [attribute, theme]);

  const set = (nextTheme: Theme) => {
    setValue(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, value, set }}>{children}</ThemeContext.Provider>
  );
};
