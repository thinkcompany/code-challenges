import React, { Component } from 'react';

import Destination from './WidgetComponents/Destination';

class SeptaFareCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zone: 1,
            time: "weekday",
            purchaseAt: "Onboard",
            numRides: 1
        }
    }

    render() {
        return (
            <div id="septa-fare-calculator">
                <Destination zones={this.props.faresData.zones} />
            </div>
        );
    }
}
export default SeptaFareCalculator;
