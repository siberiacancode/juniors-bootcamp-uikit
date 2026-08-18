import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { MonitorIcon, MoonStarIcon, SunIcon } from 'lucide-react';
import { createContext, use } from 'react';

import type { Theme } from '../../../theme';

import { IconButton } from '../../atoms/icon-button/icon-button';

import styles from './theme-switcher.module.css';

const THEME_ICONS = {
  light: SunIcon,
  system: MonitorIcon,
  dark: MoonStarIcon
} satisfies Record<Theme, typeof SunIcon>;

interface ThemeSwitcherContextValue {
  value?: Theme;
  onValueChange?: (value: Theme) => void;
}

const ThemeSwitcherContext = createContext<ThemeSwitcherContextValue | null>(null);

const useThemeSwitcherContext = () => {
  const context = use(ThemeSwitcherContext);
  if (!context) throw new Error('ThemeSwitcherItem must be used within ThemeSwitcher');
  return context;
};

export interface ThemeSwitcherProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: Theme;
  onValueChange?: (value: Theme) => void;
}

export const ThemeSwitcher = ({
  className,
  value,
  onValueChange,
  ...props
}: ThemeSwitcherProps) => (
  <ThemeSwitcherContext value={{ value, onValueChange }}>
    <div
      className={cn(styles.theme_switcher, className)}
      data-slot='theme-switcher'
      role='group'
      {...props}
    />
  </ThemeSwitcherContext>
);

export interface ThemeSwitcherItemProps extends Omit<
  ComponentProps<typeof IconButton>,
  'children' | 'value'
> {
  value: Theme;
}

export const ThemeSwitcherItem = ({
  className,
  value,
  onClick,
  ...props
}: ThemeSwitcherItemProps) => {
  const context = useThemeSwitcherContext();
  const isActive = context.value === value;
  const Icon = THEME_ICONS[value];

  return (
    <IconButton
      aria-label={`${value} theme`}
      aria-pressed={isActive}
      className={cn(styles.theme_switcher_button, isActive && styles.active, className)}
      data-slot='theme-switcher-item'
      shape='round'
      size='sm'
      type='button'
      variant={isActive ? 'primary' : 'ghost'}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.onValueChange?.(value);
      }}
      {...props}
    >
      <Icon />
    </IconButton>
  );
};
