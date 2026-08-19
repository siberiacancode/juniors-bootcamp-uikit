import preview from '../../../../.storybook/preview';
import { Input } from '../input/input';
import { Label } from './label';

const meta = preview.meta({
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Label',
    asterisk: false
  },
  argTypes: {
    children: {
      control: 'text'
    },
    asterisk: {
      control: 'boolean'
    }
  }
});

export const Playground = meta.story({});

export const WithInput = meta.story({
  render: () => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 302 }}>
      <Label asterisk htmlFor='overview-email'>
        Email
      </Label>
      <Input id='overview-email' placeholder='hello@bootcamp.dev' />
    </div>
  )
});
