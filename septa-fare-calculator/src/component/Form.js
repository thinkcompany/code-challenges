import {useState, useEffect} from 'react'
export default function Form() {
  const url ='/fares.json'
  const [zones, setZones] = useState([]);
  const [days, setDays] = useState({});

  const fetchdata = async ()=> {
    const res = await fetch(url);
    const data = await res.json()
    setZones(data.zones)
    setDays(data.info);
  }
 
  useEffect(()=> {
    //use an empty dependency array so API is called only once
    fetchdata()
  }, [])
  if (!zones.length) {
    return <h2>Loading...</h2>
  } else {
    return (
      <div>
        <header>
          <h1>Regional Rail Fares</h1>
        </header>
      <section>
        <h3>Where are you going?</h3>
        <label htmlFor="zones">
          <select name="zones">
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
        <label htmlFor="days">
          <select name="days" >
            {Object.keys(days).slice(0,3).map((day, i) => (
              <option key = {i} value = {day}>{day}</option>
            ))}
          </select>
        </label>
      </section>
      <section>
        <h3>Where will you purchase the fare?</h3>
          <div role= 'radio-btn container'>
          <label htmlFor="">
            <input type="radio" />Station Kiosk
          </label>
          <div role= 'radio-btn container'>
            <input type="radio" />
          </div>
        </div>
      </section>
      <section>
        <h3>Your fare will cost</h3>
      </section>
      </div>
    )

  }
}
