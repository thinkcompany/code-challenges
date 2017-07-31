import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import SeptaFareCalculator from './js/components/SeptaFareCalculator';
import './scss/base.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faresData: {}
        };

        this.fetchFares();
    }

    fetchFares() {
        fetch('/_data/fares.json')
          .then((response) => {
            return response.json()
          }).then((json) => {
            console.log(json);
            this.setState({ faresData: json });
          });
    }

    render() {
        return (
            <div>
                <SeptaFareCalculator />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#content'));
