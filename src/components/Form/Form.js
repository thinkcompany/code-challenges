import React, { Component } from 'react'
import Select from './Inputs/Select/Select'
import Number from './Inputs/Number/Number'
import axios from 'axios'
import CalculationFooter from '../CalculationFooter/CalculationFooter'
import styles from './Form.sass'
import RadioGroup, {RadioInput} from './Inputs/Radio/Radio'

// setting const values as a single source of truth
export const FORM_NAMES = {
  zone: 'zone',
  timeOfRide: 'timeOfRide',
  purchaseLocation: 'purchaseLocation',
  trips: 'trips'
}

const RADIO_VALUES = {
  advanced: 'advance_purchase',
  onboard: 'onboard_purchase'
}

const DEFAULT_FORM_VALUES = {
  [FORM_NAMES['zone']]: 1,
  [FORM_NAMES['timeOfRide']]: 'anytime',
  [FORM_NAMES['purchaseLocation']]: RADIO_VALUES.advanced,
  [FORM_NAMES['trips']]: 1
}

// creating a form store that will be used to communcate state with child components
export const FormContext = React.createContext()

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {data: null, ...DEFAULT_FORM_VALUES}
    this.dispatch = this.dispatch.bind(this)
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

  render () {
    const {data} = this.state
    return (
      <FormContext.Provider value={{...this.state, dispatch: this.dispatch}}>
        <div className={styles['form-container']}>
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
                    value={RADIO_VALUES.advanced}
                    context={context}
                  >
                    Station Kiosk
                  </RadioInput>
                  <RadioInput
                    id='septa-fare-calculator-radio-onboard'
                    name={FORM_NAMES.purchaseLocation}
                    value={RADIO_VALUES.onboard}
                    context={context}
                  >
                    Onboard
                  </RadioInput>
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