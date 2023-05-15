import React from 'react'
import './RadioButton.css'

export const RadioButton = (props) => (
  <>
    {
      props.data.map(option => {
        return (
          <>
            <label htmlFor={option.label}>{option.label}
              <input
                type="radio"
                name={props.label}
                id={option.value}
                value={option.label}
                onChange={(e) => props.handleRadio(e.target.value)}
              />
            </label>
          </>)
      })
    }
  </>
)
