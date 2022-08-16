import React, { useState } from "react";
import data from "./fares.json";
import "./index.css";

const Form = () => {
  // set initial states for values in the form
  const [destination, setDestination] = useState(1);
  const [count, setCount] = useState(1);
  const [purchaseLocation, setPurchaseLocation] = useState("advance_purchase");
  const [time, setTime] = useState("weekday");

  // get types of when to ride from the json data
  let types = {};
  for (let zone of data.zones) {
    for (let fare of zone.fares) {
      types[fare.type] = fare.type.charAt(0).toUpperCase() + fare.type.slice(1);
    }
  }

  // calculate and return the final price 
  const calculate = () => {
    let total;
    for (let zone of data.zones) {
      if (zone.zone === parseInt(destination, 10)) {
        for (let fare of zone.fares) {
          if (fare.type === time && fare.purchase === purchaseLocation) {
            total = fare.price * count;
            if (count >= 10) {
              total *= 0.9;
            }
            return total.toFixed(2);
          }
        }
      }
    }
    // itinerary not found
    alert("Not available to purchase! Choose a different location");
    setPurchaseLocation("advance_purchase");
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Regional Rail Fares</h2>
      <div>
        <label htmlFor="destination">Where are you going?</label>
        <select
          value={destination}
          name="destination"
          onChange={(e) => setDestination(e.target.value)}
        >
          {data.zones.map((zone) => (
            <option value={zone.zone} key={zone.zone}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>When are you riding?</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          {Object.keys(types).map((key) => (
            <option value={key} key={key}>
              {key == "evening_weekend" ? "Evening/Weekend" : types[key]}
            </option>
          ))}
        </select>
        <div className="notes">
          *Note:
          {data.info[time]}
        </div>
      </div>
      <div>
        <label>Where will you purchase the fare?</label>
        <div
          className="checkbox-div"
          onChange={(e) => setPurchaseLocation(e.target.value)}
        >
          <input
            type="radio"
            value="advance_purchase"
            name="location"
            checked={purchaseLocation === "advance_purchase"}
          ></input>{" "}
          Station Kiosk
          <input
            type="radio"
            value="onboard_purchase"
            name="location"
            checked={purchaseLocation === "onboard_purchase"}
          />{" "}
          Onboard
        </div>
        <div className="notes">
          *Note:
          {data.info[purchaseLocation]}
        </div>
      </div>
      <div>
        <label>How many rides will you need?</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min={1}
          max={20}
          className="number-input"
        />
        {count >= 10 ? (
          <div className="notes">
            {" "}
            Special discount: 10% off for groups of 10 or more!
          </div>
        ) : null}
      </div>

      <div className="total-cost">
        <span>Your fare will cost</span>
        <span className="final-price">${calculate()}</span>
      </div>
    </div>
  );
};

export default Form;
