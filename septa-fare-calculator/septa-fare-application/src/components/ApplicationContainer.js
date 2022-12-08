import React from 'react';
import Header from './Header';
import Section from './Section';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ApplicationContainer = props => {
  return (
    <>
      <Header header="header"/>
      <Section subheading="SubHeader here" inputType="dropdown"/>
      <Section subheading="SubHeader here" inputType="dropdown" subtext="Subtext here"/>
      <Section subheading="SubHeader here" inputType="radio"/>
      <Section subheading="SubHeader here" inputType="number"/>
      <Section subheading="SubHeader here" text="$28.00"/>
    </>
  )
}

ApplicationContainer.propTypes = {}

export default ApplicationContainer