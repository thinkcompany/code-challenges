import React from 'react';
import ZoneMap from '../zone-map.jpg';

const Map = props => {
  return (
    <div className="map-container">
      <button className="map-close" onClick={props.handleClose}>╳</button>
      <div className="map">
        <img src={ZoneMap} alt="SEPTA Zone Map" />
      </div>
    </div>
  )
}

export default Map;
