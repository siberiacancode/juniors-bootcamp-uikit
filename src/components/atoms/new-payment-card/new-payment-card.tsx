import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { CirclePlusIcon } from 'lucide-react';
import { Slot } from 'radix-ui';

import styles from './new-payment-card.module.css';

export interface NewPaymentCardProps extends ComponentProps<'button'> {
  asChild?: boolean;
}

export const NewPaymentCard = ({
  asChild = false,
  children,
  className,
  ...props
}: NewPaymentCardProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      className={cn(styles.new_payment_card, className)}
      data-slot='new-payment-card'
      {...props}
    >
      <span aria-hidden='true' className={styles.new_payment_card_icon}>
        <CirclePlusIcon />
      </span>
      {!!children && (
        <span className={styles.new_payment_card_label}>
          <Slot.Slottable>{children}</Slot.Slottable>
        </span>
      )}
    </Component>
  );
};
