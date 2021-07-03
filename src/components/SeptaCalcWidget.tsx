import React, { useEffect, useState } from 'react';
import ZoneInput from './ZoneInput';
import PurchaseLocationInput from './PurchaseLocationInput';
import RideQuantityInput from './RideQuantityInput';
import FareCostResult from './FareCostResult';

type SeptaCalcWidgetProps = {
  service: any,
}

const SeptaCalcWidget = ({ service } : SeptaCalcWidgetProps) => {
    const [zoneValue, setZoneValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [quantity, setQuantity] = useState('');
    const [fareCost, setFareCost] = useState('');

    return (
      <>
        <div className="flex">
          <ZoneInput zone={zoneValue} setZoneValue={setZoneValue} options={service.payload.zones} />
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