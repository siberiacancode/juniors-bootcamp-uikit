import { defineMain } from '@storybook/react-vite/node';
import { mergeConfig } from 'vite';

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  docs: {
    defaultName: 'juniorsbootcamp uikit'
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      base: '/ui-kit/'
    })
});
