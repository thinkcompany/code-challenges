import React from 'react';

import Zones from './zones';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "1",
      time: "weekday",
      purchase: "advance-purchase",
      rides: 1,
    };
  }

  render() {
    const { faresData } = this.props;
    if (!faresData) return null;

    return(
      <div className="calculator-container">
        <Zones />
      </div>
    );
  }
}
