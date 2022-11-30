import { InputProps, useField } from 'informed';
import React from 'react';

interface CustomInputProps {
  name: string,
  label?: string,
  className?: string,
  required?: boolean,
  type: 'email' | 'number' | 'text' | 'password',
}

const Input = ({
  type,
  name,
  label,
  required,
  ...props
}: CustomInputProps) => {
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
    <div className='flex flex-col gap-2'>
      <label>
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        required={required}
        placeholder={label}
        className={`rounded-sm w-52 h-10 text-gray-800 px-2 ${className}`}
        type={type}
        name={name}
        value={!maskedValue && maskedValue !== 0 ? '' : maskedValue}
        onChange={onInternalChange}
        onBlur={(e) => { setTouched(true, e); setFocused(false, e); }}
        onFocus={(e) => { setFocused(true, e); }}
        {...props}
      />
    </div>
  );
};

export default Input;