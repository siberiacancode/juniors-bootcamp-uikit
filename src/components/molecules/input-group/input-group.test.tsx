import { fireEvent, render, screen } from '@testing-library/react';
import { SearchIcon } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import type { InputGroupAddonAlign, InputGroupSize } from './input-group';

import { testConformance } from '../../../../tests/describe-conformance';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from './input-group';

import styles from './input-group.module.css';

const SIZES: InputGroupSize[] = ['sm', 'md', 'lg'];
const ADDON_ALIGNS: InputGroupAddonAlign[] = [
  'inline-start',
  'inline-end',
  'block-start',
  'block-end'
];

const INPUT_GROUP_TEST_ID = 'input-group';
const ADDON_TEST_ID = 'input-group-addon';
const TEXT_TEST_ID = 'input-group-text';
const BUTTON_TEST_ID = 'input-group-button';
const INPUT_TEST_ID = 'input-group-input';
const TEXTAREA_TEST_ID = 'input-group-textarea';

describe('InputGroup', () => {
  testConformance(<InputGroup />, {
    tag: 'DIV',
    slot: 'input-group',
    rootClass: styles.input_group
  });

  it('Should render as default', () => {
    render(<InputGroup data-testid={INPUT_GROUP_TEST_ID} />);
    const inputGroup = screen.getByTestId(INPUT_GROUP_TEST_ID);

    expect(inputGroup.getAttribute('data-size')).toBe('md');
    expect(inputGroup.getAttribute('role')).toBe('group');
  });

  SIZES.forEach((size) => {
    it(`Should apply "${size}" size`, () => {
      render(<InputGroup data-testid={INPUT_GROUP_TEST_ID} size={size} />);
      const inputGroup = screen.getByTestId(INPUT_GROUP_TEST_ID);

      expect(inputGroup.getAttribute('data-size')).toBe(size);
      expect(inputGroup.classList.contains(styles[size])).toBeTruthy();
    });
  });

  it('Should render its slots together', () => {
    render(
      <InputGroup data-testid={INPUT_GROUP_TEST_ID}>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label='Search' placeholder='Text' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton aria-label='Clear'>x</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );

    expect(screen.getByTestId(INPUT_GROUP_TEST_ID).getAttribute('data-slot')).toBe('input-group');
    expect(screen.getByLabelText('Search').getAttribute('data-slot')).toBe('input-group-control');
    expect(screen.getByLabelText('Clear').getAttribute('data-slot')).toBe('input-group-button');
  });
});

describe('InputGroupAddon', () => {
  testConformance(<InputGroupAddon />, {
    tag: 'DIV',
    slot: 'input-group-addon',
    rootClass: styles.input_group_addon
  });

  it('Should apply inline-start align by default', () => {
    render(<InputGroupAddon data-testid={ADDON_TEST_ID} />);
    const addon = screen.getByTestId(ADDON_TEST_ID);

    expect(addon.getAttribute('data-align')).toBe('inline-start');
    expect(addon.getAttribute('role')).toBe('group');
  });

  ADDON_ALIGNS.forEach((align) => {
    it(`Should apply "${align}" align`, () => {
      render(<InputGroupAddon align={align} data-testid={ADDON_TEST_ID} />);
      const addon = screen.getByTestId(ADDON_TEST_ID);

      expect(addon.getAttribute('data-align')).toBe(align);
      expect(addon.classList.contains(styles[align])).toBeTruthy();
    });
  });

  it('Should focus the control when the addon is clicked', () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid={ADDON_TEST_ID}>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label='Search' />
      </InputGroup>
    );

    fireEvent.click(screen.getByTestId(ADDON_TEST_ID));
    expect(document.activeElement).toBe(screen.getByLabelText('Search'));
  });

  it('Should not focus the control when a button inside the addon is clicked', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label='Search' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton aria-label='Clear'>x</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );

    fireEvent.click(screen.getByLabelText('Clear'));
    expect(document.activeElement).not.toBe(screen.getByLabelText('Search'));
  });

  it('Should call a custom onClick', () => {
    const onClick = vi.fn();
    render(
      <InputGroup>
        <InputGroupAddon data-testid={ADDON_TEST_ID} onClick={onClick}>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label='Search' />
      </InputGroup>
    );

    fireEvent.click(screen.getByTestId(ADDON_TEST_ID));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('InputGroupText', () => {
  testConformance(<InputGroupText />, {
    tag: 'SPAN',
    slot: 'input-group-text',
    rootClass: styles.input_group_text
  });

  it('Should render its content', () => {
    render(<InputGroupText data-testid={TEXT_TEST_ID}>https://</InputGroupText>);
    expect(screen.getByTestId(TEXT_TEST_ID).textContent).toBe('https://');
  });
});

describe('InputGroupButton', () => {
  testConformance(<InputGroupButton aria-label='Input group action' />, {
    tag: 'BUTTON',
    slot: 'input-group-button',
    rootClass: styles.input_group_button
  });

  it('Should apply default size, type and variant', () => {
    render(<InputGroupButton data-testid={BUTTON_TEST_ID}>x</InputGroupButton>);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    expect(button.getAttribute('data-size')).toBe('sm');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-variant')).toBe('ghost');
  });

  it('Should override the default size', () => {
    render(
      <InputGroupButton data-testid={BUTTON_TEST_ID} size='md'>
        x
      </InputGroupButton>
    );
    expect(screen.getByTestId(BUTTON_TEST_ID).getAttribute('data-size')).toBe('md');
  });
});

describe('InputGroupInput', () => {
  testConformance(<InputGroupInput aria-label='Search' />, {
    tag: 'INPUT',
    slot: 'input-group-control',
    rootClass: styles.input_group_control
  });

  it('Should apply the input modifier class', () => {
    render(<InputGroupInput aria-label='Search' data-testid={INPUT_TEST_ID} />);
    expect(
      screen.getByTestId(INPUT_TEST_ID).classList.contains(styles.input_group_input)
    ).toBeTruthy();
  });
});

describe('InputGroupTextarea', () => {
  testConformance(<InputGroupTextarea aria-label='Message' />, {
    tag: 'TEXTAREA',
    slot: 'input-group-control',
    rootClass: styles.input_group_control
  });

  it('Should apply the textarea modifier class', () => {
    render(<InputGroupTextarea aria-label='Message' data-testid={TEXTAREA_TEST_ID} />);
    expect(
      screen.getByTestId(TEXTAREA_TEST_ID).classList.contains(styles.input_group_textarea)
    ).toBeTruthy();
  });
});
