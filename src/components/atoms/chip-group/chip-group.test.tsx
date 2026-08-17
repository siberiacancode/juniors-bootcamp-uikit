import { fireEvent, render, screen } from '@testing-library/react';

import { ChipGroup, ChipGroupItem } from './chip-group';

import styles from './chip-group.module.css';

const CHIP_GROUP_TEST_ID = 'chip-group';
const CHIP_GROUP_ITEM_TEST_ID = 'chip-group-item';

const getChipGroupItemTestId = (index: number) => `${CHIP_GROUP_ITEM_TEST_ID}-${index}`;

it('Should render chip group', () => {
  render(
    <ChipGroup data-testid={CHIP_GROUP_TEST_ID} type='single'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const group = screen.getByTestId(CHIP_GROUP_TEST_ID);

  expect(group.classList.contains(styles.chip_group)).toBeTruthy();
  expect(group.classList.contains(styles.horizontal)).toBeTruthy();
  expect(group.getAttribute('data-slot')).toBe('chip-group');
  expect(group.getAttribute('data-orientation')).toBe('horizontal');
});

it('Should render chip group item', () => {
  render(
    <ChipGroup type='single'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
    </ChipGroup>
  );

  const item = screen.getByTestId(getChipGroupItemTestId(0));

  expect(item.textContent).toBe('First');
  expect(item.getAttribute('data-slot')).toBe('chip-group-item');
});

it('Should render multiple chip group', () => {
  render(
    <ChipGroup data-testid={CHIP_GROUP_TEST_ID} type='multiple'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const group = screen.getByTestId(CHIP_GROUP_TEST_ID);

  expect(group.getAttribute('role')).toBe('toolbar');
});

it('Should apply vertical orientation', () => {
  render(
    <ChipGroup data-testid={CHIP_GROUP_TEST_ID} orientation='vertical' type='single'>
      <ChipGroupItem value='first'>First</ChipGroupItem>
    </ChipGroup>
  );

  const group = screen.getByTestId(CHIP_GROUP_TEST_ID);

  expect(group.getAttribute('data-orientation')).toBe('vertical');
  expect(group.classList.contains(styles.vertical)).toBeTruthy();
});

it('Should merge custom className', () => {
  render(
    <ChipGroup className='custom' data-testid={CHIP_GROUP_TEST_ID} type='single'>
      <ChipGroupItem value='first'>First</ChipGroupItem>
    </ChipGroup>
  );

  const group = screen.getByTestId(CHIP_GROUP_TEST_ID);

  expect(group.classList.contains('custom')).toBeTruthy();
  expect(group.classList.contains(styles.chip_group)).toBeTruthy();
});

it('Should forward native attributes', () => {
  render(
    <ChipGroup
      aria-label='Available filters'
      data-testid={CHIP_GROUP_TEST_ID}
      id='filters'
      type='single'
    >
      <ChipGroupItem value='first'>First</ChipGroupItem>
    </ChipGroup>
  );

  const group = screen.getByTestId(CHIP_GROUP_TEST_ID);

  expect(group.getAttribute('aria-label')).toBe('Available filters');
  expect(group.getAttribute('id')).toBe('filters');
});

it('Should apply default value in single group', () => {
  render(
    <ChipGroup defaultValue='second' type='single'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  expect(firstItem.getAttribute('aria-checked')).toBe('false');
  expect(secondItem.getAttribute('aria-checked')).toBe('true');
});

it('Should select item in single group', () => {
  render(
    <ChipGroup type='single'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  fireEvent.click(firstItem);

  expect(firstItem.getAttribute('aria-checked')).toBe('true');
  expect(secondItem.getAttribute('aria-checked')).toBe('false');
});

it('Should change selected item in single group', () => {
  render(
    <ChipGroup defaultValue='first' type='single'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  fireEvent.click(secondItem);

  expect(firstItem.getAttribute('aria-checked')).toBe('false');
  expect(secondItem.getAttribute('aria-checked')).toBe('true');
});

it('Should call onValueChange in single group', () => {
  const onValueChange = vi.fn();

  render(
    <ChipGroup type='single' onValueChange={onValueChange}>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
    </ChipGroup>
  );

  fireEvent.click(screen.getByTestId(getChipGroupItemTestId(0)));

  expect(onValueChange).toHaveBeenCalledTimes(1);
  expect(onValueChange).toHaveBeenCalledWith('first');
});

it('Should apply default value in multiple group', () => {
  render(
    <ChipGroup defaultValue={['first']} type='multiple'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  expect(firstItem.getAttribute('aria-pressed')).toBe('true');
  expect(secondItem.getAttribute('aria-pressed')).toBe('false');
});

it('Should select multiple items', () => {
  render(
    <ChipGroup type='multiple'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  fireEvent.click(firstItem);
  fireEvent.click(secondItem);

  expect(firstItem.getAttribute('aria-pressed')).toBe('true');
  expect(secondItem.getAttribute('aria-pressed')).toBe('true');
});

it('Should unselect item in multiple group', () => {
  render(
    <ChipGroup defaultValue={['first', 'second']} type='multiple'>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  fireEvent.click(firstItem);

  expect(firstItem.getAttribute('aria-pressed')).toBe('false');
  expect(secondItem.getAttribute('aria-pressed')).toBe('true');
});

it('Should call onValueChange in multiple group', () => {
  const onValueChange = vi.fn();

  render(
    <ChipGroup defaultValue={['first']} type='multiple' onValueChange={onValueChange}>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  fireEvent.click(screen.getByTestId(getChipGroupItemTestId(1)));

  expect(onValueChange).toHaveBeenCalledTimes(1);
  expect(onValueChange).toHaveBeenCalledWith(['first', 'second']);
});

it('Should disable all items when group is disabled', () => {
  const onValueChange = vi.fn();

  render(
    <ChipGroup disabled type='single' onValueChange={onValueChange}>
      <ChipGroupItem data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  expect(firstItem.hasAttribute('disabled')).toBeTruthy();
  expect(secondItem.hasAttribute('disabled')).toBeTruthy();

  fireEvent.click(firstItem);

  expect(onValueChange).not.toHaveBeenCalled();
});

it('Should disable individual item', () => {
  const onValueChange = vi.fn();

  render(
    <ChipGroup type='single' onValueChange={onValueChange}>
      <ChipGroupItem disabled data-testid={getChipGroupItemTestId(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={getChipGroupItemTestId(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

  const firstItem = screen.getByTestId(getChipGroupItemTestId(0));
  const secondItem = screen.getByTestId(getChipGroupItemTestId(1));

  expect(firstItem.hasAttribute('disabled')).toBeTruthy();
  expect(secondItem.hasAttribute('disabled')).toBeFalsy();

  fireEvent.click(firstItem);

  expect(onValueChange).not.toHaveBeenCalled();
});

it('Should forward item native attributes', () => {
  render(
    <ChipGroup type='single'>
      <ChipGroupItem
        aria-label='First filter'
        className='custom'
        data-testid={getChipGroupItemTestId(0)}
        id='first-filter'
        value='first'
      >
        First
      </ChipGroupItem>
    </ChipGroup>
  );

  const item = screen.getByTestId(getChipGroupItemTestId(0));

  expect(item.getAttribute('aria-label')).toBe('First filter');
  expect(item.getAttribute('id')).toBe('first-filter');
  expect(item.classList.contains('custom')).toBeTruthy();
});

it('Should throw when item is rendered outside group', () => {
  expect(() => render(<ChipGroupItem value='first'>First</ChipGroupItem>)).toThrow(
    'ChipGroupItem must be used within ChipGroup'
  );
});
