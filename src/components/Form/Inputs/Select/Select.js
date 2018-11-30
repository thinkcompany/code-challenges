import React, {PureComponent} from 'react'
import { TIME_OF_RIDE_VALUES, FORM_NAMES, PURCHASE_LOCATION_VALUES } from '../../FormConstants/FormConstants'
import styles from './Select.sass'
import formStyles from '../../Form.sass'

class Select extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  renderZoneOptions () {
    const {data} = this.props
    if (!data) return
    return data.zones.map(zone => {
      return <option key={zone.zone} value={zone.zone}>{zone.name}</option>
    })
  }

  renderRideTimeOptions () {
    const {data, context} = this.props
    if (!data) return
    const {advance_purchase, onboard_purchase, ...filtered} = data.info
    const keysToArr = Object.keys(filtered)
    return keysToArr.map(option => {
      // if the purchase location is onboard then we'll need to disable the anytime location
      // as anytime ride times are only available for advance purchase
      let isDisabled = context[FORM_NAMES.purchaseLocation] === PURCHASE_LOCATION_VALUES.onboard
      isDisabled = option === TIME_OF_RIDE_VALUES.anytime && isDisabled
      return <option key={option} value={option} disabled={isDisabled}>{option}</option>
    })
  }

  handleChange (e) {
    const {dispatch} = this.props.context
    const {name, value} = e.target
    dispatch({[name]: value})
  }

  helperText () {
    const {context, name} = this.props
    if (!context.data) return
    return context.data.info[context[name]]
  }

  render () {
    const {name, children, id, data, value, isRideTime} = this.props
    return (
      <div className={styles.select}>
        <fieldset>
          <label htmlFor={id}>{children}</label>
          <select
            name={name}
            id={id}
            disabled={Boolean(!data)}
            value={value}
            onChange={this.handleChange}
          >
            {
              isRideTime
              ? this.renderRideTimeOptions()
              : this.renderZoneOptions()
            }
          </select>
          { isRideTime &&
            <p className={formStyles.helperText}>
              {this.helperText()}
            </p>
          }
        </fieldset>
      </div>
    )
  }
}

export default Select
