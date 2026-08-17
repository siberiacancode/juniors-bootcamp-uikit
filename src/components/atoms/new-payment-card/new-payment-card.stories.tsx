import preview from '../../../../.storybook/preview';
import { NewPaymentCard } from './new-payment-card';

const meta = preview.meta({
  component: NewPaymentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    children: 'Новая карта'
  }
});

export const Playground = meta.story({});
