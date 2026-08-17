import { create } from 'storybook/theming';

export type StorybookThemeValue = 'dark' | 'light' | 'system';
export type StorybookResolvedTheme = Exclude<StorybookThemeValue, 'system'>;
export const STORYBOOK_THEME_CHANGE_EVENT = 'uikit/theme-change';

const STORAGE_KEY = 'theme';

const getPublicAssetPath = (path: string) => {
  if (typeof document === 'undefined') return path;
  return new URL(path, document.baseURI).href;
};

const DARK_LOGO_PATH = getPublicAssetPath('brand/dark-logo-full.png');
const LIGHT_LOGO_PATH = getPublicAssetPath('brand/light-logo-full.png');

export const storybookLightTheme = create({
  base: 'light',
  brandTitle: 'juniorsbootcamp',
  brandImage: DARK_LOGO_PATH,
  brandTarget: '_self',
  brandUrl: '/',
  colorPrimary: '#0b0b0b',
  colorSecondary: '#8b5cf6',
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#ebebeb',
  appBorderRadius: 8,
  textColor: '#0b0b0b',
  textInverseColor: '#ffffff',
  barTextColor: '#969696',
  barSelectedColor: '#0b0b0b',
  barHoverColor: '#2e2e2e',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#ebebeb',
  inputTextColor: '#0b0b0b',
  inputBorderRadius: 8
});

export const storybookDarkTheme = create({
  base: 'dark',
  brandTitle: 'juniorsbootcamp',
  brandImage: LIGHT_LOGO_PATH,
  brandTarget: '_self',
  brandUrl: '/',
  colorPrimary: '#f5f5f5',
  colorSecondary: '#a78bfa',
  appBg: '#0b0b0b',
  appContentBg: '#2e2e2e',
  appPreviewBg: '#0b0b0b',
  appBorderColor: '#d4d4d4',
  appBorderRadius: 8,
  textColor: '#fbfbfb',
  textInverseColor: '#0b0b0b',
  barTextColor: '#d4d4d4',
  barSelectedColor: '#fbfbfb',
  barHoverColor: '#f5f5f5',
  barBg: '#2e2e2e',
  inputBg: '#2e2e2e',
  inputBorder: '#d4d4d4',
  inputTextColor: '#fbfbfb',
  inputBorderRadius: 8
});

export const isStorybookThemeValue = (value: string | null): value is StorybookThemeValue =>
  value === 'light' || value === 'dark' || value === 'system';

export const getStoredStorybookTheme = () => {
  if (typeof window === 'undefined') return 'system';
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isStorybookThemeValue(storedTheme) ? storedTheme : 'system';
};

export const getSystemStorybookTheme = (): StorybookResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  if (!window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const resolveStorybookTheme = (
  value: StorybookThemeValue = getStoredStorybookTheme()
): StorybookResolvedTheme => (value === 'system' ? getSystemStorybookTheme() : value);

export const getStorybookTheme = (value?: StorybookThemeValue) =>
  resolveStorybookTheme(value) === 'dark' ? storybookDarkTheme : storybookLightTheme;
