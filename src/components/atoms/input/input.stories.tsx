import preview from '../../../../.storybook/preview';
import { Input } from './input';

const meta = preview.meta({
  component: Input,
  tags: ['autodocs'],
  args: {
    size: 'md',
    placeholder: 'Text',
    disabled: false,
    'aria-invalid': false
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    'aria-invalid': {
      control: 'boolean'
    },
    asChild: {
      table: { disable: true }
    }
  }
});

export const Playground = meta.story({});

const SIZES = ['lg', 'md', 'sm'] as const;

export const Matrix = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'grid', gap: 28, maxWidth: 960 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.5 }}>{size}</div>
          <Input aria-label={`${size} empty`} size={size} />
          <Input aria-label={`${size} placeholder`} placeholder='Text' size={size} />
          <Input aria-label={`${size} value`} defaultValue='Text' size={size} />
          <Input aria-invalid aria-label={`${size} error`} defaultValue='Text' size={size} />
          <Input disabled aria-label={`${size} disabled`} placeholder='Text' size={size} />
        </div>
      ))}
    </div>
  )
});
