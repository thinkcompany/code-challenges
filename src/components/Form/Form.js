import React, { Component } from 'react'
import Select from './Inputs/Select/Select'
import Number from './Inputs/Number/Number'
import axios from 'axios'
import CalculationFooter from '../CalculationFooter/CalculationFooter'
import styles from './Form.sass'
import RadioGroup, {RadioInput} from './Inputs/Radio/Radio'
import {
  DEFAULT_FORM_VALUES,
  FORM_NAMES,
  PURCHASE_LOCATION_VALUES,
  TIME_OF_RIDE_VALUES
} from './FormConstants/FormConstants'

// creating a form store that will be used to communcate state with child components
export const FormContext = React.createContext()

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {data: null, ...DEFAULT_FORM_VALUES}
    this.dispatch = this.dispatch.bind(this)
    this.updateKV = this.updateKV.bind(this)
  }
  componentDidMount () {
    this.fetchData()
  }

  // uses promises to fetch data from our "database"
  async fetchData () {
    this.setState({fetching: true})
    try {
      const response = await axios.get('../../data/fares.json')
      if (response.status === 200) {
        this.setState({ data: response.data, fetching: false })
      } else {
        this.setState({
          fetching: false,
          error: true,
          errorDetails: response.statusText
        })
      }
    } catch (e) {
      this.setState({ fetching: false, error: true, errorDetails: e })
    }
  }

  // bound function that will update the form state and the form context
  dispatch (obj) {
    this.setState(obj)
  }

  /**
   * generic input update method
   * @param {Event} e 
   */
  updateKV (e) {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  /**
   * determines if the ride time is anytime
   * returns Bool
   */
  isAnytime () {
    return this.state[FORM_NAMES.timeOfRide] === TIME_OF_RIDE_VALUES.anytime
  }

  /**
   * return Bool if the advanced radio should be checked
   * anytime tickets are olnly available for advanced purchase
   */
  isAdvanceRadioChecked () {
    const isChecked = this.state[FORM_NAMES.purchaseLocation] === PURCHASE_LOCATION_VALUES.advanced
    const isAnytime = this.isAnytime()

    return isChecked || isAnytime
  }
  /**
   * return Bool if the advanced radio should be checked
   * anytime tickets are olnly available for advanced purchase
   */
  isOnboardRadioChecked () {
    const isChecked = this.state[FORM_NAMES.purchaseLocation] === PURCHASE_LOCATION_VALUES.onboard
    const isAnytime = this.isAnytime()

    return isChecked && !isAnytime
  }

  render () {
    const {data} = this.state
    return (
      <FormContext.Provider value={{...this.state, dispatch: this.dispatch}}>
        <div className={styles.formContainer}>
          <FormContext.Consumer>
            {context => (
              <React.Fragment>
                <Select
                  name={FORM_NAMES.zone}
                  id='septa-fare-calculator-zones'
                  data={data}
                  context={context}
                  value={this.state[FORM_NAMES.zone]}
                >
                  Where are you going?
                </Select>
                <Select
                  name={FORM_NAMES.timeOfRide}
                  id='septa-fare-calculator-time-of-ride'
                  data={data}
                  isRideTime
                  context={context}
                  value={this.state[FORM_NAMES.timeOfRide]}

                >
                  When are you riding?
                </Select>
                <RadioGroup>
                  <p>Where will you purchase the fare?</p>
                  <RadioInput
                    id='septa-fare-calculator-radio-station-kiosk'
                    name={FORM_NAMES.purchaseLocation}
                    value={PURCHASE_LOCATION_VALUES.advanced}
                    onChange={this.updateKV}
                    checked={this.isAdvanceRadioChecked()}
                  >
                    Station Kiosk
                  </RadioInput>
                  <RadioInput
                    id='septa-fare-calculator-radio-onboard'
                    name={FORM_NAMES.purchaseLocation}
                    value={PURCHASE_LOCATION_VALUES.onboard}
                    onChange={this.updateKV}
                    checked={this.isOnboardRadioChecked()}
                    disabled={this.isAnytime()}
                  >
                    Onboard
                  </RadioInput>
                  {this.state[FORM_NAMES.timeOfRide] === TIME_OF_RIDE_VALUES.anytime &&
                    <p className={styles.helperText}>
                      10 trip anytime tickets may only be purchased at kiosks
                    </p>
                  }
                </RadioGroup>
                <Number
                  name={FORM_NAMES.trips}
                  context={context}
                  value={this.state[FORM_NAMES.trips]}
                />
                <CalculationFooter context={context} />
              </React.Fragment>
            )}
          </FormContext.Consumer>
        </div>
      </FormContext.Provider>
    )
  }
}

export default Form