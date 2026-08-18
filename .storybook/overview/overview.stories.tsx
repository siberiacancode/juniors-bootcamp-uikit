import { ArrowRightIcon, BellIcon, CreditCardIcon, SearchIcon, SparklesIcon } from 'lucide-react';

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
import { Typography } from '../../src/components/atoms/typography/typography';
import { ChipGroup, ChipGroupItem } from '../../src/components/molecules/chip-group/chip-group';
import { GiantButton } from '../../src/components/molecules/giant-button/giant-button';
import {
  ThemeSwitcher,
  ThemeSwitcherItem
} from '../../src/components/molecules/theme-switcher/theme-switcher';
import { ThemeProvider, useTheme } from '../../src/theme';
import preview from '../preview';

import styles from './overview.module.css';

const OverviewThemeSwitcher = () => {
  const { value, set } = useTheme();

  return (
    <ThemeSwitcher aria-label='Theme' value={value} onValueChange={set}>
      <ThemeSwitcherItem aria-label='Light theme' value='light' />
      <ThemeSwitcherItem aria-label='System theme' value='system' />
      <ThemeSwitcherItem aria-label='Dark theme' value='dark' />
    </ThemeSwitcher>
  );
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
        </div>
        <OverviewThemeSwitcher />
      </div>
    </header>

    <div className={styles.grid}>
      <section className={styles.tile}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Buttons
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            primary / outline / icon
          </Typography>
        </div>
        <div className={styles.actions}>
          <Button>Продолжить</Button>
          <Button variant='outline'>Назад</Button>
          <Button variant='ghost'>Пропустить</Button>
        </div>
        <div className={styles.icon_actions}>
          <IconButton aria-label='Search' shape='round' variant='outline'>
            <SearchIcon />
          </IconButton>
          <IconButton aria-label='Notifications' shape='round' variant='secondary'>
            <BellIcon />
          </IconButton>
          <IconButton aria-label='Next' shape='round'>
            <ArrowRightIcon />
          </IconButton>
        </div>
      </section>

      <section className={styles.tile}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Payment Cards
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            new / saved
          </Typography>
        </div>
        <div className={styles.payment_cards}>
          <NewPaymentCard aria-label='Add payment card'>Новая карта</NewPaymentCard>
          <SavedPaymentCard aria-label='Saved payment card' />
        </div>
      </section>

      <section className={styles.tile_wide}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Breadcrumb
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            compound navigation
          </Typography>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator direction='left' />
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbSeparator current direction='left' />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className={styles.tile_tall}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Typography
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            display / title / body
          </Typography>
        </div>
        <div className={styles.type_stack}>
          <Typography variant='heading-md'>Bootcamp</Typography>
          <Typography variant='title-md'>Собираем интерфейсы без суеты</Typography>
          <Typography className={styles.text} variant='body-sm'>
            Набор базовых компонентов для продуктовых экранов, учебных проектов и внутренних
            сервисов.
          </Typography>
          <Typography as='a' href='#' variant='link'>
            Открыть документацию
          </Typography>
        </div>
      </section>

      <section className={styles.tile}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Chips
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            single / multiple
          </Typography>
        </div>
        <div className={styles.chips}>
          <Chip defaultPressed variant='accent'>
            Frontend
          </Chip>
          <Chip variant='primary'>React</Chip>
          <Chip>CSS</Chip>
        </div>
        <ChipGroup defaultValue='junior' type='single'>
          <ChipGroupItem value='junior'>Junior</ChipGroupItem>
          <ChipGroupItem value='middle'>Middle</ChipGroupItem>
        </ChipGroup>
      </section>

      <section className={styles.tile}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Giant Button
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            call to action
          </Typography>
        </div>
        <div className={styles.giant_button_slot}>
          <GiantButton>
            Начать
            <SparklesIcon />
          </GiantButton>
        </div>
      </section>

      <section className={styles.tile_wide}>
        <div className={styles.tile_header}>
          <Typography as='h2' variant='title-md'>
            Empty State
          </Typography>
          <Typography className={styles.muted} variant='caption'>
            title / description
          </Typography>
        </div>
        <Empty className={styles.empty_preview}>
          <CreditCardIcon aria-hidden='true' className={styles.empty_icon} />
          <EmptyTitle>Пока ничего нет</EmptyTitle>
          <EmptyDescription>Добавьте первую карту или выберите готовую.</EmptyDescription>
        </Empty>
      </section>
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
