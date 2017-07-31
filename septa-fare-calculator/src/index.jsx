import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import SeptaFareCalculator from './js/components/SeptaFareCalculator';
import './scss/base.scss';

class App extends Component {
    constructor(props) {
        super(props);

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
