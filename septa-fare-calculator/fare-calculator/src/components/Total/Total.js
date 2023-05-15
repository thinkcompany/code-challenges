import React from 'react'
import './Total.css'

export const Total = (props) => (
  <section>
    {console.log(props, 'props')}
    <h3>Your Fare Will Cost</h3>
    <div>{props.finalFare ? props.finalFare : 'Awaiting Input'}</div>
  </section>
)
