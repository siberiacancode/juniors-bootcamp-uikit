import { cn } from '@siberiacancode/reactuse';

import type { ButtonProps } from '../../atoms/button/button';

import { Button } from '../../atoms/button/button';

import styles from './giant-button.module.css';

export type GiantButtonProps = Omit<ButtonProps, 'size'>;

export const GiantButton = ({ className, asChild = false, ...props }: GiantButtonProps) => (
  <Button
    asChild={asChild}
    className={cn(styles.giant_button, className)}
    data-slot='giant-button'
    size='lg'
    {...props}
  />
);
