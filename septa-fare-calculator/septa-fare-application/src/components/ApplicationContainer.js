import React from 'react';
import Header from './Header';
import Section from './Section';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sections } from '../sections';

const StyledContainer = styled.div`
  border: 3px solid #D3D3D3;
  width: 25%;
  margin: 0 auto;
`;

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
    </StyledContainer>
  )
}

ApplicationContainer.propTypes = {}

export default ApplicationContainer