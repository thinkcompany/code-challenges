import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Total from './Total';
import Map from './Map';
import SEPTA from '../SEPTA.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      trips: 0,
      zone: 1,
      viewMap: false,
      when: 'weekday',
      payment: 'advance_purchase'
    }
  }
  // We need async/await here so the props being passed to the dropdown menus will be able to map over
  // the fetched data from fares.json. Without it we would get data.map is undefined.
  async componentDidMount() {
    notify.show('View the map! 👇😍', 'success', 3500);
    const res = await fetch('https://s3.us-east-2.amazonaws.com/i2m-photos/fares.json');
    const data = await res.json();
    await this.asyncState({ data });
  };
  asyncState(state) {
    return new Promise(res => {
      this.setState({ ...state, res })
    });
  };
  handleTrips(e) {
    if(e.target.value >= 0) {
      this.setState({ trips: e.target.value }, () => {
        this.calculateTotal();
      })
    };
    if(e.target.value >= 10) {
      notify.show('Opting you into a 10-Day Pass. Saving you 💰👌', 'success', 3500);
      this.setState({
        trips: 10,
        when: 'anytime',
        payment: 'advance_purchase'
      }, () => {
        this.calculateTotal();
      });
    };
  };
  handleCheck(e) {
     this.setState({ payment: e.target.value }, () => {
       this.calculateTotal();
     });
  };
  handleWhen(e) {
    this.setState({ when: e.target.value }, () => {
      this.calculateTotal();
    });
  };
  handleZone(e) {
    this.setState({ zone: parseInt(e.target.value) }, () => {
      this.calculateTotal();
    });
  };
  handleMap() {
    this.setState({ viewMap: !this.state.viewMap })
  };
  resetTrips() {
    this.setState({
      trips: 1,
      when: 'weekday'
     }, () => {
      this.calculateTotal();
    });
  };
  calculateTotal() {
    const { zone, when, payment, trips } = this.state;
    const { zones } = this.state.data;
    // 1. Find the scoping of our zone by filtering the array of zones.
    let zoneArray = zones.filter(res => res.zone === zone);
    let fares = zoneArray[0].fares;
    // 2. Find the scoping of the users options to filter the array of fare types.
    let fareArray = fares.filter(res => res.type === when && res.purchase === payment);
    // 3. Update the users total depending on his/her options.
    //    Handle flow for auto-opt into 10-Trip pass.
    if(trips === 10) {
      this.setState({ total: fareArray[0].price });
    } else {
      this.setState({ total: fareArray[0].price * trips });
    };
  };
  render() {
  const { data, total, trips, zone, viewMap, when, payment } = this.state;
    return (
      <div role="main" className="container">
        <Notifications />
        <div className="header">
          <img onClick={() => this.handleMap()} src={SEPTA} width={200} height={100} alt="SEPTA Logo" />
          <h1>Regional Rail Fares</h1>
        </div>
        { viewMap
        ? <Map handleClose={() => this.handleMap()} />
        : null }
        <div className="dropdown__wrapper">
          <h1>Where is your destination?</h1>
          <select
            className="dropdown"
            onChange={e => this.handleZone(e)}
            aria-label="Dropdown for destination"
            value={zone}>
            { data
              ? data.zones.map((res, key) => {
                return <option key={key} value={res.zone}>{res.name}</option>
              })
              : null }
            </select>
        </div>
        <div className="dropdown__wrapper">
          <h1>When will you be departing?</h1>
          <select
            className="dropdown"
            onChange={e => this.handleWhen(e)}
            disabled={trips === 10 ? true : false}
            aria-label="Dropdown for departure"
            value={when}>
            <option value="weekday">Weekday</option>
            <option value="evening_weekend">Evenings & Weekends</option>
          </select>
        </div>
        <div className="radio__wrapper">
          <h1>Where will you purchase your ride?</h1>
          <div className="radio">
            <label>
              <input
                onChange={e => this.handleCheck(e)}
                type="radio"
                name="purchase"
                value="advance_purchase"
                role="checkbox"
                aria-label="Kiosk"
                disabled={trips === 10 ? true : false}
                aria-checked={payment === "advance_purchase"}
                checked={payment === "advance_purchase"} />
              Station Kiosk
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                onChange={e => this.handleCheck(e)}
                type="radio"
                name="purchase"
                value="onboard_purchase"
                role="checkbox"
                aria-label="Onboard"
                disabled={trips === 10 ? true : false}
                aria-checked={payment === "onboard_purchase"}
                checked={payment === "onboard_purchase"} />
              Onboard
            </label>
          </div>
        </div>
        <div className="input">
          <h1>How many trips will you need?</h1>
          <div>
            <input
              aria-label="Kiosk"
              aria-required="true"
              onChange={e => this.handleTrips(e)}
              type="number"
              disabled={trips === 10 ? true : false}
              value={trips}/>
              <button className="reset" onClick={() => this.resetTrips()}>RESET</button>
          </div>
        </div>
        <Total total={total} />
      </div>
    )
  }
}

export default App;
