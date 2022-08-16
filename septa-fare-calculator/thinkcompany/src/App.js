import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [fareData, setFareData] = useState();
  const [total, setTotal] = useState(0);
  const [destination, setDestination] = useState(1);
  const [location, setLocation] = useState("advance_purchase");
  const [calendar, setCalendar] = useState("weekday");
  const [numberOfRides, setNumberOfRides] = useState(0);
  const url = "fares.json";

  useEffect(() => {
    // Couldn't get fetch to work, used axios instead
    const response = axios.get(url).then(
      res => setFareData(res.data)
    )
  }, [url])

  useEffect(() => {
    let tempPrice;
    if (calendar === "anytime") {
      tempPrice = fareData?.zones[destination]?.fares?.filter(entry => entry?.type === calendar)[0]?.price
    } else {
      tempPrice = fareData?.zones[destination]?.fares?.filter(entry => (entry?.purchase === location && entry?.type === calendar))[0]?.price
    }
    setTotal(numberOfRides * tempPrice)
  }, [numberOfRides, destination, location, calendar])

  return (
    <div className='railfare'>
      <div className='railfare-component'>
        <div className='regional-rail-header'>
          <div className='regional-rail-logo'>
            <img src='/images/logo.png' />
          </div>
          <div className='regional-rail-title'>
            Region Rail Fares
          </div>
        </div>
        <div className='regional-zone'>
          <div className='regional-title'>
            Where are you going?
          </div>
          <div className='regional-dropdown'>
            <select onChange={(e) => setDestination(e.target.value)}>
              {fareData?.zones.map((zone, idx) => (

                <option key={idx} value={idx}>
                  {zone?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='regional-ride'>
          <div className='regional-title'>
            When are you riding?
          </div>
          <div className='regional-dropdown'>
            <select onChange={(e) => setCalendar(e.target.value)}>
              <option value={"weekday"}>Weekdays</option>
              <option value={"evening_weekend"}>Weekend Evening</option>
              <option value={"anytime"}>Anytime</option>
            </select>
          </div>
        </div>
        <div className='regional-selecter'>
          <div>Where will you purchase the fare?</div>
          <div>
            <input
              type="radio"
              name='purchased_type'
              id="Station Kiosk"
              value="advance_purchase"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="Station Kiosk">Station Kiosk</label>
          </div>
          <div>
            <input
              type="radio"
              name='purchased_type'
              id="Onboard"
              value="onboard_purchase"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="Onboard">Onboard</label>
          </div>
        </div>
        <div className='regional-ride-total'>
          <div>
            How many rides will you need?
          </div>
          <div>
            <input
            id='ride-counter'
            onChange={(e) => setNumberOfRides(e.target.value)}
            value={numberOfRides}
            type='number'>
            </input>
          </div>
        </div>
        <div className='regional-ride-price'>
          <div>
            Your fare will cost
          </div>
          <div id='total-price'>
            ${total ? total.toFixed(2) : "0.00"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
