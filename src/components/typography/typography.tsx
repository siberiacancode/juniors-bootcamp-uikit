import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { Slot } from 'radix-ui';

import styles from './typography.module.css';

export type TypographyTag = 'a' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TypographyVariant =
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'caption'
  | 'display'
  | 'heading-2xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-xl'
  | 'link'
  | 'title-lg'
  | 'title-md';

export type TypographyProps<Tag extends TypographyTag = 'div'> = ComponentProps<Tag> & {
  as?: Tag;
  asChild?: boolean;
  variant?: TypographyVariant;
};

export const Typography = <Tag extends TypographyTag = 'div'>({
  as = 'div' as Tag,
  className,
  asChild = false,
  variant = 'body-md',
  ...props
}: TypographyProps<Tag>) => {
  const Component = asChild ? Slot.Root : as;
  return (
    <Component
      className={cn(styles.typography, styles[variant], className)}
      data-slot='typography'
      data-variant={variant}
      {...(props as any)}
    />
  );
};
