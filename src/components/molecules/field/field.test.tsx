import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { testConformance } from '../../../../tests/describe-conformance';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from './field';

import styles from './field.module.css';

const FIELD_TEST_ID = 'field';
const FIELD_LEGEND_TEST_ID = 'field-legend';
const FIELD_LABEL_TEST_ID = 'field-label';
const FIELD_SEPARATOR_TEST_ID = 'field-separator';
const FIELD_ERROR_TEST_ID = 'field-error';

describe('Field', () => {
  testConformance(<Field />, {
    tag: 'DIV',
    slot: 'field',
    rootClass: styles.field,
    forwardsId: true
  });

  it('Should render as default', () => {
    render(<Field data-testid={FIELD_TEST_ID} />);
    const field = screen.getByTestId(FIELD_TEST_ID);

    expect(field.getAttribute('role')).toBe('group');
    expect(field.getAttribute('data-orientation')).toBe('vertical');
    expect(field.classList.contains(styles.field)).toBeTruthy();
    expect(field.classList.contains(styles.vertical)).toBeTruthy();
  });

  it('Should not set data-disabled and data-invalid by default', () => {
    render(<Field data-testid={FIELD_TEST_ID} />);
    const field = screen.getByTestId(FIELD_TEST_ID);

    expect(field.hasAttribute('data-disabled')).toBeFalsy();
    expect(field.hasAttribute('data-invalid')).toBeFalsy();
  });

  it('Should apply disabled state', () => {
    render(<Field disabled data-testid={FIELD_TEST_ID} />);
    expect(screen.getByTestId(FIELD_TEST_ID).getAttribute('data-disabled')).toBe('true');
  });

  it('Should apply invalid state', () => {
    render(<Field invalid data-testid={FIELD_TEST_ID} />);
    expect(screen.getByTestId(FIELD_TEST_ID).getAttribute('data-invalid')).toBe('true');
  });

  it('Should apply horizontal orientation', () => {
    render(<Field data-testid={FIELD_TEST_ID} orientation='horizontal' />);
    const field = screen.getByTestId(FIELD_TEST_ID);

    expect(field.getAttribute('data-orientation')).toBe('horizontal');
    expect(field.classList.contains(styles.horizontal)).toBeTruthy();
  });

  it('Should apply responsive orientation', () => {
    render(<Field data-testid={FIELD_TEST_ID} orientation='responsive' />);
    const field = screen.getByTestId(FIELD_TEST_ID);

    expect(field.getAttribute('data-orientation')).toBe('responsive');
    expect(field.classList.contains(styles.responsive)).toBeTruthy();
  });
});

describe('FieldSet', () => {
  testConformance(<FieldSet />, {
    tag: 'FIELDSET',
    slot: 'field-set',
    rootClass: styles.field_set
  });
});

describe('FieldLegend', () => {
  testConformance(<FieldLegend />, {
    tag: 'LEGEND',
    slot: 'field-legend',
    rootClass: styles.field_legend
  });

  it('Should render as default', () => {
    render(<FieldLegend data-testid={FIELD_LEGEND_TEST_ID}>Legend</FieldLegend>);
    const legend = screen.getByTestId(FIELD_LEGEND_TEST_ID);

    expect(legend.getAttribute('data-variant')).toBe('legend');
    expect(legend.classList.contains(styles.legend)).toBeTruthy();
  });

  it('Should apply label variant', () => {
    render(
      <FieldLegend data-testid={FIELD_LEGEND_TEST_ID} variant='label'>
        Legend
      </FieldLegend>
    );
    const legend = screen.getByTestId(FIELD_LEGEND_TEST_ID);

    expect(legend.getAttribute('data-variant')).toBe('label');
    expect(legend.classList.contains(styles.label)).toBeTruthy();
  });
});

describe('FieldGroup', () => {
  testConformance(<FieldGroup />, {
    tag: 'DIV',
    slot: 'field-group',
    rootClass: styles.field_group
  });
});

describe('FieldContent', () => {
  testConformance(<FieldContent />, {
    tag: 'DIV',
    slot: 'field-content',
    rootClass: styles.field_content
  });
});

describe('FieldTitle', () => {
  testConformance(<FieldTitle />, {
    tag: 'DIV',
    slot: 'field-title',
    rootClass: styles.field_title
  });
});

describe('FieldDescription', () => {
  testConformance(<FieldDescription />, {
    tag: 'P',
    slot: 'field-description',
    rootClass: styles.field_description
  });
});

