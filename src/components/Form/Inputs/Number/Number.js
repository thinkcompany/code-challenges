import React from 'react'

/**
 * to prevent recreating a function every render
 * function is called on render and passed the bound function dispatch
 * it returns a function that is called when the event triggers it. Dispatch is in scope
 * from the inital call and updates the Form context
 * @param {function} dispatch
 */
function handleOnChange (dispatch) {
  return (e) => {
    const {name, value} = e.target
    dispatch({[name]: value})
  }
}

const Number = ({value, name, context: {dispatch}}) => {
  return (
    <div>
      <fieldset>
        <label htmlFor='number-of-rides'>How many rides will you need?</label>
        <input type='number' id='number-of-rides' value={value} name={name} onChange={handleOnChange(dispatch)} />
      </fieldset>
    </div>
  )
}

export default Number
