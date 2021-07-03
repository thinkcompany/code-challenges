import React, { useEffect, useState } from 'react';
import ZoneInput from './ZoneInput';
import TravelTimeSelect from './TravelTimeSelect';
import PurchaseLocationInput from './PurchaseLocationInput';
import RideQuantityInput from './RideQuantityInput';
import FareCostResult from './FareCostResult';

type SeptaCalcWidgetProps = {
  service: any,
}

const SeptaCalcWidget = ({ service } : SeptaCalcWidgetProps) => {
    const [zoneValue, setZoneValue] = useState('');
    const [travelTime, setTravelTime] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [fareCost, setFareCost] = useState('');

    return (
      <>
        <div className="flex">
          <ZoneInput zone={zoneValue} setZoneValue={setZoneValue} options={service.payload.zones} />
          <TravelTimeSelect
              travelTime={travelTime}
              setTravelTime={setTravelTime}
              // filters the dropdown options base on ride quantity and purchase location
              options={Number(quantity) >= 10 && locationValue === 'advance_purchase'
                    ? Object.keys(service.payload.info).slice(0, 3)
                    : Object.keys(service.payload.info).slice(1, 3)
              }
              info={service.payload.info[travelTime]}
          />
          <PurchaseLocationInput
            locationValue={locationValue}
            setLocationValue={setLocationValue}
            info={service.payload.info[locationValue]}
          />
          <RideQuantityInput quantity={Number(quantity)} setQuantity={setQuantity} />
        </div>
        <FareCostResult fareCost={fareCost} />
      </>
    );
};

export default SeptaCalcWidget;