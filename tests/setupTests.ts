import type { AxeMatchers } from 'vitest-axe/matchers';

import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
