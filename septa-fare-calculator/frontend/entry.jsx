import React from 'react';
import ReactDOM from 'react-dom';

class Options extends React.Component {
}

class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      options: {
        zone: 1,
        type: "weekday",
        purchase: "onboard_purchase",
        numRides: 1
      }
    }
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount(){
    this.serverRequest = $.get(this.props.source, result => {
      this.setState({data: result});
    });
  }

  determineCost(){
    if (this.state.data === null){
      return 0;
    }
    let fares = this.state.data.zones[this.state.options.zone - 1].fares;
    let price;
    let cost;
    let numRides = Math.floor(this.state.options.numRides);
    let bool1 = this.state.options.purchase === "advance_purchase";
    let bool2 = this.state.options.type === "weekday";
    let bool3 = this.state.options.zone === 5
    let type = this.state.options.type;
    let purchase = this.state.options.purchase;
    if (isNaN(numRides) || numRides < 1){
      cost = 0;
    } else if (bool1 && (bool2 || bool3)){
      let numTenTix = Math.floor(numRides / 10);
      let remainder = numRides % 10;
      let tenTixPrice;
      for (let i = 0; i < fares.length; i++){
        if (fares[i].type === type && fares[i].purchase === purchase){
          price = fares[i].price;
        }
        if (fares[i].trips === 10){
          tenTixPrice = fares[i].price;
        }
      }
      cost = ((numTenTix * tenTixPrice) + (remainder * price)).toFixed(2);
    } else {
      for (let i = 0; i < fares.length; i++){
        if (fares[i].type === type && fares[i].purchase === purchase){
          price = fares[i].price;
        }
      }
      cost = (price * numRides).toFixed(2);
    }
    return cost;
  }

  handleUserInput(options){
    this.setState({options: options});
  }

  render(){
    console.log(this.determineCost());
    return (
      <div>
        "Hello world!"
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Calculator source="../fares.json" />,
  document.getElementById('root'))
});
