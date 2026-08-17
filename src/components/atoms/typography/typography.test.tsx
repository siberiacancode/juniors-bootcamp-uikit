import { render, screen } from '@testing-library/react';

import type { TypographyVariant } from './typography';

import { Typography } from './typography';

import styles from './typography.module.css';

const VARIANTS: TypographyVariant[] = [
  'display',
  'heading-2xl',
  'heading-xl',
  'heading-lg',
  'heading-md',
  'title-lg',
  'title-md',
  'body-lg',
  'body-md',
  'body-sm',
  'link',
  'caption'
];

const TYPOGRAPHY_TEST_ID = 'typography';

it('Should render typography', () => {
  render(<Typography data-testid={TYPOGRAPHY_TEST_ID}>Text</Typography>);
  const typography = screen.getByTestId(TYPOGRAPHY_TEST_ID);
  expect(typography.textContent).toBe('Text');
  expect(typography.tagName).toBe('DIV');
  expect(typography.classList.contains(styles.typography)).toBeTruthy();
  expect(typography.classList.contains(styles['body-md'])).toBeTruthy();
  expect(typography.getAttribute('data-variant')).toBe('body-md');
  expect(typography.getAttribute('data-slot')).toBe('typography');
});

VARIANTS.forEach((variant) => {
  it(`Should apply "${variant}" variant`, () => {
    render(
      <Typography data-testid={TYPOGRAPHY_TEST_ID} variant={variant}>
        Text
      </Typography>
    );
    const typography = screen.getByTestId(TYPOGRAPHY_TEST_ID);
    expect(typography.getAttribute('data-variant')).toBe(variant);
    expect(typography.classList.contains(styles[variant])).toBeTruthy();
  });
});

it('Should render as custom tag', () => {
  render(
    <Typography as='h1' data-testid={TYPOGRAPHY_TEST_ID} variant='display'>
      Heading
    </Typography>
  );
  const typography = screen.getByTestId(TYPOGRAPHY_TEST_ID);
  expect(typography.tagName).toBe('H1');
  expect(typography.classList.contains(styles.display)).toBeTruthy();
});

it('Should forward native attributes', () => {
  render(
    <Typography
      as='a'
      className='custom'
      data-testid={TYPOGRAPHY_TEST_ID}
      href='/home'
      variant='link'
    >
      Link
    </Typography>
  );
  const typography = screen.getByTestId(TYPOGRAPHY_TEST_ID);
  expect(typography.tagName).toBe('A');
  expect(typography.getAttribute('href')).toBe('/home');
  expect(typography.classList.contains('custom')).toBeTruthy();
  expect(typography.classList.contains(styles.typography)).toBeTruthy();
});

it('Should render as child when asChild', () => {
  render(
    <Typography asChild data-testid={TYPOGRAPHY_TEST_ID} variant='title-lg'>
      <span>Slotted</span>
    </Typography>
  );
  const typography = screen.getByTestId(TYPOGRAPHY_TEST_ID);
  expect(typography.tagName).toBe('SPAN');
  expect(typography.textContent).toBe('Slotted');
  expect(typography.classList.contains(styles['title-lg'])).toBeTruthy();
  expect(typography.getAttribute('data-slot')).toBe('typography');
});
