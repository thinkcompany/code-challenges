import {useState, useEffect} from 'react'
export default function Form() {
  const url ='/fares.json'
  const [zones, setZones] = useState([]);
  const [days, setDays] = useState({});

  const fetchdata = async ()=> {
    const res = await fetch(url);
    const data = await res.json()
    setZones(data.zones)
    setDays(data.days);
  }
  
  useEffect(()=> {
    //use an empty dependency array so API is called only once
    fetchdata()
  }, [])
  if (!zones.length) {
    return <h2>Loading...</h2>
  } else {
    debugger;
    return (
      <div>Form</div>
    )

  }
}
