import type { ComponentProps } from 'react';

import type { Theme } from '../../../theme';

import { THEMES } from '../../../theme';
import {
  ThemeSwitcherItem,
  ThemeSwitcher as ThemeSwitcherRoot
} from '../../molecules/theme-switcher/theme-switcher';

export interface ThemeSwitcherProps extends Omit<
  ComponentProps<typeof ThemeSwitcherRoot>,
  'children'
> {
  items?: readonly Theme[];
}

export const ThemeSwitcher = ({ items = THEMES, ...props }: ThemeSwitcherProps) => (
  <ThemeSwitcherRoot {...props}>
    {items.map((item) => (
      <ThemeSwitcherItem key={item} value={item} />
    ))}
  </ThemeSwitcherRoot>
);
