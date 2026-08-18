# 🧊 Juniors Bootcamp UIKit

React UI-kit for Juniors Bootcamp projects.

## Installation

```bash
npm install @siberiacancode/uikit
```

## Usage

Import components from the package entrypoint:

```tsx
import { Button, Typography } from '@siberiacancode/uikit';

export const App = () => (
  <main>
    <Typography as='h1' variant='display'>
      Juniors Bootcamp
    </Typography>

    <Button size='md' variant='primary'>
      Start learning
    </Button>
  </main>
);
```

Base styles are included when importing the main package. You can also import built styles directly:

```tsx
import '@siberiacancode/uikit/styles/base.css';
```

```tsx
import { ThemeProvider, ThemeScript, useTheme } from '@siberiacancode/uikit/theme';

export const Root = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <head>
      <ThemeScript />
    </head>
    <body>
      <ThemeProvider>{children}</ThemeProvider>
    </body>
  </html>
);

export const ThemeButton = () => {
  const theme = useTheme();

  return <button onClick={() => theme.set('dark')}>Dark theme</button>;
};
```

## Components

- `Button`
- `IconButton`
- `Typography`
- `Breadcrumb`
- `Chip`
- `ChipGroup`
- `Empty`
- `NewPaymentCard`
- `SavedPaymentCard`
- `GiantButton`
- `ThemeSwitcher`

## License

MIT
