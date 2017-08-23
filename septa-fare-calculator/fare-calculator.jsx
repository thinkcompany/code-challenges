import React from 'react';

import Zones from './zones';
import Timings from './timings';
import Purchase from './purchase';
import Rides from './rides';

class FareCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "1",
      time: "weekday",
      purchase: "advance_purchase",
      rides: 1,
    };

    this.updateZone = this.updateZone.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updatePurchase = this.updatePurchase.bind(this);
    this.updateRides = this.updateRides.bind(this);
  }

  updatePurchase(e) {
    this.setState({ purchase: e.currentTarget.value });
  }

  updateRides(e) {
    this.setState({ rides: e.currentTarget.value });
  }

  updateTime(e) {
    this.setState({ time: e.currentTarget.value });
  }

  updateZone(e) {
    this.setState({ zone: e.currentTarget.value });
  }

  render() {
    const { faresData } = this.props;
    if (!faresData.zones) return null;

    return(
      <div className="calculator-container">
        <div className="calculator-header">
          <h1>Regional Rail Fares</h1>
        </div>
        <Zones availableZones={faresData.zones} updateZone={this.updateZone} />
        <Timings timeInfo={faresData.info[this.state.time]} updateTime={this.updateTime} />
        <Purchase
          purchaseInfo={faresData.info[this.state.purchase]}
          selected={this.state.purchase}
          updatePurchase={this.updatePurchase} />
        <Rides ridesAmount={this.state.rides} updateRides={this.updateRides} />
      </div>
    );
  }
}

export default FareCalculator;
