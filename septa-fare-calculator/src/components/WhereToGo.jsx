import React from 'react';
import './WhereToGo.scss';

const WhereToGo = (props) => {
  const { zones, getZone, setGetZone } = props;

  return (
    <div className="zone-section">
      <h4>Where are you going?</h4>
      <select
        placeholder="[---Select Zone---]"
        className="zone-input-select"
        id="zone-input-select"
        value={getZone}
        onChange={(e) => setGetZone(e.target.value)}
      >
        <option disabled selected value="">
          [---Select Zone---]
        </option>
        {zones.map(({ name, zone }) => {
          return (
            <option key={zone} value={zone}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default WhereToGo;
