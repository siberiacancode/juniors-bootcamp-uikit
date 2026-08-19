import type { ComponentProps } from 'react';

import { cn } from '@siberiacancode/reactuse';

import type { ButtonProps, ButtonSize } from '../../atoms/button/button';
import type { InputProps, InputSize } from '../../atoms/input/input';
import type { TextareaProps } from '../../atoms/textarea/textarea';

import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Textarea } from '../../atoms/textarea/textarea';

import styles from './input-group.module.css';

export type InputGroupSize = InputSize;
export type InputGroupAddonAlign = 'block-end' | 'block-start' | 'inline-end' | 'inline-start';
export type InputGroupButtonSize = ButtonSize;

export interface InputGroupProps extends ComponentProps<'div'> {
  size?: InputGroupSize;
}

export const InputGroup = ({ className, size = 'md', ...props }: InputGroupProps) => (
  <div
    className={cn(styles.input_group, styles[size], className)}
    data-size={size}
    data-slot='input-group'
    role='group'
    {...props}
  />
);

export interface InputGroupAddonProps extends ComponentProps<'div'> {
  align?: InputGroupAddonAlign;
}

export const InputGroupAddon = ({
  align = 'inline-start',
  className,
  onClick,
  ...props
}: InputGroupAddonProps) => (
  <div
    className={cn(styles.input_group_addon, styles[align], className)}
    data-align={align}
    data-slot='input-group-addon'
    role='group'
    onClick={(event) => {
      onClick?.(event);

      if ((event.target as HTMLElement).closest('button')) return;

      event.currentTarget
        .closest('[data-slot="input-group"]')
        ?.querySelector<HTMLElement>('input, textarea')
        ?.focus();
    }}
    {...props}
  />
);

export type InputGroupTextProps = ComponentProps<'span'>;

export const InputGroupText = ({ className, ...props }: InputGroupTextProps) => (
  <span
    className={cn(styles.input_group_text, className)}
    data-slot='input-group-text'
    {...props}
  />
);

export interface InputGroupButtonProps extends Omit<ButtonProps, 'size'> {
  size?: InputGroupButtonSize;
}

export const InputGroupButton = ({
  className,
  size = 'sm',
  type = 'button',
  variant = 'ghost',
  ...props
}: InputGroupButtonProps) => (
  <Button
    className={cn(styles.input_group_button, styles[size], className)}
    data-size={size}
    data-slot='input-group-button'
    size={size}
    type={type}
    variant={variant}
    {...props}
  />
);

export type InputGroupInputProps = InputProps;

export const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => (
  <Input
    className={cn(styles.input_group_control, styles.input_group_input, className)}
    data-slot='input-group-control'
    {...props}
  />
);

export type InputGroupTextareaProps = TextareaProps;

export const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => (
  <Textarea
    className={cn(styles.input_group_control, styles.input_group_textarea, className)}
    data-slot='input-group-control'
    {...props}
  />
);
