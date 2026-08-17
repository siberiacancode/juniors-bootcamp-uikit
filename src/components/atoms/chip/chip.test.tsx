import { act, render, screen } from '@testing-library/react';

import type { ChipSize, ChipVariant } from './chip';

import { Chip } from './chip';

import styles from './chip.module.css';

const VARIANTS: ChipVariant[] = ['default', 'primary', 'accent'];
const SIZES: ChipSize[] = ['sm', 'md'];

const CHIP_TEST_ID = 'chip';

it('Should render chip', () => {
  render(<Chip data-testid={CHIP_TEST_ID}>Chip</Chip>);
  const chip = screen.getByTestId(CHIP_TEST_ID);
  expect(chip.tagName).toBe('BUTTON');
  expect(chip.textContent).toBe('Chip');
  expect(chip.classList.contains(styles.chip)).toBeTruthy();
  expect(chip.classList.contains(styles.default)).toBeTruthy();
  expect(chip.classList.contains(styles.md)).toBeTruthy();
  expect(chip.getAttribute('data-variant')).toBe('default');
  expect(chip.getAttribute('data-size')).toBe('md');
  expect(chip.getAttribute('data-state')).toBe('off');
  expect(chip.getAttribute('data-slot')).toBe('chip');
  expect(chip.getAttribute('aria-pressed')).toBe('false');
  expect(chip.getAttribute('type')).toBe('button');
});

VARIANTS.forEach((variant) => {
  it(`Should apply "${variant}" variant`, () => {
    render(
      <Chip data-testid={CHIP_TEST_ID} variant={variant}>
        Chip
      </Chip>
    );
    const chip = screen.getByTestId(CHIP_TEST_ID);
    expect(chip.getAttribute('data-variant')).toBe(variant);
    expect(chip.classList.contains(styles[variant])).toBeTruthy();
  });
});

SIZES.forEach((size) => {
  it(`Should apply "${size}" size`, () => {
    render(
      <Chip data-testid={CHIP_TEST_ID} size={size}>
        Chip
      </Chip>
    );
    const chip = screen.getByTestId(CHIP_TEST_ID);
    expect(chip.getAttribute('data-size')).toBe(size);
    expect(chip.classList.contains(styles[size])).toBeTruthy();
  });
});

it('Should toggle pressed state on click', () => {
  render(<Chip data-testid={CHIP_TEST_ID}>Chip</Chip>);
  const chip = screen.getByTestId(CHIP_TEST_ID);

  expect(chip.getAttribute('data-state')).toBe('off');
  expect(chip.getAttribute('aria-pressed')).toBe('false');

  act(() => chip.click());

  expect(chip.getAttribute('data-state')).toBe('on');
  expect(chip.getAttribute('aria-pressed')).toBe('true');

  act(() => chip.click());

  expect(chip.getAttribute('data-state')).toBe('off');
  expect(chip.getAttribute('aria-pressed')).toBe('false');
});

it('Should render with defaultPressed', () => {
  render(
    <Chip defaultPressed data-testid={CHIP_TEST_ID}>
      Chip
    </Chip>
  );
  const chip = screen.getByTestId(CHIP_TEST_ID);
  expect(chip.getAttribute('data-state')).toBe('on');
  expect(chip.getAttribute('aria-pressed')).toBe('true');
});

it('Should call onPressedChange', () => {
  const onPressedChange = vi.fn();
  render(
    <Chip data-testid={CHIP_TEST_ID} onPressedChange={onPressedChange}>
      Chip
    </Chip>
  );

  act(() => screen.getByTestId(CHIP_TEST_ID).click());

  expect(onPressedChange).toHaveBeenCalledTimes(1);
  expect(onPressedChange).toHaveBeenCalledWith(true);
});

it('Should work as controlled', () => {
  const onPressedChange = vi.fn();
  const { rerender } = render(
    <Chip data-testid={CHIP_TEST_ID} pressed={false} onPressedChange={onPressedChange}>
      Chip
    </Chip>
  );
  const chip = screen.getByTestId(CHIP_TEST_ID);

  act(() => chip.click());

  expect(onPressedChange).toHaveBeenCalledWith(true);
  expect(chip.getAttribute('data-state')).toBe('off');

  rerender(
    <Chip pressed data-testid={CHIP_TEST_ID} onPressedChange={onPressedChange}>
      Chip
    </Chip>
  );

  expect(screen.getByTestId(CHIP_TEST_ID).getAttribute('data-state')).toBe('on');
});

it('Should render custom icon', () => {
  render(
    <Chip data-testid={CHIP_TEST_ID} icon={<svg data-testid='custom-icon' />}>
      Chip
    </Chip>
  );
  expect(screen.getByTestId('custom-icon')).toBeTruthy();
});

it('Should merge custom className', () => {
  render(
    <Chip className='custom' data-testid={CHIP_TEST_ID}>
      Chip
    </Chip>
  );
  const chip = screen.getByTestId(CHIP_TEST_ID);
  expect(chip.classList.contains('custom')).toBeTruthy();
  expect(chip.classList.contains(styles.chip)).toBeTruthy();
});

it('Should forward native attributes', () => {
  render(
    <Chip aria-label='filter-chip' data-testid={CHIP_TEST_ID} type='submit'>
      Chip
    </Chip>
  );
  const chip = screen.getByTestId(CHIP_TEST_ID);
  expect(chip.getAttribute('type')).toBe('submit');
  expect(chip.getAttribute('aria-label')).toBe('filter-chip');
});

it('Should be disabled', () => {
  const onPressedChange = vi.fn();
  render(
    <Chip disabled data-testid={CHIP_TEST_ID} onPressedChange={onPressedChange}>
      Chip
    </Chip>
  );
  const chip = screen.getByTestId(CHIP_TEST_ID);
  expect(chip.hasAttribute('disabled')).toBeTruthy();
  expect(chip.getAttribute('data-disabled')).toBe('');

  act(() => chip.click());

  expect(onPressedChange).not.toHaveBeenCalled();
  expect(chip.getAttribute('data-state')).toBe('off');
});

it('Should render as child when asChild', () => {
  render(
    <Chip asChild data-testid={CHIP_TEST_ID}>
      <a href='/home'>Link</a>
    </Chip>
  );
  const link = screen.getByTestId(CHIP_TEST_ID);
  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('/home');
  expect(link.getAttribute('data-slot')).toBe('chip');
  expect(link.textContent).toBe('Link');
});
