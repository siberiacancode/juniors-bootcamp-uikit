import { render, screen } from '@testing-library/react';

import { SavedPaymentCard } from './saved-payment-card';

import styles from './saved-payment-card.module.css';

const SAVED_PAYMENT_CARD_TEST_ID = 'saved-payment-card';

it('Should render saved payment card', () => {
  render(<SavedPaymentCard data-testid={SAVED_PAYMENT_CARD_TEST_ID} panSuffix='1234' />);

  const paymentCard = screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID);

  expect(paymentCard.classList.contains(styles.saved_payment_card)).toBeTruthy();
  expect(paymentCard.getAttribute('data-slot')).toBe('saved-payment-card');
  expect(paymentCard.textContent).toContain('jB');
  expect(paymentCard.textContent).toContain('*1234');
  expect(paymentCard.getAttribute('type')).toBe('button');
});

it('Should forward native attributes', () => {
  const onClick = vi.fn();

  render(
    <SavedPaymentCard
      aria-label='Saved card'
      className='custom'
      data-testid={SAVED_PAYMENT_CARD_TEST_ID}
      onClick={onClick}
    />
  );

  const paymentCard = screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID);

  paymentCard.click();

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(paymentCard.getAttribute('aria-label')).toBe('Saved card');
  expect(paymentCard.classList.contains('custom')).toBeTruthy();
});

it('Should render as child when asChild', () => {
  render(
    <SavedPaymentCard asChild data-testid={SAVED_PAYMENT_CARD_TEST_ID} panSuffix='4321'>
      <a href='/payment-cards/4321' />
    </SavedPaymentCard>
  );

  const paymentCard = screen.getByTestId(SAVED_PAYMENT_CARD_TEST_ID);

  expect(paymentCard.tagName).toBe('A');
  expect(paymentCard.getAttribute('href')).toBe('/payment-cards/4321');
  expect(paymentCard.getAttribute('type')).toBeNull();
  expect(paymentCard.textContent).toContain('jB');
  expect(paymentCard.textContent).toContain('*4321');
  expect(paymentCard.classList.contains(styles.saved_payment_card)).toBeTruthy();
});
