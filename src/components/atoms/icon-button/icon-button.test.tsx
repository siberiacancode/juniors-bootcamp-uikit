import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import type { IconButtonShape, IconButtonSize, IconButtonVariant } from './icon-button';

import { testConformance } from '../../../../tests/describe-conformance';
import { IconButton } from './icon-button';

import styles from './icon-button.module.css';

const VARIANTS: IconButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost'];
const SIZES: IconButtonSize[] = ['sm', 'md', 'lg'];
const SHAPES: IconButtonShape[] = ['round', 'rounded'];

const ICON_BUTTON_TEST_ID = 'icon-button';

testConformance(<IconButton aria-label='Open menu' />, {
  tag: 'BUTTON',
  slot: 'icon-button',
  rootClass: styles.icon_button,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<IconButton data-testid={ICON_BUTTON_TEST_ID} />);
  const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
  expect(iconButton.getAttribute('data-variant')).toBe('primary');
  expect(iconButton.getAttribute('data-size')).toBe('md');
  expect(iconButton.getAttribute('data-shape')).toBe('rounded');
});

VARIANTS.forEach((variant) => {
  it(`Should apply "${variant}" variant`, () => {
    render(<IconButton data-testid={ICON_BUTTON_TEST_ID} variant={variant} />);
    const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
    expect(iconButton.getAttribute('data-variant')).toBe(variant);
    expect(iconButton.classList.contains(styles[variant])).toBeTruthy();
  });
});

SIZES.forEach((size) => {
  it(`Should apply "${size}" size`, () => {
    render(<IconButton data-testid={ICON_BUTTON_TEST_ID} size={size} />);
    const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
    expect(iconButton.getAttribute('data-size')).toBe(size);
    expect(iconButton.classList.contains(styles[size])).toBeTruthy();
  });
});

SHAPES.forEach((shape) => {
  it(`Should apply "${shape}" shape`, () => {
    render(<IconButton data-testid={ICON_BUTTON_TEST_ID} shape={shape} />);
    const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
    expect(iconButton.getAttribute('data-shape')).toBe(shape);
    expect(iconButton.classList.contains(styles[shape])).toBeTruthy();
  });
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(<IconButton data-testid={ICON_BUTTON_TEST_ID} onClick={onClick} />);
  screen.getByTestId(ICON_BUTTON_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(<IconButton disabled data-testid={ICON_BUTTON_TEST_ID} onClick={onClick} />);
  const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
  expect(iconButton.hasAttribute('disabled')).toBeTruthy();
  iconButton.click();
  expect(onClick).not.toHaveBeenCalled();
});
