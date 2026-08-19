import type { JSX, ReactElement, ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
import { cloneElement } from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it } from 'vitest';
import { axe } from 'vitest-axe';

interface ConformanceOptions {
  asChild?: boolean;
  asChildTag?: keyof JSX.IntrinsicElements;
  forwardsId?: boolean;
  rootClass: string;
  slot: string;
  tag: string;
  wrapper?: (node: ReactNode) => ReactElement;
}

const CONFORMANCE_TEST_ID = 'conformance-root';

export const testConformance = (element: ReactElement, options: ConformanceOptions) => {
  const {
    tag,
    slot,
    rootClass,
    asChild = false,
    asChildTag = 'a',
    wrapper,
    forwardsId = false
  } = options;

  const cloneWithProps = (props: Record<string, unknown>) =>
    cloneElement(element as ReactElement<Record<string, unknown>>, props);

  const renderElement = (props: Record<string, unknown>) => {
    const node = cloneWithProps(props);
    return render(wrapper ? wrapper(node) : node);
  };

  it('Should render', () => {
    renderElement({ 'data-testid': CONFORMANCE_TEST_ID });
    const root = screen.getByTestId(CONFORMANCE_TEST_ID);
    expect(root.tagName).toBe(tag);
    expect(root.classList.contains(rootClass)).toBeTruthy();
    expect(root.getAttribute('data-slot')).toBe(slot);
  });

  it('Should merge custom className', () => {
    renderElement({ 'data-testid': CONFORMANCE_TEST_ID, className: 'custom' });
    const root = screen.getByTestId(CONFORMANCE_TEST_ID);
    expect(root.classList.contains('custom')).toBeTruthy();
    expect(root.classList.contains(rootClass)).toBeTruthy();
  });

  it('Should forward native attributes', () => {
    renderElement({
      'data-testid': CONFORMANCE_TEST_ID,
      id: 'native-id',
      'aria-label': 'native-label'
    });
    const root = screen.getByTestId(CONFORMANCE_TEST_ID);
    if (!forwardsId) expect(root.getAttribute('id')).toBe('native-id');
    expect(root.getAttribute('aria-label')).toBe('native-label');
  });

  it('Should forward style prop', () => {
    renderElement({ 'data-testid': CONFORMANCE_TEST_ID, style: { outlineColor: 'rgb(1, 2, 3)' } });
    const root = screen.getByTestId(CONFORMANCE_TEST_ID) as HTMLElement;
    expect(root.style.outlineColor).toBe('rgb(1, 2, 3)');
  });

  it('Should have no accessibility violations', async () => {
    const node = cloneWithProps({ 'data-testid': CONFORMANCE_TEST_ID });
    const { container } = render(wrapper ? wrapper(node) : node);
    expect(await axe(container)).toHaveNoViolations();
  });

  if (asChild) {
    it('Should render as child when asChild', () => {
      const Child = asChildTag as string;
      renderElement({ asChild: true, 'data-testid': CONFORMANCE_TEST_ID, children: <Child /> });
      const root = screen.getByTestId(CONFORMANCE_TEST_ID);
      expect(root.tagName).toBe(asChildTag.toUpperCase());
      expect(root.getAttribute('data-slot')).toBe(slot);
      expect(root.classList.contains(rootClass)).toBeTruthy();
    });
  }

  it('Should render on the server', () => {
    const node = cloneWithProps({ 'data-testid': CONFORMANCE_TEST_ID });
    expect(() => renderToString(wrapper ? wrapper(node) : node)).not.toThrow();
  });
};
