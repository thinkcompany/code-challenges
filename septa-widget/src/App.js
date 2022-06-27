// TODO: modularize code
// TODO: refactor fare calculation code in a more efficient and DRY method
// TODO: eliminate the ability for a user to select any fewer than 10 anytime tickets
// TODO: resolve type comparison issues so that strict equality can be used

// Hello Think Company!

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // state variables
  const [fareData, setFareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [purchaseLocation, setPurchaseLocation] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rideTimeInfo, setRideTimeInfo] = useState("");
  const [total, setTotal] = useState(0.0);

  // grabs fare data from fares.json file in the public folder and sets it to state
  useEffect(() => {
    axios
      .get("./fares.json")
      .then((res) => setFareData(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  // runs the getRate function anytime any of the corresponding state variables are changed
  // so as to keep a running total
  useEffect(() => {
    getRate(destination, rideTime, purchaseLocation, quantity);
  }, [destination, rideTime, purchaseLocation, quantity]);

  // grabs the helper info for each fare timeframe and sets it to state
  const getRideTimeInfo = (rideTime) => {
    let info = fareData.info[rideTime];
    setRideTimeInfo(info);
  };

  // a function to calculate fares based on user input
  const getRate = (zone, when, where, howMany) => {
    // zone 1 fare calculation
    if (zone == 1 && when == "weekday" && where == "station-kiosk") {
      let fare = fareData.zones[0].fares[0].price;
      setTotal(fare * howMany);
    } else if (zone == 1 && when == "weekday" && where == "onboard") {
      let fare = fareData.zones[0].fares[1].price;
      setTotal(fare * howMany);
    } else if (
      zone == 1 &&
      when == "evening_weekend" &&
      where == "station-kiosk"
    ) {
      let fare = fareData.zones[0].fares[2].price;
      setTotal(fare * howMany);
    } else if (zone == 1 && when == "evening_weekend" && where == "onboard") {
      let fare = fareData.zones[0].fares[3].price;
      setTotal(fare * howMany);
    } else if (zone == 1 && when == "anytime" && howMany == 10) {
      let fare = fareData.zones[0].fares[4].price;
      setTotal(fare);
    }

    // zone 2 fare calculation
    if (zone == 2 && when == "weekday" && where == "station-kiosk") {
      let fare = fareData.zones[1].fares[0].price;
      setTotal(fare * howMany);
    } else if (zone == 2 && when == "weekday" && where == "onboard") {
      let fare = fareData.zones[1].fares[1].price;
      setTotal(fare * howMany);
    } else if (
      zone == 2 &&
      when == "evening_weekend" &&
      where == "station-kiosk"
    ) {
      let fare = fareData.zones[1].fares[2].price;
      setTotal(fare * howMany);
    } else if (zone == 2 && when == "evening_weekend" && where == "onboard") {
      let fare = fareData.zones[1].fares[3].price;
      setTotal(fare * howMany);
    } else if (zone == 2 && when == "anytime" && howMany == 10) {
      let fare = fareData.zones[1].fares[4].price;
      setTotal(fare);
    }

    // zone 3 fare calculation
    if (zone == 3 && when == "weekday" && where == "station-kiosk") {
      let fare = fareData.zones[2].fares[0].price;
      setTotal(fare * howMany);
    } else if (zone == 3 && when == "weekday" && where == "onboard") {
      let fare = fareData.zones[2].fares[1].price;
      setTotal(fare * howMany);
    } else if (
      zone == 3 &&
      when == "evening_weekend" &&
      where == "station-kiosk"
    ) {
      let fare = fareData.zones[2].fares[2].price;
      setTotal(fare * howMany);
    } else if (zone == 3 && when == "evening_weekend" && where == "onboard") {
      let fare = fareData.zones[2].fares[3].price;
      setTotal(fare * howMany);
    } else if (zone == 3 && when == "anytime" && howMany == 10) {
      let fare = fareData.zones[2].fares[4].price;
      setTotal(fare);
    }

    // zone 4 fare calculation
    if (zone == 4 && when == "weekday" && where == "station-kiosk") {
      let fare = fareData.zones[3].fares[0].price;
      setTotal(fare * howMany);
    } else if (zone == 4 && when == "weekday" && where == "onboard") {
      let fare = fareData.zones[3].fares[1].price;
      setTotal(fare * howMany);
    } else if (
      zone == 4 &&
      when == "evening_weekend" &&
      where == "station-kiosk"
    ) {
      let fare = fareData.zones[3].fares[2].price;
      setTotal(fare * howMany);
    } else if (zone == 4 && when == "evening_weekend" && where == "onboard") {
      let fare = fareData.zones[3].fares[3].price;
      setTotal(fare * howMany);
    } else if (zone == 4 && when == "anytime" && howMany == 10) {
      let fare = fareData.zones[3].fares[4].price;
      setTotal(fare);
    }

    // zone 5 fare calculation
    if (zone == 5 && when == "weekday" && where == "station-kiosk") {
      let fare = fareData.zones[4].fares[0].price;
      setTotal(fare * howMany);
    } else if (zone == 5 && when == "weekday" && where == "onboard") {
      let fare = fareData.zones[4].fares[1].price;
      setTotal(fare * howMany);
    } else if (
      zone == 5 &&
      when == "evening_weekend" &&
      where == "station-kiosk"
    ) {
      let fare = fareData.zones[4].fares[2].price;
      setTotal(fare * howMany);
    } else if (zone == 5 && when == "evening_weekend" && where == "onboard") {
      let fare = fareData.zones[4].fares[3].price;
      setTotal(fare * howMany);
    } else if (zone == 5 && when == "anytime" && howMany == 10) {
      let fare = fareData.zones[4].fares[4].price;
      setTotal(fare);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1 id="header-heading">Regional Rail Fares</h1>
        </div>

        {/* user select for destination */}
        <div className="option-div destination-div">
          <h2 className="option-title">Where are you going?</h2>
          <div className="select-group">
            <select
              className="select-style"
              name="zones"
              id="zones"
              value={destination}
              onChange={(e) => {
                const selectedDestination = e.target.value;
                setDestination(selectedDestination);
              }}
            >
              <option></option>
              {!loading &&
                fareData.zones.map((zone) => (
                  <option key={zone.name} value={zone.zone}>
                    {zone.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* user select for ride time */}
        <div className="option-div" id="ride-time-div">
          <h2 className="option-title">When are you riding?</h2>
          <div className="select-group">
            <select
              className="select-style"
              name="ride-time"
              id="ride-time"
              onChange={(e) => {
                const selectedRideTime = e.target.value;
                setRideTime(selectedRideTime);
                getRideTimeInfo(selectedRideTime);
              }}
            >
              <option></option>
              <option value="anytime">Anytime</option>
              <option value="weekday">Weekday</option>
              <option value="evening_weekend">Evening/Weekend</option>
            </select>
          </div>
          <p id="ride-time-info">{rideTimeInfo}</p>
          {rideTime === "anytime" ? <p>Must purchase a minimum of 10</p> : null}
        </div>

        {/* user select for purchase location */}
        <div className="option-div" id="purchase-location-div">
          <h2 className="option-title">Where will you purchase the fare?</h2>
          <form
            
            onChange={(e) => {
              const selectedPurchaseLocation = e.target.value;
              setPurchaseLocation(selectedPurchaseLocation);
            }}
            value={purchaseLocation}
          >
            <div className="fare-location-radio-buttons">
              <label htmlFor="station-kiosk" className="radio-label">
              <input
                className="radio-button"
                type="radio"
                id="station-kiosk"
                name="fare-location"
                value="station-kiosk"
              />
              Station Kiosk
            </label>

            <label htmlFor="onboard" className="radio-label">
              <input
                className="radio-button"
                type="radio"
                id="onboard"
                name="fare-location"
                value="onboard"
              />
              Onboard
            </label>
            </div>
            
          </form>
        </div>

        {/* user select for number of tickets */}
        <div className="option-div quantity-div">
          <h2 className="option-title">How many rides will you need?</h2>
          <form
            id="quantity-input-form"
            value={quantity}
            onChange={(e) => {
              const selectedQuantity = e.target.value;
              setQuantity(selectedQuantity);
            }}
          >
            <input
              type="number"
              id="quantity-input"
              name="quantity"
              min="0"
              max="10"
            ></input>
          </form>
          <p id="discount-info">
            Purchase 10 ANYTIME tickets and <br></br> receive a discount off of
            WEEKDAY rates
          </p>
        </div>

        {/* shows the total to the user */}
        <div className="option-div total-div">
          <p className="option-title">Your fare will cost</p>
          <p id="total-display">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

// END OF LINE
