import preview from '../../../../.storybook/preview';
import { Textarea } from './textarea';

const meta = preview.meta({
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Message',
    disabled: false,
    'aria-invalid': false
  },
  argTypes: {
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    'aria-invalid': {
      control: 'boolean'
    }
  }
});

export const Playground = meta.story({});

export const States = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 420 }}>
      <Textarea aria-label='Empty message' />
      <Textarea aria-label='Message placeholder' placeholder='Message' />
      <Textarea aria-label='Message value' defaultValue='Message' />
      <Textarea aria-invalid aria-label='Message error' defaultValue='Message' />
      <Textarea disabled aria-label='Message disabled' placeholder='Message' />
    </div>
  )
});
