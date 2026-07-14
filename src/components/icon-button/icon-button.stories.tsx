import preview from '../../../.storybook/preview';
import { IconButton } from './icon-button';

const BoxSelectIcon = (
  <svg fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
    <path d='M5 3a2 2 0 0 0-2 2M19 3a2 2 0 0 1 2 2M21 19a2 2 0 0 1-2 2M5 21a2 2 0 0 1-2-2M9 3h1M9 21h1M14 3h1M14 21h1M3 9v1M21 9v1M3 14v1M21 14v1' />
  </svg>
);

const meta = preview.meta({
  component: IconButton,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    disabled: false,
    children: BoxSelectIcon
  }
});

export const Playground = meta.story({});
