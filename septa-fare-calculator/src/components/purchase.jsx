import '../stylesheets/purchase.css'

const Purchase = ({purchase, setPurchase, options, timeInfo}) => {
  //if "anytime" is clicked, only the station kiosk radio button should show

  if (timeInfo !== "Valid anytime") {
    return (
      <div className="purchase-container">
          Where will you purchase the fare?
          <div className="purchase-radio-buttons">
            <div>
              <input type="radio" checked={purchase === "advance_purchase"} name="Station Kiosk" value="advance_purchase" onChange={(e) => setPurchase(e.target.value)}/>Station Kiosk
            </div>
            <div>
              <input type="radio" checked={purchase === "onboard_purchase"} name="Onboard" value="onboard_purchase" onChange={(e) => setPurchase(e.target.value)}/>Onboard
            </div>
          </div>
      </div>
    )
  } else {
    return (
      <div className="purchase-container">
          Where will you purchase the fare?
          <div className="purchase-radio-buttons">
            <div>
              <input type="radio" checked={purchase === "advance_purchase"} name="Station Kiosk" value="advance_purchase" onChange={(e) => setPurchase(e.target.value)}/>Station Kiosk
            </div>
          </div>
      </div>
    )
  }
}

export default Purchase;