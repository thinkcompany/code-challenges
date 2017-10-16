import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import septalogo from './septa.svg';

class App extends Component {
  /**
   * constructor - defines state
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props){
    super(props)
    this.state = {
      info: [],               // list of info
      zones: [],              // list of zones
      zoneId: 1,              // default to 1, will be formatted for zero-index in calculateCost()
      whenId: 'anytime',
      rides: 1,
      cost: 0
    }
    this.onZoneChange = this.onZoneChange.bind(this);
    this.onWhenChange = this.onWhenChange.bind(this);
    this.onRidesChange = this.onRidesChange.bind(this);
  }
  /**
   * componentDidMount - loads JSON fares data and assigns to state
   *
   * @return {type}  description
   */
  componentDidMount(){
    axios.get('fares.json')
      .then(({ data }) => {
        this.setState({
          info: data.info,
          zones: data.zones
      });
      // call once defaults are loaded
      this.calculateCost();
    })
    .catch((err) => {
      console.log('error', err);
    })
  }
  /**
   * getZoneOptions - generates zone options for select menu
   *
   * @return {JSX}  zone options
   */
  getZoneOptions(){
    let options;
    let zones;
    let zonesList = [];

    if(this.state.zones !== []){
      zones = this.state.zones;
      for (let key in zones) {
        if (!zones.hasOwnProperty(key)) continue;
        zonesList.push(zones[key]);
      }
    }
      options = zonesList.map(function (row, i) {
      return (
          <option key={i} value={row.zone}>{row.name}</option>
      );
    });
    return options;
  }
  /**
   * onWhenChange - Handles when user changes when select
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onZoneChange(event){
    this.setState({zoneId: event.target.value});
    this.calculateCost();
  }
  /**
   * onWhenChange - Handles when user changes when select
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onWhenChange(event){
    this.setState({whenId: event.target.value});
    this.calculateCost();
  }
  /**
   * onRidesChange - Handles when user changes number of rides
   *
   * @param  {type} event description
   */
  onRidesChange(event){
    console.log('event.target.value', event.target.value)
    this.setState({rides: event.target.value});
    this.calculateCost();
  }
  /**
   * calculateCost - calculates cost of rides based on selections
   */
  calculateCost(){
    let zoneId = this.state.zoneId;
    let zone = this.state.zones[zoneId-1]; // format select value for array key starting with 0
    let fares = zone.fares;
    let whenId = this.state.whenId;
    let price, cost;

    zone.fares.map(function (fare, i) {
      if(fare.type === whenId && fare.purchase === 'advance_purchase'){
        price = fare.price;
      }
    });

    cost = price * this.state.rides;

    this.setState({cost: cost});
  }
  /**
   * render - description
   *
   * @return {JSX}  description
   */
  render() {
    let helpText = this.state.info[this.state.whenId];

    return (
      <div id="septa-fares-widget">
        <header id="septa-fares-widget-header">
          <img src={septalogo} alt="SEPTA logo"/>
          <h1>Regional Rail Fares</h1>
        </header>

        <section id="where">
          <h2>Where are you going?</h2>
          <select name="where" onChange={this.onZoneChange} value={this.state.zoneId}>
            {this.getZoneOptions()}
          </select>
        </section>

        <section id="when">
          <h2>When are you riding?</h2>
          <select name="when" onChange={this.onWhenChange} value={this.state.whenId}>
            <option value="anytime">Anytime</option>
            <option value="weekday">Weekdays</option>
            <option value="evening_weekend">Evenings/Weekend</option>
          </select>
          <p aria-live="polite">{helpText}</p>
        </section>

        <section id="where-purchased">
          <h2>Where will you purchase the fare?</h2>

          <fieldset>
            <label><input type="radio" name="salutation" value="advance_purchase" /> Station Kiosk </label>
            <label><input type="radio" name="salutation" value="onboard_purchase" /> Onboard </label>
          </fieldset>

        </section>

        <section id="rides-needed">
          <h2>How many rides will you need?</h2>
          <input id="rides-needed-input" type="number" min="1" onChange={this.onRidesChange} value={this.state.rides} />
        </section>

        <section id="fare-cost" aria-live="polite">
          <p>Your fare will cost</p>
          <b>${this.state.cost}</b>
        </section>

      </div>
    );
  }
}

export default App;
