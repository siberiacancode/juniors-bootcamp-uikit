import { definePreview } from '@storybook/react-vite';
import addonDocs from '@storybook/addon-docs';

import '../src/assets/global.css';

export default definePreview({
  addons: [addonDocs()],
  tags: ['autodocs']
});