describe('FieldLabel', () => {
  testConformance(<FieldLabel />, {
    tag: 'LABEL',
    slot: 'field-label',
    rootClass: styles.field_label
  });

  it('Should render as default', () => {
    render(<FieldLabel data-testid={FIELD_LABEL_TEST_ID}>Email</FieldLabel>);
    expect(screen.getByTestId(FIELD_LABEL_TEST_ID).textContent).toContain('Email');
  });

  it('Should inherit htmlFor from the field id in context', () => {
    render(
      <Field id='email-input'>
        <FieldLabel data-testid={FIELD_LABEL_TEST_ID}>Email</FieldLabel>
      </Field>
    );
    expect(screen.getByTestId(FIELD_LABEL_TEST_ID).getAttribute('for')).toBe('email-input');
  });

  it('Should prefer its own htmlFor over the context id', () => {
    render(
      <Field id='context-id'>
        <FieldLabel data-testid={FIELD_LABEL_TEST_ID} htmlFor='own-id'>
          Email
        </FieldLabel>
      </Field>
    );
    expect(screen.getByTestId(FIELD_LABEL_TEST_ID).getAttribute('for')).toBe('own-id');
  });

  it('Should render the required asterisk from its own prop', () => {
    render(
      <FieldLabel required data-testid={FIELD_LABEL_TEST_ID}>
        Email
      </FieldLabel>
    );
    expect(screen.getByTestId(FIELD_LABEL_TEST_ID).textContent).toContain('*');
  });

  it('Should render the required asterisk from context', () => {
    render(
      <Field required>
        <FieldLabel data-testid={FIELD_LABEL_TEST_ID}>Email</FieldLabel>
      </Field>
    );
    expect(screen.getByTestId(FIELD_LABEL_TEST_ID).textContent).toContain('*');
  });
});

describe('FieldSeparator', () => {
  testConformance(<FieldSeparator />, {
    tag: 'DIV',
    slot: 'field-separator',
    rootClass: styles.field_separator
  });

  it('Should mark data-content false without children', () => {
    render(<FieldSeparator data-testid={FIELD_SEPARATOR_TEST_ID} />);
    expect(screen.getByTestId(FIELD_SEPARATOR_TEST_ID).getAttribute('data-content')).toBe('false');
  });

  it('Should render content and mark data-content true with children', () => {
    render(<FieldSeparator data-testid={FIELD_SEPARATOR_TEST_ID}>OR</FieldSeparator>);
    const separator = screen.getByTestId(FIELD_SEPARATOR_TEST_ID);

    expect(separator.getAttribute('data-content')).toBe('true');
    expect(separator.textContent).toContain('OR');
  });
});

describe('FieldError', () => {
  it('Should render as default', () => {
    const { container } = render(<FieldError data-testid={FIELD_ERROR_TEST_ID} />);
    expect(container.querySelector('[data-slot="field-error"]')).toBeNull();
  });

  it('Should render its own error content', () => {
    render(<FieldError data-testid={FIELD_ERROR_TEST_ID} error='Required field' />);
    const error = screen.getByTestId(FIELD_ERROR_TEST_ID);

    expect(error.getAttribute('data-slot')).toBe('field-error');
    expect(error.getAttribute('role')).toBe('alert');
    expect(error.textContent).toContain('Required field');
  });

  it('Should render children content', () => {
    render(<FieldError data-testid={FIELD_ERROR_TEST_ID}>Required field</FieldError>);
    const error = screen.getByTestId(FIELD_ERROR_TEST_ID);

    expect(error.getAttribute('data-slot')).toBe('field-error');
    expect(error.getAttribute('role')).toBe('alert');
    expect(error.textContent).toContain('Required field');
  });

  it('Should render error content from context', () => {
    render(
      <Field error='Context error'>
        <FieldError data-testid={FIELD_ERROR_TEST_ID} />
      </Field>
    );
    expect(screen.getByTestId(FIELD_ERROR_TEST_ID).textContent).toContain('Context error');
  });

  it('Should prefer its own error over the context error', () => {
    render(
      <Field error='Context error'>
        <FieldError data-testid={FIELD_ERROR_TEST_ID} error='Own error' />
      </Field>
    );
    expect(screen.getByTestId(FIELD_ERROR_TEST_ID).textContent).toContain('Own error');
  });

  it('Should prefer children over the context error', () => {
    render(
      <Field error='Context error'>
        <FieldError data-testid={FIELD_ERROR_TEST_ID}>Children error</FieldError>
      </Field>
    );
    expect(screen.getByTestId(FIELD_ERROR_TEST_ID).textContent).toContain('Children error');
  });

  it('Should merge className', () => {
    render(<FieldError className='custom' data-testid={FIELD_ERROR_TEST_ID} error='Error' />);
    const error = screen.getByTestId(FIELD_ERROR_TEST_ID);

    expect(error.classList.contains('custom')).toBeTruthy();
    expect(error.classList.contains(styles.field_error)).toBeTruthy();
  });
});

describe('Field a11y', () => {
  it('Should have no accessibility violations', async () => {
    const { container } = render(
      <Field required error='Required field' id='email'>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <FieldDescription>Enter your email</FieldDescription>
        </FieldContent>
        <FieldError />
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
