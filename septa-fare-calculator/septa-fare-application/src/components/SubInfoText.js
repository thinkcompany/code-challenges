import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSubText = styled.div`
  font-size: .75rem;
  color: #5A5A5A;
  margin-bottom: 1rem;
`;

const SubInfoText = ({subtext}) => {
  return (
    <StyledSubText>{subtext}</StyledSubText>
  )
}

SubInfoText.propTypes = {}

export default SubInfoText