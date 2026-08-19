import type { ComponentProps, ReactNode } from 'react';

import { cn, useControllableState } from '@siberiacancode/reactuse';
import { XIcon } from 'lucide-react';
import { Slot } from 'radix-ui';

import styles from './chip.module.css';

export type ChipVariant = 'accent' | 'default' | 'primary';
export type ChipSize = 'md' | 'sm';

export interface ChipProps extends Omit<ComponentProps<'button'>, 'onChange'> {
  asChild?: boolean;
  defaultPressed?: boolean;
  icon?: ReactNode;
  pressed?: boolean;
  size?: ChipSize;
  variant?: ChipVariant;
  onPressedChange?: (pressed: boolean) => void;
}

export const Chip = ({
  className,
  variant = 'default',
  size = 'md',
  icon,
  children,
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  asChild = false,
  disabled,
  onClick,
  ...props
}: ChipProps) => {
  const [pressed, setPressed] = useControllableState({
    value: pressedProp,
    initialValue: defaultPressed,
    onChange: onPressedChange
  });

  const Comp = asChild ? Slot.Root : 'button';
  const iconNode = icon === undefined ? <XIcon /> : icon;

  return (
    <Comp
      aria-pressed={pressed}
      className={cn(styles.chip, styles[variant], styles[size], className)}
      data-disabled={disabled ? '' : undefined}
      data-size={size}
      data-slot='chip'
      data-state={pressed ? 'on' : 'off'}
      data-variant={variant}
      disabled={disabled}
      type='button'
      onClick={(event) => {
        onClick?.(event);
        setPressed(!pressed);
      }}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {iconNode && <span className={styles.icon}>{iconNode}</span>}
    </Comp>
  );
};
