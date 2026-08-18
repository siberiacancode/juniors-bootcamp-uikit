import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { SavedPaymentCard } from './saved-payment-card';

import styles from './saved-payment-card.module.css';

const SAVED_PAYMENT_CARD_TEST_ID = 'saved-payment-card';

testConformance(<SavedPaymentCard />, {
  tag: 'BUTTON',
  slot: 'saved-payment-card',
  rootClass: styles.saved_payment_card,
  asChild: true,
  asChildTag: 'a'
});

it('Should render as default', () => {
  render(<SavedPaymentCard data-testid={SAVED_PAYMENT_CARD_TEST_ID} />);
  expect(screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID).getAttribute('type')).toBe('button');
  expect(screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID).textContent).toContain('*0000');
});

it('Should render a custom pan suffix', () => {
  render(<SavedPaymentCard data-testid={SAVED_PAYMENT_CARD_TEST_ID} panSuffix='4242' />);
  expect(screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID).textContent).toContain('*4242');
});

it('Should render children next to the card details', () => {
  render(<SavedPaymentCard data-testid={SAVED_PAYMENT_CARD_TEST_ID}>Visa</SavedPaymentCard>);
  expect(screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID).textContent).toContain('Visa');
});

it('Should handle click', () => {
  const onClick = vi.fn();
  render(<SavedPaymentCard data-testid={SAVED_PAYMENT_CARD_TEST_ID} onClick={onClick} />);
  screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});
