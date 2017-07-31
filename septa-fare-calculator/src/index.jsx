import React from 'react';
import ReactDOM from 'react-dom';

import SeptaFareCalculator from './js/components/SeptaFareCalculator';
import './scss/base.scss';

const App = () => {
    return (
        <div>
            <SeptaFareCalculator />
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#content'));
