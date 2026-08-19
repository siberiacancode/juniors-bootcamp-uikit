import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './input.module.css';

export type InputSize = 'lg' | 'md' | 'sm';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  asChild?: boolean;
  size?: InputSize;
}

export const Input = ({ className, asChild = false, size = 'md', type, ...props }: InputProps) => {
  const Comp = asChild ? Slot.Root : 'input';

  return (
    <Comp
      className={cn(styles.input, styles[size], className)}
      data-size={size}
      data-slot='input'
      type={type}
      {...props}
    />
  );
};
