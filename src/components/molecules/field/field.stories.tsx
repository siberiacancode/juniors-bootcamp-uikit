import preview from '../../../../.storybook/preview';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Textarea } from '../../atoms/textarea/textarea';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from './field';

const meta = preview.meta({
  component: Field,
  tags: ['autodocs'],
  args: {
    orientation: 'vertical',
    invalid: false,
    disabled: false
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal', 'responsive']
    },
    invalid: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
});

export const Playground = meta.story({
  render: ({ disabled, invalid, orientation }) => (
    <Field
      disabled={disabled}
      invalid={invalid}
      orientation={orientation}
      style={{ maxWidth: 360 }}
    >
      <FieldLabel asterisk htmlFor='field-email'>
        Email
      </FieldLabel>
      <Input
        aria-invalid={invalid}
        disabled={disabled}
        id='field-email'
        placeholder='hello@bootcamp.dev'
      />
      <FieldDescription>Адрес для входа и уведомлений.</FieldDescription>
      <FieldError error={invalid ? 'Введите корректный email.' : undefined} />
    </Field>
  )
});

export const Form = meta.story({
  parameters: {
    layout: 'padded'
  },
  render: () => (
    <FieldSet style={{ maxWidth: 420 }}>
      <FieldLegend>Профиль</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel asterisk htmlFor='profile-name'>
            Имя
          </FieldLabel>
          <Input id='profile-name' placeholder='Аня' />
        </Field>
        <Field invalid>
          <FieldLabel asterisk htmlFor='profile-email'>
            Email
          </FieldLabel>
          <Input aria-invalid defaultValue='hello' id='profile-email' />
          <FieldError error='Введите корректный email.' />
        </Field>
        <Field>
          <FieldLabel htmlFor='profile-about'>О себе</FieldLabel>
          <Textarea id='profile-about' placeholder='Пара строк о проекте' />
        </Field>
        <FieldSeparator>или</FieldSeparator>
        <Field orientation='horizontal'>
          <FieldContent>
            <FieldLabel>Готовы продолжить</FieldLabel>
            <FieldDescription>Можно сохранить черновик и вернуться позже.</FieldDescription>
          </FieldContent>
          <Button size='md'>Сохранить</Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
});
