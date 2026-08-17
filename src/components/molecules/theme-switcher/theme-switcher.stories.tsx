import { MonitorIcon, MoonStarIcon, SunIcon } from 'lucide-react';

import type { Theme } from '../../../theme';

import preview from '../../../../.storybook/preview';
import { useTheme } from '../../../theme';
import { ThemeSwitcher, ThemeSwitcherItem } from './theme-switcher';

const ThemeSwitcherWithProvider = () => {
  const { value, set } = useTheme();

  return (
    <ThemeSwitcher
      aria-label='Theme'
      value={value}
      onValueChange={(nextValue) => set(nextValue as Theme)}
    >
      <ThemeSwitcherItem aria-label='Light theme' value='light'>
        <SunIcon />
      </ThemeSwitcherItem>
      <ThemeSwitcherItem aria-label='System theme' value='system'>
        <MonitorIcon />
      </ThemeSwitcherItem>
      <ThemeSwitcherItem aria-label='Dark theme' value='dark'>
        <MoonStarIcon />
      </ThemeSwitcherItem>
    </ThemeSwitcher>
  );
};

const meta = preview.meta({
  component: ThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      table: { disable: true }
    }
  }
});

export const Playground = meta.story({
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
