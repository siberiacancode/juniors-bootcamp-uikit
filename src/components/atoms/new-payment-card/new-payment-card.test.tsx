import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { NewPaymentCard } from './new-payment-card';

import styles from './new-payment-card.module.css';

const NEW_PAYMENT_CARD_TEST_ID = 'new-payment-card';

testConformance(<NewPaymentCard>Add card</NewPaymentCard>, {
  tag: 'BUTTON',
  slot: 'new-payment-card',
  rootClass: styles.new_payment_card,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<NewPaymentCard data-testid={NEW_PAYMENT_CARD_TEST_ID}>Add card</NewPaymentCard>);
  expect(screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID).textContent).toContain('Add card');
});

it('Should render selected state', () => {
  render(<NewPaymentCard selected data-testid={NEW_PAYMENT_CARD_TEST_ID} />);
  const card = screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID);
  expect(card.getAttribute('aria-pressed')).toBe('true');
  expect(card.getAttribute('data-state')).toBe('selected');
});

it('Should not render the label wrapper without children', () => {
  const { container } = render(<NewPaymentCard data-testid={NEW_PAYMENT_CARD_TEST_ID} />);
  expect(container.querySelector(`.${styles.new_payment_card_label}`)).toBeNull();
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(<NewPaymentCard data-testid={NEW_PAYMENT_CARD_TEST_ID} onClick={onClick} />);
  screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('Should be disabled', () => {
  const onClick = vi.fn();
  render(<NewPaymentCard disabled data-testid={NEW_PAYMENT_CARD_TEST_ID} onClick={onClick} />);
  const card = screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID);
  expect(card.hasAttribute('disabled')).toBeTruthy();
  card.click();
  expect(onClick).not.toHaveBeenCalled();
});
