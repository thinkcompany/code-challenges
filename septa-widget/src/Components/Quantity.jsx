import React from "react";

export default function Quantity(props) {
  return (
    <div className="option-div quantity-div">
      <h2 className="option-title">How many rides will you need?</h2>
      <form
        id="quantity-input-form"
        value={props.quantity}
        
      >
        <input
          onChange={props.quantityChangeHandler}
          type="number"
          id="quantity-input"
          name="quantity"
          value={props.quantity}
          min="0"
          max="10"
        ></input>
      </form>
      <p id="discount-info">
        Purchase 10 ANYTIME tickets and <br></br> receive a discount off of
        WEEKDAY rates
      </p>
    </div>
  );
}
