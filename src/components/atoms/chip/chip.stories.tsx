import preview from '../../../../.storybook/preview';
import { Chip } from './chip';

const meta = preview.meta({
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md']
    },
    disabled: {
      control: 'boolean'
    },
    defaultPressed: {
      control: 'boolean'
    },
    icon: {
      table: { disable: true }
    }
  }
});

export const Playground = meta.story({
  args: {
    variant: 'accent',
    size: 'md',
    disabled: false,
    defaultPressed: false,
    children: 'Chip'
  }
});

const VARIANTS = ['default', 'primary', 'accent'] as const;
const SIZES = ['md', 'sm'] as const;

export const Matrix = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.5 }}>{size}</div>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 80, fontSize: 12, opacity: 0.5 }}>{variant}</div>
              <Chip size={size} variant={variant}>
                Chip
              </Chip>
              <Chip defaultPressed size={size} variant={variant}>
                Chip
              </Chip>
              <Chip disabled size={size} variant={variant}>
                Chip
              </Chip>
              <Chip defaultPressed disabled size={size} variant={variant}>
                Chip
              </Chip>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
});
