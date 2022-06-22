import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [fareData, setFareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [purchaseLocation, setPurchaseLocation] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    axios
      .get("./fares.json")
      .then((res) => setFareData(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Regional Rail Fares</h1>
        </div>

        {/* user select for destination */}
        <div className="option-div">
          <h2 className="option-title">Where are you going?</h2>
          <select
            name="zones"
            id="zones"
            value={destination}
            onChange={(e) => {
              const selectedDestination = e.target.value;
              setDestination(selectedDestination);
            }}
          >
            {!loading &&
              fareData.zones.map((zone) => (
                <option key={zone.name} value={zone.name}>
                  {zone.name}
                </option>
              ))}
          </select>
          <h2>{destination}</h2>
        </div>

        {/* user select for ride time */}
        <div className="option-div">
          <h2 className="option-title">When are you riding?</h2>
          <select
            name="ride-time"
            id="ride-time"
            onChange={(e) => {
              const selectedRideTime = e.target.value;
              setRideTime(selectedRideTime);
            }}
          >
            <option value="anytime">Anytime</option>
            <option value="weekday">Weekday</option>
            <option value="evening_weekend">Evening/Weekend</option>
          </select>
          <h2>{rideTime}</h2>
          <p>TODO: add helper text based on selection</p>
        </div>

        {/* user select for purchase location */}
        <div className="option-div">
          <h2 className="option-title">Where will you purchase the fare?</h2>
          <form
            id="fare-location-radio-buttons"
            onChange={(e) => {
              const selectedPurchaseLocation = e.target.value;
              setPurchaseLocation(selectedPurchaseLocation);
            }}
            value={purchaseLocation}
          >
            <input
              type="radio"
              id="station-kiosk"
              name="fare-location"
              value="station-kiosk"
            />
            <label htmlFor="html">Station Kiosk</label>
            <br />
            <input
              type="radio"
              id="onboard"
              name="fare-location"
              value="onboard"
            />
            <label htmlFor="css">Onboard</label>
            <br />
          </form>
          <h2>{purchaseLocation}</h2>
        </div>

        {/* user select for number of tickets */}
        <div className="option-div">
          <h2 className="option-title">How many rides will you need?</h2>
          <form
            value={quantity}
            onChange={(e) => {
              const selectedQuantity = e.target.value;
              setQuantity(selectedQuantity);
            }}
          >
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              max="10"
            ></input>
          </form>
        </div>

        {/* shows the total to the user */}
        <div className="option-div">
          <h2 className="option-title">Your fare will cost</h2>
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
