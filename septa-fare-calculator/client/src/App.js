import './App.css';
import { useEffect, useState } from 'react';

// https://github.com/thinkcompany/code-challenges/blob/master/septa-fare-calculator

function App() {

  const [zone, setZone] = useState(1)
  const [timeSlot, setTimeSlot] = useState('weekday')
  const [purchaseLocation, setPurchaseLocation] = useState('advance_purchase')
  const [numRides, setNumRides] = useState(1)
  const [calculatedFare, setCalculatedFare] = useState(0)


  // fetch('../../fares.json')
  //   .then(res => console.log(res))
  //   .then(data => console.log(data))

  // Tried AJAX/Fetch request above, it choked on JSON formatting
  const json = require('./fares.json')
  const zones = json.zones
  const calculateFare = (zone, timeSlot, purchaseLocation, numRides) => {
    let singleFarePrice
    if(numRides > 9 && purchaseLocation === 'advance_purchase'){
      let faresArray = zones[zone - 1].fares
      // 10+ price always last item in faresArray
      let bulkFare = faresArray[faresArray.length - 1]
      singleFarePrice = bulkFare.price / 10
    } else {
      zones[zone - 1].fares.forEach((fare) => {
        if(fare.purchase === purchaseLocation && fare.type === timeSlot) {
          singleFarePrice = fare.price
        }
      })
    }
    return singleFarePrice * numRides
  }

  // Recalculate and display new price on each re-render
  useEffect(()=> {
    const newPrice = calculateFare(zone, timeSlot, purchaseLocation, numRides)
    // Round and format floats to two decimal places
    const formattedPrice = parseFloat(newPrice).toFixed(2)
    setCalculatedFare(formattedPrice)
  }, [zone, timeSlot, purchaseLocation, numRides])


  const handleZoneSelect = (e) => {
    setZone(parseInt(e.target.value))
  }
  const handleTimeSlotSelect = (e) => {
    setTimeSlot(e.target.value)
  }
  const handlePurchaseLocationChange = (e) => {
    setPurchaseLocation(e.target.value)
  }
  const handleNumRideChange = (e) => {
    setNumRides(parseInt(e.target.value))
  }

  return (
    <div className="App">
      <div className="main-card">
        <h3>Where are you going?</h3>
        <select name="zones" onChange={handleZoneSelect} value={zone}>
          <option value="1">Zone 1</option>
          <option value="2">Zone 2</option>
          <option value="3">Zone 3</option>
          <option value="4">Zone 4</option>
          <option value="5">Zone 5</option>
        </select>

        <h3>When are you riding?</h3>
        <select name="time" onChange={handleTimeSlotSelect} value={timeSlot}>
          <option value="weekday">Weekday</option>
          <option value="evening_weekend">Evening or Weekend</option>
        </select>

        <h3>Where will you purchase the fare?</h3>
        <div>
          <input
              checked={purchaseLocation === 'advance_purchase'}
              name="purchase_location"
              onChange={handlePurchaseLocationChange}
              type="radio"
              value="advance_purchase"
          />
          <label htmlFor="huey">Station Kiosk</label>
        </div>

        <div>
          <input
              checked={purchaseLocation === 'onboard_purchase'}
              name="purchase_location"
              onChange={handlePurchaseLocationChange}
              type="radio"
              value="onboard_purchase"
          />
          <label htmlFor="dewey">Onboard</label>
        </div>

        <h3>How many rides will you need?</h3>
        <input type="number" min="1" onChange={handleNumRideChange} value={numRides}></input>

        <h5>Your fare will cost</h5>
        {`$${calculatedFare}`}

      </div>
    </div>
  );
}

export default App;
