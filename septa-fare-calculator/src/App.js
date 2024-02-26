import React, { useState } from 'react';
import DropdownSelectMenu from './DropdownSelectMenu';
import RadioButtonGroup from './RadioButtonGroup';
import NumberInput from './NumberInput';
import Fares from './fares.json';
import './App.css';

function App() {

  /* ZONES */
  // List of zones
  const zones = [
    { value: 1, label: 'CCP/1' },
    { value: 2, label: 'Zone 2' },
    { value: 3, label: 'Zone 3' },
    { value: 4, label: 'Zone 4' },
    { value: 5, label: 'NJ' },
  ];

  // Storage for selected zone
  const [selectedZone, setSelectedZone] = useState(0);

  // Zone function
  const zoneFunc = (value) => { setSelectedZone(value); }


  /* TYPE */
  // List of types of travel
  const type = [
    { value: 'weekday', label: 'Weekdays only' },
    { value: 'evening_weekend', label: 'Weekend days only' },
    { value: 'anytime', label: 'Anytime'}
  ];

  // Storage for selected type
  const [selectedType, setSelectedType] = useState('');

  // Handler for selected type
  const rideFunc = (value) => { setSelectedType(value); }


  /* PURCHASE */
  // List of purchase options
  const farePurchase = [
    { value: 'advance_purchase', label: 'Station Kiosk' },
    { value: 'onboard_purchase', label: 'Onboard'},
  ]

  // Storage for selected purchase type
  const [selectedPurchase, setSelectedPurchase] = useState('');

  // Handler for purchase type
  const purchaseFunc = (value) => { setSelectedPurchase(value); }


  /* TRIPS */
  // Storage for trips
  const [selectedTrips, setSelectedTrips] = useState(1);

  // Handler for trips
  const tripFunc = (value) => { setSelectedTrips(value); }
  // Checking if trips entered is not equal to 10
  const trips = selectedTrips == 10 ? 10 : 1;
  
  

  /* Retriving price from JSON */
  const [price, setPrice] = useState(null);


  const fetchData = () => {
    try {
      const zoneList = Fares.zones;
      const zone = zoneList.filter((zoneData) => 
          zoneData.zone == selectedZone);

      // Collecting list of fare data from specific zone
      const zoneItem = zone[0]; 
      const fare = zoneItem.fares.filter((fareData) => 
          fareData.type == selectedType && 
          fareData.purchase == selectedPurchase && 
          fareData.trips == trips);
      
      // Collecting price
      if (fare.length > 0) {
        const tempPrice = fare[0].price;

        // If the trip is not 1 or 10 then multiply
        // price by the orginal set trips
        if(selectedTrips != 1 && selectedTrips != 10){
          setPrice((tempPrice)*selectedTrips);
        }
        else{
          setPrice(tempPrice);
        }
      } else {
        setPrice(null);
      }     
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  return (
    <div className="App">

      <div className='header_section'>
        <h1>Regional Rail Fare</h1>
      </div>

      <div className="info_section">
        <p>Where are you going?</p>
        <DropdownSelectMenu options={zones} changeFunc={zoneFunc} />
      </div>
    
      <div className="info_section">
      <p>When are you riding?</p>
      <DropdownSelectMenu options={type} changeFunc={rideFunc} />
      </div>

      <div className="info_section">
      <p>Where will you purchase the fare?</p>
        <div className='radio_align'>
          <RadioButtonGroup options={farePurchase} changeFunc={purchaseFunc} />
        </div>
      </div>

      <div className="info_section">
      <p>How many rides will you need?</p>
      <NumberInput changeFunc={tripFunc} />
      </div>

      <div className='footer_section'>
        <button onClick={fetchData}>Calculate Price</button>
        {price !== null ? (<p>Price: ${price}</p>) : 
          <p>It is not possible to purchase a fare with these options. 
              Please adjust your selection and try again.</p>}
      </div>

    </div>
  );
}

export default App;
