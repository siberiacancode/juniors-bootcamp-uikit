import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';

import styles from './empty.module.css';

export type EmptyProps = ComponentProps<'div'>;

export const Empty = ({ className, ...props }: EmptyProps) => (
  <div className={cn(styles.empty, className)} data-slot='empty' {...props} />
);

export type EmptyTitleProps = ComponentProps<'div'>;

export const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => (
  <div className={cn(styles.empty_title, className)} data-slot='empty-title' {...props} />
);

export type EmptyDescriptionProps = ComponentProps<'p'>;

export const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => (
  <p className={cn(styles.empty_description, className)} data-slot='empty-description' {...props} />
);
