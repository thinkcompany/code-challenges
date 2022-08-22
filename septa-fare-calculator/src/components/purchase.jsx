const Purchase = ({purchase, setPurchase, options, timeInfo}) => {
  if (timeInfo !== 'Valid anytime') {
    return (
      <div className="purchase-container">
          Where will you purchase the fare?
          <div className="purchase-radio-buttons">
            <input type="radio" checked={purchase === "advance_purchase"} name="Station Kiosky" value="advance_purchase" onChange={(e) => setPurchase(e.target.value)}/>Staion Kiosky
            <input type="radio" checked={purchase === "onboard_purchase"} name="Onboard" value="onboard_purchase" onChange={(e) => setPurchase(e.target.value)}/>Onboard
          </div>
      </div>
    )
  } else {
    return (
      <div className="purchase-container">
          Where will you purchase the fare?
          <div className="purchase-radio-buttons">
            <input type="radio" checked={purchase === "advance_purchase"} name="Station Kiosky" value="advance_purchase" onChange={(e) => setPurchase(e.target.value)}/>Staion Kiosky
          </div>
      </div>
    )
  }
}

export default Purchase;