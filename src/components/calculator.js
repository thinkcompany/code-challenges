import React, {Component} from 'react'
import './calculator.css'
import logo from '../img/SEPTA.svg'


//Hello, and thank you for looking at my coding challenge. The README said this challenge should take an hour, and as I have already worked on it for several, I've decided I should submit what I have, in hopes that I might have the opportunity to speak with someone about the decisions I made, where I was stuck etc; I have been coding for about a year.

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      fares: [],
      nameStation: [],
      purchase: [],
      data: []
    }
  }

  handleChange = (event) => {
    this.setState({
      fares: event.target.value
    })
  }

  handleChangeName = (event) => {
    this.setState({
      nameStation: event.target.value
    })
  }

  handleChangeTrip = (event) => {
    this.setState({
      time: event.target.value
    })
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/ki5sg')
      .then(res => res.json())
      .then(
        (result => {
          //This was my attempt to use es6 destructuring to get into nested data before mapping, but after many tries it didn't work out.
          // const { info, zones: [name, zone, fares : [type, purchase, trips, price ]], error, isLoaded} = result
          this.setState({
            isLoaded: true,
            fares: '',
            nameStation: '',
            purchase: '',
            time: '',
            data: result
          })
        }),
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    renderCalculateFare () {
      if (this.state.nameStation === 'CCP/1' && this.state.fares < 10) {
        //I know I need to connect this to the price for each combination, but as of yet have been unable to iterate over the data in a way that makes connecting those values possible.
      }
    }


 //Below I was trying to map the nested data to populate the dropdowns rather than hard coding it in.

    // renderInfoCalc () {
    //   const {data} = this.state
    //   if (!data.length) return
    //   return data.map(table => {
    //     return (
    //       table.map(zone => {
    //         console.log(zone)
    //         return (
    //             zone.map(name => (
    //                 // <option>
    //                   {name}
    //                 // </option>
    //               ))
    //             )
    //           })
    //         )
    //       })
    //     }

  render() {
    const {error, isLoaded, data} = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <div>
        <div className='container'>
          <div className='wrapper'>
            <header>
              <img alt='septa-logo' src={logo} />
              <h1>Regional Rail Fares</h1>
            </header>
            {/*
              My intention here was to call the function above to map the values to the dropdown, but I was unable to get the values to show up. However, there were no errors in the console if this section and function above were included. console.log() also was not hitting, so it was difficult to troubleshoot

              <section>
              <h2>Where are you going?</h2>
              <select value={this.state.fares}
                  onChange={this.handleChange}>
                  <option>{this.renderInfoCalc()}</option>
              </select>
              </section> */}
              <section>
                <h2>Where are you going?</h2>
                <select value={this.state.nameStation} onChange={this.handleChangeName}>
                  <option>{data.zones[0].name}</option>}
                  <option>{data.zones[1].name}</option>
                  <option>{data.zones[2].name}</option>
                  <option>{data.zones[3].name}</option>
                  <option>{data.zones[4].name}</option>
                </select>
              </section>
              <section>
                <h2>When are you riding?</h2>
                <select value={this.state.time} onChange={this.handleChangeTrip}>
                  <option>{data.zones[2].fares[0].type}</option>
                  <option>{data.zones[2].fares[2].type}</option>
                  <option>{data.zones[2].fares[4].type}</option>
                </select>
              </section>
              <section>
                <h3>Where will you purchase the fare?</h3>
                <form value={this.state.purchase} onToggle={this.handleChange}>
                  <input
                    value={data.info.advance_purchase}
                    onChange={this.handleChange} type='radio' name='station kiosk' />Station Kiosk<br />
                  <input
                    value={data.zones[2].purchase}
                    onChange={this.handleChange} type='radio' name='on board' />On board
                </form>
              </section>
              <section>
                <h3>How many fares will you need?</h3>
                <input
                  value={this.state.fares}
                  className='input-integer'
                  type='integer'
                  onBlur={this.renderCalculateFare()}/>
              </section>
              <footer>
                <h1>Your fare will cost</h1>
              </footer>
          </div>
        </div>
      </div>
          )
        }
      }
    }
