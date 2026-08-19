import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import type { InputSize } from './input';

import { testConformance } from '../../../../tests/describe-conformance';
import { Input } from './input';

import styles from './input.module.css';

const SIZES: InputSize[] = ['sm', 'md', 'lg'];

const INPUT_TEST_ID = 'input';

testConformance(<Input aria-label='Input' />, {
  tag: 'INPUT',
  slot: 'input',
  rootClass: styles.input,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<Input data-testid={INPUT_TEST_ID} />);
  const input = screen.getByTestId(INPUT_TEST_ID);
  expect(input.getAttribute('data-size')).toBe('md');
});

SIZES.forEach((size) => {
  it(`Should apply "${size}" size`, () => {
    render(<Input data-testid={INPUT_TEST_ID} size={size} />);
    const input = screen.getByTestId(INPUT_TEST_ID);
    expect(input.getAttribute('data-size')).toBe(size);
    expect(input.classList.contains(styles[size])).toBeTruthy();
  });
});

it('Should forward input attributes', () => {
  render(<Input data-testid={INPUT_TEST_ID} placeholder='Search' type='search' />);
  const input = screen.getByTestId(INPUT_TEST_ID);
  expect(input.getAttribute('placeholder')).toBe('Search');
  expect(input.getAttribute('type')).toBe('search');
});

it('Should render invalid state', () => {
  render(<Input aria-invalid data-testid={INPUT_TEST_ID} />);
  expect(screen.getByTestId(INPUT_TEST_ID).getAttribute('aria-invalid')).toBe('true');
});

it('Should be disabled', () => {
  render(<Input disabled data-testid={INPUT_TEST_ID} />);
  expect(screen.getByTestId(INPUT_TEST_ID).hasAttribute('disabled')).toBeTruthy();
});
