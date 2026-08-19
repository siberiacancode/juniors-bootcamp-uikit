import type { ReactNode } from 'react';

import { useId } from 'react';

import type { InputProps } from '../../atoms/input/input';

import { Input } from '../../atoms/input/input';
import { Field, FieldDescription, FieldError, FieldLabel } from '../../molecules/field/field';

export interface TextInputProps extends InputProps {
  asterisk?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  label?: ReactNode;
}

export const TextInput = ({
  asterisk = false,
  description,
  error,
  id,
  label,
  'aria-invalid': ariaInvalid,
  ...props
}: TextInputProps) => {
  const generatedId = useId();
  const inputId = id ?? `textinput-${generatedId}`;
  const labelId = `${inputId}-textinput-label`;
  const descriptionId = `${inputId}-textinput-description`;
  const errorId = `${inputId}-textinput-error`;

  return (
    <Field invalid={Boolean(error) || Boolean(ariaInvalid)}>
      {label && (
        <FieldLabel asterisk={asterisk} htmlFor={inputId} id={labelId}>
          {label}
        </FieldLabel>
      )}
      <Input
        {...props}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        id={inputId}
      />
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
      <FieldError error={error} id={errorId} />
    </Field>
  );
};
