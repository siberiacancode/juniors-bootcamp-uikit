import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb';

import styles from './breadcrumb.module.css';

describe('Breadcrumb', () => {
  testConformance(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
    {
      tag: 'NAV',
      slot: 'breadcrumb',
      rootClass: styles.breadcrumb
    }
  );

  it('Should render as default', () => {
    render(<Breadcrumb data-testid='breadcrumb' />);
    expect(screen.getByTestId('breadcrumb').getAttribute('aria-label')).toBe('breadcrumb');
  });
});

describe('BreadcrumbList', () => {
  testConformance(
    <BreadcrumbList>
      <BreadcrumbItem>Home</BreadcrumbItem>
    </BreadcrumbList>,
    {
      tag: 'OL',
      slot: 'breadcrumb-list',
      rootClass: styles.breadcrumb_list
    }
  );
});

describe('BreadcrumbItem', () => {
  testConformance(<BreadcrumbItem>Home</BreadcrumbItem>, {
    tag: 'LI',
    slot: 'breadcrumb-item',
    rootClass: styles.breadcrumb_item,
    wrapper: (node) => <ol>{node}</ol>
  });
});

describe('BreadcrumbLink', () => {
  testConformance(<BreadcrumbLink href='/home'>Home</BreadcrumbLink>, {
    tag: 'A',
    slot: 'breadcrumb-link',
    rootClass: styles.breadcrumb_link,
    asChild: true,
    asChildTag: 'button'
  });

  it('Should forward the href', () => {
    render(
      <BreadcrumbLink data-testid='breadcrumb-link' href='/home'>
        Home
      </BreadcrumbLink>
    );
    expect(screen.getByTestId('breadcrumb-link').getAttribute('href')).toBe('/home');
  });
});

describe('BreadcrumbPage', () => {
  testConformance(<BreadcrumbPage>Current</BreadcrumbPage>, {
    tag: 'SPAN',
    slot: 'breadcrumb-page',
    rootClass: styles.breadcrumb_page
  });

  it('Should mark the current page for assistive tech', () => {
    render(<BreadcrumbPage data-testid='breadcrumb-page'>Current</BreadcrumbPage>);
    const page = screen.getByTestId('breadcrumb-page');
    expect(page.getAttribute('aria-current')).toBe('page');
    expect(page.getAttribute('aria-disabled')).toBe('true');
    expect(page.getAttribute('role')).toBe('link');
  });
});

describe('BreadcrumbSeparator', () => {
  testConformance(<BreadcrumbSeparator />, {
    tag: 'LI',
    slot: 'breadcrumb-separator',
    rootClass: styles.breadcrumb_separator,
    wrapper: (node) => <ol>{node}</ol>
  });

  it('Should render as default', () => {
    render(<BreadcrumbSeparator data-testid='breadcrumb-separator' />);
    const separator = screen.getByTestId('breadcrumb-separator');
    expect(separator.getAttribute('data-direction')).toBe('right');
    expect(separator.getAttribute('data-current')).toBe('false');
    expect(separator.getAttribute('aria-hidden')).toBe('true');
    expect(separator.getAttribute('role')).toBe('presentation');
  });

  it('Should apply left direction ', () => {
    render(<BreadcrumbSeparator data-testid='breadcrumb-separator' direction='left' />);
    const separator = screen.getByTestId('breadcrumb-separator');
    expect(separator.getAttribute('data-direction')).toBe('left');
  });

  it('Should apply current flag', () => {
    render(<BreadcrumbSeparator current data-testid='breadcrumb-separator' />);
    const separator = screen.getByTestId('breadcrumb-separator');
    expect(separator.getAttribute('data-current')).toBe('true');
  });

  it('Should render custom children instead of the default icon', () => {
    render(
      <BreadcrumbSeparator data-testid='breadcrumb-separator'>
        <span data-testid='custom-separator'>/</span>
      </BreadcrumbSeparator>
    );
    expect(screen.getByTestId('custom-separator')).toBeTruthy();
  });
});

describe('BreadcrumbEllipsis', () => {
  testConformance(<BreadcrumbEllipsis />, {
    tag: 'SPAN',
    slot: 'breadcrumb-ellipsis',
    rootClass: styles.breadcrumb_ellipsis
  });

  it('Should render as default', () => {
    render(<BreadcrumbEllipsis data-testid='breadcrumb-ellipsis' />);
    const ellipsis = screen.getByTestId('breadcrumb-ellipsis');
    expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
    expect(ellipsis.getAttribute('role')).toBe('presentation');
    expect(ellipsis.textContent).toContain('More');
  });
});
