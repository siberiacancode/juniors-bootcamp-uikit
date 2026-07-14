import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './icon-button.module.css';

export type IconButtonVariant = 'ghost' | 'outline' | 'primary' | 'secondary';
export type IconButtonSize = 'lg' | 'md' | 'sm';
export type IconButtonShape = 'round' | 'rounded';

interface IconButtonProps extends ComponentProps<'button'> {
  asChild?: boolean;
  children: ReactNode;
  shape?: IconButtonShape;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
}

export const IconButton = ({
  className,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  asChild = false,
  ...props
}: IconButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      className={cn(styles.iconButton, styles[variant], styles[size], styles[shape], className)}
      data-shape={shape}
      data-size={size}
      data-slot='icon-button'
      data-variant={variant}
      {...props}
    />
  );
};
