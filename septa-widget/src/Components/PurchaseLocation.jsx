import React from 'react'

export default function PurchaseLocation(props) {
  return (
    <div className="option-div" id="purchase-location-div">
          <h2 className="option-title">Where will you purchase the fare?</h2>
          <form
            onChange={props.purchaseLocationChangeHandler}
            value={props.purchaseLocation}
          >
            <div className="fare-location-radio-buttons">
            {/* station kiosk radio select */}
              <label htmlFor="station-kiosk" className="radio-label">
                <input
                  className="radio-button"
                  type="radio"
                  id="station-kiosk"
                  name="fare-location"
                  value="station-kiosk"
                />
                Station Kiosk
              </label>
            {/* onboard radio select */}
              <label htmlFor="onboard" className="radio-label">
                <input
                  className="radio-button"
                  type="radio"
                  id="onboard"
                  name="fare-location"
                  value="onboard"
                />
                Onboard
              </label>
            </div>
          </form>
        </div>
  )
}
