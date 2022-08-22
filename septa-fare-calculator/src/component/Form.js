import {useState, useEffect} from 'react'
import { findZone,formatName, formatCost } from '../helpers/helper_functions';
import { ReactComponent as SepLogo } from "./SEPTA.svg"
import './form.css'

export default function Form() {
  const url ='/fares.json'
  const [zones, setZones] = useState([]);
  const [days, setDays] = useState({});
  const [currDay, setCurrDay] = useState('weekday')
  const [currZone, setCurrZone] = useState({})
  const [checked, setChecked] = useState('advance')
  const [purch, setPurch] = useState('advance_purchase')
  const [riders, setRiders] = useState('');
  const [cost, setCost] = useState(0);

  const fetchdata = async ()=> {
    const res = await fetch(url);
    const data = await res.json()
    setZones(data.zones)
    setDays(data.info);
    setCurrZone(data.zones[0])
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    //versatile handleChange function to keep the code DRY
    switch (name) {
      case "days":
        setCurrDay(val)
        break;
      case "zones":
        findZone(zones, Number(val), setCurrZone)
        break;
      case "purchase":
        setChecked(checked === 'advance' ? 'onboard' : 'advance')
        setPurch(val)
        break;
      case "riders": 
        handleNum(e)
      default:
        break;
    }
  }
  
  const handleNum = (e) => {
    const regex = /^[0-9\b]+$/;
    //only allow people to type in numbers for cost section
    if (e.currentTarget.value === '' || regex.test(e.currentTarget.value)) {
      setRiders(Number(e.currentTarget.value));
    }
  }

  const findPrice = (fares, time, location, riders) => {
    if (time === 'anytime') {
      setCost(fares[4].price);
      setRiders(10);
      setChecked('advance')
      /* 
      Set the price to a fixed price, update the checked radio button to advanced option, and the riders to 10 because of the special deal for 10 advanced tickets. Don't allow users to change the amount of tickets because the deal is specifically for 10 tickets
       */
    } else if (!fares || !time || !location || !riders) {
      //unless all fields are selected set Cost to 0
      setCost(0)
    } else {
      for (let fare of fares) {
        const { type, purchase, price } = fare;

        if (type === time && purchase === location) {
          setCost(price * riders);
          return;
        }
      }
    }
  }

  useEffect(()=> {
    //use an empty dependency array so API is called only once
    fetchdata()
  }, [])

 useEffect(() => {
   if (currZone.fares) {
     findPrice(currZone.fares, currDay, purch, riders)
   }
  },[currZone,currDay,purch,riders])

  return (
      <div className = 'container'>
        <header>
        <SepLogo />
        <h1>Regional Rail Fares</h1>
        </header>
      <section>
        <h3>Where are you going?</h3>
        <label htmlFor="zones">
          <select name="zones" autoFocus onChange={handleChange}>
          {zones.map((zone, i) => (
            /* 
            I made the list of options dynamic in case more zones were added to the railway system
            The key is an index rather than set value because the list 
            of options is static and I am already using the zone# as the value.
            Default option is zone one
            */
            <option key = {i} value={zone.zone}>{zone.name}</option>
          ))}
          </select>
        </label>
      </section>
      <section>
        <h3>When are you riding?</h3>
        <label htmlFor="day-options">
          <select name="days" id="day-options" value={currDay} onChange = {handleChange} >
            {Object.keys(days).slice(0,3).map((day, i) => (
              <option key = {i} value = {day}>{formatName(day)}</option>
              ))}
          </select>
        </label>
        <p className = 'helper'>{currDay === 'anytime' ? `${days[currDay]} (10 ride deal !)` : days[currDay]}</p>
      </section>
      <section>
        <h3>Where will you purchase the fare?</h3>
        <div className='radio-btns' role= 'radio-btn container'>
            <input 
            type = "radio"
            value = "advance_purchase"
            name = "purchase"
            id = "advance-purchase"
            onChange = {handleChange}
            checked = {checked === 'advance'}
            aria-checked = {checked === 'advance' ? 'true' : 'false'}
             /> 
            <label htmlFor='advance-purchase'>Station Kiosk</label>
          </div>
        <div className='radio-btns' role= 'radio-btn container'>
            <input 
            type = "radio" 
            value = "onboard_purchase"
            name = 'purchase'
            id = "onboard-purchase"
            onChange = {handleChange}
            checked ={checked === 'onboard'}
            aria-checked = {checked === 'onboard' ? 'true' : 'false'}
            />
            <label htmlFor='onboard-purchase'>Onboard</label>
        </div>
      </section>
      <section>
        <h3>How many rides will you need?</h3>
        <input 
        type="text" 
        name = 'riders'
          className='number-of-riders'
        onChange = {handleNum}
        value = {riders}
        />
      </section>
      <section className = 'cost'>
        <h3>Your fare will cost</h3>
        <p className='total-amount'><strong>{formatCost.format(cost)}</strong></p>
      </section>
      </div>
    )
}
