import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { testConformance } from '../../../../tests/describe-conformance';
import { Empty, EmptyDescription, EmptyTitle } from './empty';

import styles from './empty.module.css';

const EMPTY_TEST_ID = 'empty';
const EMPTY_TITLE_TEST_ID = 'empty-title';
const EMPTY_DESCRIPTION_TEST_ID = 'empty-description';

describe('Empty', () => {
  testConformance(<Empty>Content</Empty>, {
    tag: 'DIV',
    slot: 'empty',
    rootClass: styles.empty
  });

  it('Should render as default', () => {
    render(
      <Empty data-testid={EMPTY_TEST_ID}>
        <span>content</span>
      </Empty>
    );
    expect(screen.getByTestId(EMPTY_TEST_ID).textContent).toBe('content');
  });
});

describe('EmptyTitle', () => {
  testConformance(<EmptyTitle>No results</EmptyTitle>, {
    tag: 'DIV',
    slot: 'empty-title',
    rootClass: styles.empty_title
  });

  it('Should render as default', () => {
    render(<EmptyTitle data-testid={EMPTY_TITLE_TEST_ID}>No results</EmptyTitle>);
    const title = screen.getByTestId(EMPTY_TITLE_TEST_ID);
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
    render(<EmptyDescription data-testid={EMPTY_DESCRIPTION_TEST_ID}>Try again</EmptyDescription>);
    const description = screen.getByTestId(EMPTY_DESCRIPTION_TEST_ID);
    expect(description.tagName).toBe('P');
    expect(description.textContent).toBe('Try again');
  });
});
