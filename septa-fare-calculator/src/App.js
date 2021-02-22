import { useState, useEffect } from 'react';

import './App.scss';
import logo from './img/logo-septa.png';

// Hi Think Company Team! Thank you for taking the time to review my code. Looking forward to your feedback!

const App = () => {
  const [fareData, setFareData] = useState(null);
  const [destination, setDestination] = useState(null);
  const [timeOfRide, setTimeOfRide] = useState(null);
  const [purchaseLocation, setPurchaseLocation] = useState(null);
  const [numOfRides, setNumOfRides] = useState(null);
  const [fareCost, setFareCost] = useState(null);

  useEffect(async () => {
    const url = 'fares.json';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.zones);
        setFareData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (
      fareData &&
      destination !== null &&
      timeOfRide &&
      purchaseLocation &&
      numOfRides
    ) {
      calculateFareCost();
    } else {
      setFareCost(null);
    }
  }, [destination, timeOfRide, purchaseLocation, numOfRides]);

  const calculateFareCost = () => {
    let fareOption;
    if (timeOfRide === 'weekday' && purchaseLocation === 'advance_purchase') {
      fareOption = 0;
    } else if (
      timeOfRide === 'weekday' &&
      purchaseLocation === 'onboard_purchase'
    ) {
      fareOption = 1;
    } else if (
      timeOfRide === 'evening_weekend' &&
      purchaseLocation === 'advance_purchase'
    ) {
      fareOption = 2;
    } else if (
      timeOfRide === 'evening_weekend' &&
      purchaseLocation === 'onboard_purchase'
    ) {
      fareOption = 3;
    } else if (
      timeOfRide === 'anytime' &&
      purchaseLocation === 'advance_purchase' &&
      numOfRides === 10
    ) {
      fareOption = 4;
    } else if (
      timeOfRide === 'anytime' &&
      purchaseLocation === 'onboard_purchase'
    ) {
      fareOption = 5;
    }

    if (fareOption < 4) {
      let totalFare =
        fareData.zones[destination].fares[fareOption].price * numOfRides;
      totalFare = totalFare.toFixed(2);
      totalFare > 100000 ? setFareCost('A lot!') : setFareCost(`$${totalFare}`);
    } else if (fareOption === 4) {
      let totalFare = fareData.zones[destination].fares[4].price;
      totalFare = totalFare.toFixed(2);
      setFareCost(`$${totalFare}`);
    } else {
      setFareCost(null);
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case 'destination':
        setDestination(Number(inputValue));
        break;
      case 'timeOfRide':
        inputValue === 'anytime' ? setNumOfRides(10) : null;
        setTimeOfRide(inputValue);
        break;
      case 'purchaseLocation':
        setPurchaseLocation(inputValue);
        break;
      case 'numOfRides':
        setNumOfRides(Number(inputValue));
        break;
      default:
    }
  };
  return (
    <div className="faresContainer">
      <div className="header">
        <img src={logo}></img>
        <h1>Regional Rail Fares</h1>
      </div>

      <div className="inputContainer">
        <label htmlFor="fareForm-destination">Where are you going?</label>
        <select
          name="destination"
          id="fareForm-destination"
          onChange={handleChange}
        >
          <option hidden>Select Destination</option>
          <option value="0">CCP/1</option>
          <option value="1">Zone 2</option>
          <option value="2">Zone 3</option>
          <option value="3">Zone 4</option>
          <option value="4">New Jersey</option>
        </select>
      </div>

      <div className="inputContainer">
        <label htmlFor="fareForm-timeOfRide">When are you riding?</label>
        <select
          name="timeOfRide"
          id="fareForm-timeOfRide"
          onChange={handleChange}
        >
          <option hidden>Select Time of Ride</option>
          <option value="weekday">Weekdays</option>
          <option value="evening_weekend">Evening/Weekend</option>
          <option value="anytime">Anytime</option>
        </select>
        {timeOfRide === 'weekday' && (
          <p>Monday through Friday, between 4:00 a.m. and 7:00 p.m.</p>
        )}
        {timeOfRide === 'evening_weekend' && (
          <p>Monday through Friday after 7:00 p.m. All day Saturday, Sunday</p>
        )}
        {timeOfRide === 'anytime' && (
          <p>Special price for purchasing 10 "Anytime" tickets in advance!</p>
        )}
      </div>

      <div className="inputContainer">
        <label>Where will you purchase the fare?</label>
        <div>
          <input
            id="fareForm-purchaseLocationKiosk"
            type="radio"
            name="purchaseLocation"
            value="advance_purchase"
            onChange={handleChange}
          ></input>
          <label htmlFor="fareForm-purchaseLocationKiosk">Station Kiosk</label>
        </div>
        <div>
          {' '}
          <input
            id="fareForm-purchaseLocationOnboard"
            type="radio"
            name="purchaseLocation"
            value="onboard_purchase"
            onChange={handleChange}
          ></input>
          <label htmlFor="fareForm-purchaseLocationOnboard">Onboard</label>
        </div>
      </div>

      <div className="inputContainer">
        <label htmlFor="fareForm-numOfRides">
          How many rides will you need?
          <input
            id="fareForm-numOfRides"
            type="number"
            name="numOfRides"
            onChange={handleChange}
          ></input>
        </label>
      </div>

      <div className="resultContainer">
        <h2>Your fare will cost</h2>
        {fareCost && <p>{fareCost}</p>}
      </div>
    </div>
  );
};

export default App;
