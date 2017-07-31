import React, { Component } from 'react';

import Destination from './WidgetComponents/Destination';
import Timings from './WidgetComponents/Timings';
import PurchaseLocation from './WidgetComponents/PurchaseLocation';

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

    onTimingChange(newTime) {
        this.setState({ time: newTime });
    }

    onPurchaseLocChange(newLoc) {
        this.setState({ purchaseAt: newLoc });
    }


    render() {
        return (
            <div id="septa-fare-calculator">
                <Destination zones={this.props.faresData.zones} zoneChange={ this.onZoneChange.bind(this) } />

                <Timings
                    timings={ this.props.timings }
                    timingChange={ this.onTimingChange.bind(this) }
                    keyInfo={ this.props.faresData.info} />

                <PurchaseLocation onLocChange={this.onPurchaseLocChange.bind(this)} />
            </div>
        );
    }
}
export default SeptaFareCalculator;
