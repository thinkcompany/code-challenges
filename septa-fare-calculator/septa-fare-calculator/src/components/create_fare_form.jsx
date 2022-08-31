import React, { useState } from "react";
import "./styleSheet/create_form.css";

function CreateFareFrom(props) {
  const { faresData } = props;
  /* Grab the zone name from the data*/
  const zones = faresData["zones"].map((inner) => inner.name);

  const [zone, setZone] = useState();
  /* console.log(zone) */
  /* change the zone on the state depending on what the options the user selects*/

  const [day, setDay] = useState();
  /* console.log(day) */
  /* change the day on the state depending on what the options the user selects*/

  const details = faresData["info"][day];
  /*console.log(details) */
  /* additional details depending on what day the user selects*/

  const [type, setType] = useState();

  /* console.log(type) */
  /* change the type on the state depending on what the radio options the user selects*/

  const [amount, setAmount] = useState();
  /* console.log(amount) */

  /* In interest of time, decided use if statement to access the total cost instead of the using for loop to iterate through the data*/

  /*   let totalInfo = {}; */
  /*for (let i = 0; i < faresData["zones"].length; i += 1){
    totalInfo[faresData["zones"][i]["name"]] = faresData["zones"][i]["fares"];
  } */

  let total;
  if (
    type === "advance_purchase" &&
    zone === "Zone 2" &&
    day === "evening_weekend"
  ) {
    total = (Math.round(amount * 3.75 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 2" &&
    day === "weekday"
  ) {
    total = (Math.round(amount * 4.75 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 2" &&
    day === "anytime"
  ) {
    total = (Math.round(amount * 45.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 2" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 45.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 2" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 5.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 2" &&
    day === "weekday"
  ) {
    total = (amount * 6.0 * 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "CCP/1" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 3.75 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "CCP/1" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 4.75 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "CCP/1" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 38.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "CCP/1" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 38.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "CCP/1" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 5 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "CCP/1" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 6 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 3" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 5 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 3" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 5.75 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 3" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 54.5 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 3" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 54.5 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 3" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 7.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 3" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 7.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 4" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 5.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 4" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 6.5 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 4" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 62.5 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 4" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 62.5 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 4" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 7.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 4" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 8.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 5" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 9.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 5" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 9.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "Zone 5" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 80.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 5" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 80.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 5" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 10.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "Zone 5" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 10.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "NJ" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 9.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "NJ" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 9.0 * 100) / 100).toFixed(2);
  } else if (
    type === "advance_purchase" &&
    zone === "NJ" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 80.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "NJ" &&
    day === "anytime"
  ) {
    total = Math.round((amount * 80.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "NJ" &&
    day === "evening_weekend"
  ) {
    total = Math.round((amount * 10.0 * 100) / 100).toFixed(2);
  } else if (
    type === "onboard_purchase" &&
    zone === "NJ" &&
    day === "weekday"
  ) {
    total = Math.round((amount * 10.0 * 100) / 100).toFixed(2);
  }
  return (
    <div className="outerLevel">
      <div className="icon-title">
        <img
          src={require("../components/img/septa.png")}
          alt="septa-icon"
          className="icon"
        ></img>
        <div className="title">Regional Rail Fares</div>
      </div>
      <form>
        <div className="going-input">
          <div className="where">Where are you going?</div>
          <div>
            <select
              className="selectedZone"
              onChange={(e) => {
                const selectedZone = e.target.value;
                setZone(selectedZone);
              }}
            >
              <option value="" selected disabled hidden></option>
              {zones.map((zone, index) => (
                <option key={index} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="riding-input">
          <div className="when">When are you riding?</div>
          <div className="outer-select">
            <select
              className="selectedDay"
              onChange={(e) => {
                const selectedDay = e.target.value;
                setDay(selectedDay);
              }}
            >
              <option value="" selected disabled hidden></option>
              <option value="weekday">Weekday</option>
              <option value="evening_weekend">Evening_weekend</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>
          <div className="details">{details}</div>
        </div>
        <div className="purchase-input">
          <div className="purchaseQuestion">
            Where will you purchase the fare?
          </div>
          <div className="radioOptions">
            <div className="radio-advance">
              <input
                className="kiosk-input"
                type="radio"
                name="type"
                value="advance_purchase"
                onChange={(e) => setType(e.target.value)}
              />
              <p className="kiosk-title">Station Kiosk</p>
            </div>
            <div className="radio-onboard">
              <input
                className="onboard-input"
                type="radio"
                name="type"
                value="onboard_purchase"
                onChange={(e) => setType(e.target.value)}
              />
              <p className="Onboard-title">Onboard</p>
            </div>
          </div>
        </div>
        <div className="totaltickets-input">
          <div className="how">How many rides will you need?</div>
          <div className="ticket-number">
            <input
              className="amount-input"
              type="number"
              min="1"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="totalCost">
          <div className="detailCost">Your Fare will cost</div>
          <div className="total">{total}</div>
        </div>
      </form>
    </div>
  );
}

export default CreateFareFrom;
