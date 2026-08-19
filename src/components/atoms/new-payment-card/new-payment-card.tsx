import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { CirclePlusIcon } from 'lucide-react';
import { Slot } from 'radix-ui';

import styles from './new-payment-card.module.css';

export interface NewPaymentCardProps extends ComponentProps<'button'> {
  asChild?: boolean;
  selected?: boolean;
}

export const NewPaymentCard = ({
  asChild = false,
  children,
  className,
  selected = false,
  type = 'button',
  ...props
}: NewPaymentCardProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      aria-pressed={selected}
      className={cn(styles.new_payment_card, className)}
      data-slot='new-payment-card'
      data-state={selected ? 'selected' : 'default'}
      {...(!asChild && { type })}
      {...props}
    >
      <span aria-hidden='true' className={styles.new_payment_card_icon}>
        <CirclePlusIcon />
      </span>

      {!!children && <Slot.Slottable>{children}</Slot.Slottable>}
    </Component>
  );
};
