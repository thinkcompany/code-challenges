import React from 'react'

export default function PurchaseLocation(props) {

  const advPurchRadio = document.getElementById("advance_purchase")

  if (props.anytime) {
    advPurchRadio.setAttribute("checked", "")
  } 
  

  return (

    <div className="option-div" id="purchase-location-div">
          <h2 className="option-title">Where will you purchase the fare?</h2>
          <form
            onChange={props.purchaseLocationChangeHandler}
            value={props.purchaseLocation}
          >
            <div className="fare-location-radio-buttons">
            {/* station kiosk radio select */}
              <label htmlFor="advance_purchase" className="radio-label">
                <input
                  className="radio-button"
                  type="radio"
                  id="advance_purchase"
                  name="fare-location"
                  value="advance_purchase"
                  // checked
                />
                Station Kiosk
              </label>
            {/* onboard radio select */}
            {!props.anytime ? (
              <label htmlFor="onboard_purchase" className="radio-label">
                <input
                  className="radio-button"
                  type="radio"
                  id="onboard_purchase"
                  name="fare-location"
                  value="onboard_purchase"
                />
                Onboard
              </label>) : null}
              
            </div>
          </form>
        </div>
  )
}
