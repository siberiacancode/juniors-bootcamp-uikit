import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { ThemeSwitcher } from './theme-switcher';

import styles from './theme-switcher.module.css';

const THEME_SWITCHER_TEST_ID = 'theme-switcher';

it('Should render theme switcher', () => {
  render(
    <ThemeSwitcher aria-label='Theme' data-testid={THEME_SWITCHER_TEST_ID} value='light'>
      <ThemeSwitcher.Item aria-label='Day theme' value='light' />
      <ThemeSwitcher.Item aria-label='Night theme' value='dark' />
    </ThemeSwitcher>
  );

  const themeSwitcher = screen.getByTestId(THEME_SWITCHER_TEST_ID);

  expect(themeSwitcher.classList.contains(styles.theme_switcher)).toBeTruthy();
  expect(screen.getByLabelText('Day theme')).toBeInTheDocument();
  expect(screen.getByLabelText('Night theme')).toBeInTheDocument();
});

it('Should change active value', () => {
  const onValueChange = vi.fn();

  const ControlledThemeSwitcher = () => {
    const [value, setValue] = useState('light');

    const handleValueChange = (nextValue: string) => {
      setValue(nextValue);
      onValueChange(nextValue);
    };

    return (
      <ThemeSwitcher
        aria-label='Theme'
        data-testid={THEME_SWITCHER_TEST_ID}
        value={value}
        onValueChange={handleValueChange}
      >
        <ThemeSwitcher.Item aria-label='Light theme' value='light' />
        <ThemeSwitcher.Item aria-label='Dark theme' value='dark' />
      </ThemeSwitcher>
    );
  };

  render(<ControlledThemeSwitcher />);

  const darkButton = screen.getByLabelText('Dark theme');

  fireEvent.click(darkButton);

  expect(darkButton.getAttribute('aria-pressed')).toBe('true');
  expect(onValueChange).toHaveBeenCalledWith('dark');
});

it('Should require ThemeSwitcher root for item', () => {
  expect(() => render(<ThemeSwitcher.Item aria-label='Dark theme' value='dark' />)).toThrow(
    'ThemeSwitcherItem must be used within ThemeSwitcher'
  );
});
