import React from 'react'
// import PropTypes from 'prop-types'
// import SubHeading from './SubHeading'
import styled from 'styled-components';
import SubHeading from "./SubHeading";
import RadioSelection from './RadioSelection';
import DropdownSelection from './DropdownSelection';
import NumberSelection from './NumberSelection';
import SubInfoText from "./SubInfoText";
import Text from './Text';

const StyledContainer = styled.div`
  width: auto;
  height: auto;
  border-bottom: 1px solid #D3D3D3;
  padding: 1rem 0;
  background-color: ${props => props.dark ? "#5A5A5A" : "white"};
`;

const Section = (
  { inputType, 
    subheading, 
    subtext, 
    text, 
    dark, 
  }) => {

  const renderInputType = () => {
    switch (true) {
      case inputType === "radio":
        return <RadioSelection/>;
      case inputType === "dropdown":
        return <DropdownSelection/>;
      case inputType === "number":
        return <NumberSelection/>;
      default: return null;
    }
  };

  return (
    <StyledContainer dark={dark}>
      <SubHeading dark={dark} subheading={subheading} />
      {renderInputType()}
      <SubInfoText subtext={subtext} />
      <Text text={text} dark={dark}/>
    </StyledContainer>
  )
}

Section.propTypes = {}

export default Section