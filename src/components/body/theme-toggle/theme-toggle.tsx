import type { ComponentProps } from 'react';

import type { Theme } from '../../../theme';

import { THEMES } from '../../../theme';
import { ThemeSwitcher, ThemeSwitcherItem } from '../../molecules/theme-switcher/theme-switcher';

export interface ThemeToggleProps extends Omit<ComponentProps<typeof ThemeSwitcher>, 'children'> {
  items?: readonly Theme[];
}

export const ThemeToggle = ({ items = THEMES, ...props }: ThemeToggleProps) => (
  <ThemeSwitcher {...props}>
    {items.map((item) => (
      <ThemeSwitcherItem key={item} value={item} />
    ))}
  </ThemeSwitcher>
);
