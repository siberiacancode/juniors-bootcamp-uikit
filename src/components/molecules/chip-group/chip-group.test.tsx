import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { testConformance } from '../../../../tests/describe-conformance';
import { ChipGroup, ChipGroupItem } from './chip-group';

import chipStyles from '../../atoms/chip/chip.module.css';
import styles from './chip-group.module.css';

const CHIP_GROUP_TEST_ID = 'chip-group';
const ITEM_TEST_ID = (index: number) => `chip-group-item-${index}`;

const renderChipGroup = (type: 'multiple' | 'single' = 'single') =>
  render(
    <ChipGroup aria-label='Filters' data-testid={CHIP_GROUP_TEST_ID} type={type}>
      <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
        First
      </ChipGroupItem>
      <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
        Second
      </ChipGroupItem>
    </ChipGroup>
  );

describe('ChipGroup', () => {
  testConformance(<ChipGroup aria-label='Filters' type='multiple' />, {
    tag: 'DIV',
    slot: 'chip-group',
    rootClass: styles.chip_group
  });

  it('Should render as default', () => {
    renderChipGroup();
    const group = screen.getByTestId(CHIP_GROUP_TEST_ID);

    expect(group.classList.contains(styles.chip_group)).toBeTruthy();
    expect(group.classList.contains(styles.horizontal)).toBeTruthy();
    expect(group.getAttribute('data-orientation')).toBe('horizontal');
    expect(group.getAttribute('role')).toBe('radiogroup');
  });

  it('Should render multiple chip group', () => {
    renderChipGroup('multiple');
    expect(screen.getByTestId(CHIP_GROUP_TEST_ID).getAttribute('role')).toBe('toolbar');
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
});

describe('ChipGroupItem', () => {
  testConformance(<ChipGroupItem value='first'>First</ChipGroupItem>, {
    tag: 'BUTTON',
    slot: 'chip-group-item',
    rootClass: chipStyles.chip,
    asChild: true,
    asChildTag: 'a',
    wrapper: (node) => (
      <ChipGroup aria-label='Filters' type='single'>
        {node}
      </ChipGroup>
    )
  });

  it('Should render as default', () => {
    renderChipGroup();
    const item = screen.getByTestId(ITEM_TEST_ID(0));

    expect(item.textContent).toContain('First');
    expect(item.getAttribute('data-slot')).toBe('chip-group-item');
    expect(item.getAttribute('role')).toBe('radio');
    expect(item.getAttribute('aria-checked')).toBe('false');
    expect(item.getAttribute('aria-pressed')).toBeNull();
  });

  it('Should apply default value in single group', () => {
    render(
      <ChipGroup defaultValue='second' type='single'>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );

    expect(screen.getByTestId(ITEM_TEST_ID(0)).getAttribute('aria-checked')).toBe('false');
    expect(screen.getByTestId(ITEM_TEST_ID(1)).getAttribute('aria-checked')).toBe('true');
  });

  it('Should select item in single group', () => {
    renderChipGroup();
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));
    const secondItem = screen.getByTestId(ITEM_TEST_ID(1));

    fireEvent.click(firstItem);

    expect(firstItem.getAttribute('aria-checked')).toBe('true');
    expect(secondItem.getAttribute('aria-checked')).toBe('false');
  });

  it('Should change selected item in single group', () => {
    render(
      <ChipGroup defaultValue='first' type='single'>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));
    const secondItem = screen.getByTestId(ITEM_TEST_ID(1));

    fireEvent.click(secondItem);

    expect(firstItem.getAttribute('aria-checked')).toBe('false');
    expect(secondItem.getAttribute('aria-checked')).toBe('true');
  });

  it('Should unselect item in single group', () => {
    const onValueChange = vi.fn();
    render(
      <ChipGroup defaultValue='first' type='single' onValueChange={onValueChange}>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
      </ChipGroup>
    );
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));

    fireEvent.click(firstItem);

    expect(firstItem.getAttribute('aria-checked')).toBe('false');
    expect(onValueChange).toHaveBeenCalledWith('');
  });

  it('Should call onValueChange in single group', () => {
    const onValueChange = vi.fn();
    render(
      <ChipGroup type='single' onValueChange={onValueChange}>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
      </ChipGroup>
    );

    fireEvent.click(screen.getByTestId(ITEM_TEST_ID(0)));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('first');
  });

  it('Should apply default value in multiple group', () => {
    render(
      <ChipGroup defaultValue={['first']} type='multiple'>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );

    expect(screen.getByTestId(ITEM_TEST_ID(0)).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByTestId(ITEM_TEST_ID(1)).getAttribute('aria-pressed')).toBe('false');
  });

  it('Should select multiple items', () => {
    renderChipGroup('multiple');
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));
    const secondItem = screen.getByTestId(ITEM_TEST_ID(1));

    fireEvent.click(firstItem);
    fireEvent.click(secondItem);

    expect(firstItem.getAttribute('aria-pressed')).toBe('true');
    expect(secondItem.getAttribute('aria-pressed')).toBe('true');
  });

  it('Should unselect item in multiple group', () => {
    render(
      <ChipGroup defaultValue={['first', 'second']} type='multiple'>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));
    const secondItem = screen.getByTestId(ITEM_TEST_ID(1));

    fireEvent.click(firstItem);

    expect(firstItem.getAttribute('aria-pressed')).toBe('false');
    expect(secondItem.getAttribute('aria-pressed')).toBe('true');
  });

  it('Should call onValueChange in multiple group', () => {
    const onValueChange = vi.fn();
    render(
      <ChipGroup defaultValue={['first']} type='multiple' onValueChange={onValueChange}>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );

    fireEvent.click(screen.getByTestId(ITEM_TEST_ID(1)));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(['first', 'second']);
  });

  it('Should disable all items when group is disabled', () => {
    const onValueChange = vi.fn();
    render(
      <ChipGroup disabled type='single' onValueChange={onValueChange}>
        <ChipGroupItem data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));
    const secondItem = screen.getByTestId(ITEM_TEST_ID(1));

    expect(firstItem.hasAttribute('disabled')).toBeTruthy();
    expect(secondItem.hasAttribute('disabled')).toBeTruthy();

    fireEvent.click(firstItem);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Should disable individual item', () => {
    const onValueChange = vi.fn();
    render(
      <ChipGroup type='single' onValueChange={onValueChange}>
        <ChipGroupItem disabled data-testid={ITEM_TEST_ID(0)} value='first'>
          First
        </ChipGroupItem>
        <ChipGroupItem data-testid={ITEM_TEST_ID(1)} value='second'>
          Second
        </ChipGroupItem>
      </ChipGroup>
    );
    const firstItem = screen.getByTestId(ITEM_TEST_ID(0));
    const secondItem = screen.getByTestId(ITEM_TEST_ID(1));

    expect(firstItem.hasAttribute('disabled')).toBeTruthy();
    expect(secondItem.hasAttribute('disabled')).toBeFalsy();

    fireEvent.click(firstItem);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Should throw when rendered outside group', () => {
    expect(() => render(<ChipGroupItem value='first'>First</ChipGroupItem>)).toThrow(
      'ChipGroupItem must be used within ChipGroup'
    );
  });
});

describe('ChipGroup a11y', () => {
  it('Should have no accessibility violations for single group', async () => {
    const { container } = render(
      <ChipGroup aria-label='Filters' defaultValue='first' type='single'>
        <ChipGroupItem value='first'>First</ChipGroupItem>
        <ChipGroupItem value='second'>Second</ChipGroupItem>
      </ChipGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Should have no accessibility violations for multiple group', async () => {
    const { container } = render(
      <ChipGroup aria-label='Filters' defaultValue={['first']} type='multiple'>
        <ChipGroupItem value='first'>First</ChipGroupItem>
        <ChipGroupItem value='second'>Second</ChipGroupItem>
      </ChipGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
