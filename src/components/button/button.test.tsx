import { render, screen } from '@testing-library/react';

import type { ButtonSize, ButtonVariant } from './button';

import { Button } from './button';

import styles from './button.module.css';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const BUTTON_TEST_ID = 'juniorsbootcamp-button';

it('Should render button', () => {
  render(
    <Button aria-label='action' data-testid={BUTTON_TEST_ID}>
      Button
    </Button>
  );
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.classList.contains(styles.button)).toBeTruthy();
  expect(button.classList.contains(styles.primary)).toBeTruthy();
  expect(button.classList.contains(styles.md)).toBeTruthy();
  expect(button.getAttribute('data-variant')).toBe('primary');
  expect(button.getAttribute('data-size')).toBe('md');
});

it('Should apply default variant and size', () => {
  render(<Button data-testid={BUTTON_TEST_ID}>Button</Button>);
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.getAttribute('data-variant')).toBe('primary');
  expect(button.getAttribute('data-size')).toBe('md');
  expect(button.classList.contains(styles.primary)).toBeTruthy();
  expect(button.classList.contains(styles.md)).toBeTruthy();
});

VARIANTS.forEach((variant) => {
  it(`Should apply "${variant}" variant`, () => {
    render(
      <Button data-testid={BUTTON_TEST_ID} variant={variant}>
        Button
      </Button>
    );
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button.getAttribute('data-variant')).toBe(variant);
    expect(button.classList.contains(styles[variant])).toBeTruthy();
  });
});

SIZES.forEach((size) => {
  it(`Should apply "${size}" size`, () => {
    render(
      <Button data-testid={BUTTON_TEST_ID} size={size}>
        Button
      </Button>
    );
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button.getAttribute('data-size')).toBe(size);
    expect(button.classList.contains(styles[size])).toBeTruthy();
  });
});

it('Should merge custom classname', () => {
  render(
    <Button className='custom' data-testid={BUTTON_TEST_ID}>
      Button
    </Button>
  );
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.classList.contains('custom')).toBeTruthy();
  expect(button.classList.contains(styles.button)).toBeTruthy();
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(
    <Button data-testid={BUTTON_TEST_ID} onClick={onClick}>
      Button
    </Button>
  );
  screen.getByTestId(BUTTON_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(
    <Button disabled data-testid={BUTTON_TEST_ID} onClick={onClick}>
      Button
    </Button>
  );
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.hasAttribute('disabled')).toBeTruthy();
  button.click();
  expect(onClick).not.toHaveBeenCalled();
});

it('Should forward native attributes', () => {
  render(
    <Button
      aria-label='submit-button'
      className='custom'
      data-testid={BUTTON_TEST_ID}
      type='submit'
    >
      Button
    </Button>
  );
  const button = screen.getByTestId(BUTTON_TEST_ID);
  expect(button.getAttribute('type')).toBe('submit');
  expect(button.getAttribute('aria-label')).toBe('submit-button');
  expect(button.classList.contains('custom')).toBeTruthy();
  expect(button.classList.contains(styles.button)).toBeTruthy();
});

it('Should render as child when asChild', () => {
  render(
    <Button asChild data-testid={BUTTON_TEST_ID}>
      <a href='/home'>Link</a>
    </Button>
  );
  const link = screen.getByTestId(BUTTON_TEST_ID);
  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('/home');
  expect(link.getAttribute('data-slot')).toBe('button');
});
