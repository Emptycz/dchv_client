import { useField, InputProps } from 'informed';
import React from 'react';

interface SelectProps extends InputProps{
  name: string,
  options?: {value: string | number, label: string}[],
}

// TODO: Multi select
// https://stackoverflow.com/questions/17714705/how-to-use-checkbox-inside-select-option

const Select = ({
  options,
  name,
  required,
  ...props
}: SelectProps) => {

  const {
    userProps,
    fieldApi,
    fieldState,
    ref,
  } = useField<InputProps, number | string>({ ...props, name });

  const { id, className } = userProps;
  const { maskedValue } = fieldState;
  const { setValue, setTouched, setFocused } = fieldApi;

  const onInternalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const final = e.target.value;
    return setValue(final, e);
  };

  return (
    <select
      id={id}
      ref={ref}
      required={required}
      className={className}
      name={name}
      onChange={onInternalChange}
      value={!maskedValue && maskedValue !== 0 ? '' : maskedValue}
      onBlur={(e) => { setTouched(true, e); setFocused(false, e); }}
      onFocus={(e) => { setFocused(true, e); }}
    >
      {!options || options?.length === 0 ? (
        <option key='null' value='null' disabled> No options found </option>
      ) :
        options.map((opt) => (
          <option key={opt.value} value={opt.value}> {opt.label} </option>
        ))
      }
    </select>
  );
};

export default Select;
