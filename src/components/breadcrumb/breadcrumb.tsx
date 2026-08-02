import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { Slot } from 'radix-ui';

import styles from './breadcrumb.module.css';

export type BreadcrumbProps = ComponentProps<'nav'>;

export const Breadcrumb = ({ className, ...props }: BreadcrumbProps) => (
  <nav
    aria-label='breadcrumb'
    className={cn(styles.breadcrumb, className)}
    data-slot='breadcrumb'
    {...props}
  />
);

export type BreadcrumbListProps = ComponentProps<'ol'>;

export const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol className={cn(styles.breadcrumb_list, className)} data-slot='breadcrumb-list' {...props} />
);

export type BreadcrumbItemProps = ComponentProps<'li'>;

export const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li className={cn(styles.breadcrumb_item, className)} data-slot='breadcrumb-item' {...props} />
);

export interface BreadcrumbLinkProps extends ComponentProps<'a'> {
  asChild?: boolean;
}

export const BreadcrumbLink = ({ asChild = false, className, ...props }: BreadcrumbLinkProps) => {
  const Component = asChild ? Slot.Root : 'a';

  return (
    <Component
      className={cn(styles.breadcrumb_link, className)}
      data-slot='breadcrumb-link'
      {...props}
    />
  );
};

export type BreadcrumbPageProps = ComponentProps<'span'>;

export const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <span
    aria-current='page'
    aria-disabled='true'
    className={cn(styles.breadcrumb_page, className)}
    data-slot='breadcrumb-page'
    role='link'
    {...props}
  />
);

export interface BreadcrumbSeparatorProps extends ComponentProps<'li'> {
  current?: boolean;
  direction?: 'left' | 'right';
}

export const BreadcrumbSeparator = ({
  children,
  className,
  current = false,
  direction = 'right',
  ...props
}: BreadcrumbSeparatorProps) => {
  const Icon = direction === 'left' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <li
      aria-hidden='true'
      className={cn(styles.breadcrumb_separator, className)}
      data-current={current}
      data-direction={direction}
      data-slot='breadcrumb-separator'
      role='presentation'
      {...props}
    >
      {children ?? <Icon />}
    </li>
  );
};

export type BreadcrumbEllipsisProps = ComponentProps<'span'>;

export const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden='true'
    className={cn(styles.breadcrumb_ellipsis, className)}
    data-slot='breadcrumb-ellipsis'
    role='presentation'
    {...props}
  >
    <EllipsisIcon />
    <span className={styles.sr_only}>More</span>
  </span>
);
