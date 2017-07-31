import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './js/components/hello_world';
import './scss/base.scss';

const App = () => {
    return (
        <div>
            <div className="myDiv">SEPTA Fare Calculator!</div>
            <HelloWorld />
        </div>
    );
}
// console.log(App);

ReactDOM.render(<App />, document.querySelector('#content'));
