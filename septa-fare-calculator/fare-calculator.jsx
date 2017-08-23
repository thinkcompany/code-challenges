import React from 'react';

import Zones from './zones';

class FareCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "1",
      time: "weekday",
      purchase: "advance-purchase",
      rides: 1,
    };
  }


  updateZone(e) {
  this.setState({ zone: e.currentTarget.value });
}

  render() {
    const { faresData } = this.props;
    if (!faresData.zones) return null;

    return(
      <div className="calculator-container">
        <Zones availableZones={faresData.zones} updateZone={this.updateZone.bind(this)} />
      </div>
    );
  }
}

export default FareCalculator;
