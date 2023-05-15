import React from 'react'
import './Total.css'

export const Total = (props) => (
  <section className="total-section">
    <h3 className="total-header">Your fare will cost</h3>
    <div className="total-finalFare">{props.finalFare ? `$ ${props.finalFare}` : 'Awaiting Input'}</div>
  </section>
)
