import {useState, useEffect} from 'react'
export default function Form() {
  const url ='/fares.json'
  const [zones, setZones] = useState([]);
  const [days, setDays] = useState({});
  const [currDay, setCurrDay] = useState(null)
  const [currZone, setCurrZone] = useState(null)
  const [checked, setChecked] = useState('advance')
  const [purch, setPurch] = useState('advance_purchase')

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
        //add zone logic here
        break;
      case "purchase":
        setChecked(checked === 'advance' ? 'onboard' : 'advance')
        setPurch(val)
        break;
      default:
        break;
    }
  }
  useEffect(()=> {
    //use an empty dependency array so API is called only once
    fetchdata()
  }, [])

   console.log(checked)
    return (
      <div>
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
      </section>
      <section>
        <h3>Where will you purchase the fare?</h3>
          <div role= 'radio-btn container'>
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
          <div role= 'radio-btn container'>
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
        <h3>Your fare will cost</h3>
      </section>
      </div>
    )
  
}
