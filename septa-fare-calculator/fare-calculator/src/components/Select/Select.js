import React from 'react'
import './Select.css'

export const Select = (props) => (
  <div className="select-container">
    <label htmlFor={props.label} value={props.label}/>
    <select id={props.label} onChange={e => props.handleSelect(e.target.value)}>
      <option value="">-- Select your option --</option>
      { props.data.map((entry, id) => <option key={id} value={entry.value}>{entry.name}</option>) }
    </select>
  </div>
)
