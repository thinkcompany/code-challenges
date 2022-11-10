import React from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => {

  
  return (
    <>
      <main className='fare-widget'>
        <div className='fare-widget-header'>Regional Rail Fares</div>
        <div className='fare-widget-zone'>
          <select class='zone'></select>
        </div>
        <div className='fare-widget-time'>
          <select class='time'></select>
        </div>
        <div className='fare-widget-location'>
          <select class='location'></select>
        </div>
        <div className='fare-widget-rides'>
          <select class='rides'></select>
        </div>
        <div className='fare-widget-price'></div>
      </main>
    </>
  );
};

export default hot(App);
