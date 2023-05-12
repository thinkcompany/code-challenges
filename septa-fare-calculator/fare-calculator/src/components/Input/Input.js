import React, { Component } from 'react'
import './Input.css'

export const Input = (props) => (
  <input type="number" value={e => props.handleInput(e.target.value)} />
)
