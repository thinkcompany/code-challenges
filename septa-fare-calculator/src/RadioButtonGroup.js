import React, { useState } from 'react';

function RadioButtonGroup({ options, changeFunc }) {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Handler function to update the selected option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    changeFunc(event.target.value);
  };

  return (
    <div className='radio_options'>
    {options.map((option) => (
        <div key={option.value}>
        <input
            type="radio"
            id={option.value}
            name="option"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
        />
        <label htmlFor={option.value}>{option.label}</label>
        </div>
    ))}
    </div>
  );
}

export default RadioButtonGroup;
