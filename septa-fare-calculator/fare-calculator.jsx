import React from 'react';

import Zones from './zones';
import Timings from './timings';

class FareCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "1",
      time: "weekday",
      purchase: "advance-purchase",
      rides: 1,
    };

    this.updateZone = this.updateZone.bind(this);
    this.updateTime = this.updateTime.bind(this);
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
        <Zones availableZones={faresData.zones} updateZone={this.updateZone} />
        <Timings timeInfo={faresData.info[this.state.time]} updateTime={this.updateTime} />
      </div>
    );
  }
}

export default FareCalculator;
