import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './saved-payment-card.module.css';

export interface SavedPaymentCardProps extends ComponentProps<'button'> {
  asChild?: boolean;
  panSuffix?: string;
  selected?: boolean;
}

export const SavedPaymentCard = ({
  asChild = false,
  children,
  className,
  panSuffix = '0000',
  selected = false,
  type = 'button',
  ...props
}: SavedPaymentCardProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      aria-pressed={selected}
      className={cn(styles.saved_payment_card, className)}
      data-slot='saved-payment-card'
      data-state={selected ? 'selected' : 'default'}
      {...(!asChild && { type })}
      {...props}
    >
      <span className={styles.saved_payment_card_logo_wrapper}>
        <span className={styles.saved_payment_card_logo}>
          <span className={styles.saved_payment_card_logo_text}>jB</span>
        </span>
      </span>

      <span className={styles.saved_payment_card_row}>
        <span className={styles.saved_payment_card_number}>*{panSuffix}</span>
      </span>

      <Slot.Slottable>{children}</Slot.Slottable>
    </Component>
  );
};
