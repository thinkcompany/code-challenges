import React from "react";

export const FareCalculator = () => {
  return (
    <div>
      <div>Regional Rail Fares</div>
      <div>
        <p>Where are you going?</p>
        <select>
          <option value={1}>CCP/1</option>
          <option value={2}>Zone 2</option>
          <option value={3}>Zone 3</option>
          <option value={4}>Zone 4</option>
          <option value={5}>NJ</option>
        </select>
      </div>

      <div>
        <p>When are you riding?</p>
        <select>
          <option value="weekday">Weekdays</option>
          <option value="evenings_weekend">Evenings and/or Weekends</option>
          <option value="anytime">Anytime</option>
        </select>
      </div>
      <div>
        <p>Where will you purchase the fare?</p>
        <input
          type="radio"
          name="purchase"
          value="advance_purchase"
          checked={true}
        />
        <label for="station_kiosk">Station Kiosk</label>
        <input
          type="radio"
          name="purchase"
          value="onboard_purchase"
          checked={false}
        />
        <label for="station_kiosk">Onboard</label>
      </div>
      <div>How many rides will you need?</div>
    </div>
  );
};
