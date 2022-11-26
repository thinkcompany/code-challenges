import React from 'react';
import './AmountOfRides.scss';

const AmountOfRides = (props) => {
  const { setNumberOfRides } = props;

  const handleNumberOfRides = (e) => {
    setNumberOfRides(e.target.value);
  };

  return (
    <div class="amount-section">
      <h4>How many rides will you need ?</h4>
      <input
        className="amount-input"
        type="number"
        onChange={handleNumberOfRides}
      />
    </div>
  );
};

export default AmountOfRides;
