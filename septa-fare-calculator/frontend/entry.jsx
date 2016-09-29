import React from 'react';
import ReactDOM from 'react-dom';

class Options extends React.Component {
}

class Calculator extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        "Hello world!"
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Calculator source="../fares.json" />,
  document.getElementById('root'))
});
