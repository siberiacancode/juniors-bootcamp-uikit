import type { ComponentProps, ReactNode } from 'react';

import { cn, useControllableState } from '@siberiacancode/reactuse';
import { createContext, useContext } from 'react';

import { Chip } from '../chip/chip';

import styles from './chip-group.module.css';

export type ChipGroupType = 'multiple' | 'single';
export type ChipGroupOrientation = 'horizontal' | 'vertical';

interface ChipGroupContextValue {
  disabled: boolean;
  type: ChipGroupType;
  value: string[];
  onItemToggle: (value: string, pressed: boolean) => void;
}

const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

const useChipGroupContext = () => {
  const context = useContext(ChipGroupContext);
  if (!context) throw new Error('ChipGroupItem must be used within ChipGroup');
  return context;
};

interface ChipGroupBaseProps extends ComponentProps<'div'> {
  children?: ReactNode;
  disabled?: boolean;
  orientation?: ChipGroupOrientation;
}

interface ChipGroupSingleProps extends ChipGroupBaseProps {
  defaultValue?: string;
  type: 'single';
  value?: string;
  onValueChange?: (value: string) => void;
}

interface ChipGroupMultipleProps extends ChipGroupBaseProps {
  defaultValue?: string[];
  type: 'multiple';
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ChipGroupProps = ChipGroupMultipleProps | ChipGroupSingleProps;

export const ChipGroup = ({
  className,
  type,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  orientation = 'horizontal',
  ...props
}: ChipGroupProps) => {
  const [value, setValue] = useControllableState({
    value: valueProp as string | string[] | undefined,
    initialValue: (defaultValue ?? (type === 'single' ? '' : [])) as string | string[],
    onChange: onValueChange as (value: string | string[]) => void
  });

  const values = type === 'single' ? (value ? [value as string] : []) : (value as string[]);

  const onItemToggle = (itemValue: string, pressed: boolean) => {
    if (type === 'single') {
      setValue(pressed ? itemValue : '');
      return;
    }

    const current = value as string[];
    setValue(pressed ? [...current, itemValue] : current.filter((item) => item !== itemValue));
  };

  return (
    <ChipGroupContext.Provider value={{ type, value: values, disabled, onItemToggle }}>
      <div
        className={cn(styles.chipGroup, styles[orientation], className)}
        data-orientation={orientation}
        data-slot='chip-group'
        role={type === 'single' ? 'radiogroup' : 'toolbar'}
        {...props}
      />
    </ChipGroupContext.Provider>
  );
};

export interface ChipGroupItemProps extends ComponentProps<typeof Chip> {
  value: string;
}

export const ChipGroupItem = ({ value, disabled, ...props }: ChipGroupItemProps) => {
  const context = useChipGroupContext();
  const pressed = context.value.includes(value);
  const isDisabled = context.disabled || disabled;

  const roleProps =
    context.type === 'single' ? { role: 'radio', 'aria-checked': pressed } : undefined;

  return (
    <Chip
      data-slot='chip-group-item'
      disabled={isDisabled}
      pressed={pressed}
      onPressedChange={(nextPressed) => context.onItemToggle(value, nextPressed)}
      {...roleProps}
      {...props}
    />
  );
};
