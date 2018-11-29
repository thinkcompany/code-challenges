import React, {PureComponent} from 'react'

class Select extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  renderZoneOptions () {
    const {data} = this.props
    if (!data) return
    return data.zones.map(zone => <option key={zone.zone} value={zone.zone}>{zone.name}</option>)
  }

  renderRideTimeOptions () {
    const {data} = this.props
    if (!data) return
    const {advance_purchase, onboard_purchase, ...filtered} = data.info
    const keysToArr = Object.keys(filtered)
    return keysToArr.map(option => <option key={option} value={option}>{option}</option>)
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
      <div>
        <fieldset>
          <label htmlFor={name}>{children}</label>
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
            <p>
              {this.helperText()}
            </p>
          }
        </fieldset>
      </div>
    )
  }
}

export default Select
