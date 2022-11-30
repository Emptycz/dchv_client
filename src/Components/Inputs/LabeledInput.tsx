import { TextField } from '@mui/material';
import { useField, InputProps } from 'informed';
import React from 'react';

interface LabeledInputProps {
  name: string,
  label?: string,
  className?: string,
  required?: boolean,
  variant?: 'outlined' | 'filled' | 'standard',
  type: 'email' | 'number' | 'text' | 'password',
  color?: 'info' | 'warning' | 'primary' | 'secondary' | 'error' | 'success' | undefined,
}

const LabeledInput = ({
  name,
  label,
  type,
  required,
  variant = 'outlined',
  color = 'info',
  ...props
}: LabeledInputProps) => {
  const {
    userProps,
    fieldApi,
    fieldState,
    ref,
  } = useField<InputProps, number | string>({ ...props, type, name });

  const { id, className } = userProps;
  const { maskedValue } = fieldState;
  const { setValue, setTouched, setFocused } = fieldApi;

  const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const final = e.target.value;
    return setValue(final, e);
  };

  return (
    <>
      <TextField
        label={label}
        variant={variant}
        id={id}
        ref={ref}
        required={required}
        className={className}
        type={type}
        name={name}
        color={color}
        value={!maskedValue && maskedValue !== 0 ? '' : maskedValue}
        onChange={onInternalChange}
        onBlur={(e) => { setTouched(true, e); setFocused(false, e); }}
        onFocus={(e) => { setFocused(true, e); }}
        {...props}
      />
    </>
  );
};

export default LabeledInput;
