import React, { Component } from 'react'
import './Select.css'

export const Select = (props) => (
  <label for={props.label} />
  <select value={e => props.handleSelect(e.target.value)} />
)
