import preview from '../../../../.storybook/preview';
import { Typography } from './typography';

const meta = preview.meta({
  component: Typography,
  parameters: {
    layout: 'padded'
  }
});

const SPECS = [
  { variant: 'display', label: 'DISPLAY', specs: ['Nunito  170/170  Bold  0%'] },
  { variant: 'heading-2xl', label: 'heading-2xl', specs: ['Nunito  96/96  ExtraBold  0'] },
  { variant: 'heading-xl', label: 'heading-xl', specs: ['Nunito  80/82  ExtraBold  0'] },
  { variant: 'heading-lg', label: 'heading-lg', specs: ['Nunito  60/68  Bold  0'] },
  { variant: 'heading-md', label: 'heading-md', specs: ['Nunito  48/48  Bold  -3%'] },
  { variant: 'title-lg', label: 'title-lg', specs: ['Nunito  32/40  Bold  0'] },
  { variant: 'title-md', label: 'title-md', specs: ['Nunito  24/32  Bold  0.5%'] },
  { variant: 'body-lg', label: 'body-lg', specs: ['Nunito  24/32  Medium  0.5%'] },
  { variant: 'body-md', label: 'body-md', specs: ['Nunito  18/26  Medium  0.5%'] },
  { variant: 'body-sm', label: 'body-sm', specs: ['Nunito  16/24  Medium  0.5%'] },
  { variant: 'link', label: 'link', specs: ['Nunito  16/24  Medium  0.5%'] },
  { variant: 'caption', label: 'caption', specs: ['Nunito  14/22  Medium  0.5%'] }
] as const;

export const Playground = meta.story({
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {SPECS.map(({ variant, label, specs }) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Typography variant={variant}>{label}</Typography>
          {specs.map((spec) => (
            <Typography key={spec} style={{ opacity: 0.6 }} variant='body-md'>
              {spec}
            </Typography>
          ))}
        </div>
      ))}
    </div>
  )
});
