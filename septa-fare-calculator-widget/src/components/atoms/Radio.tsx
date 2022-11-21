import { FC, ChangeEvent, useState, useEffect } from 'react';

import { ISelectOption } from 'src/types/ISelectOption';

interface IProps {
  name: string;
  options: ISelectOption[];
  value: string | number | undefined;
  onChange?: (value: string | number | undefined) => void;
}

const Radio: FC<IProps> = ({ options, value, onChange, name }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <div className='septa-widget-radio-container'>
      {options.map((option) => (
        <div className='septa-widget-radio' key={option.value}>
          <input
            type='radio'
            name={name}
            id={`${name}_${option.value}`}
            value={option.value}
            onChange={handleChange}
            checked={option.value === selectedValue}
          />
          <label htmlFor={`${name}_${option.value}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
