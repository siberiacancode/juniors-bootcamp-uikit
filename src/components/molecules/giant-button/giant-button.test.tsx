import { render, screen } from '@testing-library/react';

import { GiantButton } from './giant-button';

import styles from './giant-button.module.css';

const GIANT_BUTTON_TEST_ID = 'giant-button';

it('Should render giant button', () => {
  render(<GiantButton data-testid={GIANT_BUTTON_TEST_ID}>Button</GiantButton>);

  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.tagName).toBe('BUTTON');
  expect(giantButton.textContent).toBe('Button');
  expect(giantButton.classList.contains(styles.giant_button)).toBeTruthy();
  expect(giantButton.getAttribute('data-slot')).toBe('giant-button');
});

it('Should render children', () => {
  render(<GiantButton data-testid={GIANT_BUTTON_TEST_ID}>Button</GiantButton>);

  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.textContent).toBe('Button');
});

it('Should merge custom className', () => {
  render(
    <GiantButton className='custom' data-testid={GIANT_BUTTON_TEST_ID}>
      Button
    </GiantButton>
  );
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);
  expect(giantButton.classList.contains('custom')).toBeTruthy();
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
  expect(giantButton.classList.contains(styles.giant_button)).toBeTruthy();
});

it('Should forward native attributes', () => {
  render(
    <GiantButton aria-label='submit-button' data-testid={GIANT_BUTTON_TEST_ID} type='submit'>
      Button
    </GiantButton>
  );
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);
  expect(giantButton.getAttribute('type')).toBe('submit');
  expect(giantButton.getAttribute('aria-label')).toBe('submit-button');
});
