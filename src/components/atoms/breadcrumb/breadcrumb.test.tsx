import { render, screen } from '@testing-library/react';

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

const BREADCRUMB_TEST_ID = 'breadcrumb';

it('Should render breadcrumb', () => {
  render(
    <Breadcrumb data-testid={BREADCRUMB_TEST_ID}>
      <BreadcrumbList data-testid='breadcrumb-list'>
        <BreadcrumbItem data-testid='breadcrumb-item'>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator data-testid='breadcrumb-separator' />
        <BreadcrumbItem>
          <BreadcrumbPage data-testid='breadcrumb-page'>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  const breadcrumb = screen.getByTestId(BREADCRUMB_TEST_ID);
  const list = screen.getByTestId('breadcrumb-list');
  const item = screen.getByTestId('breadcrumb-item');
  const separator = screen.getByTestId('breadcrumb-separator');
  const page = screen.getByTestId('breadcrumb-page');

  expect(breadcrumb.classList.contains(styles.breadcrumb)).toBeTruthy();
  expect(breadcrumb.getAttribute('aria-label')).toBe('breadcrumb');
  expect(breadcrumb.getAttribute('data-slot')).toBe('breadcrumb');
  expect(list.classList.contains(styles.breadcrumb_list)).toBeTruthy();
  expect(item.classList.contains(styles.breadcrumb_item)).toBeTruthy();
  expect(separator.classList.contains(styles.breadcrumb_separator)).toBeTruthy();
  expect(page.classList.contains(styles.breadcrumb_page)).toBeTruthy();
  expect(page.getAttribute('aria-current')).toBe('page');
});

it('Should render breadcrumb link', () => {
  render(
    <BreadcrumbLink data-testid='breadcrumb-link' href='/home'>
      Home
    </BreadcrumbLink>
  );

  const link = screen.getByTestId('breadcrumb-link');

  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('/home');
  expect(link.classList.contains(styles.breadcrumb_link)).toBeTruthy();
  expect(link.getAttribute('data-slot')).toBe('breadcrumb-link');
});

it('Should render breadcrumb link as child', () => {
  render(
    <BreadcrumbLink asChild data-testid='breadcrumb-link'>
      <button type='button'>Home</button>
    </BreadcrumbLink>
  );

  const link = screen.getByTestId('breadcrumb-link');

  expect(link.tagName).toBe('BUTTON');
  expect(link.textContent).toBe('Home');
  expect(link.classList.contains(styles.breadcrumb_link)).toBeTruthy();
});

it('Should render left separator', () => {
  render(<BreadcrumbSeparator current data-testid='breadcrumb-separator' direction='left' />);

  const separator = screen.getByTestId('breadcrumb-separator');

  expect(separator.getAttribute('data-current')).toBe('true');
  expect(separator.getAttribute('data-direction')).toBe('left');
  expect(separator.getAttribute('role')).toBe('presentation');
  expect(separator.getAttribute('aria-hidden')).toBe('true');
});

it('Should render breadcrumb ellipsis', () => {
  render(<BreadcrumbEllipsis data-testid='breadcrumb-ellipsis' />);

  const ellipsis = screen.getByTestId('breadcrumb-ellipsis');

  expect(ellipsis.classList.contains(styles.breadcrumb_ellipsis)).toBeTruthy();
  expect(ellipsis.getAttribute('data-slot')).toBe('breadcrumb-ellipsis');
  expect(ellipsis.getAttribute('role')).toBe('presentation');
});

it('Should merge custom className', () => {
  render(<Breadcrumb className='custom' data-testid={BREADCRUMB_TEST_ID} />);

  const breadcrumb = screen.getByTestId(BREADCRUMB_TEST_ID);

  expect(breadcrumb.classList.contains('custom')).toBeTruthy();
  expect(breadcrumb.classList.contains(styles.breadcrumb)).toBeTruthy();
});
