import React, {Component} from 'react'
import './calculator.css'
import logo from '../img/SEPTA.svg'

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      fares: [],
      nameStation: [],
      trips: [],
      data: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
     this.setState({value: event.target.value});

     console.log(this.state.fares, 'llloooook here')
   }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/ki5sg')
      .then(res => res.json())
      .then(
        (result => {
          this.setState({
            isLoaded: true,
            fares: '',
            nameStation: '',
            trips: '',
            data: result
          })
          // console.log(this.state.data, 'initial result!')
          // console.log(this.state.fares, 'fares')
          // console.log(this.state.info, 'info!')
          // console.log(this.state.trips, 'tripps')
        }),
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

  render() {
    const {error, isLoaded} = this.state
    const { zones: [name, zone, fares : [type, purchase, trips, price ]]} = this.state.data
    console.log(name)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='container'>
          <div className='wrapper'>
            <header>
              <img alt='septa-logo' src={logo} />
              <h1>Regional Rail Fares</h1>
            </header>
            <section>
              <h2>Where are you going?</h2>
              <select value={this.state.nameStation} onChange={this.handleChange}>
                <option>{name[0]}</option>
                {/* <option>{data.zones[1].name}</option>
                <option>{data.zones[2].name}</option>
                <option>{data.zones[3].name}</option>
                <option>{data.zones[4].name}</option> */}
              </select>
            </section>
            <section>
              <h2>When are you riding?</h2>
              <select value={this.state.trips} onChange={this.handleChange}>
                <option>{fares[0].type}</option>
                {/* <option>{data.zones[1].fares[1].type}</option>
                <option>{data.zones[2].fares[2].type}</option>
                <option>{data.zones[3].fares[3].type}</option>
                <option>{data.zones[4].fares[4].type}</option> */}
              </select>
            </section>
            <section>
              <h3>Where will you purchase the fare?</h3>
              <form value={this.state.fares} onChange={this.handleChange}>
                <input
                  // value={info.advance_purchase}

                   onChange={this.handleChange} type='radio' name='station kiosk' />Station Kiosk<br />
                <input
                   // value={info.onboard_purchase}

                    onChange={this.handleChange} type='radio' name='on board' />On board
              </form>
            </section>
            <section>
              <h3>How many fares will you need?</h3>
              <input className='input-integer' type='integer'/>
            </section>
            <footer>
              <h1>Your fare will cost</h1>

            </footer>
          </div>
        </div>
      );
    }
  }
}
