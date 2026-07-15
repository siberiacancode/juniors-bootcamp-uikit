import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './giant-button.module.css';

export interface GiantButtonProps extends ComponentProps<'button'> {
  asChild?: boolean;
}

export const GiantButton = ({
  className,
  children,
  asChild = false,
  type = 'button',
  ...props
}: GiantButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      className={cn(styles.giantButton, className)}
      data-slot='giant-button'
      {...(!asChild && { type })}
      {...props}
    >
      <span aria-hidden='true' className={styles.shadow} />
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
};
