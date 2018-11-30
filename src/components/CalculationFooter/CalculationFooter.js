import React, {PureComponent} from 'react'
import styles from './CalculationFooter.sass'

class CalculationFooter extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {calculatedFare: 0}
  }
  /**
   * parsing for zone data that matches the currently selected zone
   */
  getSelectedZone () {
    const { data, zone: propsZone } = this.props.context
    return data.zones.find(jsonZone => {
      return jsonZone.zone === parseInt(propsZone, 10)
    })
  }
  /**
   * looks for matching time of ride and purchase location
   * @param {Array} fares 
   */
  getMatchingFare (fares) {
    const {timeOfRide, purchaseLocation} = this.props.context
    return fares.find(fare => {
      const timeMatch = fare.type === timeOfRide
      const locationMatch = fare.purchase === purchaseLocation
      return timeMatch && locationMatch
    })
  }
  /**
   * takes the matching fare and multiplies
   * it by the trips needed
   * @param {Object} fare
   */
  calculateFareByTrips (fare) {
    const { trips } = this.props.context
    const {price} = fare
    const calculatedPrice = price * trips

    return calculatedPrice.toFixed(2)
  }
  /**
   * orchestrate all fare calculations
   */
  calculateFare () {
    const {data} = this.props.context
    if (!data) return null
    const {fares} = this.getSelectedZone()
    const fare = this.getMatchingFare(fares)
    const price = this.calculateFareByTrips(fare)
    return price
  }
  render () {
    return (
      <div className={styles.calculationFooter}>
        <p>You're fare will cost</p>
        <span>{`$${this.calculateFare()}`}</span>
      </div>
    )
  }
}

export default CalculationFooter
