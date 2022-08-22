import {useState, useEffect} from 'react'
import { findZone } from '../helpers/helper_functions';
import './form.css'

export default function Form() {
  const url ='/fares.json'
  const [zones, setZones] = useState([]);
  const [days, setDays] = useState({});
  const [currDay, setCurrDay] = useState(null)
  const [currZone, setCurrZone] = useState(null)
  const [checked, setChecked] = useState('advance')
  const [purch, setPurch] = useState('advance_purchase')
  const [riders, setRiders] = useState('');
  
  const fetchdata = async ()=> {
    const res = await fetch(url);
    const data = await res.json()
    setZones(data.zones)
    setDays(data.info);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
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
    if (e.currentTarget.value === '' || regex.test(e.currentTarget.value)) {
      setRiders(Number(e.currentTarget.value));
    }
  }
  useEffect(()=> {
    //use an empty dependency array so API is called only once
    fetchdata()
  }, [])

  return (
      <div className = 'container'>
        <header>
          <h1>Regional Rail Fares</h1>
        </header>
      <section>
        <h3>Where are you going?</h3>
        <label htmlFor="zones">
          <select name="zones" autoFocus onChange={handleChange}>
          <option value={null}>Select a destination</option> 
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
          <select name="days" id="day-options" onChange = {handleChange} >
            <option value={null}>Select a time</option> 
            {Object.keys(days).slice(0,3).map((day, i) => (
              <option key = {i} value = {day}>{day}</option>
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
      </section>
      </div>
    )
  
}
