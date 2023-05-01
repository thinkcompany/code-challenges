import React from "react";

const Price = ({ price }) => {
  return (
    <div className="App-price">
      <p>Your fare will cost: </p>
      <p id="price-text">{price ? `$${price.toFixed(2)}` : "$0.00"}</p>
    </div>
  );
};

export default Price;
