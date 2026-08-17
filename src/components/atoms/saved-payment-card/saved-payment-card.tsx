import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './saved-payment-card.module.css';

export interface SavedPaymentCardProps extends ComponentProps<'button'> {
  asChild?: boolean;
  panSuffix?: string;
}

export const SavedPaymentCard = ({
  asChild = false,
  children,
  className,
  panSuffix = '0000',
  type = 'button',
  ...props
}: SavedPaymentCardProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      className={cn(styles.saved_payment_card, className)}
      data-slot='saved-payment-card'
      {...(!asChild && { type })}
      {...props}
    >
      <span className={styles.saved_payment_card_logo_wrapper}>
        <span className={styles.saved_payment_card_logo}>jB</span>
      </span>
      <span className={styles.saved_payment_card_number}>*{panSuffix}</span>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Component>
  );
};
