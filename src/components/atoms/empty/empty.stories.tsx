import preview from '../../../../.storybook/preview';
import { Empty, EmptyDescription, EmptyTitle } from './empty';

const meta = preview.meta({
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
});

export const Playground = meta.story({
  render: () => (
    <Empty>
      <EmptyTitle>Title</EmptyTitle>
      <EmptyDescription>Description text</EmptyDescription>
    </Empty>
  )
});
