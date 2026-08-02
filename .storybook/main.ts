import { defineMain } from '@storybook/react-vite/node';
import { mergeConfig } from 'vite';

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  docs: {
    defaultName: 'juniorsbootcamp uikit',
    docsMode: true
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      base: '/ui-kit/'
    });
  }
});
