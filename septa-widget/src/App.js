import React, { useState } from "react";
import data from "./util/fares.json";
import "./App.css";

function App() {
  const [fareData] = useState(data);

  console.log(fareData.info.anytime);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Regional Rail Fares</h1>
        </div>
        <div className="option-div">
          <h2 className="option-title">Where are you going?</h2>
          <select name="zones" id="zones">
            {fareData.zones.map((zone) => (
              <option key={zone.name} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
        <div className="option-div">
          <h2 className="option-title">When are you riding?</h2>
          <select name="ride-time" id="ride-time">
              <option value={fareData.info.anytime}>Anytime</option>
              <option value={fareData.info.weekday}>Weekday</option>
              <option value={fareData.info.evening_weekend}>Evening/Weekend</option>
          </select>
        </div>
        <div className="option-div">
          <h2 className="option-title">Where will you purchase the fare?</h2>
          TODO:add select with purchase location options
        </div>
        <div className="option-div">
          <h2 className="option-title">How many rides will you need?</h2>
          TODO:add text input for ride quantity
        </div>
        <div className="option-div">
          <h2 className="option-title">Your fare will cost</h2>
          <p>$0.00</p>
        </div>
      </div>
    </div>
  );
}

export default App;
