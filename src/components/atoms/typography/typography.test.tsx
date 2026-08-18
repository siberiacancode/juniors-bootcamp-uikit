import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import type { TypographyVariant } from './typography';

import { testConformance } from '../../../../tests/describe-conformance';
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
  'caption',
  'link'
];

const TYPOGRAPHY_TEST_ID = 'typography';

testConformance(<Typography>Text</Typography>, {
  tag: 'DIV',
  slot: 'typography',
  rootClass: styles.typography,
  asChild: true,
  asChildTag: 'span'
});

it('Should render as default', () => {
  render(<Typography data-testid={TYPOGRAPHY_TEST_ID}>Text</Typography>);
  const typography = screen.getByTestId(TYPOGRAPHY_TEST_ID);

  expect(typography.tagName).toBe('DIV');
  expect(typography.textContent).toBe('Text');
  expect(typography.getAttribute('data-variant')).toBe('body-md');
  expect(typography.classList.contains(styles['body-md'])).toBeTruthy();
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

it('Should render as the tag from the "as" prop', () => {
  render(
    <Typography as='h1' data-testid={TYPOGRAPHY_TEST_ID}>
      Heading
    </Typography>
  );
  expect(screen.getByTestId(TYPOGRAPHY_TEST_ID).tagName).toBe('H1');
});

it('Should forward tag-specific attributes', () => {
  render(
    <Typography as='a' data-testid={TYPOGRAPHY_TEST_ID} href='/home'>
      Link
    </Typography>
  );
  expect(screen.getByTestId(TYPOGRAPHY_TEST_ID).getAttribute('href')).toBe('/home');
});
