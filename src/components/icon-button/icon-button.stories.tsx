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
    'aria-label': 'Select area',
    children: BoxSelectIcon
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
    shape: {
      control: 'radio',
      options: ['rounded', 'round']
    },
    disabled: {
      control: 'boolean'
    },
    children: {
      table: { disable: true }
    },
    asChild: {
      table: { disable: true }
    }
  }
});

export const Playground = meta.story({});

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const SHAPES = ['rounded', 'round'] as const;

export const Matrix = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {SHAPES.map((shape) => (
        <div key={shape} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ fontSize: 12, opacity: 0.5 }}>{shape}</div>
          {SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.5 }}>{size}</div>
              {VARIANTS.map((variant) => (
                <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 90, fontSize: 12, opacity: 0.5 }}>{variant}</div>
                  <IconButton aria-label='action' shape={shape} size={size} variant={variant}>
                    {BoxSelectIcon}
                  </IconButton>
                  <IconButton
                    disabled
                    aria-label='action'
                    shape={shape}
                    size={size}
                    variant={variant}
                  >
                    {BoxSelectIcon}
                  </IconButton>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
});
