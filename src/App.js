//I'd probably organize these if I had more time and set up more eslint rules to auto correct
import React, { Component } from 'react';
import { constants } from './config';
import TitleBar from './components/titleBar';
import DropdownContainer from './components/dropdownContainer';
import RadioButtonContainer from './components/radioButtonContainer';
import TextBoxContainer from './components/textBoxContainer';
import FooterBar from './components/footerBar';
import { getZoneOptions, getRidingOptions, getRadioValues } from './helpers/appEnhancer';
import jp from 'jsonpath';
import styled from 'styled-components';

const StyledApp = styled.div`
    border-style: solid;
    border-width: 2px;
    border-color: #3f3f3d;
    font-family: "Verdana"   
    `;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.unformatedData = null;
    this.dataModel = {};

  }

  async componentDidMount(){
    //Before this should have been in componentWillMount, as with all loading calls but this is no beuno nowadays
    const url = constants.jsonURL; 
    const response = await fetch(url);
    this.unformatedData = await response.json();
    //I use helper functions to get static stuff such as options that will never change, theoretically I could use some
    //functional programming and get the dynamic content too but that would require more time
    this.dataModel.zoneOptions = getZoneOptions(this.unformatedData);
    this.dataModel.ridingOptions = getRidingOptions(this.unformatedData);
    //I set state with the selected options and a triggered help text for 'anytime'
    this.setState({selectedZone: this.dataModel.zoneOptions[0],
                  selectedTime: this.dataModel.ridingOptions[0],
                  selectedPurchaseType: getRadioValues(this.unformatedData, this.dataModel.ridingOptions[0])[0],
                  selectedNumberOfRides: '0',
                  anyTimeHelpText: ''});
  }

  //Some nice select actions here
  zoneOnSelect = (input) => {
    this.setState({selectedZone: input})
  };

  //This one has the tricky case of the anytime select action that triggers the help text and manipulates the other variables
  ridingTimesOnSelect = (input) => {
    if(input.value === 'anytime'){
      this.setState({
        selectedNumberOfRides: 10,
        anyTimeHelpText: 'Anytime tickets must be bought in advance and in an allotment of 10',
        selectedTime: input
        }
      );
    }
    else{
      this.setState(
        {selectedTime: input,
        anyTimeHelpText: ''
      });
    }
  };

  purchaseTypeSelect = (input) => {
    this.setState({selectedPurchaseType: input})
  };

  getRidingModelHelpText = () => {
    const currentSelectedTime = this.state.selectedTime;
    return jp.query(this.unformatedData, `$.info.${currentSelectedTime.value}`)[0];
  };

  numberOfRidesHandleChange = (event) => {
    if (!!event.target.validity.valid && this.state.selectedTime.value !== 'anytime') {
       this.setState({ selectedNumberOfRides: event.target.value})
    }
  }

  //Got a little querying here to find the prices, some fun stuff, maybe could have done one combined query 
  //but that wasn't playing nice
  getPrice = () => {
    const {selectedZone, selectedTime, selectedPurchaseType, selectedNumberOfRides} = this.state;
    const zone = jp.query(this.unformatedData, `$.zones[?(@.zone==${selectedZone.value})]`)[0];
    if(selectedNumberOfRides === 10 && selectedPurchaseType === "advance_purchase" && selectedTime.value === 'anytime'){
      return jp.query(zone, `$.fares[?(@.type=="${selectedTime.value}" && @.purchase=="${selectedPurchaseType}" && @.trips==${selectedNumberOfRides})]`)[0].price
    }
    else{
      return jp.query(zone, `$.fares[?(@.type=="${selectedTime.value}" && @.purchase=="${selectedPurchaseType}")]`)[0].price * selectedNumberOfRides;
    }
  }

  //The meat and potatoes with a conditional render if the data is there
  render() {
    if(this.dataModel.zoneOptions)
      return (
        <StyledApp>
          <TitleBar/>
          <DropdownContainer 
            title='Where are you going?' 
            options = {this.dataModel.zoneOptions} 
            onSelect = {this.zoneOnSelect} 
            value = {this.state.selectedZone} />
          <DropdownContainer 
            title='When are you riding?' 
            options = {this.dataModel.ridingOptions} 
            onSelect = {this.ridingTimesOnSelect} 
            value = {this.state.selectedTime} 
            helpText = {this.getRidingModelHelpText()}/>
          <RadioButtonContainer
            title='When will you purchase this fare?'
            options = {getRadioValues(this.unformatedData, this.state.selectedTime)}
            onSelect = {this.purchaseTypeSelect}
            selectedOption = {this.state.selectedPurchaseType}
            name = 'purchaseType'
            helpText = {this.state.anyTimeHelpText}
            />
          <TextBoxContainer
            title='How many rides will you need?'
            handleChange = {this.numberOfRidesHandleChange}
            defaultValue = {this.state.selectedNumberOfRides}
            />
            <FooterBar value = {this.getPrice()}/>
        </StyledApp>
      );
    else{
      return (
        <h2> Loading... </h2>
      );
    }
  }
}

export default App;
