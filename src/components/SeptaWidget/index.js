import { useState, useEffect } from 'react';

import './SeptaWidget.css'
import logo from '../../img/logo.svg';

import Zone from '../form-sections/Zone';
import TravelTime from '../form-sections/TravelTime';
import Location from '../form-sections/Location';
import Quantity from '../form-sections/Quantity';

const SeptaWidget = () => {
  const [data, setData] = useState();
  const [zone, setZone] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json"
      );
      if (response.ok) {
        response.data = await response.json();
        setData(response.data)
      } else {
        console.error('There was a problem loading the data. Please refresh and try again!')
      }
    })();
  }, [])
  
  return (
    <div className="septa-widget">
      <div className="septa-widget-header">
        <img src={logo} alt="septa logo" className="septa-widget-header-logo" />
        <h2>Regional Rail Fares</h2>
      </div>
      <Zone
        zone={zone}
        setZone={setZone}
        options={data ? data.zones : []}
      />
      <TravelTime />
      <Location />
      <Quantity />
      <div className='septa-widget-result'>
        
      </div>
    </div>
  );
}

export default SeptaWidget;