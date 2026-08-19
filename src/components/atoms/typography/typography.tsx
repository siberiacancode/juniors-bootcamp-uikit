import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import styles from './typography.module.css';

export const typographyVariants = cva(styles.typography, {
  variants: {
    variant: {
      display: styles.display,

      'heading-2xl': styles.heading2xl,
      'heading-xl': styles.headingXl,
      'heading-lg': styles.headingLg,
      'heading-md': styles.headingMd,

      'title-lg': styles.titleLg,
      'title-md': styles.titleMd,

      'body-lg': styles.bodyLg,
      'body-md': styles.bodyMd,
      'body-sm': styles.bodySm,

      link: styles.link,
      caption: styles.caption
    },
    pixelify: {
      true: styles.pixelify,
      false: null
    }
  },
  defaultVariants: {
    variant: 'body-md',
    pixelify: false
  }
});

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
      className={cn(typographyVariants({ variant }), className)}
      data-slot='typography'
      data-variant={variant}
      {...(props as any)}
    />
  );
};
