import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './textarea.module.css';

export interface TextareaProps extends ComponentProps<'textarea'> {
  asChild?: boolean;
}

export const Textarea = ({ asChild = false, className, ...props }: TextareaProps) => {
  const Comp = asChild ? Slot.Root : 'textarea';
  return <Comp className={cn(styles.textarea, className)} data-slot='textarea' {...props} />;
};
