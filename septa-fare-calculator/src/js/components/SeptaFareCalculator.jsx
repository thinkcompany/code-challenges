import React, { Component } from 'react';

import Destination from './WidgetComponents/Destination';

class SeptaFareCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zone: 1,
            time: "weekday",
            purchaseAt: "onboard_purchase",
            numRides: 1
        }
    }

    onZoneChange(newZone) {
        this.setState({ zone: newZone });
    }

    render() {
        return (
            <div id="septa-fare-calculator">
                <Destination zones={this.props.faresData.zones} zoneChange={this.onZoneChange.bind(this)} />
            </div>
        );
    }
}
export default SeptaFareCalculator;
