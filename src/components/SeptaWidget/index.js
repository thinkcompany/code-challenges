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
  const [quantity, setQuantity] = useState('');

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
  console.log(quantity)
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
      <TravelTime
        travelTime={travelTime}
        setTravelTime={setTravelTime}
        options={data ? Object.keys(data.info).slice(0, 3) : []}
      />
      <Location location={location} setLocation={setLocation} />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <div className='septa-widget-result'>
        
      </div>
    </div>
  );
}

export default SeptaWidget;