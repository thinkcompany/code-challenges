import { useState, useEffect } from 'react';

import { FormHandler } from './interfaces';
 
/**
 * A hook to handle form
 */
export const useFormHandler = (responseData: any): FormHandler => {
  const [selectedZoneValue, setSelectedZoneValue] = useState('');
  const [selectedTravelTime, setSelectedTravelTime] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [calculationValue, setCalculationValue] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState('');

  useEffect(() => {
    if (
      selectedZoneValue &&
      selectedTravelTime &&
      locationValue &&
      calculationValue &&
      responseData
    ) {
      /**
       * Prevent app crash if API is not returning expected data
       */
      if (!responseData) {
        return;
      }

      const selectedZone = responseData?.zones?.find(({ name }: any) => name === selectedZoneValue);

      const getZonePrice = selectedZone?.fares?.find(
        ({type, purchase}: any) => type === selectedTravelTime && purchase === locationValue
      );

      if (
        (locationValue === 'onboard_purchase' && selectedTravelTime === 'anytime') ||
        (locationValue === 'advance_purchase' && selectedTravelTime === 'anytime' && calculationValue < 10)
      ) {
        setSelectedTravelTime(Object.keys(responseData?.info || {})[1]);
      }

      if (getZonePrice) {
        const calculated = (+getZonePrice.price / +getZonePrice.trips) * +calculationValue;
        setCalculatedPrice(calculated.toFixed(2));
      }
    } else {
      setCalculatedPrice('');
    }
  }, [selectedZoneValue, selectedTravelTime, locationValue, calculationValue, responseData]);

  const purchaseOptions =
    responseData &&
    +calculationValue >= 10 &&
    locationValue === 'advance_purchase'
      ? Object.keys(responseData?.info || {}).slice(0, 3).map((item) => ({ name: item }))
      : Object.keys(responseData?.info || {}).slice(1, 3).map((item) => ({ name: item }));

  return {
    selectedZoneValue,
    selectedTravelTime,
    locationValue,
    calculationValue,
    calculatedPrice,
    purchaseOptions,
    setSelectedZoneValue,
    setSelectedTravelTime,
    setLocationValue,
    setCalculationValue,
    setCalculatedPrice,
  };
};
