import { act, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import type { ChipSize, ChipVariant } from './chip';

import { testConformance } from '../../../../tests/describe-conformance';
import { Chip } from './chip';

import styles from './chip.module.css';

const VARIANTS: ChipVariant[] = ['default', 'primary', 'accent'];
const SIZES: ChipSize[] = ['sm', 'md'];

const CHIP_TEST_ID = 'chip';

testConformance(<Chip>Chip</Chip>, {
  tag: 'BUTTON',
  slot: 'chip',
  rootClass: styles.chip,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<Chip data-testid={CHIP_TEST_ID}>Chip</Chip>);
  const chip = screen.getByTestId(CHIP_TEST_ID);
  expect(chip.getAttribute('data-variant')).toBe('default');
  expect(chip.getAttribute('data-size')).toBe('md');
  expect(chip.getAttribute('data-state')).toBe('off');
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

it('Should toggle pressed state on click when uncontrolled', () => {
  render(<Chip data-testid={CHIP_TEST_ID}>Chip</Chip>);
  const chip = screen.getByTestId(CHIP_TEST_ID);

  act(() => chip.click());
  expect(chip.getAttribute('data-state')).toBe('on');
  expect(chip.getAttribute('aria-pressed')).toBe('true');

  act(() => chip.click());
  expect(chip.getAttribute('data-state')).toBe('off');
  expect(chip.getAttribute('aria-pressed')).toBe('false');
});

it('Should render pressed with defaultPressed', () => {
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

it('Should stay controlled by prop', () => {
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

it('Should render a custom icon', () => {
  render(
    <Chip data-testid={CHIP_TEST_ID} icon={<svg data-testid='custom-icon' />}>
      Chip
    </Chip>
  );
  expect(screen.getByTestId('custom-icon')).toBeTruthy();
});

it('Should handle click', () => {
  const onClick = vi.fn();

  render(
    <Chip data-testid={CHIP_TEST_ID} onClick={onClick}>
      Chip
    </Chip>
  );

  act(() => screen.getByTestId(CHIP_TEST_ID).click());

  expect(onClick).toHaveBeenCalledTimes(1);
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
