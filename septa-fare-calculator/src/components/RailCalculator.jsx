import { useEffect, useState } from "react";
import './RailCalculator.css'

const RailCalculator = ({ url }) => {

  const [fareData, setFareData] = useState([]);
  const [destination, setDestination] = useState(0);
  const [location, setLocation] = useState("advance_purchase");
  const [day, setDay] = useState('weekday');
  const [numberOfRides, setNumberOfRides] = useState(0);

  useEffect(() => {
    fetch('./fares.json').then(res => res.json()).then((result) => {
      setFareData(result)
    })
  }, [])

  const calulateTotal = () => {
    let price = 0;

    if (destination >= 0 && location && day && numberOfRides > 0) {
      if (day === "anytime") {

        let fares = fareData?.zones[destination].fares

        let myFare;
        for (let fare of fares) {
          if (fare.type === day) {
            myFare = fare;
          }
        }
        price = myFare.price
        return (numberOfRides * price).toFixed(2)
      } else {

        let fares = fareData?.zones[destination].fares
        let myFare;

        for (let fare of fares) {
          if (fare.purchase === location && fare.type === day) {
            myFare = fare;
          }
        }
        price = myFare.price
        return (numberOfRides * price).toFixed(2)
      }
    } else {
      return "0.00";
    }
  }

  return (
    <form id="fare-form">
      <div className="header-div">
        <img src='/img/septa.png' alt="Regional Rail fares price calculation form" />
        <h2>Regional Rail Fares</h2>
      </div>
      <div className="content-div">
        <h3>Where are you going?</h3>
        <select id="destination"
          className="select-dropdown"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          {fareData?.zones?.map((zone, i) => (
            <option key={i} value={i}>
              {zone?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="content-div">
        <h3>When are you riding?</h3>
        <select id="day"
          className="select-dropdown"
          onChange={(e) => setDay(e.target.value)}>
          <option value={"weekday"}>Weekdays</option>
          <option value={"evening_weekend"}>Evening / Weekend</option>
          <option value={"anytime"}>Anytime</option>
        </select>
      </div>
      <div className="content-div">
        <h3>Where will you purchase the fare?</h3>
        <div id="radio-buttons">
          <div>
            <input
              id="station-kiosk"
              type="radio"
              value="advance_purchase"
              onChange={(e) => setLocation(e.target.value)}
              checked={location === "advance_purchase" ? true : false} />
            <label htmlFor="station-kiosk">Station Kiosk</label>
          </div>
          <div>
            <input
              id="onboard"
              type="radio"
              value="onboard_purchase"
              onChange={(e) => setLocation(e.target.value)}
              checked={location === "onboard_purchase" ? true : false} />
            <label htmlFor="onboard">Onboard</label>
          </div>
        </div>
      </div>
      <div className="content-div">
        <h3>How many rides will you need?</h3>
        <label htmlFor="rides_count" />
        <input
          id="rides_count"
          type="number"
          value={numberOfRides}
          min={0}
          onChange={(e) => setNumberOfRides(e.target.value)} />
      </div>
      <div className="footer-div">
        <p>Your fare will cost</p>
        <p id="total-price">${calulateTotal()}</p>
      </div>
    </form>
  )
}

export default RailCalculator;
