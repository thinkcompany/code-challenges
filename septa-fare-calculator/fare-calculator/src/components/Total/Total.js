import React, { Component } from 'react'
import './Total.css'

export const Total = (props) => (
  <section>
    <h3>Your Fare Will Cost</h3>
    <div>{props.finalFare}</div>
  </section>
)
