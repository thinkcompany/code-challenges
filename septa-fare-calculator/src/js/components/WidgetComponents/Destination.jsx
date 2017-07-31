import React from 'react';

const Destination = ({ zones }) => {
    let selectOptions = zones.map((zone, idx) => {
        return <option value={zone.zone} key={idx}>{zone.name}</option>
    });

    return (
        <div className="destination-container">
            <h1>Where are you going?</h1>
            <select name="destination">
                {selectOptions}
            </select>
        </div>
    );
}

export default Destination;