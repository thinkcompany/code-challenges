import React from 'react'

export default function Destination(props) {
  return (
    <div className="option-div destination-div">
          <h2 className="option-title">Where are you going?</h2>
          <div className="select-group">
            <select
              className="select-style"
              name="zones"
              id="zones"
              value={props.destination}
              onChange={props.destinationChangeHandler}
            >
              <option></option>
              {!props.loading &&
                props.fareData.zones.map((zone) => (
                  <option key={zone.name} value={zone.zone}>
                    {zone.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
  )
}
