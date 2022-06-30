import React from 'react'

export default function RideTime(props) {
  return (
    <div className="option-div" id="ride-time-div">
          <h2 className="option-title">When are you riding?</h2>
          <div className="select-group">
            <select
              className="select-style"
              name="ride-time"
              id="ride-time"
              onChange={props.rideTimeChangeHandler}
            >
              <option></option>
              <option value="anytime">Anytime</option>
              <option value="weekday">Weekday</option>
              <option value="evening_weekend">Evening/Weekend</option>
            </select>
          </div>
          <p id="ride-time-info">{props.rideTimeInfo}</p>
          {props.rideTime === "anytime" ? <p>Must purchase 10 at Station Kiosk</p> : null}
        </div>

  )
}
