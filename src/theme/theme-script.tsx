import type { ComponentProps } from 'react';

import type { Theme } from './theme-context';

export interface ThemeScriptProps extends ComponentProps<'script'> {
  attribute?: string;
  initialTheme?: Theme;
  key?: string;
}

export const ThemeScript = ({
  attribute = 'data-theme',
  initialTheme = 'system',
  key = 'theme'
}: ThemeScriptProps) => {
  const script = `
(function() {
  try {
    var storageKey = ${JSON.stringify(key)};
    var attribute = ${JSON.stringify(attribute)};
    var theme = localStorage.getItem(storageKey) || ${JSON.stringify(initialTheme)};
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') theme = ${JSON.stringify(initialTheme)};
    var resolvedTheme = theme === 'system'
      ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.setAttribute(attribute, resolvedTheme);
  } catch {}
})();`;

  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
};
