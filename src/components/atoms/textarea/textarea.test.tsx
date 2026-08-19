import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { Textarea } from './textarea';

import styles from './textarea.module.css';

const TEXTAREA_TEST_ID = 'textarea';

testConformance(<Textarea aria-label='Message' />, {
  tag: 'TEXTAREA',
  slot: 'textarea',
  rootClass: styles.textarea,
  asChild: true,
  asChildTag: 'div'
});

it('Should forward textarea attributes', () => {
  render(<Textarea data-testid={TEXTAREA_TEST_ID} placeholder='Message' rows={4} />);
  const textarea = screen.getByTestId(TEXTAREA_TEST_ID);
  expect(textarea.getAttribute('placeholder')).toBe('Message');
  expect(textarea.getAttribute('rows')).toBe('4');
});

it('Should render invalid state', () => {
  render(<Textarea aria-invalid data-testid={TEXTAREA_TEST_ID} />);
  expect(screen.getByTestId(TEXTAREA_TEST_ID).getAttribute('aria-invalid')).toBe('true');
});

it('Should be disabled', () => {
  render(<Textarea disabled data-testid={TEXTAREA_TEST_ID} />);
  expect(screen.getByTestId(TEXTAREA_TEST_ID).hasAttribute('disabled')).toBeTruthy();
});
