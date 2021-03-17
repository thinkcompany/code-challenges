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
  const [cost, setCost] = useState('');

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

  useEffect(() => {
    if(zone && travelTime && location && quantity && data) {
      for(let zoneInData of data.zones) {
        if(zone === zoneInData.name) {
          for(let fare of zoneInData.fares) {
            if(fare.type === travelTime && fare.purchase === location) {
              setCost((fare.price / fare.trips * quantity).toFixed(2));
            }
          }
        }
      }
    }
    return () => setCost('');
  }, [zone, travelTime, location, quantity, data])
  
  return (
    <div className="septa-widget">
      <div className="septa-widget-header">
        <img src={logo} alt="septa logo" className="septa-widget-header-logo" />
        <h2>Regional Rail Fares</h2>
      </div>
      <Zone zone={zone} setZone={setZone} options={data ? data.zones : []} />
      <TravelTime
        travelTime={travelTime}
        setTravelTime={setTravelTime}
        quantity={quantity}
        options={
          data
            ? quantity > 0 && quantity % 10 === 0
              ? Object.keys(data.info).slice(0, 3)
              : Object.keys(data.info).slice(1, 3)
            : []
        }
        info={
          data && data.info[travelTime]
            ? data.info[travelTime]
            : 'Special "anytime" tickets available when you buy at Station Kiosk and in multiples of 10! Select options below accordingly to unlock the option :)'
        }
      />
      <Location location={location} setLocation={setLocation} />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <div className="septa-widget-result">
        {cost && (
          <>
            <div style={{ fontSize: "18px" }}>Your fare will cost</div>
            <div style={{ fontSize: "54px", fontWeight: '600' }}>${cost}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default SeptaWidget;