import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';

import styles from './empty.module.css';

export const Empty = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn(styles.empty, className)} data-slot='empty' {...props} />
);

export const EmptyTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn(styles.emptyTitle, className)} data-slot='empty-title' {...props} />
);

export const EmptyDescription = ({ className, ...props }: ComponentProps<'p'>) => (
  <p className={cn(styles.emptyDescription, className)} data-slot='empty-description' {...props} />
);
