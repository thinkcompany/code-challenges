import React from "react";

export default function Total(props) {
  return (
    <div className="option-div total-div">
      <p className="option-title">Your fare will cost</p>
      <p id="total-display">${props.total.toFixed(2)}</p>
    </div>
  );
}
