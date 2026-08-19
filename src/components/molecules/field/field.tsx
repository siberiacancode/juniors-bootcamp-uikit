import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@siberiacancode/reactuse';
import { createContext, use, useMemo } from 'react';

import type { LabelProps } from '../../atoms/label/label';

import { Label } from '../../atoms/label/label';
import { Separator } from '../../atoms/separator/separator';

import styles from './field.module.css';

export type FieldOrientation = 'horizontal' | 'responsive' | 'vertical';
export type FieldLegendVariant = 'label' | 'legend';

interface FieldContextValue {
  disabled?: boolean;
  error?: ReactNode;
  id?: string;
  invalid?: boolean;
  orientation?: FieldOrientation;
  required?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useFieldContext = () => use(FieldContext);

export type FieldSetProps = ComponentProps<'fieldset'>;

export const FieldSet = ({ className, ...props }: FieldSetProps) => (
  <fieldset className={cn(styles.field_set, className)} data-slot='field-set' {...props} />
);

export interface FieldLegendProps extends ComponentProps<'legend'> {
  variant?: FieldLegendVariant;
}

export const FieldLegend = ({ className, variant = 'legend', ...props }: FieldLegendProps) => (
  <legend
    className={cn(styles.field_legend, styles[variant], className)}
    data-slot='field-legend'
    data-variant={variant}
    {...props}
  />
);

export type FieldGroupProps = ComponentProps<'div'>;

export const FieldGroup = ({ className, ...props }: FieldGroupProps) => (
  <div className={cn(styles.field_group, className)} data-slot='field-group' {...props} />
);

export interface FieldProps extends ComponentProps<'div'> {
  disabled?: boolean;
  invalid?: boolean;
  orientation?: FieldOrientation;
  required?: boolean;
}

export interface FieldProps extends ComponentProps<'div'> {
  disabled?: boolean;
  error?: ReactNode;
  id?: string;
  invalid?: boolean;
  orientation?: FieldOrientation;
  required?: boolean;
}

export const Field = ({
  className,
  id,
  disabled = false,
  invalid = false,
  required = false,
  error,
  orientation = 'vertical',
  ...props
}: FieldProps) => {
  const context = useMemo<FieldContextValue>(
    () => ({ id, disabled, invalid, required, error, orientation }),
    [id, disabled, invalid, required, error, orientation]
  );

  return (
    <FieldContext value={context}>
      <div
        className={cn(styles.field, styles[orientation], className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        data-orientation={orientation}
        data-slot='field'
        role='group'
        {...props}
      />
    </FieldContext>
  );
};

export type FieldContentProps = ComponentProps<'div'>;

export const FieldContent = ({ className, ...props }: FieldContentProps) => (
  <div className={cn(styles.field_content, className)} data-slot='field-content' {...props} />
);

export interface FieldLabelProps extends LabelProps {
  required?: boolean;
}

export const FieldLabel = ({
  className,
  htmlFor,
  required,
  children,
  ...props
}: FieldLabelProps) => {
  const context = useFieldContext();

  const htmlForValue = htmlFor ?? context?.id;
  const isRequired = required ?? context?.required;

  return (
    <Label
      className={cn(styles.field_label, className)}
      data-slot='field-label'
      htmlFor={htmlForValue}
      {...props}
    >
      {children}
      {isRequired && (
        <span aria-hidden='true' className={styles.field_label_asterisk}>
          *
        </span>
      )}
    </Label>
  );
};

export type FieldTitleProps = ComponentProps<'div'>;

export const FieldTitle = ({ className, ...props }: FieldTitleProps) => (
  <div className={cn(styles.field_title, className)} data-slot='field-title' {...props} />
);

export type FieldDescriptionProps = ComponentProps<'p'>;

export const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <p className={cn(styles.field_description, className)} data-slot='field-description' {...props} />
);

export interface FieldSeparatorProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export const FieldSeparator = ({ children, className, ...props }: FieldSeparatorProps) => (
  <div
    className={cn(styles.field_separator, className)}
    data-content={Boolean(children)}
    data-slot='field-separator'
    {...props}
  >
    <Separator className={styles.field_separator_line} />
    {children && (
      <span className={styles.field_separator_content} data-slot='field-separator-content'>
        {children}
      </span>
    )}
  </div>
);

export interface FieldErrorProps extends Omit<ComponentProps<'div'>, 'children'> {
  error?: ReactNode;
}

export const FieldError = ({ className, error, ...props }: FieldErrorProps) => {
  const context = useFieldContext();
  const content = error ?? context?.error;
  if (!content) return null;

  return (
    <div
      className={cn(styles.field_error, className)}
      data-slot='field-error'
      role='alert'
      {...props}
    >
      {content}
    </div>
  );
};
