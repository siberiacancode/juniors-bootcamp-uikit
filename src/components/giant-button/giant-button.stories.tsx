import preview from '../../../.storybook/preview';
import { GiantButton } from './giant-button';

const meta = preview.meta({
  component: GiantButton,
  tags: ['autodocs'],
  args: {
    disabled: false,
    children: 'Button'
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    children: {
      control: 'text'
    }
  }
});

export const Playground = meta.story({});

export const States = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 90, fontSize: 12, opacity: 0.5 }}>default</div>
        <GiantButton>Button</GiantButton>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 90, fontSize: 12, opacity: 0.5 }}>disabled</div>
        <GiantButton disabled>Button</GiantButton>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 90, fontSize: 12, opacity: 0.5 }}>long text</div>
        <GiantButton>Очень длинный текст кнопки</GiantButton>
      </div>
    </div>
  )
});
