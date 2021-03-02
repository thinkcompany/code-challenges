import React, { useState } from "react";
const fareData = require("./data/fares.json");

const App = () => {
  const [zone, setZone] = useState(1);
  const [type, setType] = useState("weekday");
  const [purchase, setPurchase] = useState("advance_purchase");
  const [trips, setTrips] = useState(1);
  const [tripsWarning, setTripsWarning] = useState("");

  const handleChange = () => {
    if ((type === "anytime" && trips % 10 !== 0) || !trips) return "";

    const currentZone = fareData.zones.find((item) => item.zone === zone);
    const currentFare = currentZone.fares.find(
      (item) => item.type === type && item.purchase === purchase
    );
    const currentPrice = currentFare.price;
    return formatPrice(currentPrice * (trips / currentFare.trips));
  };

  const handleType = (value) => {
    if (value === "anytime") {
      if (trips % 10 !== 0) setTrips(10);
      setPurchase("advance_purchase");
    }
    setTripsWarning("");
    setType(value);
  };

  const handleTrips = (value) => {
    setTrips(value);
    setTripsWarning("");
  };

  const handleTripsValidation = () => {
    if (type === "anytime") {
      if (trips % 10 !== 0) {
        // Because the fares data only lists anytime tickets with a quantity of 10,
        // I am assuming that they cannot be bought in other quantities.
        // Validation for this assumption is included here.
        setTripsWarning("Anytime tickets must be bought in quantities of 10");
      } else {
        setTripsWarning("");
      }
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2).toLocaleString()}`;
  };

  return (
    <div className="fare-widget-card">
      <div className="fare-widget-header">
        <h1 className="fare-widget-title">Regional Rail Fares</h1>
      </div>
      <div className="fare-widget-body">
        <form>
          <div className="fare-widget-section">
            <label htmlFor="zones" className="fare-widget-question">
              Where are you going?
            </label>
            <select
              id="zones"
              className="fare-widget-select"
              name="zones"
              value={zone}
              onChange={(e) => setZone(parseInt(e.target.value))}
            >
              <option value="1">CCP/1</option>
              <option value="2">Zone 2</option>
              <option value="3">Zone 3</option>
              <option value="4">Zone 4</option>
              <option value="5">NJ</option>
            </select>
          </div>
          <hr className="fare-widget-divider" />
          <div className="fare-widget-section">
            <label htmlFor="types" className="fare-widget-question">
              When are you riding?
            </label>
            <select
              id="types"
              className="fare-widget-select"
              name="types"
              value={type}
              onChange={(e) => handleType(e.target.value)}
            >
              <option value="weekday">Weekdays</option>
              <option value="evening_weekend">Evenings and Weekends</option>
              <option value="anytime">Anytime</option>
            </select>
            <div className="fare-widget-helper-text">{fareData.info[type]}</div>
          </div>
          <hr className="fare-widget-divider" />
          <div
            className="fare-widget-section"
            onChange={(e) => setPurchase(e.target.value)}
          >
            <label htmlFor="purchase" className="fare-widget-question">
              Where will you purchase the fare?
            </label>
            <div className="fare-widget-purchase-option">
              <input
                type="radio"
                id="advance_purchase"
                name="purchase"
                value="advance_purchase"
                checked={purchase === "advance_purchase"}
              />
              <label htmlFor="advance_purchase">Station Kiosk</label>
            </div>
            <div className="fare-widget-purchase-option">
              <input
                type="radio"
                id="onboard_purchase"
                name="purchase"
                value="onboard_purchase"
                // Because the fares data only lists anytime tickets in advance,
                // I am assuming that they cannot be bought on board.
                // Validation for this assumption is included here.
                disabled={type === "anytime"}
              />
              <label htmlFor="onboard_purchase">Onboard</label>
            </div>
            <div className="fare-widget-helper-text">
              {fareData.info[purchase]}
            </div>
          </div>
          <hr className="fare-widget-divider" />
          <div className="fare-widget-section">
            <label htmlFor="trips" className="fare-widget-question">
              How many rides will you need?
            </label>
            <input
              type="number"
              id="trips"
              className="fare-widget-number-input"
              name="trips"
              step={type === "anytime" ? 10 : 1}
              min={type === "anytime" ? 10 : 1}
              value={trips}
              onChange={(e) => handleTrips(parseInt(e.target.value))}
              onBlur={handleTripsValidation}
            />
            <div className="fare-widget-warning-text">{tripsWarning}</div>
          </div>
          <div className="fare-widget-footer">
            <label htmlFor="price" className="fare-widget-price-message">
              Your fare will cost
            </label>
            <div id="price" className="fare-widget-price">
              {handleChange()}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
