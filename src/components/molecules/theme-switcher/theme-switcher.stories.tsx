import preview from '../../../../.storybook/preview';
import { useTheme } from '../../../theme';
import { ThemeSwitcher, ThemeSwitcherItem } from './theme-switcher';

const ThemeSwitcherWithProvider = () => {
  const { value, set } = useTheme();

  return (
    <ThemeSwitcher aria-label='Theme' value={value} onValueChange={set}>
      <ThemeSwitcherItem aria-label='Light theme' value='light' />
      <ThemeSwitcherItem aria-label='System theme' value='system' />
      <ThemeSwitcherItem aria-label='Dark theme' value='dark' />
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
