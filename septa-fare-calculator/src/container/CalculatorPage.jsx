import React, { useEffect, useState } from 'react';
import AmountOfRides from '../components/AmountOfRides';
import Header from '../components/Header';
import Total from '../components/Total';
import WhenToRide from '../components/WhenToRide';
import WhereToGo from '../components/WhereToGo';
import WhereToPurchase from '../components/WhereToPurchase';

import farePrices from '../fares.json';
import './CalculatorPage.scss';

const CalculatorPage = () => {
  const { info, zones } = farePrices;

  const [getZone, setGetZone] = useState();
  const [selectedZone, setSelectedZone] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [numberOfRides, setNumberOfRides] = useState();
  const [totalFarePrice, setTotalFarePrice] = useState();

  useEffect(() => {
    const getSelectedZone = (zone) => {
      setSelectedZone(zones.filter((z) => z.zone === zone));
    };
    getSelectedZone(parseInt(getZone));
  }, [getZone, zones]);

  useEffect(() => {
    const getTotalFarePrice = () => {
      const getFares = selectedZone.map(({ fares }) => {
        return fares;
      });

      const flattenFares = getFares.flat();

      const getFare = flattenFares.filter(
        ({ type, purchase }) =>
          type === selectedTime && purchase === selectedVenue
      );

      if (getFare.length <= 0) return;

      let getFarePrice = getFare[0].price;

      let total = getFarePrice * parseInt(numberOfRides);

      if (!total) return;

      setTotalFarePrice(total);
    };

    getTotalFarePrice();
  }, [selectedTime, selectedVenue, selectedZone, numberOfRides]);

  return (
    <div className="septa-fare-calculator-container">
      <Header />
      <WhereToGo zones={zones} getZone={getZone} setGetZone={setGetZone} />
      <WhenToRide
        info={info}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <WhereToPurchase
        info={info}
        selectedVenue={selectedVenue}
        setSelectedVenue={setSelectedVenue}
      />
      <AmountOfRides setNumberOfRides={setNumberOfRides} />
      <Total totalFarePrice={totalFarePrice} />
    </div>
  );
};

export default CalculatorPage;
