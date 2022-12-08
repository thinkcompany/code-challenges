import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRadio = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-bottom: 1rem;
  font-size: 1.20rem;
  border-radius: .25rem;
`;

const Option = styled.div`
  margin: .25rem;
`;

// TODO: loop through this information instead of hard coding
const RadioSelection = props => {
  return (
    <StyledRadio>
      <Option>
        <label class="location-button"><input type="radio" name="purchase-location-button" checked/>Station Kiosk</label>
      </Option>
      <Option>
        <label class="location-button"><input type="radio" name="purchase-location-button"/>Onboard</label>
      </Option>
    </StyledRadio>
  )
}

RadioSelection.propTypes = {}

export default RadioSelection