import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import uuid4 from 'uuid4';

const StyledDropdown = styled.div`
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  width: 90%;
  border-radius: .25rem;
  font-size: 1.5rem;
  border: 2px solid #D3D3D3;
`;

const DropdownSelection = ({options, type, data}) => {
  const optionsList = type ? options.map(option => <option key={uuid4} value={option}>Zone {option}</option>) : options.map(option => <option key={uuid4} value={option.toLowerCase().split(" ").join("_")}>{option}</option>);

  return (
    <StyledDropdown>
      <StyledSelect id="zone-input" name="zone-input" value={type ? data.zone : data.travelTime}>
        {optionsList}
      </StyledSelect>
    </StyledDropdown>
  )
}

DropdownSelection.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  data: PropTypes.shape({
    zone: PropTypes.string,
    travelTime: PropTypes.string,
    purchaseLocation: PropTypes.string,
    ticketQuantity: PropTypes.number,
  }),
};

DropdownSelection.defaultProps = {
  type: "",
  options: [],
  data: {
    zone: "",
    travelTime: "",
    purchaseLocation: "",
    ticketQuantity: null,
  },
};

export default DropdownSelection