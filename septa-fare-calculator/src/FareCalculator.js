import React, { useState, useEffect } from "react";

const FARES_ENDPOINT =
  "https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json";

export const FareCalculator = () => {
  const [farePrices, setFarePrices] = useState(null);
  const [zone, setZone] = useState(2);
  const [type, setType] = useState("weekday");
  const [purchase, setPurchase] = useState("onboard_purchase");
  const [trips, setTrips] = useState(1);

  useEffect(() => {
    fetch(FARES_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setFarePrices(data));
  }, [setFarePrices]);

  const onChangeZone = (e) => setZone(Number.parseInt(e.target.value));
  const onChangeType = (e) => setType(e.target.value);
  const onChangePurchase = (e) => setPurchase(e.target.value);
  const onChangeTrips = (e) => setTrips(Number.parseInt(e.target.value));

  return (
    <div>
      {!farePrices ? (
        <p>Loading fare prices...</p>
      ) : (
        <div>
          <div>Regional Rail Fares</div>
          <div>
            <p>Where are you going?</p>
            <select onChange={onChangeZone} value={zone}>
              <option value={1}>CCP/1</option>
              <option value={2}>Zone 2</option>
              <option value={3}>Zone 3</option>
              <option value={4}>Zone 4</option>
              <option value={5}>NJ</option>
            </select>
          </div>

          <div>
            <p>When are you riding?</p>
            <select onChange={onChangeType} value={type}>
              <option value="weekday">Weekdays</option>
              <option value="evenings_weekend">Evenings and/or Weekends</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>
          <div>
            <p>Where will you purchase the fare?</p>
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
            <label>
              <input
                type="radio"
                name="purchase"
                value="onboard_purchase"
                onChange={onChangePurchase}
                checked={purchase === "onboard_purchase"}
              />
              Onboard
            </label>
          </div>
          <div>
            <p>How many rides will you need?</p>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="1"
              onChange={onChangeTrips}
              value={trips}
            />
          </div>
        </div>
      )}
    </div>
  );
};
