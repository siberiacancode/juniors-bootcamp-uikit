import {
  ArrowRightIcon,
  BellIcon,
  CreditCardIcon,
  SearchIcon,
  SparklesIcon,
  XIcon
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../src/components/atoms/breadcrumb/breadcrumb';
import { Button } from '../../src/components/atoms/button/button';
import { Chip } from '../../src/components/atoms/chip/chip';
import { Empty, EmptyDescription, EmptyTitle } from '../../src/components/atoms/empty/empty';
import { IconButton } from '../../src/components/atoms/icon-button/icon-button';
import { NewPaymentCard } from '../../src/components/atoms/new-payment-card/new-payment-card';
import { SavedPaymentCard } from '../../src/components/atoms/saved-payment-card/saved-payment-card';
import { Textarea } from '../../src/components/atoms/textarea/textarea';
import { Typography } from '../../src/components/atoms/typography/typography';
import { TextInput } from '../../src/components/body/text-input/text-input';
import { ThemeToggle } from '../../src/components/body/theme-toggle/theme-toggle';
import { ChipGroup, ChipGroupItem } from '../../src/components/molecules/chip-group/chip-group';
import { Field, FieldDescription, FieldLabel } from '../../src/components/molecules/field/field';
import { GiantButton } from '../../src/components/molecules/giant-button/giant-button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea
} from '../../src/components/molecules/input-group/input-group';
import { ThemeProvider, useTheme } from '../../src/theme';
import preview from '../preview';

import styles from './overview.module.css';

const OverviewThemeSwitcher = () => {
  const { value, set } = useTheme();
  return <ThemeToggle aria-label='Theme' value={value} onValueChange={set} />;
};

