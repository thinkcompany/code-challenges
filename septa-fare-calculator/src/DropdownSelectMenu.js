import React, { useState } from 'react';

function DropdownSelectMenu({ options, changeFunc }) {
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    changeFunc(event.target.value);
  };


  return (
    <div>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value=""> Select option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelectMenu;
