import React from 'react'
import styles from './Radio.sass'

export const RadioInput = ({id, children, ...props}) => (
  <p>
    <input
      type='radio'
      id={id}
      {...props}
    />
    <label htmlFor={id}>{children}</label>
  </p>
)

const RadioGroup = ({children}) => {
  return (
    <div className={styles.radioGroup}>
      <fieldset>
        {children}
      </fieldset>
    </div>
  )
}

export default RadioGroup
