import { addons } from 'storybook/manager-api';

import {
  getStoredStorybookTheme,
  getStorybookTheme,
  isStorybookThemeValue,
  resolveStorybookTheme,
  STORYBOOK_THEME_CHANGE_EVENT
} from './theme';

let currentTheme = resolveStorybookTheme();

const setStorybookTheme = (value = getStoredStorybookTheme()) => {
  const nextTheme = resolveStorybookTheme(value);
  if (nextTheme === currentTheme) return;

  currentTheme = nextTheme;
  addons.setConfig({ theme: getStorybookTheme(value) });
};

addons.setConfig({ theme: getStorybookTheme() });

addons.register('theme-sync', () => {
  addons.getChannel().on(STORYBOOK_THEME_CHANGE_EVENT, (value) => {
    if (!isStorybookThemeValue(value)) return;

    setStorybookTheme(value);
  });
});

window.addEventListener('storage', (event) => {
  if (event.key !== 'theme') return;
  if (!isStorybookThemeValue(event.newValue)) return;

  setStorybookTheme(event.newValue);
});

window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => {
  setStorybookTheme();
});
