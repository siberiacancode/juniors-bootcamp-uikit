import { render, screen } from '@testing-library/react';

import type { IconButtonShape, IconButtonSize, IconButtonVariant } from './icon-button';

import { IconButton } from './icon-button';

import styles from './icon-button.module.css';

const VARIANTS: IconButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost'];
const SIZES: IconButtonSize[] = ['sm', 'md', 'lg'];
const SHAPES: IconButtonShape[] = ['rounded', 'round'];

const ICON_BUTTON_TEST_ID = 'icon-iconButton';
const ICON = <svg data-testid='icon' />;

it('Should render icon button', () => {
  render(
    <IconButton aria-label='action' data-testid={ICON_BUTTON_TEST_ID}>
      {ICON}
    </IconButton>
  );
  const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
  expect(iconButton.contains(screen.getByTestId('icon'))).toBeTruthy();
  expect(iconButton.classList.contains(styles.iconButton)).toBeTruthy();
  expect(iconButton.classList.contains(styles.primary)).toBeTruthy();
  expect(iconButton.classList.contains(styles.md)).toBeTruthy();
  expect(iconButton.classList.contains(styles.rounded)).toBeTruthy();
  expect(iconButton.getAttribute('data-variant')).toBe('primary');
  expect(iconButton.getAttribute('data-size')).toBe('md');
  expect(iconButton.getAttribute('data-shape')).toBe('rounded');
});

VARIANTS.forEach((variant) => {
  it(`Should apply "${variant}" variant`, () => {
    render(
      <IconButton aria-label='action' data-testid={ICON_BUTTON_TEST_ID} variant={variant}>
        {ICON}
      </IconButton>
    );
    const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
    expect(iconButton.getAttribute('data-variant')).toBe(variant);
    expect(iconButton.classList.contains(styles[variant])).toBeTruthy();
  });
});

SIZES.forEach((size) => {
  it(`Should apply "${size}" size`, () => {
    render(
      <IconButton aria-label='action' data-testid={ICON_BUTTON_TEST_ID} size={size}>
        {ICON}
      </IconButton>
    );
    const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
    expect(iconButton.getAttribute('data-size')).toBe(size);
    expect(iconButton.classList.contains(styles[size])).toBeTruthy();
  });
});

SHAPES.forEach((shape) => {
  it(`Should apply "${shape}" shape`, () => {
    render(
      <IconButton aria-label='action' data-testid={ICON_BUTTON_TEST_ID} shape={shape}>
        {ICON}
      </IconButton>
    );
    const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
    expect(iconButton.getAttribute('data-shape')).toBe(shape);
    expect(iconButton.classList.contains(styles[shape])).toBeTruthy();
  });
});

it('Should forward native attributes', () => {
  render(
    <IconButton
      aria-label='submit-button'
      className='custom'
      data-testid={ICON_BUTTON_TEST_ID}
      type='submit'
    >
      {ICON}
    </IconButton>
  );
  const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
  expect(iconButton.getAttribute('type')).toBe('submit');
  expect(iconButton.getAttribute('aria-label')).toBe('submit-button');
  expect(iconButton.classList.contains('custom')).toBeTruthy();
  expect(iconButton.classList.contains(styles.iconButton)).toBeTruthy();
});

it('Should expose accessible name via aria-label', () => {
  render(
    <IconButton aria-label='Select area' data-testid={ICON_BUTTON_TEST_ID}>
      {ICON}
    </IconButton>
  );
  expect(screen.getByTestId(ICON_BUTTON_TEST_ID).getAttribute('aria-label')).toBe('Select area');
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(
    <IconButton aria-label='action' data-testid={ICON_BUTTON_TEST_ID} onClick={onClick}>
      {ICON}
    </IconButton>
  );
  screen.getByTestId(ICON_BUTTON_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(
    <IconButton disabled aria-label='action' data-testid={ICON_BUTTON_TEST_ID} onClick={onClick}>
      {ICON}
    </IconButton>
  );
  const iconButton = screen.getByTestId(ICON_BUTTON_TEST_ID);
  expect(iconButton.hasAttribute('disabled')).toBeTruthy();
  iconButton.click();
  expect(onClick).not.toHaveBeenCalled();
});

it('Should render as child when asChild', () => {
  render(
    <IconButton asChild aria-label='link' data-testid={ICON_BUTTON_TEST_ID}>
      <a href='/home'>{ICON}</a>
    </IconButton>
  );
  const link = screen.getByTestId(ICON_BUTTON_TEST_ID);
  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('/home');
  expect(link.getAttribute('data-slot')).toBe('icon-button');
});
