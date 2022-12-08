import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: ${props => props.dark ? "white" : "black"};
`;

const Text = ({text, dark}) => {
  return (
    <StyledText dark={dark}>{text}</StyledText>
  )
}

Text.propTypes = {}

export default Text