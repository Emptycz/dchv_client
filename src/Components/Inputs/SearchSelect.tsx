import React from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { InputProps, useField } from 'informed';

import './SearchSelect.scss';

export interface SearchSelectOption {
  id: string | number,
  name: string,
}

export interface SearchSelectProps {
  name: string,
  options: SearchSelectOption[],
  className?: string,
  placeholder?: string,
  onSelect?: (options: SearchSelectOption | SearchSelectOption[]) => void,
  onSearch?: (searchString: string) => void,
  isLoading?: boolean,
}

// https://www.npmjs.com/package/multiselect-react-dropdown
const SearchSelect = ({
  placeholder,
  options,
  className,
  name,
  onSelect,
  onSearch,
  isLoading = false,
  ...props
}: SearchSelectProps) => {
  const {
    userProps,
    fieldApi,
    ref,
  } = useField<InputProps, number | string>({ ...props, type: 'select', name });

  const { id } = userProps;
  const { setValue, setTouched } = fieldApi;

  const onInternalChange = (e: SearchSelectOption | SearchSelectOption[]) => {
    if (onSelect) onSelect(e);
    setTouched(true);
    return setValue(e);
  };

  return (
    <Multiselect
      id={id}
      ref={ref}
      onSelect={onInternalChange}
      placeholder={placeholder}
      displayValue='name'
      className={className}
      options={options}
      onSearch={onSearch}
      loading={isLoading}
    />
  );
};

export default SearchSelect;
