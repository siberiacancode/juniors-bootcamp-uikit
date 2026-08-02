import { render, screen } from '@testing-library/react';

import { NewPaymentCard } from './new-payment-card';

import styles from './new-payment-card.module.css';

const NEW_PAYMENT_CARD_TEST_ID = 'new-payment-card';

it('Should render new payment card', () => {
  render(<NewPaymentCard data-testid={NEW_PAYMENT_CARD_TEST_ID}>Новая карта</NewPaymentCard>);

  const newPaymentCard = screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID);

  expect(newPaymentCard.classList.contains(styles.new_payment_card)).toBeTruthy();
  expect(newPaymentCard.getAttribute('data-slot')).toBe('new-payment-card');
  expect(newPaymentCard.textContent).toBe('Новая карта');
});

it('Should render custom text from children', () => {
  render(<NewPaymentCard data-testid={NEW_PAYMENT_CARD_TEST_ID}>Добавить карту</NewPaymentCard>);

  expect(screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID).textContent).toBe('Добавить карту');
});

it('Should forward native attributes', () => {
  const onClick = vi.fn();

  render(
    <NewPaymentCard
      aria-label='Add card'
      className='custom'
      data-testid={NEW_PAYMENT_CARD_TEST_ID}
      onClick={onClick}
    />
  );

  const newPaymentCard = screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID);

  newPaymentCard.click();

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(newPaymentCard.getAttribute('aria-label')).toBe('Add card');
  expect(newPaymentCard.classList.contains('custom')).toBeTruthy();
});

it('Should render as child when asChild', () => {
  render(
    <NewPaymentCard asChild data-testid={NEW_PAYMENT_CARD_TEST_ID}>
      <a href='/payment-cards/new'>Добавить карту</a>
    </NewPaymentCard>
  );

  const newPaymentCard = screen.getByTestId(NEW_PAYMENT_CARD_TEST_ID);

  expect(newPaymentCard.tagName).toBe('A');
  expect(newPaymentCard.getAttribute('href')).toBe('/payment-cards/new');
  expect(newPaymentCard.getAttribute('type')).toBeNull();
  expect(newPaymentCard.textContent).toBe('Добавить карту');
});
