import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import SeptaFareCalculator from './js/components/SeptaFareCalculator';
import './scss/base.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faresData: {
                zones: []
            },
            timings: []
        };

        this.fetchFares();
        this.fetchTimings();
    }

    fetchFares() {
        fetch('/_data/fares.json')
          .then((response) => {
            return response.json()
          }).then((json) => {
            this.setState({ faresData: json });
          });
    }

    fetchTimings() {
        fetch('/_data/timings.json')
          .then((response) => {
            return response.json()
          }).then((json) => {
            this.setState({ timings: json });
          });
    }

    render() {
        return (
            <div>
                <SeptaFareCalculator faresData={this.state.faresData} timings={this.state.timings} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#content'));
