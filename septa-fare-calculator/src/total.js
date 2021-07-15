import React from 'react'

export default function Total(props) {
  const {fareInfo} = props;
  

  return (
    <div>
      {fareInfo.length === 0 && <div>Total is 0</div>}
      {fareInfo.map((zone) => (
        <div key={zone.zoneNum}>
        {zone.fares.map((fare, index) => {
          return(
          <div key={index}>
            <div>{`Scheduled Fare: ${fare.type}`} - {`Fare Price: ${fare.price}`}</div>
          </div>
          )
        })}
        </div>
      ))}
    </div>
  )
};
