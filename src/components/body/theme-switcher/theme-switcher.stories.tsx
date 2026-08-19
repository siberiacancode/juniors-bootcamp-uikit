import { useState } from 'react';

import type { Theme } from '../../../theme';

import preview from '../../../../.storybook/preview';
import { useTheme } from '../../../theme';
import { ThemeSwitcher } from './theme-switcher';

const ThemeSwitcherControlled = ({ value: initialValue = 'system' }: { value?: Theme }) => {
  const [value, setValue] = useState<Theme>(initialValue);

  return <ThemeSwitcher aria-label='Theme' value={value} onValueChange={setValue} />;
};

const ThemeSwitcherWithProvider = () => {
  const { value, set } = useTheme();

  return <ThemeSwitcher aria-label='Theme' value={value} onValueChange={set} />;
};

const meta = preview.meta({
  component: ThemeSwitcher,
  tags: ['autodocs'],
  args: {
    value: 'system'
  },
  argTypes: {
    items: {
      table: { disable: true }
    },
    onValueChange: {
      table: { disable: true }
    },
    value: {
      control: 'radio',
      options: ['light', 'system', 'dark']
    }
  }
});

export const Playground = meta.story({
  render: ({ value }) => <ThemeSwitcherControlled value={value} />
});

export const Connected = meta.story({
  render: () => <ThemeSwitcherWithProvider />
});

export const InSurface = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div
      style={{
        alignItems: 'center',
        background: 'var(--secondary)',
        border: '1px solid var(--ring)',
        borderRadius: 8,
        display: 'inline-flex',
        padding: 24
      }}
    >
      <ThemeSwitcherWithProvider />
    </div>
  )
});
