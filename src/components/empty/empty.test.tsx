import { render, screen } from '@testing-library/react';

import { Empty, EmptyDescription, EmptyTitle } from './empty';

import styles from './empty.module.css';

const EMPTY_TEST_ID = 'empty';
const TITLE_TEST_ID = 'empty-title';
const DESCRIPTION_TEST_ID = 'empty-description';

it('Should render empty', () => {
  render(
    <Empty data-testid={EMPTY_TEST_ID}>
      <EmptyTitle data-testid={TITLE_TEST_ID}>Title</EmptyTitle>
      <EmptyDescription data-testid={DESCRIPTION_TEST_ID}>Description text</EmptyDescription>
    </Empty>
  );

  const empty = screen.getByTestId(EMPTY_TEST_ID);
  expect(empty.classList.contains(styles.empty)).toBeTruthy();
  expect(empty.getAttribute('data-slot')).toBe('empty');

  const title = screen.getByTestId(TITLE_TEST_ID);
  expect(title.textContent).toBe('Title');
  expect(title.classList.contains(styles.emptyTitle)).toBeTruthy();
  expect(title.getAttribute('data-slot')).toBe('empty-title');

  const description = screen.getByTestId(DESCRIPTION_TEST_ID);
  expect(description.textContent).toBe('Description text');
  expect(description.tagName).toBe('P');
  expect(description.classList.contains(styles.emptyDescription)).toBeTruthy();
  expect(description.getAttribute('data-slot')).toBe('empty-description');
});

it('Should merge custom className', () => {
  render(
    <Empty className='custom' data-testid={EMPTY_TEST_ID}>
      <EmptyTitle>Title</EmptyTitle>
    </Empty>
  );
  const empty = screen.getByTestId(EMPTY_TEST_ID);
  expect(empty.classList.contains('custom')).toBeTruthy();
  expect(empty.classList.contains(styles.empty)).toBeTruthy();
});
