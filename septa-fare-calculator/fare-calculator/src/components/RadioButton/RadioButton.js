import React from 'react'
import './RadioButton.css'

export const RadioButton = (props) => (
  <div className="radio-container">
    {
      props.data.map(option => {
        return (
          <div className="radio-entry">
            <input
              className="radio-button"
              type="radio"
              name={props.label}
              id={option.value}
              value={option.value}
              onChange={(e) => props.handleRadio(e.target.value)}
              disabled={props.disable}
              checked={props.disable && option.value === 'advance_purchase' ? true : null}
            />
            <label htmlFor={option.label}>{option.label}</label>
          </div>
        )
      })
    }
  </div>
)
