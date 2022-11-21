import { FC, ChangeEvent, useState, useEffect } from 'react';

import { uniqueId } from 'src/libs/strings';

interface IProps {
  type?: 'text' | 'number';
  value: string | number | undefined;
  label?: string;
  placeholder?: string;
  onChange?: (value: string | number | undefined) => void;
}

const Input: FC<IProps> = ({
  value,
  placeholder,
  onChange,
  type = 'text',
  label,
}) => {
  const [autoId] = useState(uniqueId('septa-widget-input-'));
  const [selectedValue, setSelectedValue] = useState(value?.toString() || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  return (
    <div className='septa-widget-input-container'>
      <input
        className='septa-widget-input'
        id={autoId}
        type={type}
        value={selectedValue}
        placeholder={placeholder}
        onChange={handleChange}
        aria-label={label}
      />
    </div>
  );
};

export default Input;
