import React from "react";
import myData from './fares.json';
import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: myData.info,

            // stores the prices of each zone based on their type and purchase
            weekday: {
                advance: [],
                onboard: []
            },
            evening_weekend: {
                advance: [],
                onboard: []
            },
            anytime: {
                advance: [],
                onboard: [0, 0, 0, 0, 0]
            },

            // stores values of zone, type, and purchase the user chooses to quickly search in objects above
            userZone: 0,
            userType: "weekday",
            userPurchase: "advance",

            ticketQuantity: 0,
            totalPrice: 0
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
                        this.state.evening_weekend.advance.push(fare.price);
                    } else {
                        this.state.evening_weekend.onboard.push(fare.price);
                    };
                } else {
                    this.state.anytime.advance.push(fare.price);
                };
            };
        };

        this.updateZone = this.updateZone.bind(this);
        this.showZone = this.showZone.bind(this);
        this.updateType = this.updateType.bind(this);
        this.showType = this.showType.bind(this);
        this.showTypeExplanations = this.showTypeExplanations.bind(this);
        this.updatePurchase = this.updatePurchase.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    };

    // Below is an AJAX request to get the data from json file
    // However, I could not figure out why it was not working so instead I just imported the file at the top

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


    // Depending on what zone the user chooses, the corresponding zone will show
    showZone() {
        if (this.state.userZone === 0) {
            return (<h3 className="form-slots">CCP/1</h3>);
        } else if (this.state.userZone === 1) {
            return (<h3 className="form-slots">Zone 2</h3>);
        } else if (this.state.userZone === 2) {
            return (<h3 className="form-slots">Zone 3</h3>);
        } else if (this.state.userZone === 3) {
            return (<h3 className="form-slots">Zone 4</h3>);
        } else if (this.state.userZone === 4) {
            return (<h3 className="form-slots">NJ</h3>);
        };
    };

    // Depending on what type the user chooses, the corresponding type will show
    showType() {
        if (this.state.userType === 'weekday') {
            return (<h3 className="form-slots type">Weekdays</h3>);
        } else if (this.state.userType === 'evening_weekend') {
            return (<h3 className="form-slots type">Weekends</h3>);
        } else if (this.state.userType === 'anytime') {
            return (<h3 className="form-slots type">Anytime</h3>);
        };
    };

    // Depending on what type the user chooses, the corresponding explanation of the type will show
    showTypeExplanations() {
        let type = this.state.userType;
        return (<h5 className="text">{this.state.info[type]}</h5>)
    };


    // Will update the user's choice of zone in state upon button click
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

    // Will update the user's choice of type in state upon button click
    updateType(type) {
        if (type === 'Weekdays') {
            this.setState({userType: 'weekday'});
        } else if (type === 'Weekends') {
            this.setState({userType: 'evening_weekend'});
        } else if (type === 'Anytime') {
            this.setState({userType: 'anytime'});
        };
    };

    // Will update the user's choice of purchase in state upon radio input click
    updatePurchase(purchase) {
        if (purchase === 'Station Kiosk') {
            this.setState({userPurchase: 'advance'});
        } else {
            this.setState({userPurchase: 'onboard'});
        };
    };

    // Updates ticket quantity based on user input
    updateQuantity() {
        return(e) => {
            this.setState({ticketQuantity: e.currentTarget.value});
        };
    };

    // Uses the corresponding user type and purchase to find the array that matches
    // Then uses the zone as an index to return the specified price based on their choice
    // Returns a display of the total based on price times quanitity they entered in
    calculateTotal() {
        let typeInfo = this.state[this.state.userType];
        let userPurchase = this.state.userPurchase;
        let purchaseInfo = typeInfo[userPurchase];
        let price = purchaseInfo[this.state.userZone];
        let total = (Math.round(price * this.state.ticketQuantity * 100) / 100).toFixed(2);
        return (<h5 className="price-text">${total}</h5>)
    };

    render() {
        return (
            <div className="form-container">
                <div className="form-sections">
                    <div className="form-heading">
                        <h2 id='heading'>Regional Rail Fares</h2>
                    </div>
                    <div className="form-zone">
                        <h2 id='form-zone-heading'>Where are you going?</h2>
                        {this.showZone()}
                        <button onClick={() => this.updateZone('CCP/1')}>CCP/1</button>
                        <button onClick={() => this.updateZone('Zone 2')}>Zone 2</button>
                        <button onClick={() => this.updateZone('Zone 3')}>Zone 3</button>
                        <button onClick={() => this.updateZone('Zone 4')}>Zone 4</button>
                        <button onClick={() => this.updateZone('NJ')}>NJ</button>
                    </div>
                    <div className="form-type">
                        <h2>When are you riding?</h2>
                        {this.showType()}
                        <button onClick={() => this.updateType('Weekdays')}>Weekdays</button>
                        <button onClick={() => this.updateType('Weekends')}>Weekends</button>
                        <button onClick={() => this.updateType('Anytime')}>Anytime</button>
                        {this.showTypeExplanations()}
                    </div>
                    <div className="form-purchase">
                        <h2 className="text">Where will you purchase the fare?</h2>
                        <label for="station-kiosk">
                            <input 
                                onChange={() => this.updatePurchase('Station Kiosk')} 
                                type="radio" 
                                name="purchase" 
                                value="station-kiosk" 
                                checked 
                            />
                            Station Kiosk
                        </label>
                        <label for="onboard">
                            <input 
                                onChange={() => this.updatePurchase('Onboard')} 
                                type="radio" 
                                name="purchase" 
                                value="onboard" 
                            />
                            Onboard
                        </label>
                    </div>
                    <div className="form-ticket-quantity">
                        <h2>How many rides will you need?</h2>
                        <input 
                            className="form-slots"
                            type='number'
                            onChange={this.updateQuantity()}
                            value={this.state.ticketQuantity}
                            name="quantity"
                            min="0"
                        />
                    </div>
                    <div className="form-ticket-price">
                        <h2 className="price-text">Your fare will cost</h2>
                        {this.calculateTotal()}
                    </div>
                </div>
            </div>
        )
    }
};

export default App;
