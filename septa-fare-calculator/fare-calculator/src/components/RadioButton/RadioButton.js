import React, { Component } from 'react'
import './RadioButton.css'

export const RadioButton = (props) => (
  <input type="radio" value={e => props.handleRadio(e.target.value)} />
)
