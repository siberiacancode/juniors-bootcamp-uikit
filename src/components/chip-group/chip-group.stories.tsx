import preview from '../../../.storybook/preview';
import { ChipGroup, ChipGroupItem } from './chip-group';

const meta = preview.meta({
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
});

export const Single = meta.story({
  render: () => (
    <ChipGroup defaultValue='new' type='single'>
      <ChipGroupItem value='all' variant='accent'>
        Все
      </ChipGroupItem>
      <ChipGroupItem value='new' variant='accent'>
        Новое
      </ChipGroupItem>
      <ChipGroupItem value='sale' variant='accent'>
        Скидки
      </ChipGroupItem>
    </ChipGroup>
  )
});

export const Multiple = meta.story({
  render: () => (
    <ChipGroup defaultValue={['react', 'ts']} type='multiple'>
      <ChipGroupItem value='react' variant='primary'>
        React
      </ChipGroupItem>
      <ChipGroupItem value='ts' variant='primary'>
        TypeScript
      </ChipGroupItem>
      <ChipGroupItem value='css' variant='primary'>
        CSS
      </ChipGroupItem>
    </ChipGroup>
  )
});

export const Small = meta.story({
  render: () => (
    <ChipGroup defaultValue={['react']} type='multiple'>
      <ChipGroupItem size='sm' value='react' variant='accent'>
        React
      </ChipGroupItem>
      <ChipGroupItem size='sm' value='ts' variant='accent'>
        TypeScript
      </ChipGroupItem>
      <ChipGroupItem size='sm' value='css' variant='accent'>
        CSS
      </ChipGroupItem>
    </ChipGroup>
  )
});

export const Vertical = meta.story({
  render: () => (
    <ChipGroup defaultValue='new' orientation='vertical' type='single'>
      <ChipGroupItem value='all' variant='primary'>
        Все
      </ChipGroupItem>
      <ChipGroupItem value='new' variant='primary'>
        Новое
      </ChipGroupItem>
      <ChipGroupItem value='sale' variant='primary'>
        Скидки
      </ChipGroupItem>
    </ChipGroup>
  )
});

export const Disabled = meta.story({
  render: () => (
    <ChipGroup disabled defaultValue={['react']} type='multiple'>
      <ChipGroupItem value='react' variant='accent'>
        React
      </ChipGroupItem>
      <ChipGroupItem value='ts' variant='accent'>
        TypeScript
      </ChipGroupItem>
    </ChipGroup>
  )
});
