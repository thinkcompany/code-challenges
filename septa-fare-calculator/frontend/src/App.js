import React from "react";
import myData from './fares.json';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            info: myData.info,
            zones: myData.zones
        };
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
    
    render() {
        return (
            <ul>
                {this.state.zones.map(zone => (
                    <li key={zone.id}>{zone.zone}</li>
                ))}
            </ul>
        )
    }
};

export default App;
// export const App = () => {
//     return <div className="App">Hello World (Now with 100% more React!)</div>
// };