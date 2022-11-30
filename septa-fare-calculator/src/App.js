// Base imports
import React, { useState } from "react";

// Style imports
import './App.css';

// Image imports
import septaLogo from './logo.png'

// Data imports
import { rideData } from "./fares";

const App = () => {
  const [zone, setZone] = useState('');
  const [ridingTime, setRidingTime] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [rideNumber, setRideNumber] = useState('');

  // Handle zone selection
  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };

  // Handle time selection
  const handleTimeChange = (event) => {
    setRidingTime(event.target.value);
  };

  // Handle purchase location choice on radio buttons
  const handleRadioButtonChoice = (event) => {
    setPurchaseLocation(event.target.value);
  }

  // Handle number of tickets input change
  const handleNumberChange = (event) => {
    setRideNumber(event.target.value);
  }

  // Find the zone based on user choice of zone
  let ticketPriceInitial = rideData
    .filter((item) => item.zone_number === zone && item.type === ridingTime && item.purchase === purchaseLocation)
    .map((filteredItem) => filteredItem.price);
  let ticketPrice = ticketPriceInitial.toString()

  let totalPrice = ((rideNumber * ticketPrice).toFixed(2))

  console.log('Total price: ' + totalPrice)


  return (
    <div className="App">

      <form className="ride-form">
        <div className="ride-form__header">
          <div className="ride-form__logo">
            <img src={septaLogo} alt="SEPTA Logo"/>
          </div>
          <h1>Regional Rail Fares</h1>
        </div>
        <div className="ride-form__field-group">
          <label htmlFor="destination">Where are you going?</label>
          <select value={zone} onChange={handleZoneChange} id="destination">
            <option value="">Select:</option>
            <option value="1">CCP/1</option>
            <option value="2">Zone 2</option>
            <option value="3">Zone 3</option>
            <option value="4">Zone 4</option>
            <option value="5">New Jersey</option>
          </select>
        </div>

        <div className="ride-form__field-group">
          <label htmlFor="ridingTime">When are you riding?</label>
          <select value={ridingTime} onChange={handleTimeChange} id="ridingTime">
            <option value="">Select:</option>
            <option value="anytime">Any Time</option>
            <option value="weekday">Weekday</option>
            <option value="evening_weekend">Evening Weekend</option>
          </select>
          <div className="helper-text">Helper text here</div>
        </div>

        <div className="ride-form__field-group ride-form__field-group--radio">
          <div className="label">Where will you purchase the fare?</div>
          <label htmlFor="purchaseLocationAdvance">
            <input 
              type="radio" 
              id="purchaseLocationAdvance"
              value="advance_purchase"
              name="purchaseLocation"
              checked={purchaseLocation === 'advance_purchase'}
              onChange={handleRadioButtonChoice} 
            />
            Station Kiosk
          </label>
          <label htmlFor="purchaseLocationOnboard">
            <input 
              type="radio" 
              id="purchaseLocationOnboard"
              value="onboard_purchase"
              name="purchaseLocation"
              checked={purchaseLocation === 'onboard_purchase'}
              onChange={handleRadioButtonChoice} 
            />
            Onboard
          </label>
        </div>

        <div className="ride-form__field-group">
          <label htmlFor="numberOfRides">How many rides will you need?</label>
          <input 
            id="numberOfRides" 
            type="text" 
            name="rides"
            value={rideNumber}
            onChange={handleNumberChange}
            className="ride-form__ride-number-input"
          />
        </div>

        <div className="ride-form__totals-box">
          <div className="ride-form__total-text">Your fare will cost</div>
          <div className="ride-form__total-amount">${totalPrice}</div>
        </div>

      </form>

    </div>
  );
}

export default App;
