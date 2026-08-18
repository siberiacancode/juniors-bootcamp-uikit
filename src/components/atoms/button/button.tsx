import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './button.module.css';

export type ButtonVariant = 'ghost' | 'outline' | 'primary' | 'secondary';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ComponentProps<'button'> {
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'lg',
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      className={cn(styles.button, styles[variant], styles[size], className)}
      data-size={size}
      data-slot='button'
      data-variant={variant}
      {...props}
    />
  );
};
