import "./styles.css"
import {useEffect, useState} from "react";

const minRides = 1 // Min number of trips
const maxRides = 10 // Max number of trips
const titles = {
  'advance_purchase': 'Station Kiosk',
  'onboard_purchase': 'Onboard',
  'weekday': 'Weekdays',
  'evening_weekend': 'Weekend/Evening',
  'anytime': 'Anytime',
}

export default function FareCalculator() {
  const [data, setData] = useState() // Loaded zones data
  const [loading, setLoading] = useState(true) // Loading data indicator
  const [zone, setZone] = useState() // Current selected zone
  const [type, setType] = useState() // Current selected type
  const [purchase, setPurchase] = useState() // Current selected purchase
  const [rides, setRides] = useState(minRides) // Current number of trips
  const [fare, setFare] = useState({}) // Current fare
  const [price, setPrice] = useState(0) // Current price

  // Load data
  useEffect(() => {
    fetch('fares.json')
      .then((res) => res.json())
      .then((data) =>{
        setData(data)
        setLoading(false)
      })
  }, [])

  // Set zone after loading data
  useEffect(() => {
    if (data?.zones) {
      setZone(data?.zones[0])
    }
  }, [data])

  // Set default type and purchase after zone changed
  useEffect(() => {
    if (zone?.fares?.length > 0) {
      setType(getTypes()[0])
      setPurchase(getPurchases()[0])
    }
  }, [zone])

  // Calculate price after any parameter changed
  useEffect(() => {
    if (zone?.fares?.length > 0) {
      const fare = zone?.fares?.find(item =>
        item.type === type
        && item.purchase === purchase
      )

      setFare(fare || {})
      setPrice(rides > fare?.trips ? rides * fare.price : fare?.price || 0)
    }
  }, [zone, type, purchase, rides])

  // Select type handler
  const selectType = (event) => {
    setType(event.target.value)
  }

  // Select zone handler
  const selectZone = (event) => {
    const name = parseInt(event.target.value)
    const zone = data?.zones?.find(item => item.zone === name)

    setZone(zone)
  }

  // Change number of the trips handler
  const changeRides = (event) => {
    const value = parseInt(event.target.value)
    if (value < minRides) {
      setRides(minRides)
    } else if (value > maxRides) {
      setRides(maxRides)
    } else {
      setRides(value)
    }
  }

  // Select purchase handler
  const changePurchase = (event) => {
    const value = event.target.value
    setPurchase(value)
  }

  // Get all types of current zone
  const getTypes = () => {
    return zone?.fares?.map(item => item.type).filter((value, index, self) => self.indexOf(value) === index)
  }

  // Get all purchases of current zone
  const getPurchases = () => {
    return zone?.fares?.map(item => item.purchase).filter((value, index, self) => self.indexOf(value) === index)
  }

  return (
    <div className="container">
      <div className="header">Regional Rail Fares</div>

      {!loading && data ? <>
        {/* Zone control */}
        <div className="form-control">
          <div className="subtitle">Where are going?</div>
          <select name="destination" onChange={selectZone}>
            {data?.zones?.map((item) => (
              <option key={item.zone} value={item.zone}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Types control */}
        <div className="form-control">
          <div className="subtitle">When are you riding?</div>
          <select name="type" onChange={selectType}>
            {getTypes()?.map((key) => (
              <option key={key} value={key}>{titles[key]}</option>
            ))}
          </select>
          <div className="helper-text">{type && data?.info[type]}</div>
        </div>

        {/* Purchase radio control */}
        <div className="form-control">
          <div className="subtitle">Where will you purchase the fare?</div>

          <div className="radio-container">
            {getPurchases()?.map(key => (
              <div key={key}>
                <input id={key} type="radio" name="purchase" value={key} checked={purchase === key}
                       onChange={changePurchase}/>
                <label htmlFor={key}>{titles[key]}</label>
              </div>
            ))}
          </div>

          <div className="helper-text">{purchase && data?.info[purchase]}</div>
        </div>

        {/* Trips number control */}
        <div className="form-control no-border">
          <div className="subtitle">How many rides will you need?</div>
          <input type="number" name="number" min="1" max="10" inputmode="numeric" pattern="[0-9]*"
                 value={rides} onChange={changeRides} className="width-30 align-center" />
        </div>

        {/* Price */}
        <div className="footer">
          <div className="subtitle">Your fare will cost</div>
          <div className="price">{price ? '$' + parseFloat(`${price || 0}`).toFixed(2) : ''}</div>
        </div>
      </> : <div className="loading">Loading...</div>}
    </div>
  )
}
