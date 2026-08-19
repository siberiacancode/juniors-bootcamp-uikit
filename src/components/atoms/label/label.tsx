import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './label.module.css';

export interface LabelProps extends ComponentProps<'label'> {
  asChild?: boolean;
  asterisk?: boolean;
  children?: ReactNode;
}

export const Label = ({
  asChild = false,
  asterisk = false,
  children,
  className,
  ...props
}: LabelProps) => {
  const Comp = asChild ? Slot.Root : 'label';

  return (
    <Comp className={cn(styles.label, className)} data-slot='label' {...props}>
      {asterisk && (
        <span aria-hidden='true' className={styles.asterisk} data-slot='label-asterisk'>
          *
        </span>
      )}
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
    </Comp>
  );
};
