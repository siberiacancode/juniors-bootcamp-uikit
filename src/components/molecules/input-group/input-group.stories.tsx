import { SearchIcon, XIcon } from 'lucide-react';

import preview from '../../../../.storybook/preview';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea
} from './input-group';

const meta = preview.meta({
  component: InputGroup,
  tags: ['autodocs'],
  args: {
    size: 'md'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    }
  }
});

export const Playground = meta.story({
  render: ({ size }) => (
    <InputGroup size={size} style={{ maxWidth: 302 }}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput aria-label='Search' placeholder='Text' />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton aria-label='Clear' size='icon-xs'>
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
});

const SIZES = ['lg', 'md', 'sm'] as const;

export const Matrix = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <div style={{ display: 'grid', gap: 28, maxWidth: 960 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.5 }}>{size}</div>
          <InputGroup size={size}>
            <InputGroupInput aria-label={`${size} empty`} />
          </InputGroup>
          <InputGroup size={size}>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput aria-label={`${size} placeholder`} placeholder='Text' />
          </InputGroup>
          <InputGroup size={size}>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput aria-label={`${size} value`} defaultValue='Text' />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton aria-label='Clear' size='icon-xs'>
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup size={size}>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput aria-invalid aria-label={`${size} error`} defaultValue='Text' />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton aria-label='Clear' size='icon-xs'>
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup size={size}>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput disabled aria-label={`${size} disabled`} placeholder='Text' />
          </InputGroup>
        </div>
      ))}
    </div>
  )
});

export const WithTextarea = meta.story({
  render: () => (
    <InputGroup style={{ maxWidth: 420 }}>
      <InputGroupAddon align='block-start'>Message</InputGroupAddon>
      <InputGroupTextarea aria-label='Message' placeholder='Message' />
    </InputGroup>
  )
});
