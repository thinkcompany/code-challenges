import React, {Component} from 'react'
import './calculator.css'
// import data from './../fares.json'
import logo from '../img/SEPTA.svg'


export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/ki5sg')
      .then(res => res.json())
      .then(
        (result => {
          this.setState({
            isLoaded: true,
            data: result.zones[0].name
          });
          console.log(result, 'initial result!')
          console.log(this.state)
        }),
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

  render() {
    const { error, isLoaded, data } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='container'>
          <div className='wrapper'>
            <header>
              <img alt='septa-logo' src={logo} />
              <h1>Regional Rail Fares</h1>
            </header>
            <body>
              <h2>Where are you going?</h2>
            </body>
            {/* {data} */}
            {/* {items.map(item => (
              <h1 key={item.name}>
                {item.name} {item.price}
              </h1>
                ))} */}
          </div>
        </div>
      );
    }
  }
}
