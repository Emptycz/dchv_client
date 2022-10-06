import { InputProps, useField } from 'informed';
import React from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel } from '@mui/material';

interface CheckboxProps {
  name: string,
  className?: string,
  disabled?: boolean,
  checked?: boolean,
  label?: string,
  size?: 'small' | 'medium',
  color?: 'secondary' | 'success' | 'default',
}

const Checkbox = ({
  name,
  size,
  color,
  label,
  disabled = false,
  checked = undefined,
  ...props
}: CheckboxProps) => {
  const {
    userProps,
    fieldApi,
    fieldState,
    ref,
  } = useField<InputProps, boolean>({ ...props, name });

  const { id, className } = userProps;
  const { maskedValue } = fieldState;
  const { setValue, setTouched, setFocused } = fieldApi;
  
  const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setValue(e.target.checked, e);
  };

  return (
    <FormControlLabel
      label={label}
      control={
        <MaterialCheckbox
          checked={checked}
          size={size}
          color={color}
          disabled={disabled}
          id={id}
          ref={ref}
          className={className}
          name={name}
          value={!maskedValue ? false : maskedValue}
          onChange={onInternalChange}
          onBlur={(e) => { setTouched(true, e); setFocused(false, e); }}
          onFocus={(e) => { setFocused(true, e); }}
          {...props}
        />
      }
    />
  );


};

export default Checkbox;