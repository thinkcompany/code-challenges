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

const RadioSelection = ({data, options}) => {
  const {purchaseLocation} = data;

  const OptionList = () => {
    return options.map(option => (
      <Option>
        <label class="location-button"><input type="radio" name="purchase-location-button" value={option.value} checked={purchaseLocation === option.value ? true : false}/>{option.label}</label>
      </Option>
    ))
  };

  // if name property is equal to purchase location then add check attribute to that jsx element
  return (
    <StyledRadio>
      <OptionList />
    </StyledRadio>
  )
}

RadioSelection.propTypes = {
  options: PropTypes.array,
  data: PropTypes.shape({
    zone: PropTypes.string,
    travelTime: PropTypes.string,
    purchaseLocation: PropTypes.string,
    ticketQuantity: PropTypes.number,
  }),
};

RadioSelection.defaultProps = {
  options: {
    onboard_purchase: "",
    advance_purchase: "",
  },
  data: {
    zone: "",
    travelTime: "",
    purchaseLocation: "",
    ticketQuantity: null,
  },
};

export default RadioSelection