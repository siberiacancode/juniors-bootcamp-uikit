import preview from '../../../../.storybook/preview';
import { TextInput } from './text-input';

const meta = preview.meta({
  component: TextInput,
  tags: ['autodocs'],
  args: {
    asterisk: false,
    description: 'You are wonderful!',
    disabled: false,
    error: '',
    id: 'username',
    label: 'Username',
    placeholder: 'Your name',
    size: 'md'
  },
  argTypes: {
    asterisk: {
      control: 'boolean'
    },
    description: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    error: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    }
  }
});

export const Playground = meta.story({
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <TextInput {...args} />
    </div>
  )
});

export const States = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 420 }}>
      <TextInput id='text-input-empty' label='Username' placeholder='Your name' />
      <TextInput
        description='You are wonderful!'
        id='text-input-description'
        label='Username'
        placeholder='Your name'
      />
      <TextInput
        defaultValue='And#rey'
        error='Must not contain the characters & or #'
        id='text-input-error'
        label='Username'
        placeholder='Your name'
      />
      <TextInput
        asterisk
        error='This field is required'
        id='text-input-required'
        label='Username'
        placeholder='Your name'
      />
    </div>
  )
});
