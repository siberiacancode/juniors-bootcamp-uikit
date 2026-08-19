import preview from '../../../../.storybook/preview';
import { Separator } from './separator';

const meta = preview.meta({
  component: Separator,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    decorative: true
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical']
    },
    decorative: {
      control: 'boolean'
    }
  }
});

export const Playground = meta.story({});

export const Vertical = meta.story({
  render: () => (
    <div style={{ height: 80 }}>
      <Separator orientation='vertical' />
    </div>
  )
});
