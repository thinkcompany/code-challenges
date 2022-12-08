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

const ApplicationContainer = props => {
  return (
    <StyledContainer>
      <Header header="Regional Rail Fares"/>
      <Section subheading="Where are you going?" inputType="dropdown"/>
      <Section subheading="When are you going?" inputType="dropdown" subtext="Helper text that explains the options above."/>
      <Section subheading="Where will you purchase the fare?" inputType="radio"/>
      <Section subheading="How many rides will you need?" inputType="number"/>
      <Section dark subheading="Your fare will cost" text="$28.00"/>
    </StyledContainer>
  )
}

ApplicationContainer.propTypes = {}

export default ApplicationContainer