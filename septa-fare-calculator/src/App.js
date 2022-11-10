import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => {
  useEffect(() => {
    fetch('/fares.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log('Data', data));
  }, []);

  return (
    <>
      <main className='fare-widget'>
        <div className='fare-widget-header'>Regional Rail Fares</div>
        <div className='fare-widget-zone'>
          <select className='zone'></select>
        </div>
        <div className='fare-widget-time'>
          <select className='time'></select>
        </div>
        <div className='fare-widget-location'>
          <select className='location'></select>
        </div>
        <div className='fare-widget-rides'>
          <select className='rides'></select>
        </div>
        <div className='fare-widget-price'></div>
      </main>
    </>
  );
};

export default hot(App);