const OverviewShowcase = () => (
  <main className={styles.overview}>
    <header className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.header_text}>
          <img alt='Juniors Bootcamp' className={styles.logo} src='brand/dark-logo-full.png' />
          <img
            alt='Juniors Bootcamp'
            className={styles.logo_dark}
            src='brand/light-logo-full.png'
          />
          <Typography className={styles.muted} variant='body-sm'>
            Build your path. Learn by doing.
          </Typography>
        </div>

        <OverviewThemeSwitcher />
      </div>
    </header>

    <div className={styles.grid}>
      <div className={styles.column}>
        <section className={styles.tile}>
          <div className={styles.tile_header}>
            <div className={styles.tile_heading}>
              <Typography as='h2' variant='title-md'>
                Complete your profile
              </Typography>
              <Typography className={styles.muted} variant='body-sm'>
                Tell us a little about yourself before you start.
              </Typography>
            </div>

            <IconButton aria-label='Close' shape='round' variant='ghost'>
              <XIcon />
            </IconButton>
          </div>

          <div className={styles.fields_column}>
            <TextInput
              asterisk
              defaultValue='Dmitry'
              id='overview-name'
              label='Display name'
              placeholder='Your name'
            />

            <TextInput
              asterisk
              defaultValue='hello'
              error='Enter a valid email address.'
              id='overview-email'
              label='Email'
            />
          </div>

          <div className={styles.footer_actions}>
            <Button variant='ghost'>Skip</Button>
            <Button>
              Continue
              <ArrowRightIcon />
            </Button>
          </div>
        </section>

        <section className={styles.tile}>
          <div className={styles.tile_heading}>
            <Typography as='h2' variant='title-md'>
              Share your feedback
            </Typography>
            <Typography className={styles.muted} variant='body-sm'>
              Help us make the bootcamp better.
            </Typography>
          </div>

          <Field>
            <FieldLabel htmlFor='overview-comment'>What can we improve?</FieldLabel>
            <Textarea id='overview-comment' placeholder='Tell us about your experience...' />
            <FieldDescription>Your feedback goes directly to the team.</FieldDescription>
          </Field>

          <Button variant='outline'>Send feedback</Button>
        </section>

        <section className={styles.tile}>
          <div className={styles.tile_header}>
            <div className={styles.tile_heading}>
              <Typography as='h2' variant='title-md'>
                Preferences
              </Typography>
              <Typography className={styles.muted} variant='body-sm'>
                Customize your learning experience.
              </Typography>
            </div>

            <IconButton aria-label='Notifications' shape='round' variant='ghost'>
              <BellIcon />
            </IconButton>
          </div>

          <div className={styles.preference_row}>
            <div className={styles.preference_text}>
              <Typography variant='body-sm'>Interface theme</Typography>
              <Typography className={styles.muted} variant='caption'>
                Choose how the platform looks.
              </Typography>
            </div>

            <OverviewThemeSwitcher />
          </div>

          <div className={styles.section}>
            <Typography variant='body-sm'>Learning topics</Typography>
            <div className={styles.chips}>
              <Chip defaultPressed>Frontend</Chip>
              <Chip>Testing</Chip>
              <Chip>Architecture</Chip>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.column}>
        <section className={styles.tile}>
          <div className={styles.tile_heading}>
            <Typography as='h2' variant='title-md'>
              Find your next course
            </Typography>
            <Typography className={styles.muted} variant='body-sm'>
              Explore topics and start learning.
            </Typography>
          </div>

          <Field>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput id='overview-search' placeholder='Search courses...' />
            </InputGroup>
          </Field>

          <div className={styles.section}>
            <Typography className={styles.muted} variant='caption'>
              Popular topics
            </Typography>
            <div className={styles.chips}>
              <Chip defaultPressed variant='accent'>
                React
              </Chip>
              <Chip variant='primary'>TypeScript</Chip>
              <Chip>CSS</Chip>
            </div>
          </div>
        </section>

        <section className={styles.tile}>
          <div className={styles.tile_header}>
            <div className={styles.tile_heading}>
              <Typography as='h2' variant='title-md'>
                Payment method
              </Typography>
              <Typography className={styles.muted} variant='body-sm'>
                Choose how you want to pay.
              </Typography>
            </div>

            <CreditCardIcon className={styles.header_icon} />
          </div>

          <div className={styles.payment_cards}>
            <SavedPaymentCard selected aria-label='Saved payment card' />
            <NewPaymentCard aria-label='Add payment card'>New card</NewPaymentCard>
          </div>

          <Button>Continue to payment</Button>
        </section>

        <section className={styles.tile}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator direction='left' />
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Bootcamp</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>React</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbSeparator current direction='left' />
              <BreadcrumbItem>
                <BreadcrumbPage>Hooks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className={styles.lesson_content}>
            <Typography className={styles.muted} variant='caption'>
              CURRENT LESSON
            </Typography>
            <Typography variant='heading-md'>Building reusable hooks</Typography>
            <Typography className={styles.text} variant='body-sm'>
              Learn how to separate behavior from UI and create hooks that stay predictable as your
              application grows.
            </Typography>
          </div>

          <Typography as='a' href='#' variant='link'>
            Continue lesson
          </Typography>
        </section>
      </div>

      <div className={styles.column}>
        <section className={styles.tile}>
          <div className={styles.tile_heading}>
            <Typography as='h2' variant='title-md'>
              Your experience
            </Typography>
            <Typography className={styles.muted} variant='body-sm'>
              We'll use this to personalize your assignments.
            </Typography>
          </div>

          <ChipGroup defaultValue='middle' type='single'>
            <ChipGroupItem value='junior'>Junior</ChipGroupItem>
            <ChipGroupItem value='middle'>Middle</ChipGroupItem>
            <ChipGroupItem value='senior'>Senior</ChipGroupItem>
          </ChipGroup>

          <Button>Save level</Button>
        </section>

        <section className={styles.tile}>
          <div className={styles.tile_heading}>
            <Typography as='h2' variant='title-md'>
              Quick note
            </Typography>
            <Typography className={styles.muted} variant='body-sm'>
              Save something for later.
            </Typography>
          </div>

          <Field>
            <InputGroup>
              <InputGroupAddon align='block-start'>Note</InputGroupAddon>
              <InputGroupTextarea id='overview-note' placeholder='Write a quick note...' />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor='overview-tag'>Tag</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput defaultValue='React' id='overview-tag' />
              <InputGroupAddon align='inline-end'>
                <InputGroupButton aria-label='Clear tag' size='icon-xs'>
                  <XIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </section>

        <section className={styles.tile}>
          <Empty className={styles.empty_preview}>
            <CreditCardIcon aria-hidden='true' className={styles.empty_icon} />
            <EmptyTitle>No saved cards yet</EmptyTitle>
            <EmptyDescription>Add a payment method to make your first purchase.</EmptyDescription>
            <Button variant='outline'>Add payment method</Button>
          </Empty>
        </section>

        <section className={`${styles.tile} ${styles.cta}`}>
          <div className={styles.cta_content}>
            <Typography className={styles.muted} variant='caption'>
              READY WHEN YOU ARE
            </Typography>
            <Typography variant='title-md'>Start your first assignment</Typography>
            <Typography className={styles.text} variant='body-sm'>
              Everything is set up. Pick a task and start building.
            </Typography>
          </div>

          <div className={styles.giant_button_slot}>
            <GiantButton>
              Start learning
              <SparklesIcon />
            </GiantButton>
          </div>
        </section>
      </div>
    </div>
  </main>
);

const OverviewDocsPage = () => (
  <ThemeProvider>
    <OverviewShowcase />
  </ThemeProvider>
);

const meta = preview.meta({
  component: OverviewShowcase,
  title: 'Overview',
  parameters: {
    docs: {
      page: OverviewDocsPage
    },
    layout: 'fullscreen',
    options: {
      showToolbar: false
    }
  }
});

export const Overview = meta.story({});
