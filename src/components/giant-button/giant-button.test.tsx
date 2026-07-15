import { render, screen } from '@testing-library/react';

import { GiantButton } from './giant-button';

import styles from './giant-button.module.css';

const GIANT_BUTTON_TEST_ID = 'giant-button';

it('Should render giant button', () => {
  render(<GiantButton data-testid={GIANT_BUTTON_TEST_ID}>Button</GiantButton>);

  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);

  expect(giantButton.tagName).toBe('BUTTON');
  expect(giantButton.textContent).toBe('Button');
  expect(giantButton.classList.contains(styles.giantButton)).toBeTruthy();
  expect(giantButton.getAttribute('data-slot')).toBe('giant-button');
  expect(giantButton.getAttribute('type')).toBe('button');
});

it('Should render shadow and children', () => {
  render(<GiantButton data-testid={GIANT_BUTTON_TEST_ID}>Button</GiantButton>);

  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);
  const shadow = giantButton.querySelector(`.${styles.shadow}`);

  expect(shadow).toBeTruthy();
  expect(shadow?.getAttribute('aria-hidden')).toBe('true');
  expect(shadow?.textContent).toBe('');
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
  expect(giantButton.classList.contains(styles.giantButton)).toBeTruthy();
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

it('Should handle click', () => {
  const onClick = vi.fn();
  render(
    <GiantButton data-testid={GIANT_BUTTON_TEST_ID} onClick={onClick}>
      Button
    </GiantButton>
  );
  screen.getByTestId(GIANT_BUTTON_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(
    <GiantButton disabled data-testid={GIANT_BUTTON_TEST_ID} onClick={onClick}>
      Button
    </GiantButton>
  );
  const giantButton = screen.getByTestId(GIANT_BUTTON_TEST_ID);
  expect(giantButton.hasAttribute('disabled')).toBeTruthy();
  giantButton.click();
  expect(onClick).not.toHaveBeenCalled();
});
