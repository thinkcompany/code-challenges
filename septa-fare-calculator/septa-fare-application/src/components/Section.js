import React from 'react'
import PropTypes from 'prop-types'
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
    options,
    type,
  }) => {

  const renderContent = () => {
    switch (true) {
      case inputType === "radio":
        return <RadioSelection/>;
      case inputType === "dropdown":
        return <DropdownSelection type={type} options={options}/>;
      case inputType === "number":
        return <NumberSelection/>;
      case inputType === "":
        return <Text text={text} dark={dark}/>;
      default: return null;
    }
  };

  return (
    <StyledContainer dark={dark}>
      <SubHeading dark={dark} subheading={subheading} />
      {renderContent()}
      <SubInfoText subtext={subtext} />
    </StyledContainer>
  )
}

Section.propTypes = {
  inputType: PropTypes.string,
  subheading: PropTypes.string,
  subtext: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  dark: PropTypes.bool,
  fares: PropTypes.shape({
    info: PropTypes.object,
    zones: PropTypes.array,
  }),
};

Section.defaultProps = {
  inputType: "",
  subheading: "",
  subtext: "",
  text: "",
  type: "",
  dark: false,
  fares: {
    info: {},
    zones: []
  },
};

export default Section