import React from 'react'
import './Input.css'

export const Input = (props) => (
  <>
  {
    props.disable ? 
      <input type="number" disabled={props.disable} value="10" onChange={e => props.handleInput(e.target.value)} />
      :
      <input type="number" onChange={e => props.handleInput(e.target.value)} />
  }
  </>
)
