import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import styles from './button.module.css';

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      ghost: styles.ghost,
      link: styles.link
    },
    size: {
      lg: styles.lg,
      md: styles.md,
      sm: styles.sm
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg'
  }
});

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      data-size={size}
      data-slot='button'
      data-variant={variant}
      {...props}
    />
  );
};
