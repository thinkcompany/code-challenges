import React from 'react';

const Total = props =>
  <div className="total__wrapper">
    <div className="total__message">
      Your total fare will cost
    </div>
    <h1 className="total">${props.total}</h1>
  </div>

export default Total;
