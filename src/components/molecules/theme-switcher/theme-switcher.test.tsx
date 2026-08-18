import type { ComponentProps } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import type { Theme } from '../../../theme';

import { testConformance } from '../../../../tests/describe-conformance';
import { ThemeSwitcher, ThemeSwitcherItem } from './theme-switcher';

import styles from './theme-switcher.module.css';

const THEMES: Theme[] = ['light', 'system', 'dark'];

const ROOT_TEST_ID = 'theme-switcher';
const ITEM_TEST_ID = (theme: Theme) => `theme-switcher-item-${theme}`;

const renderSwitcher = (props: Partial<ComponentProps<typeof ThemeSwitcher>> = {}) =>
  render(
    <ThemeSwitcher data-testid={ROOT_TEST_ID} {...props}>
      {THEMES.map((theme) => (
        <ThemeSwitcherItem key={theme} data-testid={ITEM_TEST_ID(theme)} value={theme} />
      ))}
    </ThemeSwitcher>
  );

describe('ThemeSwitcher', () => {
  testConformance(<ThemeSwitcher aria-label='Theme' />, {
    tag: 'DIV',
    slot: 'theme-switcher',
    rootClass: styles.theme_switcher
  });

  it('Should render as default', () => {
    renderSwitcher();
    expect(screen.getByTestId(ROOT_TEST_ID).getAttribute('role')).toBe('group');
  });
});

describe('ThemeSwitcherItem', () => {
  testConformance(<ThemeSwitcherItem value='light' />, {
    tag: 'BUTTON',
    slot: 'theme-switcher-item',
    rootClass: styles.theme_switcher_button,
    wrapper: (node) => <ThemeSwitcher aria-label='Theme'>{node}</ThemeSwitcher>
  });

  it('Should render as default', () => {
    renderSwitcher({ value: 'light' });
    expect(screen.getByTestId(ITEM_TEST_ID('light')).getAttribute('data-slot')).toBe(
      'theme-switcher-item'
    );
  });

  it('Should mark the matching item as pressed', () => {
    renderSwitcher({ value: 'dark' });
    const active = screen.getByTestId(ITEM_TEST_ID('dark'));
    expect(active.getAttribute('aria-pressed')).toBe('true');
    expect(active.getAttribute('data-variant')).toBe('primary');
    expect(active.classList.contains(styles.active)).toBeTruthy();
  });

  it('Should keep non-matching items unpressed', () => {
    renderSwitcher({ value: 'dark' });
    const inactive = screen.getByTestId(ITEM_TEST_ID('light'));
    expect(inactive.getAttribute('aria-pressed')).toBe('false');
    expect(inactive.getAttribute('data-variant')).toBe('ghost');
    expect(inactive.classList.contains(styles.active)).toBeFalsy();
  });

  it('Should call onValueChange with its own value on click', () => {
    const onValueChange = vi.fn();
    renderSwitcher({ value: 'light', onValueChange });
    fireEvent.click(screen.getByTestId(ITEM_TEST_ID('dark')));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('dark');
  });

  it('Should compose a custom onClick with the context handler', () => {
    const onClick = vi.fn();
    const onValueChange = vi.fn();
    render(
      <ThemeSwitcher value='light' onValueChange={onValueChange}>
        <ThemeSwitcherItem data-testid={ITEM_TEST_ID('dark')} value='dark' onClick={onClick} />
      </ThemeSwitcher>
    );
    fireEvent.click(screen.getByTestId(ITEM_TEST_ID('dark')));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('dark');
  });

  it('Should not call onValueChange when the click is prevented', () => {
    const onValueChange = vi.fn();
    render(
      <ThemeSwitcher value='light' onValueChange={onValueChange}>
        <ThemeSwitcherItem
          data-testid={ITEM_TEST_ID('dark')}
          value='dark'
          onClick={(event) => event.preventDefault()}
        />
      </ThemeSwitcher>
    );
    fireEvent.click(screen.getByTestId(ITEM_TEST_ID('dark')));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Should throw when rendered outside the switcher', () => {
    expect(() => render(<ThemeSwitcherItem value='light' />)).toThrow(
      'ThemeSwitcherItem must be used within ThemeSwitcher'
    );
  });
});

describe('ThemeSwitcher controlled', () => {
  const Controlled = ({ onValueChange }: { onValueChange: (theme: Theme) => void }) => {
    const [value, setValue] = useState<Theme>('light');
    return (
      <ThemeSwitcher
        value={value}
        onValueChange={(next) => {
          onValueChange(next);
          setValue(next);
        }}
      >
        {THEMES.map((theme) => (
          <ThemeSwitcherItem key={theme} data-testid={ITEM_TEST_ID(theme)} value={theme} />
        ))}
      </ThemeSwitcher>
    );
  };

  it('Should move the active state as external value changes', () => {
    const onValueChange = vi.fn();
    render(<Controlled onValueChange={onValueChange} />);
    const light = screen.getByTestId(ITEM_TEST_ID('light'));
    const dark = screen.getByTestId(ITEM_TEST_ID('dark'));

    expect(light.getAttribute('aria-pressed')).toBe('true');
    expect(dark.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(dark);

    expect(onValueChange).toHaveBeenCalledWith('dark');
    expect(light.getAttribute('aria-pressed')).toBe('false');
    expect(dark.getAttribute('aria-pressed')).toBe('true');
  });
});

describe('ThemeSwitcher a11y', () => {
  it('Should have no accessibility violations', async () => {
    const { container } = render(
      <ThemeSwitcher aria-label='Theme' value='light'>
        {THEMES.map((theme) => (
          <ThemeSwitcherItem key={theme} data-testid={ITEM_TEST_ID(theme)} value={theme} />
        ))}
      </ThemeSwitcher>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
