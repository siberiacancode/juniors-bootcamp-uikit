import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import type { ButtonSize, ButtonVariant } from './button';

import { testConformance } from '../../../../tests/describe-conformance';
import { Button } from './button';

import styles from './button.module.css';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const BUTTON_TEST_ID = 'button';

testConformance(<Button>Button</Button>, {
  tag: 'BUTTON',
  slot: 'button',
  rootClass: styles.button,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<Button data-testid={BUTTON_TEST_ID} />);
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.getAttribute('data-variant')).toBe('primary');
  expect(button.getAttribute('data-size')).toBe('lg');
});

VARIANTS.forEach((variant) => {
  it(`Should apply "${variant}" variant`, () => {
    render(<Button data-testid={BUTTON_TEST_ID} variant={variant} />);
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button.getAttribute('data-variant')).toBe(variant);
    expect(button.classList.contains(styles[variant])).toBeTruthy();
  });
});

SIZES.forEach((size) => {
  it(`Should apply "${size}" size`, () => {
    render(<Button data-testid={BUTTON_TEST_ID} size={size} />);
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button.getAttribute('data-size')).toBe(size);
    expect(button.classList.contains(styles[size])).toBeTruthy();
  });
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(<Button data-testid={BUTTON_TEST_ID} onClick={onClick} />);
  screen.getByTestId(BUTTON_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(<Button disabled data-testid={BUTTON_TEST_ID} onClick={onClick} />);
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.hasAttribute('disabled')).toBeTruthy();
  button.click();
  expect(onClick).not.toHaveBeenCalled();
});
