import React from 'react';
import ReactDOM from 'react-dom';

class Options extends React.Component {
}

class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      options: {
        zone: 1,
        type: "weekday",
        purchase: "onboard_purchase",
        numRides: 1
      }
    }
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount(){
    this.serverRequest = $.get(this.props.source, result => {
      this.setState({data: result});
    });
  }

  handleUserInput(options){
    this.setState({options: options});
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
