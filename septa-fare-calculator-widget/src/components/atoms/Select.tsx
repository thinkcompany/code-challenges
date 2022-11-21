import { FC, ChangeEvent, useState, useEffect } from 'react';

import { ISelectOption } from 'src/types/ISelectOption';

interface IProps {
  options: ISelectOption[];
  value: string | number | undefined;
  placeholder?: string;
  helperText?: string;
  onChange?: (value: string | number | undefined) => void;
}

const Select: FC<IProps> = ({
  options,
  value,
  placeholder = 'Select',
  helperText,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <div className='septa-widget-select-container'>
      <select
        className='septa-widget-select'
        onChange={handleChange}
        value={selectedValue}
      >
        <option>{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText && (
        <p className='septa-widget-select__helper'>{helperText}</p>
      )}
    </div>
  );
};

export default Select;
