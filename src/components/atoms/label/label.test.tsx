import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { Label } from './label';

import styles from './label.module.css';

const LABEL_TEST_ID = 'label';

testConformance(<Label>Label</Label>, {
  tag: 'LABEL',
  slot: 'label',
  rootClass: styles.label,
  asChild: true,
  asChildTag: 'div'
});

it('Should render asterisk', () => {
  render(
    <Label asterisk data-testid={LABEL_TEST_ID}>
      Email
    </Label>
  );

  const label = screen.getByTestId(LABEL_TEST_ID);
  expect(label.textContent).toBe('*Email');
  expect(label.querySelector("[data-slot='label-asterisk']")).toBeTruthy();
});

it('Should forward htmlFor', () => {
  render(<Label data-testid={LABEL_TEST_ID} htmlFor='email' />);
  expect(screen.getByTestId(LABEL_TEST_ID).getAttribute('for')).toBe('email');
});
