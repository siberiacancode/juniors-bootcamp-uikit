import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './separator.module.css';

export interface SeparatorProps extends ComponentProps<'div'> {
  asChild?: boolean;
  decorative?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const Separator = ({
  asChild = false,
  className,
  decorative = true,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      aria-orientation={decorative ? undefined : orientation}
      className={cn(styles.separator, className)}
      data-orientation={orientation}
      data-slot='separator'
      role={decorative ? 'none' : 'separator'}
      {...props}
    />
  );
};
