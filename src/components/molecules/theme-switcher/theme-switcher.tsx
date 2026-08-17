import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { createContext, use } from 'react';

import { IconButton } from '../../atoms/icon-button/icon-button';

import styles from './theme-switcher.module.css';

interface ThemeSwitcherContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const ThemeSwitcherContext = createContext<ThemeSwitcherContextValue | null>(null);

const useThemeSwitcherContext = () => {
  const context = use(ThemeSwitcherContext);
  if (!context) throw new Error('ThemeSwitcherItem must be used within ThemeSwitcher');
  return context;
};

export interface ThemeSwitcherProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: string;
  onValueChange?: (value: string) => void;
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

export interface ThemeSwitcherItemProps extends ComponentProps<typeof IconButton> {
  children?: ReactNode;
  value: string;
}

export const ThemeSwitcherItem = ({
  className,
  children,
  value,
  onClick,
  ...props
}: ThemeSwitcherItemProps) => {
  const context = useThemeSwitcherContext();
  const isActive = context.value === value;

  return (
    <IconButton
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
      {children}
    </IconButton>
  );
};
