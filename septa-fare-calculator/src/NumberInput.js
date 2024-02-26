import React, { useState } from 'react';

function NumberInput({changeFunc}) {
  // State to manage the input value
  const [inputValue, setInputValue] = useState('');

  // Handler function to update the input value
  const handleInputChange = (event) => {
    const value = event.target.value;
    // Not the best user experience but for coding challenge
    // purposes the user can only enter 1 - 10
    if (/^\d*$/.test(value) && value >= 1 && value <= 10) {
      setInputValue(value);
      changeFunc(value);
    }
  };

  return (
    <div className='num_input'>
      <input
        type="text"
        id="numberInput"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NumberInput;
