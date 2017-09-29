import React from 'react';
import { connect } from 'react-redux';
import { requestData } from './../actions/actions';


class Calculator extends React.Component {
  constructor(){
    super();
    this.state = { zone: 1,
                  type: "weekday",
                  purchase: "advance_purchase",
                  trips: 0,
                  price: 0};
    this.handleChange = this.handleChange.bind(this);
    this.setFare = this.setFare.bind(this);
    this.updateRadio = this.updateRadio.bind(this);
  }

  componentDidMount(){
    this.props.requestData();
  }

  handleChange(e){
    this.setState({ [e.currentTarget.id]: e.currentTarget.value}, this.setFare);
  }

  updateRadio(e){
    this.setState({purchase: e.currentTarget.value}, this.setFare);
  }

  setFare(){
    let price;
    let state = this.state;
    let myZone = this.props.fareData.zones.filter((zone) => {
      return state.zone == zone.zone;
    });
    let fares = myZone[0].fares.filter((fare) => {
      return fare.type === state.type;
    });
    let myFare = fares.filter((fare) => {
      return fare.purchase === state.purchase;
    });
    if (state.trips >= 10 && state.purchase === 'advance_purchase'){
      let multiplesOfTen = Math.floor(state.trips / 10);
      price = (this.props.fareData.zones[state.zone - 1].fares[4].price)
      * multiplesOfTen;
      let remainingTrips = parseInt(state.trips) - (10 * multiplesOfTen);
      if (remainingTrips > 0){
        price += myFare[0].price * remainingTrips;
      }
    } else {
      price = myFare[0].price * state.trips;
    }
    this.setState({price});
  }

  render(){
    return (
      <div className='calculator'>
        <header>
          <img src='./SETPA.png'/>
          <h1>Regional Ride Fares</h1>
        </header>
        <form>
          <div className='select-zone'>
            <label> <h2>Where are you going?</h2>
              <select id='zone'
                value={this.state.zones}
                onChange={this.handleChange} >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </label>
          </div>
          <div className='select-types'>
            <label><h2>When are you riding?</h2>
              <select id='type'
                value={this.state.type}
                onChange={this.handleChange}>
                <option value='weekday'>Weekdays</option>
                <option value='evening_weekend'>Evenings/Weekends</option>
              </select>
            </label>
          </div>
          <div className='select-purchase'>
            <label> <h2>Where will you purchase the fair?</h2>
              <div className='radio'>
                <input type="radio"
                  checked={this.state.purchase === 'advance_purchase'}
                  onChange={this.updateRadio}
                  id="purchase"
                  name='purchase'
                  value="advance_purchase"/>
                  Station Kiosk
              </div>
              <div className='radio'>
                <input type="radio"
                  id="purchase"
                  checked={this.state.purchase === 'onboard_purchase'}
                  onChange={this.updateRadio}
                  name='purchase'
                  value="onboard_purchase"/>
                  Onboard
              </div>
            </label>
          </div>
          <div className='selecttrips'>
            <label> <h2>How many trips will you need?</h2>
              <input id='trips' type='text'
                onChange={this.handleChange}
                value={this.state.trips}></input>
            </label>
          </div>
        </form>
        <div className='footer'>
          <p>Your fare will cost</p>
          <h1>${this.state.price}</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({fareData}) => ({
  fareData
});

const mapDispatchToProps = (dispatch) => ({
  requestData: () => dispatch(requestData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
