import React, { Component } from 'react';

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
            <p className="hello-world">Hello World</p>
        );
    }
}
export default SeptaFareCalculator;
