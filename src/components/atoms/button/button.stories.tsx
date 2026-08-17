import preview from '../../../../.storybook/preview';
import { Button } from './button';

const meta = preview.meta({
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    children: {
      control: 'text'
    },
    asChild: {
      table: { disable: true }
    }
  }
});

export const Playground = meta.story({});

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;

export const Matrix = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.5 }}>{size}</div>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 90, fontSize: 12, opacity: 0.5 }}>{variant}</div>
              <Button size={size} variant={variant}>
                Button
              </Button>
              <Button disabled size={size} variant={variant}>
                Button
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
});
