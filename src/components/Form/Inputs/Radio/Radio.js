import React from 'react'
import {FORM_NAMES} from '../../Form'

function handleOnChange (dispatch) {
  return (e) => {
    const {name, value} = e.target
    dispatch({[name]: value})
  }
}

export const RadioInput = ({id, name, value, children, context}) => (
  <p>
    <input
      type='radio'
      id={id}
      name={name}
      value={value}
      checked={context[FORM_NAMES.purchaseLocation] === value}
      onChange={handleOnChange(context.dispatch)}
    />
    <label htmlFor={id}>{children}</label>
  </p>
)

const RadioGroup = ({children}) => {
  return (
    <div>
      <fieldset>
        {children}
      </fieldset>
    </div>
  )
}

export default RadioGroup
