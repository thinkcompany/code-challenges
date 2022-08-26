import React from "react";
import myData from './fares.json';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            info: myData.info,

            // stores the prices of each zone based on their type and purchase
            weekday: {
                advance: [],
                onboard: []
            },
            weekend: {
                advance: [],
                onboard: []
            },
            anytime: {
                advance: []
            },

            // stores values of zone, type, and purchase the user chooses to quickly search in objects above
            userZone: 0,
            userType: "weekday",
            userPurchase: ""
        };

        // iterates through all prices for each zone's fares to store in corresponding array in state above
        for (let zone of myData.zones) {
            for (let fare of zone.fares) {
                let currentType = fare.type;
                let currentPurchase = fare.purchase;
                if (currentType === 'weekday') {
                    if (currentPurchase === 'advance_purchase') {
                        this.state.weekday.advance.push(fare.price);
                    } else {
                        this.state.weekday.onboard.push(fare.price);
                    };
                } else if (currentType === 'evening_weekend') {
                    if (currentPurchase === 'advance_purchase') {
                        this.state.weekend.advance.push(fare.price);
                    } else {
                        this.state.weekend.onboard.push(fare.price);
                    };
                } else {
                    this.state.anytime.advance.push(fare.price);
                };
            };
        };

        this.updateZone = this.updateZone.bind(this);
        this.showZone = this.showZone.bind(this);
    };

    // componentDidMount() {
    //     fetch("septa-fare-calculator/frontend/src/fares.json")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     info: result.info,
    //                     zones: result.zones
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    // };

    showZone() {
        if (this.state.userZone === 0) {
            return (<h3>CCP/1</h3>);
        } else if (this.state.userZone === 1) {
            return (<h3>Zone 2</h3>);
        } else if (this.state.userZone === 2) {
            return (<h3>Zone 3</h3>);
        } else if (this.state.userZone === 3) {
            return (<h3>Zone 4</h3>);
        } else if (this.state.userZone === 4) {
            return (<h3>NJ</h3>);
        }
    }

    updateZone(zone) {
        if (zone === 'CCP/1') {
            this.setState({userZone: 0});
        } else if (zone === 'Zone 2') {
            this.setState({userZone: 1});
        } else if (zone === 'Zone 3') {
            this.setState({userZone: 2});
        } else if (zone === 'Zone 4') {
            this.setState({userZone: 3});
        } else if (zone === 'NJ') {
            this.setState({userZone: 4});
        };
    };

    updateType(type) {
        if (type === 'Weekdays') {
            this.setState({userType: 'weekday'})
        }
    }
    
    render() {
        return (
            <div className="form-container">
                <header>Regional Rail Fares</header>
                <h2>Where are you going?</h2>
                {this.showZone()}
                <button onClick={() => this.updateZone('CCP/1')}>CCP/1</button>
                <button onClick={() => this.updateZone('Zone 2')}>Zone 2</button>
                <button onClick={() => this.updateZone('Zone 3')}>Zone 3</button>
                <button onClick={() => this.updateZone('Zone 4')}>Zone 4</button>
                <button onClick={() => this.updateZone('NJ')}>NJ</button>
                <h2>When are you riding?</h2>
                <button>Weekdays</button>
                <button>Weekends</button>
                <button>Anytime</button>
            </div>
        )
    }
};

export default App;
