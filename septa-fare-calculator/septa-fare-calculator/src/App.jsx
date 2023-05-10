import { useEffect, useState } from 'react'
import './App.css'

import FareInput from './components/FareInput';

function App() {
  const [fare, setFare] = useState(0);
  const [dropDownData, setDropDownData] = useState();
  const [zoneData, setZoneData] = useState(0);
  const [timeType, setTimeType] = useState('weekday');
  const [purchasePlace, setPurchasePlace] = useState('advance_purchase');
  const [numRides, setNumRides] = useState(0);
  const [isAnytime, setIsAnytime] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    const getFareInfo = async () => {
      try {
        const response = await fetch("/fares.json");
        const data = await response.json();
        if (data.zones) {
          const fares = data.zones[0].fares;
          const fareTypes = Array.from(new Set(fares.map(({ type }) => {
            return (type)
          })));
          setDropDownData({ zones: data.zones, fareTypes: fareTypes, info: data.info });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getFareInfo();
  }, [])

  useEffect(() => {
    console.log('draopdownadata', dropDownData);
    if (dropDownData) {
      console.log(dropDownData);
      const zone = dropDownData.zones[zoneData];
      let fares = zone.fares;
      //filter array by current type
      fares = fares.filter(fare => fare.type === timeType);

      //filter array by purchase place
      if (fares.length > 1) {
        fares = fares.filter(fare => fare.purchase === purchasePlace);
      }

      if (timeType === 'anytime') {
        setNumRides(10);
        setFare(fares[0].price);
        setIsAnytime(true);
      } else {
        //calculate fare
        const fareCost = fares[0].price * numRides;
        setFare(fareCost);
        setIsAnytime(false);
      }
    }

  }, [zoneData, timeType, purchasePlace, numRides])

  return (
    <>
      <div className='fareCalcContainer'>
        <header>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/SEPTA.svg/1280px-SEPTA.svg.png" alt="Septa Logo" aria-hidden="true" width="auto" height="50px" />
          <h1>Regional Rail Fares</h1>
        </header>
        <section>
          <FareInput label="Where are you going?">
            {dropDownData && dropDownData.zones ?
              <>
                <select onChange={(e) => { setZoneData(e.target.value) }}>
                  {
                    dropDownData.zones.map((zone, index) =>
                      <option key={zone.zone} value={index}>{zone.name}</option>
                    )}
                </select>
                <svg className="downarrow" aria-hidden="true" viewBox="0 0 100 100">
                  <polygon points="0 0, 50 75, 100 0" />
                </svg></>
              : null}
          </FareInput>
          <FareInput
            helperText={dropDownData && dropDownData.info[timeType]}
            label="When are you riding?">
            {dropDownData && dropDownData.fareTypes ?
              <>
                <select onChange={(e) => { setTimeType(e.target.value) }}>
                  {
                    dropDownData.fareTypes.map((type) =>
                      <option key={type}>{type}</option>
                    )}
                </select>
                <svg className="downarrow" aria-hidden="true" viewBox="0 0 100 100">
                  <polygon points="0 0, 50 75, 100 0" />
                </svg></>
              : null}
          </FareInput>
          <FareInput
            label="Where will you purchase the fare?">
            <div onChange={(e) => { setPurchasePlace(e.target.value) }}>
              <label title={dropDownData && dropDownData.info['advance_purchase']} htmlFor="kiosk">
                <input type="radio" id="kiosk" name="location" value="advance_purchase" defaultChecked disabled={isAnytime ? true: false} />
                Station Kiosk</label>
              <label title={dropDownData && dropDownData.info['onboard_purchase']} htmlFor="onboard">
                <input type="radio" id="onboard" name="location" value="onboard_purchase" disabled={isAnytime ? true: false} />
                Onboard</label>
            </div>
          </FareInput>
          <FareInput label="How many rides will you need?">
            <input type="number" onChange={(e) => setNumRides(e.target.value)} value={numRides} disabled={isAnytime ? true : false}/>
          </FareInput>
          <footer>
            Your fare will cost
            <strong>${fare.toFixed(2)}</strong>
          </footer>
        </section>
      </div>
    </>
  )
}

export default App
