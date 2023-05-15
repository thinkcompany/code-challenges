import React, { useEffect } from 'react'
import './Input.css'

export const Input = (props) => {
  useEffect(() => {
    if (props.disable) {
      props.handleInput('10')
    }
  }, [props.disable])
  return (
    <input type="number" disabled={props.disable} value={props.disable ? '10' : props.value} onChange={e => props.handleInput(e.target.value)} />
  )
}