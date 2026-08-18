import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { GiantButton } from './giant-button';

import styles from './giant-button.module.css';

const GIANT_BUTTON_TEST_ID = 'giant-button';

testConformance(<GiantButton>Button</GiantButton>, {
  tag: 'BUTTON',
  slot: 'giant-button',
  rootClass: styles.giant_button,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<GiantButton data-testid={GIANT_BUTTON_TEST_ID}>Button</GiantButton>);
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.textContent).toBe('Button');
  expect(giantButton.getAttribute('data-size')).toBe('lg');
  expect(giantButton.classList.contains(styles.giant_button)).toBeTruthy();
});

it('Should render as child when asChild', () => {
  render(
    <GiantButton asChild data-testid={GIANT_BUTTON_TEST_ID}>
      <a href='/start'>Button</a>
    </GiantButton>
  );
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.tagName).toBe('A');
  expect(giantButton.getAttribute('href')).toBe('/start');
  expect(giantButton.getAttribute('type')).toBeNull();
  expect(giantButton.textContent).toBe('Button');
});

it('Should forward native attributes', () => {
  render(
    <GiantButton aria-label='Submit form' data-testid={GIANT_BUTTON_TEST_ID} type='submit'>
      Button
    </GiantButton>
  );
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.getAttribute('type')).toBe('submit');
  expect(giantButton.getAttribute('aria-label')).toBe('Submit form');
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(<GiantButton data-testid={GIANT_BUTTON_TEST_ID} onClick={onClick} />);

  screen.getByTestId(GIANT_BUTTON_TEST_ID).click();

  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(<GiantButton disabled data-testid={GIANT_BUTTON_TEST_ID} onClick={onClick} />);
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.hasAttribute('disabled')).toBeTruthy();

  giantButton.click();

  expect(onClick).not.toHaveBeenCalled();
});
