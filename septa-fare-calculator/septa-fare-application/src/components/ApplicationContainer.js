import React from 'react';
import Header from './Header';
import Section from './Section';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  border: 3px solid #D3D3D3;
  width: 25%;
  margin: 0 auto;
`;

const sections = [
  {
    subheading: "Where are you going?",
    inputType: "dropdown",
    dark: false,
    subtext: null,
  },
  {
    subheading: "When are you going?",
    inputType: "dropdown",
    dark: false,
    subtext: "Helper text that explains the options above."
  },
  {
    subheading: "Where will you purchase the fare?",
    inputType: "radio",
    dark: false,
    subtext: null,
  },
  {
    subheading: "How many rides will you need?",
    inputType: "number",
    dark: false,
    subtext: null,
  },
  {
    subheading: "Your fare will cost",
    inputType: "",
    dark: true,
    subtext: null,
  },
];

const SectionList = () => {
  // TODO: comment this function and what's happening here
  return sections.map(({subheading, inputType, dark, subtext}, i, sections) => {
    if (i + 1 === sections.length){
      return <Section subheading={subheading} inputType={inputType} dark={dark} subtext={subtext} text="$28.00"/>;
    } else {
      return <Section subheading={subheading} inputType={inputType} dark={dark} subtext={subtext}/>;
    }
  });
};

const ApplicationContainer = props => {
  return (
    <StyledContainer>
      <Header header="Regional Rail Fares"/>
      <SectionList/>
      {/* <Section subheading="Where are you going?" inputType="dropdown"/>
      <Section subheading="When are you going?" inputType="dropdown" subtext="Helper text that explains the options above."/>
      <Section subheading="Where will you purchase the fare?" inputType="radio"/>
      <Section subheading="How many rides will you need?" inputType="number"/>
      <Section dark subheading="Your fare will cost" text="$28.00"/> */}
    </StyledContainer>
  )
}

ApplicationContainer.propTypes = {}

export default ApplicationContainer