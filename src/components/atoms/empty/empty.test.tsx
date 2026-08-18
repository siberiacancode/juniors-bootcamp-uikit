import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { Empty, EmptyDescription, EmptyTitle } from './empty';

import styles from './empty.module.css';

describe('Empty', () => {
  testConformance(<Empty>Content</Empty>, {
    tag: 'DIV',
    slot: 'empty',
    rootClass: styles.empty
  });

  it('Should render as default', () => {
    render(
      <Empty data-testid='empty'>
        <span>content</span>
      </Empty>
    );
    expect(screen.getByTestId('empty').textContent).toBe('content');
  });
});

describe('EmptyTitle', () => {
  testConformance(<EmptyTitle>No results</EmptyTitle>, {
    tag: 'DIV',
    slot: 'empty-title',
    rootClass: styles.empty_title
  });

  it('Should render as default', () => {
    render(<EmptyTitle data-testid='empty-title'>No results</EmptyTitle>);
    const title = screen.getByTestId('empty-title');
    expect(title.tagName).toBe('DIV');
    expect(title.textContent).toBe('No results');
  });
});

describe('EmptyDescription', () => {
  testConformance(<EmptyDescription>Try again</EmptyDescription>, {
    tag: 'P',
    slot: 'empty-description',
    rootClass: styles.empty_description
  });

  it('Should render as default', () => {
    render(<EmptyDescription data-testid='empty-description'>Try again</EmptyDescription>);
    const description = screen.getByTestId('empty-description');
    expect(description.tagName).toBe('P');
    expect(description.textContent).toBe('Try again');
  });
});
