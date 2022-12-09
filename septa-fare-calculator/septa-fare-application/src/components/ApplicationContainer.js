import React, {useState, useEffect} from 'react';
import Header from './Header';
import Section from './Section';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid4 from 'uuid4';
import { sections } from '../sections';

const StyledContainer = styled.div`
  border: 3px solid #D3D3D3;
  width: 25%;
  margin: 0 auto;
`;

const ApplicationContainer = props => {
  // State management for the ajax call
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fares, setFares] = useState({
    info: {},
    zones: [],
  });

  // State management for the user inputed data
  // const [zone, setZone] = useState("");
  // const [travelTime, setTravelTime] = useState("");
  // const [purchaseLocation, setPurchaseLocation] = useState("");
  // const [ticketQuantity, setTicketQuantity] = useState(null);

  const [data, setData] = useState({
    zone: "1",
    travelTime: "anytime",
    purchaseLocation: "onboard_purchase",
    ticketQuantity: 1,
  });

  /*  Since we're using a functional component here, we must use a useEffect hook that runs once to mimic the 
  componentDidMount method to make the AJAX request */
  useEffect(() => {
    console.log("use effect triggered");
    const url = "https://raw.githubusercontent.com/emcgilldev/code-challenges/3360706bc9ebd7715aecc7f2c3ebb5df1d09cae8/septa-fare-calculator/fares.json";

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFares({
            info: result["info"],
            zones: result["zones"],
          });
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  const SectionList = () => {
    // TODO: comment this function and what's happening here
    const zones = Array.from(fares["zones"], element => element.zone);
    // TODO: do not hardcode this; figure out how to acccess this
    const times = ["Weekday", "Evening Weekend", "Anytime"];
    const locations = [
      {
        label: "Onboard",
        value: "onboard_purchase",
      },
      {
        label: "Station Kiosk",
        value: "advance_purchase",
      }
    ];

    // TODO: reduce this with a switch case statement if necessary
    return sections.map(({subheading, inputType, dark, subtext}, i, sections) => {
      // if the last section in the list
      if (i + 1 === sections.length){
        return <Section key={uuid4()} subheading={subheading} inputType={inputType} dark={dark} subtext={subtext} text="$28.00"/>;
      } 
      // if the first section in teh list  
      if (i === 0){
        return <Section data={data} key={uuid4()} type="zones" options={zones} subheading={subheading} inputType={inputType} dark={dark} subtext={subtext}/>;
      }
      if (i === 2){
        return <Section data={data} key={uuid4()} options={locations} subheading={subheading} inputType={inputType} dark={dark} subtext={subtext}/>;
      }
      else {
        return <Section data={data} key={uuid4()} options={times} subheading={subheading} inputType={inputType} dark={dark} subtext={subtext}/>;
      }
    });
  };

  return error ? 
    <div>{error}</div> : 
      !isLoaded ? 
        <div>Loading...</div> :
        ( <StyledContainer>
            <Header/>
            <SectionList/>
          </StyledContainer>
        );
};


ApplicationContainer.propTypes = {}

export default ApplicationContainer