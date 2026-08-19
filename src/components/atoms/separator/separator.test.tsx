import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { Separator } from './separator';

import styles from './separator.module.css';

const SEPARATOR_TEST_ID = 'separator';

testConformance(<Separator />, {
  tag: 'DIV',
  slot: 'separator',
  rootClass: styles.separator,
  asChild: true,
  asChildTag: 'span'
});

it('Should render as default', () => {
  render(<Separator data-testid={SEPARATOR_TEST_ID} />);
  const separator = screen.getByTestId(SEPARATOR_TEST_ID);
  expect(separator.getAttribute('data-orientation')).toBe('horizontal');
  expect(separator.getAttribute('role')).toBe('none');
});

it('Should render vertical', () => {
  render(<Separator data-testid={SEPARATOR_TEST_ID} orientation='vertical' />);
  expect(screen.getByTestId(SEPARATOR_TEST_ID).getAttribute('data-orientation')).toBe('vertical');
});

it('Should render non decorative separator', () => {
  render(<Separator data-testid={SEPARATOR_TEST_ID} decorative={false} />);
  const separator = screen.getByTestId(SEPARATOR_TEST_ID);
  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
});
