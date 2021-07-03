import React, { useEffect, useState } from 'react';
import ZoneInput from './ZoneInput';

type SeptaCalcWidgetProps = {
  service: any,
}

const SeptaCalcWidget = ({ service } : SeptaCalcWidgetProps) => {
    const [zoneValue, setZoneValue] = useState('');

    return (
      <>
        <div className="flex">
          <ZoneInput zone={zoneValue} setZoneValue={setZoneValue} options={service.payload.zones} />
        </div>
      </>
    );
};

export default SeptaCalcWidget;