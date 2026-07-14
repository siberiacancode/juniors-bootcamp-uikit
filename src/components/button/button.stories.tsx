import preview from '../../../.storybook/preview';

import { Button } from './button';

const meta = preview.meta({
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'Button'
  }
});

export const Playground = meta.story({});
