import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import { useEffect } from 'react';
import { addons } from 'storybook/preview-api';

import { ThemeProvider, useTheme } from '../src/theme';
import { getStorybookTheme, STORYBOOK_THEME_CHANGE_EVENT } from './theme';

import '../src/assets/base.css';

const StorybookTheme = () => {
  const { value } = useTheme();
  useEffect(() => {
    addons.getChannel().emit(STORYBOOK_THEME_CHANGE_EVENT, value);
  }, [value]);
  return null;
};

export default definePreview({
  addons: [addonDocs()],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <StorybookTheme />
        <Story />
      </ThemeProvider>
    )
  ],
  parameters: {
    docs: {
      theme: getStorybookTheme()
    }
  }
});
