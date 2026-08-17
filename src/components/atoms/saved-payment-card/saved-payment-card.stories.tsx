import preview from '../../../../.storybook/preview';
import { SavedPaymentCard } from './saved-payment-card';

const meta = preview.meta({
  component: SavedPaymentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    panSuffix: '0000'
  },
  argTypes: {
    panSuffix: {
      control: 'text'
    }
  }
});

export const Playground = meta.story({});
