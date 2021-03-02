import "./FareCalculator.css";
import React, { useState, useEffect } from "react";

const FARES_ENDPOINT =
  "https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json";
const additionalInfoForAnytimeTix =
  'Note: "Anytime" tickets can only be purchased at a station kiosk, and can only be purchased in batches of 10 at a time';

export const FareCalculator = () => {
  const [farePrices, setFarePrices] = useState(null);
  const [zone, setZone] = useState(1);
  const [type, setType] = useState("weekday");
  const [purchase, setPurchase] = useState("advance_purchase");
  const [trips, setTrips] = useState(1);

  // fetch data on first component render
  useEffect(() => {
    fetch(FARES_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setFarePrices(data));
  }, [setFarePrices]);

  // on change handlers
  const onChangeZone = (e) => setZone(Number.parseInt(e.target.value));
  const onChangeType = (e) => {
    if (e.target.value === "anytime") {
      setPurchase("advance_purchase"); // can only buy anytime tix in advance
      setTrips(10); // can only buy anytime tix 10 at a time
    }
    setType(e.target.value);
  };
  const onChangePurchase = (e) => setPurchase(e.target.value);
  const onChangeTrips = (e) => {
    setTrips(Number.parseInt(e.target.value));
  };

  // calculate fare, possible savings, check
  const fare = calculateFarePerTrip(farePrices, zone, type, purchase) * trips;
  const savingsPerTrip = checkForSavings(farePrices, zone, trips, fare);
  const validFare = checkIfValidFare(fare, type, trips);

  return (
    <div>
      {!farePrices ? (
        <p>Loading fare prices...</p>
      ) : (
        <div className="septa-fare-calc-container">
          <div className="septa-fare-calc-flexbox septa-fare-calc-accent-box">
            <img
              width="32"
              alt="SEPTA"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/SEPTA.svg/32px-SEPTA.svg.png"
              className="septa-logo"
            ></img>
            <p className="septa-fare-calc-accent-text">Regional Rail Fares</p>
          </div>
          <div className="septa-fare-calc-flexbox septa-fare-calc-zone">
            <div className="septa-fare-calc-text-align">
              <p>Where are you going?</p>
              <select
                onChange={onChangeZone}
                value={zone}
                className="septa-fare-calc-select"
              >
                <option value={1}>CCP/1</option>
                <option value={2}>Zone 2</option>
                <option value={3}>Zone 3</option>
                <option value={4}>Zone 4</option>
                <option value={5}>NJ</option>
              </select>
            </div>
          </div>
          <div className="septa-fare-calc-flexbox">
            <div className="septa-fare-calc-text-align">
              <p>When are you riding?</p>
              <select
                onChange={onChangeType}
                value={type}
                className="septa-fare-calc-select"
              >
                <option value="weekday">Weekdays</option>
                <option value="evening_weekend">
                  Evenings and/or Weekends
                </option>
                <option value="anytime">Anytime</option>
              </select>
              <p className="septa-fare-calc-detail-text">
                {farePrices.info[type]}
              </p>
              <p className="septa-fare-calc-detail-text">
                {type === "anytime" && additionalInfoForAnytimeTix}
              </p>
            </div>
          </div>
          <div className="septa-fare-calc-flexbox">
            <div className="septa-fare-calc-text-align">
              <p>Where will you purchase the fare?</p>
              <div>
                <label>
                  <input
                    type="radio"
                    name="purchase"
                    value="advance_purchase"
                    onChange={onChangePurchase}
                    checked={purchase === "advance_purchase"}
                  />
                  Station Kiosk
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="purchase"
                    value="onboard_purchase"
                    onChange={onChangePurchase}
                    checked={purchase === "onboard_purchase"}
                    disabled={type === "anytime"}
                  />
                  Onboard
                </label>
              </div>
              <p className="septa-fare-calc-detail-text">
                {farePrices.info[purchase]}
              </p>
            </div>
          </div>
          <div className="septa-fare-calc-flexbox">
            <div className="septa-fare-calc-text-align">
              <p>How many rides will you need?</p>
              <input
                type="number"
                min={type === "anytime" ? "10" : "1"} // if anytime, can only buy 10 tix at a time
                placeholder={type === "anytime" ? "10" : "1"}
                onChange={onChangeTrips}
                step={type === "anytime" ? "10" : "1"}
                value={trips}
                className="septa-fare-calc-select"
              />
            </div>
          </div>
          <div className="septa-fare-calc-flexbox septa-fare-calc-accent-box">
            <div className="septa-fare-calc-text-align">
              <p>Your fare will cost:</p>
              {typeof validFare === "number" ? (
                <p className="septa-fare-calc-accent-text">
                  ${validFare.toFixed(2)}
                </p>
              ) : (
                <p className="septa-fare-calc-detail-text ">
                  Please enter a valid no. of "Anytime" trips
                </p>
              )}
              {savingsPerTrip && (
                <p className="septa-fare-calc-detail-text ">
                  WAIT! You could save ${savingsPerTrip.toFixed(2)} per ride if
                  you purchased "Anytime" tickets instead.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateFarePerTrip = (farePrices, zone, type, purchase) => {
  if (!farePrices) return false; // typeguard
  const fareSheet = farePrices.zones[zone - 1].fares.filter(
    (option) => option.type === type && option.purchase === purchase
  )[0];
  const pricePerTrip = fareSheet.price / fareSheet.trips;
  return pricePerTrip;
};

const checkForSavings = (farePrices, zone, trips, currentFarePrice) => {
  if (trips < 10) return false;
  else {
    const anytimeRate =
      farePrices.zones[zone - 1].fares.filter(
        (fareSheet) => fareSheet.type === "anytime"
      )[0].price / 10;
    const currentRate = currentFarePrice / trips;
    if (anytimeRate < currentRate) return currentRate - anytimeRate;
    else return false;
  }
};

const checkIfValidFare = (currentFarePrice, type, trips) => {
  if (!currentFarePrice) return false;
  if (type === "anytime" && trips % 10 !== 0) return false;
  else return currentFarePrice;
};
